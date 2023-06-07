const { remove } = require('../../../../../lib/remove/index.js');
const fs = require('graceful-fs');
const os = require('os');
const path = require('path');

describe('remove', () => {
  const testFileName = 'testFile.txt';
  const testFolderName = 'testFolder';

  beforeEach(() => {
    fs.writeFileSync(path.join(os.tmpdir(), testFileName), 'test content');
  });

  afterEach(() => {
    try {
      fs.rmSync(path.join(os.tmpdir(), testFileName), { force: true });
    } catch (err) {}
    try {
      fs.rmSync(path.join(os.tmpdir(), testFolderName), { recursive: true, force: true });
    } catch (err) {}
  });

  test('should remove a file', async () => {
    await remove(path.join(os.tmpdir(), testFileName));
    expect(fs.existsSync(path.join(os.tmpdir(), testFileName))).toBe(false);
  });

  test('should remove a directory', async () => {
    fs.mkdirSync(path.join(os.tmpdir(), testFolderName));
    await remove(path.join(os.tmpdir(), testFolderName));
    expect(fs.existsSync(path.join(os.tmpdir(), testFolderName))).toBe(false);
  });

  test('should remove empty directory', async () => {
    fs.mkdirSync(path.join(os.tmpdir(), testFolderName));
    await remove(path.join(os.tmpdir(), testFolderName));
    expect(fs.existsSync(path.join(os.tmpdir(), testFolderName))).toBe(false);
  });
});
