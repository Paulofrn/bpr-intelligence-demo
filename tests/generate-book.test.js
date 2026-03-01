const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SCRIPT = path.join(ROOT, 'bpr-project', 'src', 'create-book.js');
const OUTPUT_DIR = path.join(ROOT, 'bpr-project', 'outputs', 'docx');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'BPR-Intelligence-Blueprint-Estrategico.docx');

describe('Blueprint DOCX Generator (create-book.js)', () => {
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
    expect(result).toContain('Documento gerado com sucesso');
  });

  test('generates DOCX output file', () => {
    expect(fs.existsSync(OUTPUT_FILE)).toBe(true);
  });

  test('output file is a valid DOCX (ZIP-based format)', () => {
    const buffer = fs.readFileSync(OUTPUT_FILE);
    // DOCX files are ZIP archives — magic bytes: PK (0x50, 0x4B)
    expect(buffer[0]).toBe(0x50);
    expect(buffer[1]).toBe(0x4b);
  });

  test('output file has reasonable size (>50KB for 80+ page doc)', () => {
    const stats = fs.statSync(OUTPUT_FILE);
    expect(stats.size).toBeGreaterThan(50 * 1024);
  });

  test('output file was regenerated (newer mtime)', () => {
    if (originalMtime) {
      const newMtime = fs.statSync(OUTPUT_FILE).mtimeMs;
      expect(newMtime).toBeGreaterThanOrEqual(originalMtime);
    }
  });
});

describe('Blueprint DOCX — Source Code Validation', () => {
  let source;

  beforeAll(() => {
    source = fs.readFileSync(SCRIPT, 'utf-8');
  });

  test('defines required design system constants', () => {
    expect(source).toContain('const COLORS');
    expect(source).toContain('const FONTS');
  });

  test('includes all 10 main sections', () => {
    const sectionKeywords = [
      'Executive Summary',
      'Diagnóstico',
      'Augmented Advisory',
      'Arquitetura',
      'Roadmap',
      'Financeiro',
      'Playbook',
      'Governança',
      'Pacote BPR',
      'Call-to-Action',
    ];
    for (const keyword of sectionKeywords) {
      expect(source).toContain(keyword);
    }
  });

  test('does not contain investor round language', () => {
    // Terms specific to fundraising rounds, not general financial terms
    const fundraisingTerms = ['pre-money', 'post-money', 'cap table', 'diluição', 'rodada seed', 'série a'];
    for (const term of fundraisingTerms) {
      expect(source.toLowerCase()).not.toContain(term.toLowerCase());
    }
  });

  test('uses calibrated claims (not raw/unverified numbers)', () => {
    // Crystal Ball should NOT claim 99.2% or exact percentages
    expect(source).not.toContain('99,2%');
    expect(source).not.toContain('99.2%');
  });
});
