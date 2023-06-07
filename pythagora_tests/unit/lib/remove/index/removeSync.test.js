const { removeSync } = require('../../../../../lib/remove/index.js');
const fs = require('graceful-fs');
const os = require('os');
const path = require('path');

describe('removeSync', () => {
  const testFilePath = path.join(os.tmpdir(), 'test-file.txt');
  const testDirPath = path.join(os.tmpdir(), 'test-dir');
  
  beforeEach(() => {
    fs.writeFileSync(testFilePath, 'Hello, world!');
    fs.mkdirSync(testDirPath, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testFilePath)) {
      fs.rmSync(testFilePath, { force: true });
    }
    if (fs.existsSync(testDirPath)) {
      fs.rmSync(testDirPath, { recursive: true, force: true });
    }
  });

  test('removeSync file', () => {
    removeSync(testFilePath);
    expect(fs.existsSync(testFilePath)).toBeFalsy();
  });

  test('removeSync directory', () => {
    removeSync(testDirPath);
    expect(fs.existsSync(testDirPath)).toBeFalsy();
  });

  test('removeSync non-existent path', () => {
    const nonExistentPath = path.join(os.tmpdir(), 'non-existent-path');
    expect(() => removeSync(nonExistentPath)).not.toThrow();
  });

  test('removeSync symlink', () => {
    const symlinkPath = path.join(os.tmpdir(), 'test-symlink');
    fs.symlinkSync(testFilePath, symlinkPath);
    removeSync(symlinkPath);
    expect(fs.existsSync(symlinkPath)).toBeFalsy();
  });

  test('removeSync non-empty directory', () => {
    const nestedFilePath = path.join(testDirPath, 'nested-file.txt');
    fs.writeFileSync(nestedFilePath, 'Nested file');
    removeSync(testDirPath);
    expect(fs.existsSync(testDirPath)).toBeFalsy();
  });
});
