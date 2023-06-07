const {symlinkPathsSync} = require('../../../../../lib/ensure/symlink-paths.js');
const fs = require('graceful-fs');
const path = require('path');

describe('symlinkPathsSync', () => {
  it("should return correct object for an existing absolute srcpath", () => {
    const absPath = path.resolve(__dirname, 'testfile1.txt');
    fs.writeFileSync(absPath, 'test');
    const result = symlinkPathsSync(absPath, 'testfile2.txt');
    expect(result).toEqual({ toCwd: absPath, toDst: absPath });
    fs.unlinkSync(absPath);
  });

  it("should throw an error for a non-existing absolute srcpath", () => {
    const absPath = path.resolve(__dirname, 'nonexistant.txt');
    expect(() => symlinkPathsSync(absPath, 'testfile2.txt')).toThrowError('absolute srcpath does not exist');
  });

  it("should return correct object for a relative srcpath that is relative to the destination", () => {
    fs.writeFileSync('testfile1.txt', 'test');
    const result = symlinkPathsSync('testfile1.txt', 'testdir/testfile2.txt');
    expect(result).toEqual({ toCwd: 'testfile1.txt', toDst: '../testfile1.txt' });
    fs.unlinkSync('testfile1.txt');
  });

  it("should throw an error for a non-existing relative srcpath", () => {
    expect(() => symlinkPathsSync('nonexisting.txt', 'testfile2.txt')).toThrowError('relative srcpath does not exist');
  });
});
