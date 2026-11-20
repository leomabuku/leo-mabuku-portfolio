"""Build the CodeAlpha submission PDFs and editable Word copies.

Dependencies: reportlab, python-docx and pypdf. Source manuscripts are task1.md
and task4.md. PDF layout is the reference pagination for CodeAlpha submission.
"""
from pathlib import Path
import re
from html import escape

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.units import inch
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from pypdf import PdfReader

BASE = Path(__file__).resolve().parent
OUT = BASE.parent / 'submission'
OUT.mkdir(exist_ok=True)
NAVY = '#14314a'
MUTED = '#536a7b'
ACCENT = '#0a7781'
NAME = 'Leo Mabuku'
STUDENT_ID = 'CA/DF1/322971'


def parse(path):
    title = ''
    in_refs = False
    items = []
    for p in path.read_text().strip().split('\n\n'):
        p = p.strip().replace('\n', ' ')
        if p.startswith('# '):
            title = p[2:]
        elif p.startswith('## '):
            heading = p[3:]
            items.append(('heading', heading))
            in_refs = heading == 'References'
        else:
            items.append(('ref' if in_refs else 'body', p))
    return title, items


def markup(text):
    t = escape(text)
    t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<i>\1</i>', t)
    return re.sub(r'(https?://[^\s<]+)', lambda m: '<link href="' + m.group(1) + '" color="#0a6676">' + m.group(1) + '</link>', t)


def docx_markup(paragraph, text):
    for chunk in re.split(r'(\*\*.+?\*\*|(?<!\*)\*[^*]+\*(?!\*))', text):
        if not chunk:
            continue
        if chunk.startswith('**') and chunk.endswith('**'):
            run = paragraph.add_run(chunk[2:-2]); run.bold = True
        elif chunk.startswith('*') and chunk.endswith('*'):
            run = paragraph.add_run(chunk[1:-1]); run.italic = True
        else:
            paragraph.add_run(chunk)


def draw_page(canvas, doc, task_label):
    width, height = doc.pagesize
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#d6e2e8'))
    canvas.setLineWidth(.6)
    canvas.line(inch, height - .66 * inch, width - inch, height - .66 * inch)
    canvas.setFont('Helvetica-Bold', 8)
    canvas.setFillColor(colors.HexColor(NAVY))
    canvas.drawString(inch, height - .52 * inch, 'CODEALPHA  /  INTERNET OF THINGS')
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor(MUTED))
    canvas.drawRightString(width - inch, height - .52 * inch, task_label.upper())
    canvas.setStrokeColor(colors.HexColor('#d6e2e8'))
    canvas.line(inch, .61 * inch, width - inch, .61 * inch)
    canvas.setFont('Helvetica', 8)
    canvas.drawString(inch, .42 * inch, f'{NAME}  |  {STUDENT_ID}')
    canvas.drawRightString(width - inch, .42 * inch, str(doc.page))
    canvas.restoreState()


def shade_cell(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd'); shd.set(qn('w:fill'), fill); tc_pr.append(shd)


def word_table_cell(cell, label, value):
    cell.text = ''
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    shade_cell(cell, 'F2F6F8')
    p = cell.paragraphs[0]; p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(label.upper() + '\n'); r.bold = True; r.font.name = 'Arial'; r.font.size = Pt(8); r.font.color.rgb = RGBColor.from_string('536A7B')
    r = p.add_run(value); r.font.name = 'Arial'; r.font.size = Pt(10); r.font.color.rgb = RGBColor.from_string('14314A')


def build(src, stem, task_label):
    title, items = parse(BASE / src)
    styles = {
        'eyebrow': ParagraphStyle('eyebrow', fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=colors.HexColor(ACCENT), spaceAfter=6),
        'title': ParagraphStyle('title', fontName='Helvetica-Bold', fontSize=19, leading=24, alignment=TA_LEFT, spaceAfter=10, textColor=colors.HexColor(NAVY)),
        'meta_label': ParagraphStyle('meta_label', fontName='Helvetica-Bold', fontSize=7.5, leading=10, textColor=colors.HexColor(MUTED)),
        'meta_value': ParagraphStyle('meta_value', fontName='Helvetica', fontSize=10, leading=13, textColor=colors.HexColor(NAVY)),
        'heading': ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=colors.HexColor(NAVY), spaceBefore=12, spaceAfter=7, keepWithNext=True),
        'body': ParagraphStyle('body', fontName='Times-Roman', fontSize=11.3, leading=19, spaceAfter=7),
        'ref': ParagraphStyle('ref', fontName='Times-Roman', fontSize=10.8, leading=19, leftIndent=19, firstLineIndent=-19, spaceAfter=7, splitLongWords=True),
    }
    def meta(label, value):
        return [Paragraph(label.upper(), styles['meta_label']), Paragraph(escape(value), styles['meta_value'])]
    box = Table([
        [meta('Student name', NAME), meta('Student ID', STUDENT_ID)],
        [meta('Internship domain', 'Internet of Things (IoT)'), meta('Batch', '20 October – 20 November 2026')],
    ], colWidths=[3.25 * inch, 3.25 * inch], hAlign='LEFT')
    box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f2f6f8')),
        ('BOX', (0, 0), (-1, -1), .6, colors.HexColor('#d7e4e8')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 12), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ]))
    story = [Paragraph(task_label.upper(), styles['eyebrow']), Paragraph(markup(title), styles['title']), box, Spacer(1, 8)]
    for kind, text in items:
        if kind == 'heading' and text == 'References':
            story.append(PageBreak())
        story.append(Paragraph(markup(text), styles[kind]))
    pdf = OUT / (stem + '.pdf')
    page = lambda canvas, doc: draw_page(canvas, doc, task_label)
    SimpleDocTemplate(str(pdf), leftMargin=inch, rightMargin=inch, topMargin=.88*inch, bottomMargin=.80*inch, title=title, author=NAME).build(story, onFirstPage=page, onLaterPages=page)

    doc = Document()
    sec = doc.sections[0]
    sec.top_margin = Inches(.88); sec.bottom_margin = Inches(.8); sec.left_margin = Inches(1); sec.right_margin = Inches(1)
    normal = doc.styles['Normal']; normal.font.name = 'Times New Roman'; normal.font.size = Pt(11.5)
    normal.paragraph_format.line_spacing = 1.75; normal.paragraph_format.space_after = Pt(8)
    h = sec.header.paragraphs[0]; h.text = 'CODEALPHA  /  INTERNET OF THINGS'; h.paragraph_format.space_after = Pt(0)
    h.runs[0].font.name = 'Arial'; h.runs[0].font.size = Pt(8); h.runs[0].bold = True; h.runs[0].font.color.rgb = RGBColor.from_string('14314A')
    f = sec.footer.paragraphs[0]; f.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    f.add_run(f'{NAME}  |  {STUDENT_ID}  |  ')
    field = OxmlElement('w:fldSimple'); field.set(qn('w:instr'), 'PAGE'); f._p.append(field)
    for run in f.runs:
        run.font.name='Arial'; run.font.size=Pt(8); run.font.color.rgb=RGBColor.from_string('536A7B')
    p = doc.add_paragraph(); p.paragraph_format.line_spacing = 1; p.paragraph_format.space_after = Pt(6)
    r = p.add_run(task_label.upper()); r.font.name = 'Arial'; r.font.size = Pt(9); r.bold = True; r.font.color.rgb = RGBColor.from_string('0A7781')
    p = doc.add_paragraph(); p.paragraph_format.line_spacing = 1.15; p.paragraph_format.space_after = Pt(10)
    r = p.add_run(title); r.bold = True; r.font.name = 'Arial'; r.font.size = Pt(19); r.font.color.rgb = RGBColor.from_string('14314A')
    table = doc.add_table(rows=2, cols=2); table.alignment = WD_TABLE_ALIGNMENT.LEFT
    for row, (left, right) in zip(table.rows, [(('Student name',NAME),('Student ID',STUDENT_ID)),(('Internship domain','Internet of Things (IoT)'),('Batch','20 October – 20 November 2026'))]):
        word_table_cell(row.cells[0], *left); word_table_cell(row.cells[1], *right)
    for kind, text in items:
        p = doc.add_paragraph()
        if kind == 'heading':
            if text == 'References': p.paragraph_format.page_break_before = True
            p.paragraph_format.keep_with_next = True; p.paragraph_format.line_spacing = 1.1; p.paragraph_format.space_before = Pt(12); p.paragraph_format.space_after = Pt(7)
            r = p.add_run(text); r.bold = True; r.font.name = 'Arial'; r.font.size = Pt(11); r.font.color.rgb = RGBColor.from_string('14314A')
        elif kind == 'ref':
            p.paragraph_format.left_indent = Inches(.27); p.paragraph_format.first_line_indent = Inches(-.27); p.paragraph_format.line_spacing = 1.65; docx_markup(p, text)
        else:
            docx_markup(p, text)
    doc.core_properties.title = title; doc.core_properties.author = NAME
    doc.save(OUT / (stem + '.docx'))
    reader = PdfReader(str(pdf))
    print(stem, '| PDF pages:', len(reader.pages))
    for i, p in enumerate(reader.pages):
        text = p.extract_text(); print(' ', i+1, '| chars:', len(text), '| starts:', text[:110].replace('\n',' '))

build('task1.md', 'Task_1_Smart_Agriculture', 'Task 01 / Research report')
build('task4.md', 'Task_4_IoT_Security_Case_Study', 'Task 04 / IoT case study')
