describe('createFileSync', () => {
  const { createFileSync } = require('../../../../../lib/ensure/file.js');
  const fs = require('graceful-fs');
  const path = require('path');
  const os = require('os');
  const mkdirsSync = require('../../../../../lib/mkdirs').mkdirsSync;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('creates a new file successfully', () => {
    const file = path.join(os.tmpdir(), 'testfile.txt');
    createFileSync(file);
    const stats = fs.statSync(file);
    expect(stats.isFile()).toBeTruthy();
  });

  test('does not create a file if one already exists', () => {
    const file = path.join(os.tmpdir(), 'testfile.txt');
    fs.writeFileSync(file, 'test content');
    createFileSync(file);
    const content = fs.readFileSync(file, 'utf-8');
    expect(content).toBe('test content');
  });

  test('throws ENOTDIR error if parent is not a directory', () => {
    const parent = path.join(os.tmpdir(), 'not-a-directory');
    fs.writeFileSync(parent, 'not a dir');
    const file = path.join(parent, 'testfile.txt');
    expect(() => createFileSync(file)).toThrow('ENOTDIR');
  });

  test('creates parent directory if it does not exist', () => {
    const parent = path.join(os.tmpdir(), 'nonexistent');
    const file = path.join(parent, 'testfile.txt');
    createFileSync(file);
    const stats = fs.statSync(parent);
    expect(stats.isDirectory()).toBeTruthy();
  });

  test('creates an empty file', () => {
    const file = path.join(os.tmpdir(), 'testfileempty.txt');
    createFileSync(file);
    const content = fs.readFileSync(file, 'utf-8');
    expect(content).toBe('');
  });
});
