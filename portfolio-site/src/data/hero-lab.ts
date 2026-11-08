/**
 * The program the hero lab displays and executes — one source of truth for the
 * rendered code, the word-to-line map and the strings sent to the worker.
 */
export const heroProgramLines = [
  'mulimo matalikilo() {',
  '    zina a = 12',
  '    zina b = 8',
  '    amba(a + b)',
  '    amba(a * b)',
  '}',
] as const;

export const heroProgram = heroProgramLines.join('\n');

export const heroWords = [
  {
    word: 'mulimo',
    gloss: 'function',
    lines: [0],
    note: 'mulimo matalikilo() opens the main function the interpreter runs first.',
  },
  {
    word: 'zina',
    gloss: 'declare a variable',
    lines: [1, 2],
    note: 'zina binds a name to a value — here two numbers, twelve and eight.',
  },
  {
    word: 'amba()',
    gloss: 'print a value',
    lines: [3, 4],
    note: 'amba() writes to the program output: the sum, then the product.',
  },
] as const;
