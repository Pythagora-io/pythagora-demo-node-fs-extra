const fs = require('fs');
const { areIdentical } = require('../../../../../lib/util/stat.js');

describe('areIdentical', () => {
  test('should return true if inodes and devices are the same', () => {
    const srcStat = fs.statSync(__filename);
    const destStat = fs.statSync(__filename);
    const result = areIdentical(srcStat, destStat);
    expect(result).toBe(true);
  });

  test('should return false if inodes are different', () => {
    const srcStat = fs.statSync(__filename);
    const destStat = { ...srcStat, ino: srcStat.ino + 1 };
    const result = areIdentical(srcStat, destStat);
    expect(result).toBe(false);
  });

  test('should return false if devices are different', () => {
    const srcStat = fs.statSync(__filename);
    const destStat = { ...srcStat, dev: srcStat.dev + 1 };
    const result = areIdentical(srcStat, destStat);
    expect(result).toBe(false);
  });

  test('should return false if inodes and devices are different', () => {
    const srcStat = fs.statSync(__filename);
    const destStat = { ...srcStat, ino: srcStat.ino + 1, dev: srcStat.dev + 1 };
    const result = areIdentical(srcStat, destStat);
    expect(result).toBe(false);
  });

  test('should return false if destStat is missing ino and/or dev properties', () => {
    const srcStat = fs.statSync(__filename);
    const destStat = {};
    const result = areIdentical(srcStat, destStat);
    expect(result).toBe(false);
  });
});
