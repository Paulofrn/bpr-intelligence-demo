const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SCRIPT = path.join(ROOT, 'bpr-project', 'src', 'create-pitch-deck.js');
const OUTPUT_DIR = path.join(ROOT, 'bpr-project', 'outputs', 'pptx');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'BPR-Intelligence-Pitch-Deck.pptx');

describe('Pitch Deck PPTX Generator (create-pitch-deck.js)', () => {
  let originalMtime;

  beforeAll(() => {
    if (fs.existsSync(OUTPUT_FILE)) {
      originalMtime = fs.statSync(OUTPUT_FILE).mtimeMs;
    }
  });

  test('script executes without errors', () => {
    const result = execSync(`node "${SCRIPT}"`, {
      cwd: path.join(ROOT, 'bpr-project', 'src'),
      timeout: 30000,
      encoding: 'utf-8',
    });
    expect(result).toContain('Pitch Deck gerado com sucesso');
  });

  test('generates PPTX output file', () => {
    expect(fs.existsSync(OUTPUT_FILE)).toBe(true);
  });

  test('output file is a valid PPTX (ZIP-based format)', () => {
    const buffer = fs.readFileSync(OUTPUT_FILE);
    // PPTX files are ZIP archives — magic bytes: PK (0x50, 0x4B)
    expect(buffer[0]).toBe(0x50);
    expect(buffer[1]).toBe(0x4b);
  });

  test('output file has reasonable size (>100KB for 25 slides)', () => {
    const stats = fs.statSync(OUTPUT_FILE);
    expect(stats.size).toBeGreaterThan(100 * 1024);
  });

  test('output file was regenerated (newer mtime)', () => {
    if (originalMtime) {
      const newMtime = fs.statSync(OUTPUT_FILE).mtimeMs;
      expect(newMtime).toBeGreaterThanOrEqual(originalMtime);
    }
  });
});

describe('Pitch Deck PPTX — Source Code Validation', () => {
  let source;

  beforeAll(() => {
    source = fs.readFileSync(SCRIPT, 'utf-8');
  });

  test('defines design system constants', () => {
    expect(source).toContain('const COLORS');
    expect(source).toContain('const FONT');
  });

  test('includes all 25 slide functions', () => {
    for (let i = 1; i <= 25; i++) {
      const padded = i < 10 ? `0${i}` : `${i}`;
      const pattern = new RegExp(`slide${padded}_|slide${i}_`);
      expect(source).toMatch(pattern);
    }
  });

  test('implements 4-act storytelling structure', () => {
    expect(source).toContain('ATO 1');
    expect(source).toContain('ATO 2');
    expect(source).toContain('ATO 3');
    expect(source).toContain('ATO 4');
  });

  test('does not contain investor-focused language', () => {
    const investorTerms = ['pre-money', 'post-money', 'cap table', 'equity', 'diluição'];
    for (const term of investorTerms) {
      expect(source.toLowerCase()).not.toContain(term.toLowerCase());
    }
  });
});
