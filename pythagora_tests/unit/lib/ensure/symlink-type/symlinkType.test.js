describe('symlinkType function', () => {
  const { symlinkType } = require('../../../../../lib/ensure/symlink-type.js');
  const fs = require('graceful-fs');

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call callback with type when provided', () => {
    const callback = jest.fn();
    symlinkType('somePath', 'someType', callback);
    expect(callback).toHaveBeenCalledWith(null, 'someType');
  });

  test('should call lstat and return file type when lstat returns an error', () => {
    const callback = jest.fn();
    jest.spyOn(fs, 'lstat').mockImplementation((_, cb) => cb(new Error()));
    symlinkType('somePath', callback);
    expect(callback).toHaveBeenCalledWith(null, 'file');
  });

  test('should call lstat and return dir based on lstat result', () => {
    const callback = jest.fn();
    const fakeStats = { isDirectory: () => true };
    jest.spyOn(fs, 'lstat').mockImplementation((_, cb) => cb(null, fakeStats));
    symlinkType('somePath', callback);
    expect(callback).toHaveBeenCalledWith(null, 'dir');
  });

  test('should call lstat and return file based on lstat result', () => {
    const callback = jest.fn();
    const fakeStats = { isDirectory: () => false };
    jest.spyOn(fs, 'lstat').mockImplementation((_, cb) => cb(null, fakeStats));
    symlinkType('somePath', callback);
    expect(callback).toHaveBeenCalledWith(null, 'file');
  });
});