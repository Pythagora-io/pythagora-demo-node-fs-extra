const { createSymlinkSync } = require('../../../../../lib/ensure/symlink.js');
const { areIdentical } = require('../../../../../lib/util/stat.js');
const fs = require('fs');
const path = require('path');
const os = require('os');

describe('createSymlinkSync', () => {
  const tempDir = path.join(os.tmpdir(), 'create-symlink-sync-test');
  const srcFile = path.join(tempDir, 'src.txt');
  const dstFile = path.join(tempDir, 'dst.txt');
  const dstFileNested = path.join(tempDir, 'nested', 'dst.txt');
  const type = 'file';

  beforeEach(() => {
    fs.mkdirSync(tempDir);
    fs.writeFileSync(srcFile, 'This is a test');
  });

  afterEach(() => {
    fs.rmdirSync(tempDir, { recursive: true });
  });

  test('creates symlink between existing src and dst files', () => {
    const srcStat = fs.statSync(srcFile);
    createSymlinkSync(srcFile, dstFile, type);
    const dstStat = fs.statSync(dstFile);
    expect(areIdentical(srcStat, dstStat)).toBe(true);
  });

  test('creates symlink when dst file is in a nested directory', () => {
    const srcStat = fs.statSync(srcFile);
    createSymlinkSync(srcFile, dstFileNested, type);
    const dstStat = fs.statSync(dstFileNested);
    expect(areIdentical(srcStat, dstStat)).toBe(true);
  });

  test('throws error when type is wrong', () => {
    expect(() => createSymlinkSync(srcFile, dstFile, 'wrong')).toThrow();
  });

  test('retains existing symlink if identical', () => {
    createSymlinkSync(srcFile, dstFile, type);
    const initialLink = fs.readlinkSync(dstFile);
    createSymlinkSync(srcFile, dstFile, type);
    const newLink = fs.readlinkSync(dstFile);
    expect(newLink).toBe(initialLink);
  });
});
