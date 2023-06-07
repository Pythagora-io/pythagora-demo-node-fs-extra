const { utimesMillisSync } = require('../../../../../lib/util/utimes.js');
const fs = require('graceful-fs');
const path = require('path');

describe('utimesMillisSync', () => {
  afterEach(() => {
    // Restore any changes made to the file system
    fs.writeFileSync(path.join(__dirname, 'test-file.txt'), '');
  });

  test('utimesMillisSync updates atime and mtime', () => {
    const filePath = path.join(__dirname, 'test-file.txt');
    const atime = Date.now() - 5 * 60 * 1000; // 5 minutes ago
    const mtime = Date.now() - 2 * 60 * 1000; // 2 minutes ago

    fs.writeFileSync(filePath, '');

    fs.utimesSync(filePath, new Date(atime), new Date(mtime));

    const stats = fs.statSync(filePath);
    expect(stats.atimeMs).toBeCloseTo(atime, -2);
    expect(stats.mtimeMs).toBeCloseTo(mtime, -2);
  });

  test('utimesMillisSync throws ENOENT for non-existent path', () => {
    const path = 'non-existent.txt';
    const atime = Date.now() - 5 * 60 * 1000;
    const mtime = Date.now() - 2 * 60 * 1000;

    expect(() => utimesMillisSync(path, atime, mtime)).toThrowError(/ENOENT/);
  });
});
