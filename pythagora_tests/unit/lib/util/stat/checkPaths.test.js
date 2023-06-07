describe('checkPaths tests', () => {
  const { checkPaths } = require('../../../../../lib/util/stat.js');
  const fs = require('fs-extra');
  const path = require('path');
  const os = require('os');
  let src, dest, srcFile;

  beforeEach(() => {
    src = path.join(os.tmpdir(), 'src');
    srcFile = path.join(src, 'file.txt');
    dest = path.join(os.tmpdir(), 'dest');
  });

  afterEach(() => {
    if (fs.existsSync(dest)) {
      fs.removeSync(dest);
    }

    if (fs.existsSync(src)) {
      fs.removeSync(src);
    }
  });

  test('Identical paths for source and destination throws error', (done) => {
    fs.mkdirSync(src);
    fs.writeFileSync(srcFile, 'Hello, World!');

    checkPaths(srcFile, srcFile, 'copy', {}, (err, stats) => {
      expect(err).toBeDefined();
      expect(err.message).toBe('Source and destination must not be the same.');
      done();
    });
  });

  test('Throws error when attempting to overwrite non-directory with a directory', (done) => {
    fs.mkdirSync(src);
    fs.writeFileSync(srcFile, 'Hello, World!');
    fs.writeFileSync(dest, 'Hello, World!');

    checkPaths(src, dest, 'copy', {}, (err, stats) => {
      expect(err).toBeDefined();
      expect(err.message).toBe(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
      done();
    });
  });

  test('Throws error when attempting to overwrite directory with non-directory', (done) => {
    fs.mkdirSync(src);
    fs.writeFileSync(srcFile, 'Hello, World!');
    fs.mkdirSync(dest);

    checkPaths(srcFile, dest, 'copy', {}, (err, stats) => {
      expect(err).toBeDefined();
      expect(err.message).toBe(`Cannot overwrite directory '${dest}' with non-directory '${srcFile}'.`);
      done();
    });
  });

  test('Throws error when attempting to move file into its own subdir', (done) => {
    const subDest = path.join(src, 'subdir');
    fs.mkdirSync(src);
    fs.mkdirSync(subDest);
    fs.writeFileSync(srcFile, 'Hello, World!');

    checkPaths(srcFile, subDest, 'move', {}, (err, stats) => {
      expect(err).toBeDefined();
      expect(err.message).toBe(`Cannot overwrite directory '${subDest}' with non-directory '${srcFile}'.`);
      done();
    });
  });

  test('Successful checkPaths call with a file', (done) => {
    fs.mkdirSync(src);
    fs.writeFileSync(srcFile, 'Hello, World!');

    checkPaths(srcFile, dest, 'copy', {}, (err, stats) => {
      expect(err).toBeNull();
      expect(stats.srcStat).toBeDefined();
      expect(stats.srcStat.isFile()).toBeTruthy();
      expect(stats.destStat).toBeNull();
      done();
    });
  });

  test('Successful checkPaths call with changing case', (done) => {
    if (process.platform !== 'win32') {
      return done();
    }

    const destCaseChanged = path.join(os.tmpdir(), 'dEsT');
    fs.mkdirSync(src);
    fs.writeFileSync(srcFile, 'Hello, World!');

    checkPaths(src, destCaseChanged, 'move', {}, (err, stats) => {
      expect(err).toBeNull();
      expect(stats.isChangingCase).toBeTruthy();
      done();
    });
  });
});
