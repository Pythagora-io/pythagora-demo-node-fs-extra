const {utimesMillis} = require('../../../../../lib/util/utimes.js');
const fs = require('graceful-fs');
const path = require('path');

jest.mock('graceful-fs');

describe('utimesMillis', () => {
  afterEach(() => {
    jest.clearAllMocks();
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
