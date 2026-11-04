/**
 * Single source of truth for site content.
 *
 * The data itself lives in JSON files in this directory so it can be edited from
 * a phone (see `.pages.yml`) or any tooling, not only from a code editor. Every
 * page — and the résumé generator — reads through this module, so validation
 * happens once and a malformed edit fails the build instead of shipping.
 */
import { z } from 'zod';

import profileJson from './profile.json';
import skillGroupsJson from './skillGroups.json';
import certificationsJson from './certifications.json';
import educationJson from './education.json';
import experienceJson from './experience.json';
import qualitiesJson from './qualities.json';
import hackathonsJson from './hackathons.json';
import projectsJson from './projects.json';
import resumeJson from './resume.json';

/* ------------------------------------------------------------------ schemas */

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  github: z.string().url(),
  linkedin: z.string().url(),
  avatar: z.string().min(1),
  intro: z.string().min(1),
  availability: z.string().min(1),
  status: z.string().min(1),
});

export const skillGroupSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export const certificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  period: z.string().min(1),
});

export const educationSchema = z.object({
  qualification: z.string().min(1),
  institution: z.string().min(1),
  location: z.string().min(1),
  period: z.string().min(1),
  detail: z.string().min(1),
});

export const experienceSchema = z.object({
  title: z.string().min(1),
  organisation: z.string().min(1),
  location: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
  bullets: z.array(z.string().min(1)).default([]),
  document: z
    .object({ label: z.string().min(1), url: z.string().min(1) })
    .optional(),
});

const mediaSchema = z.object({
  type: z.enum(['image', 'video']),
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string(),
  poster: z.string().optional(),
  layout: z.enum(['wide', 'portrait']).optional(),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be lowercase letters, numbers and hyphens'),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  category: z.array(z.string().min(1)).min(1),
  type: z.string().min(1),
  status: z.string().min(1),
  year: z.string().min(1),
  featured: z.boolean(),
  role: z.string().min(1),
  technologies: z.array(z.string().min(1)),
  repository: z.string().url().nullable(),
  repositoryLabel: z.string().optional(),
  additionalRepositories: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  repositoryVisibility: z.enum(['public', 'private']),
  hackathonSlug: z.string().optional(),
  audience: z.array(z.object({ who: z.string(), why: z.string() })).optional(),
  marketPoints: z.array(z.string()).optional(),
  productionPath: z.array(z.string()).optional(),
  limitations: z.array(z.string()).optional(),
  liveDemo: z.string().url().nullable(),
  cover: z.string().nullable(),
  coverAlt: z.string(),
  updatedOn: z.string().optional(),
  updateSummary: z.string().optional(),
  media: z.array(mediaSchema).optional(),
  problem: z.string().min(1),
  solution: z.string().min(1),
  contributions: z.array(z.string()).min(1),
  features: z.array(z.string()).min(1),
  challenges: z.array(z.object({ title: z.string(), description: z.string() })),
  lessons: z.array(z.string()),
  plannedFeatures: z.array(z.string()),
  evidence: z.string().min(1),
});

export const hackathonSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  edition: z.string().min(1),
  organisers: z.array(z.string().min(1)).min(1),
  location: z.string().min(1),
  period: z.string().min(1),
  startDate: z.string().min(1),
  format: z.string().min(1),
  fieldSize: z.string().min(1),
  result: z.string().min(1),
  resultShort: z.string().min(1),
  awardSummary: z.string().min(1),
  summary: z.string().min(1),
  projectName: z.string().min(1),
  projectSlug: z.string().nullable(),
  contributions: z.array(z.string()),
  skills: z.array(z.string()),
  acknowledgement: z.string().optional(),
  certificates: z.array(
    z.object({
      label: z.string(),
      issuer: z.string(),
      image: z.string().nullable(),
      alt: z.string().optional(),
    }),
  ),
  media: z.array(
    z.object({
      type: z.literal('image'),
      src: z.string(),
      alt: z.string(),
      caption: z.string(),
      layout: z.enum(['wide', 'portrait']).optional(),
    }),
  ),
  evidence: z.string().min(1),
});

export const resumeSettingsSchema = z.object({
  /** "generated" renders the PDF from the data below; "uploaded" ships your own file untouched. */
  source: z.enum(['generated', 'uploaded']),
  summary: z.string().min(1),
  projectSlugs: z.array(z.string().min(1)),
  experienceTitles: z.array(z.string().min(1)),
  showHackathon: z.boolean(),
  showCertifications: z.boolean(),
  uploaded: z.object({
    file: z.string().min(1),
    label: z.string().min(1),
    uploadedOn: z.string().nullable(),
  }),
});

/* ------------------------------------------------------------------ parsing */

function load<T extends z.ZodTypeAny>(schema: T, data: unknown, name: string): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  • ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid content in src/data/${name}.json:\n${issues}`);
  }
  return result.data;
}

export type Profile = z.infer<typeof profileSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Hackathon = z.infer<typeof hackathonSchema>;
export type ResumeSettings = z.infer<typeof resumeSettingsSchema>;

export const profile = load(profileSchema, profileJson, 'profile');
export const skillGroups = load(z.array(skillGroupSchema), skillGroupsJson, 'skillGroups');
export const certifications = load(z.array(certificationSchema), certificationsJson, 'certifications');
export const education = load(z.array(educationSchema), educationJson, 'education');
export const experience = load(z.array(experienceSchema), experienceJson, 'experience');
export const qualities = load(z.array(z.tuple([z.string(), z.string()])), qualitiesJson, 'qualities');
export const hackathons = load(z.array(hackathonSchema), hackathonsJson, 'hackathons');
export const projects = load(z.array(projectSchema), projectsJson, 'projects');
export const resumeSettings = load(resumeSettingsSchema, resumeJson, 'resume');

/* ------------------------------------------------------------------ derived */

export const latestHackathon = hackathons[0];
export const featuredProjects = projects.filter((project) => project.featured);

export const whatsappUrl = `https://wa.me/${profile.phone.replace('+', '')}?text=${encodeURIComponent(
  'Hello Leo, I found your portfolio and would like to discuss a software, employment or collaboration opportunity.',
)}`;
