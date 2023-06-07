const { emptyDirSync } = require('../../../../../lib/empty/index.js');
const fs = require('../../../../../lib/fs');
const path = require('path');
const mkdir = require('../../../../../lib/mkdirs');
const remove = require('../../../../../lib/remove');

describe('emptyDirSync', () => {
  test('should empty existing directory', () => {
    const testDir = path.join(__dirname, 'testDir');
    mkdir.mkdirsSync(testDir);
    fs.writeFileSync(path.join(testDir, 'file1.txt'), 'Hello world');

    emptyDirSync(testDir);

    const items = fs.readdirSync(testDir);
    expect(items.length).toBe(0);

    remove.removeSync(testDir);
  });

  test('should create directory if it does not exist', () => {
    const testDir = path.join(__dirname, 'nonExistentDir');

    emptyDirSync(testDir);

    expect(fs.existsSync(testDir)).toBe(true);

    remove.removeSync(testDir);
  });

  test('should not throw error for empty directory', () => {
    const testDir = path.join(__dirname, 'emptyDir');
    mkdir.mkdirsSync(testDir);

    expect(() => emptyDirSync(testDir)).not.toThrow();

    remove.removeSync(testDir);
  });
});
