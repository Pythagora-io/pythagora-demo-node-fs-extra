const { createLink } = require('../../../../../lib/ensure/link.js');
const fs = require('graceful-fs');
const mkdir = require('../../../../../lib/mkdirs');
const pathExists = require('../../../../../lib/path-exists').pathExists;
const { areIdentical } = require('../../../../../lib/util/stat');
const path = require('path');

describe('createLink', () => {
  test('creates link for file', done => {
    const srcPath = 'testSrcFile.txt';
    const dstPath = 'testDstFile.txt';

    fs.writeFileSync(srcPath, 'Test content');
    createLink(srcPath, dstPath, err => {
      expect(err).toBeNull();

      const srcStat = fs.lstatSync(srcPath);
      const dstStat = fs.lstatSync(dstPath);
      expect(areIdentical(srcStat, dstStat)).toBe(true);

      fs.unlinkSync(srcPath);
      fs.unlinkSync(dstPath);
      done();
    });
  });

  test('creates link for non-existent srcpath file', done => {
    const srcPath = './nonexistentsrcpath.txt';
    const dstPath = 'testDstFile.txt';

    createLink(srcPath, dstPath, err => {
      expect(err).toBeDefined();

      pathExists(dstPath, (err, exists) => {
        expect(err).toBeNull();
        expect(exists).toBe(false);
        done();
      });
    });
  });
});
