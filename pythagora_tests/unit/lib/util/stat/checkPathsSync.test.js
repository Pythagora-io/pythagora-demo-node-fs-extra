describe('checkPathsSync', () => {
  const { checkPathsSync } = require('../../../../../lib/util/stat.js');
  const fs = require('../../../../../lib/fs');
  const path = require('path');
  const os = require('os');

  beforeAll(() => {
    // Create temporary directory and files for testing
    this.tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    this.srcFile = path.join(this.tempDir, 'srcFile');
    this.destFile = path.join(this.tempDir, 'destFile');
    this.srcDir = path.join(this.tempDir, 'srcDir');
    this.destDir = path.join(this.tempDir, 'destDir');
    fs.writeFileSync(this.srcFile, 'src content');
    fs.writeFileSync(this.destFile, 'dest content');
    fs.mkdirSync(this.srcDir);
    fs.mkdirSync(this.destDir);
  });

  afterAll(() => {
    // Cleanup temporary directory and files
    fs.rmdirSync(this.tempDir, { recursive: true });
  });

  test("fs.statSync(this.srcFile).isFile()", () => {
    expect(fs.statSync(this.srcFile).isFile()).toBe(true);
  });

  test("fs.statSync(this.destFile).isFile()", () => {
    expect(fs.statSync(this.destFile).isFile()).toBe(true);
  });

  test("fs.statSync(this.srcDir).isDirectory()", () => {
    expect(fs.statSync(this.srcDir).isDirectory()).toBe(true);
  });

  test("fs.statSync(this.destDir).isDirectory()", () => {
    expect(fs.statSync(this.destDir).isDirectory()).toBe(true);
  });

  test("checkPathsSync(this.srcFile, this.srcFile, 'copy', {dereference: true})", () => {
    expect(() => checkPathsSync(this.srcFile, this.srcFile, 'copy', { dereference: true })).toThrow('Source and destination must not be the same.');
  });

  test("checkPathsSync(this.srcDir, this.destFile, 'move', {dereference: true})", () => {
    expect(() => checkPathsSync(this.srcDir, this.destFile, 'move', { dereference: true })).toThrow("Cannot overwrite non-directory '" + this.destFile + "' with directory '" + this.srcDir + "'.");
  });

  test("checkPathsSync(this.srcFile, this.destDir, 'copy', {dereference: false})", () => {
    expect(() => checkPathsSync(this.srcFile, this.destDir, 'copy', { dereference: false })).toThrow("Cannot overwrite directory '" + this.destDir + "' with non-directory '" + this.srcFile + "'.");
  });
});
