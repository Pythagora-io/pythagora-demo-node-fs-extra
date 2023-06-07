const {utimesMillis} = require('../../../../../lib/util/utimes.js');
const fs = require('graceful-fs');
const path = require('path');

jest.mock('graceful-fs');

describe('utimesMillis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('utimesMillis - success', (done) => {
    const testFilePath = path.join(__dirname, 'test.txt');
    fs.open.mockReturnValueOnce(5);
    fs.futimes.mockImplementationOnce((fd, atime, mtime, cb) => cb());
    fs.close.mockImplementationOnce((fd, cb) => cb());

    utimesMillis(testFilePath, 1634567890123, 1634778901234, (err) => {
      expect(err).toBeUndefined();
      expect(fs.open).toHaveBeenCalledWith(testFilePath, 'r+', expect.any(Function));
      expect(fs.futimes).toHaveBeenCalledWith(5, 1634567890123, 1634778901234, expect.any(Function));
      expect(fs.close).toHaveBeenCalledWith(5, expect.any(Function));
      done();
    });
  });

  test('utimesMillis - open error', (done) => {
    const testFilePath = path.join(__dirname, 'test.txt');
    const testError = new Error('open error');
    fs.open.mockImplementationOnce((p, flags, cb) => cb(testError));

    utimesMillis(testFilePath, 1634567890123, 1634778901234, (err) => {
      expect(err).toBe(testError);
      expect(fs.open).toHaveBeenCalledWith(testFilePath, 'r+', expect.any(Function));
      expect(fs.futimes).not.toHaveBeenCalled();
      expect(fs.close).not.toHaveBeenCalled();
      done();
    });
  });
});
