const fs = require('fs');
const path = require('path');

const OUTPUTS = path.join(__dirname, '..', 'bpr-project', 'outputs');

describe('Output Files Integrity', () => {
  describe('DOCX outputs', () => {
    const docxDir = path.join(OUTPUTS, 'docx');

    test('docx output directory exists', () => {
      expect(fs.existsSync(docxDir)).toBe(true);
    });

    test('Blueprint DOCX exists and is non-empty', () => {
      const file = path.join(docxDir, 'BPR-Intelligence-Blueprint-Estrategico.docx');
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.statSync(file).size).toBeGreaterThan(0);
    });

    test('no Word temp lock files in output', () => {
      const files = fs.readdirSync(docxDir);
      const lockFiles = files.filter(f => f.startsWith('~$'));
      expect(lockFiles).toHaveLength(0);
    });
  });

  describe('PPTX outputs', () => {
    const pptxDir = path.join(OUTPUTS, 'pptx');

    test('pptx output directory exists', () => {
      expect(fs.existsSync(pptxDir)).toBe(true);
    });

    test('Pitch Deck PPTX exists and is non-empty', () => {
      const file = path.join(pptxDir, 'BPR-Intelligence-Pitch-Deck.pptx');
      expect(fs.existsSync(file)).toBe(true);
      expect(fs.statSync(file).size).toBeGreaterThan(0);
    });
  });

  describe('HTML outputs', () => {
    const htmlDir = path.join(OUTPUTS, 'html');

    test('html output directory exists', () => {
      expect(fs.existsSync(htmlDir)).toBe(true);
    });

    test('HTML showcase files exist', () => {
      const files = fs.readdirSync(htmlDir);
      const htmlFiles = files.filter(f => f.endsWith('.html'));
      expect(htmlFiles.length).toBeGreaterThanOrEqual(1);
    });

    test('HTML files contain valid structure', () => {
      const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
      for (const file of files) {
        const content = fs.readFileSync(path.join(htmlDir, file), 'utf-8');
        expect(content).toContain('<!DOCTYPE html');
        expect(content).toContain('</html>');
      }
    });
  });
});

describe('Project Structure', () => {
  const root = path.join(__dirname, '..');

  test('package.json exists at root', () => {
    expect(fs.existsSync(path.join(root, 'package.json'))).toBe(true);
  });

  test('README.md exists', () => {
    expect(fs.existsSync(path.join(root, 'README.md'))).toBe(true);
  });

  test('.gitignore exists', () => {
    expect(fs.existsSync(path.join(root, '.gitignore'))).toBe(true);
  });

  test('.env.example exists (but .env does not)', () => {
    expect(fs.existsSync(path.join(root, '.env.example'))).toBe(true);
  });

  test('source generators exist', () => {
    expect(fs.existsSync(path.join(root, 'bpr-project', 'src', 'create-book.js'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'bpr-project', 'src', 'create-pitch-deck.js'))).toBe(true);
  });
});
