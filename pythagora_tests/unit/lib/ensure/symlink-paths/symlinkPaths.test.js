describe('symlinkPaths', () => {
  const { symlinkPaths } = require('../../../../../lib/ensure/symlink-paths.js');
  const fs = require('graceful-fs');
  const path = require('path');

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('absolute srcpath exists', (done) => {
    const srcpath = '/absolute/srcpath';
    const dstpath = '/dstpath';
    const expectedResult = {
      toCwd: srcpath,
      toDst: srcpath,
    };

    jest.spyOn(fs, 'lstat').mockImplementation((_, cb) => {
      cb(null, {});
    });

    symlinkPaths(srcpath, dstpath, (err, result) => {
      expect(fs.lstat).toHaveBeenCalledWith(srcpath, expect.any(Function));
      expect(result).toEqual(expectedResult);
      done();
    });
  });

  test('absolute srcpath does not exist', (done) => {
    const srcpath = '/absolute/srcpath';
    const dstpath = '/dstpath';

    jest.spyOn(fs, 'lstat').mockImplementation((_, cb) => {
      cb(new Error('lstat error message'));
    });

    symlinkPaths(srcpath, dstpath, (err, _) => {
      expect(fs.lstat).toHaveBeenCalledWith(srcpath, expect.any(Function));
      expect(err.message).toContain('ensureSymlink');
      done();
    });
  });

  test('relative srcpath does not exist on filesystem, does not exist in cwd', (done) => {
    const srcpath = 'srcpath';
    const dstpath = '/dstpath';
    const dstdir = '/';

    jest.spyOn(fs, 'lstat').mockImplementation((_, cb) => {
      cb(new Error('lstat error message'));
    });

    symlinkPaths(srcpath, dstpath, (err, _) => {
      expect(fs.lstat).toHaveBeenCalledWith(srcpath, expect.any(Function));
      expect(err.message).toContain('ensureSymlink');
      done();
    });
  });
});
