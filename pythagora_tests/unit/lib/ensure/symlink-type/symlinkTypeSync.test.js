const {symlinkTypeSync} = require('../../../../../lib/ensure/symlink-type.js');
const fs = require('graceful-fs');

describe('symlinkTypeSync', () => {
  test('returns file type for file', () => {
    jest.spyOn(fs, 'lstatSync').mockReturnValue({ isDirectory: () => false });
    expect(symlinkTypeSync('file.txt')).toBe('file');
    fs.lstatSync.mockRestore();
  });

  test('returns dir type for directory', () => {
    jest.spyOn(fs, 'lstatSync').mockReturnValue({ isDirectory: () => true });
    expect(symlinkTypeSync('dir')).toBe('dir');
    fs.lstatSync.mockRestore();
  });

  test('returns type parameter when provided', () => {
    jest.spyOn(fs, 'lstatSync');
    expect(symlinkTypeSync('file.txt', 'dir')).toBe('dir');
    expect(fs.lstatSync).not.toHaveBeenCalled();
    fs.lstatSync.mockRestore();
  });

  test('returns file type when exception occurs', () => {
    jest.spyOn(fs, 'lstatSync').mockImplementation(() => {
      throw new Error('Error');
    });
    expect(symlinkTypeSync('nonexistent.txt')).toBe('file');
    fs.lstatSync.mockRestore();
  });
});
