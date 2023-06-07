describe('moveSync', () => {
  const moveSync = require('../../../../../lib/move/move-sync.js');
  const path = require('path');
  const fs = require('graceful-fs');
  const os = require('os');
  const crypto = require('crypto');

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function randomString() {
    return crypto.randomBytes(6).toString('hex');
  }

  test('moveSync_same_file', () => {
    const tempDir = os.tmpdir();
    const file = path.join(tempDir, randomString());
    fs.writeFileSync(file, 'test content');
    expect(() => moveSync(file, file)).toThrowError('Source and destination must not be the same.');
    fs.unlinkSync(file);
  });

  test('moveSync_no_overwrite', () => {
    const tempDir = os.tmpdir();
    const src = path.join(tempDir, randomString());
    const dest = path.join(tempDir, randomString());

    fs.writeFileSync(src, 'test content');
    fs.writeFileSync(dest, 'dest content');
    expect(() => moveSync(src, dest)).toThrowError('dest already exists.');

    fs.unlinkSync(src);
    fs.unlinkSync(dest);
  });

  test('moveSync_overwrite', () => {
    const tempDir = os.tmpdir();
    const src = path.join(tempDir, randomString());
    const dest = path.join(tempDir, randomString());

    fs.writeFileSync(src, 'test content');
    fs.writeFileSync(dest, 'dest content');
    moveSync(src, dest, {overwrite: true});

    expect(fs.existsSync(src)).toBe(false);
    expect(fs.readFileSync(dest, 'utf8')).toBe('test content');

    fs.unlinkSync(dest);
  });

  test('moveSync_dir_case_change', () => {
    const tempDir = os.tmpdir();
    const src = path.join(tempDir, 'Testcase');
    const dest = path.join(tempDir, 'testcase');

    if (fs.existsSync(src)) fs.rmdirSync(src);
    if (fs.existsSync(dest)) fs.rmdirSync(dest);

    fs.mkdirSync(src);
    moveSync(src, dest);

    expect(fs.existsSync(src)).toBe(false);
    expect(fs.existsSync(dest)).toBe(true);

    fs.rmdirSync(dest);
  });

  test('moveSync_file_case_change', () => {
    const tempDir = os.tmpdir();
    const src = path.join(tempDir, 'TestFile.txt');
    const dest = path.join(tempDir, 'testfile.txt');

    fs.writeFileSync(src, 'test content');
    moveSync(src, dest);

    expect(fs.existsSync(src)).toBe(false);
    expect(fs.readFileSync(dest, 'utf8')).toBe('test content');

    fs.unlinkSync(dest);
  });

  test('moveSync_dir_to_uncreated_dir', () => {
    const tempDir = os.tmpdir();
    const src = path.join(tempDir, 'source');
    const dest = path.join(tempDir, 'dest', randomString(), 'dest');

    if (fs.existsSync(src)) fs.rmdirSync(src);

    fs.mkdirSync(src);
    moveSync(src, dest);

    expect(fs.existsSync(src)).toBe(false);
    expect(fs.existsSync(dest)).toBe(true);

    fs.rmdirSync(dest);
    fs.rmdirSync(path.dirname(dest));
  });
});
