describe('createFile tests', () => {
  const { createFile } = require('../../../../../lib/ensure/file.js');
  const fs = require('graceful-fs');
  const path = require('path');
  const fse = require('fs-extra');
  const os = require('os');
  const tmpDir = path.join(os.tmpdir(), 'test-create-file');

  beforeEach(() => {
    return fse.remove(tmpDir);
  });

  test('creates a new file', () => {
    const filepath = path.join(tmpDir, 'foo.txt');

    return createFile(filepath).then(() => {
      return fs.promises.stat(filepath);
    });
  });

  test('creates directories for nested files', () => {
    const filepath = path.join(tmpDir, 'nested', 'file.txt');

    return createFile(filepath).then(() => {
      return fs.promises.stat(filepath);
    });
  });

  test('returns an error if parent is not a directory', () => {
    const notDirPath = path.join(tmpDir);
    const filepath = path.join(notDirPath, 'file.txt');

    return fs.promises.writeFile(notDirPath, '').then(() => {
      return createFile(filepath);
    }).catch(err => {
      expect(err).toBeDefined();
      expect(err.code).toBe('ENOTDIR');
    });
  });
});
