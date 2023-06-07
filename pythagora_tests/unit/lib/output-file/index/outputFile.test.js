describe('outputFile', () => {
  const { outputFile } = require('../../../../../lib/output-file/index.js');
  const fs = require('graceful-fs');
  const path = require('path');
  const mkdir = require('../../../../../lib/mkdirs');
  const pathExists = require('../../../../../lib/path-exists/').pathExists;
  jest.mock('graceful-fs');
  jest.mock('../../../../../lib/mkdirs');
  jest.mock('../../../../../lib/path-exists/');
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fs.writeFile is called with correct arguments when dir exists', (done) => {
    pathExists.mockImplementationOnce((dir, cb) => cb(null, true));
    fs.writeFile.mockImplementationOnce((file, data, encoding, cb) => cb(null));
    
    outputFile('test/output.txt', 'test data', 'utf8', (err) => {
      expect(err).toBeNull();
      expect(fs.writeFile).toHaveBeenCalledWith('test/output.txt', 'test data', 'utf8', expect.any(Function));
      done();
    });
  });

  test('mkdirs is called and then fs.writeFile is called when dir does not exist', (done) => {
    pathExists.mockImplementationOnce((dir, cb) => cb(null, false));
    mkdir.mkdirs.mockImplementationOnce((dir, cb) => cb(null));
    fs.writeFile.mockImplementationOnce((file, data, encoding, cb) => cb(null));
    
    outputFile('test/output.txt', 'test data', 'utf8', (err) => {
      expect(err).toBeNull();
      expect(mkdir.mkdirs).toHaveBeenCalledWith(path.dirname('test/output.txt'), expect.any(Function));
      expect(fs.writeFile).toHaveBeenCalledWith('test/output.txt', 'test data', 'utf8', expect.any(Function));
      done();
    });
  });

  test('outputFile propagates error from pathExists', (done) => {
    const testError = new Error('Path test error');
    pathExists.mockImplementationOnce((dir, cb) => cb(testError));
    
    outputFile('test/output.txt', 'test data', 'utf8', (err) => {
      expect(err).toEqual(testError);
      expect(fs.writeFile).toHaveBeenCalledTimes(0);
      done();
    });
  });

  test('outputFile propagates error from mkdirs', (done) => {
    const testError = new Error('Mkdir test error');
    pathExists.mockImplementationOnce((dir, cb) => cb(null, false));
    mkdir.mkdirs.mockImplementationOnce((dir, cb) => cb(testError));
    
    outputFile('test/output.txt', 'test data', 'utf8', (err) => {
      expect(err).toEqual(testError);
      expect(fs.writeFile).toHaveBeenCalledTimes(0);
      done();
    });
  });

  test('outputFile propagates error from fs.writeFile', (done) => {
    const testError = new Error('File writing test error');
    pathExists.mockImplementationOnce((dir, cb) => cb(null, true));
    fs.writeFile.mockImplementationOnce((file, data, encoding, cb) => cb(testError));
    
    outputFile('test/output.txt', 'test data', 'utf8', (err) => {
      expect(err).toEqual(testError);
      done();
    });
  });

  test('outputFile uses default utf8 encoding when not provided', (done) => {
    pathExists.mockImplementationOnce((dir, cb) => cb(null, true));
    fs.writeFile.mockImplementationOnce((file, data, encoding, cb) => cb(null));
    
    outputFile('test/output.txt', 'test data', (err) => {
      expect(err).toBeNull();
      expect(fs.writeFile).toHaveBeenCalledWith('test/output.txt', 'test data', 'utf8', expect.any(Function));
      done();
    });
  });
});