describe('copy', () => {
  const path = require('path');
  const os = require('os');
  const copy = require('../../../../../lib/copy/copy.js');
  const fs = require('graceful-fs');

  test('copy non-existent source', done => {
    const src = 'non-existent';
    const dest = 'temp-copy/non-existent';
    copy(src, dest, {}, err => {
      expect(err).toBeTruthy();
      expect(err.code).toBe('ENOENT');
      done();
    });
  });

  test('copy file to itself', done => {
    const src = 'temp-file.txt';
    const dest = 'temp-file.txt';
    copy(src, dest, {}, err => {
      expect(err).toBeTruthy();
      done();
    });
  });

  test('copy with filter promise error', done => {
    const src = fs.mkdtempSync(os.tmpdir());
    const dest = path.join(os.tmpdir(), 'temp-filter-error-dest');
    const filter = () => Promise.reject(new Error('mocked filter error'));
    copy(src, dest, { filter }, err => {
      expect(err).toBeTruthy();
      expect(err.message).toBe('mocked filter error');
      done();
    });
  });
});
