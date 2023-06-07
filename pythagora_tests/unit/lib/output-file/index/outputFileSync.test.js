const fs = require('fs');
const path = require('path');
const {outputFileSync} = require('../../../../../lib/output-file/index.js');

describe('outputFileSync', () => {

  test('writes file when dir exists', () => {
    const filePath = path.join('testDirectory', 'existingDirFile.txt');

    outputFileSync(filePath, 'content');
    const result = fs.readFileSync(filePath, 'utf8');

    expect(result).toBe('content');
  });

  test('writes file when dir does not exist', () => {
    const filePath = path.join('testDirectory', 'newDir', 'newDirFile.txt');

    outputFileSync(filePath, 'content');
    const result = fs.readFileSync(filePath, 'utf8');

    expect(result).toBe('content');
  });

  test('writes empty file with no content', () => {
    const filePath = path.join('testDirectory', 'emptyFile.txt');

    outputFileSync(filePath);
    const result = fs.readFileSync(filePath, 'utf8');

    expect(result).toBe('');
  });

  test('writes buffer content to file', () => {
    const filePath = path.join('testDirectory', 'bufferFile.txt');
    const bufferContent = Buffer.from('buffer content', 'utf8');

    outputFileSync(filePath, bufferContent);
    const result = fs.readFileSync(filePath, 'utf8');

    expect(result).toBe('buffer content');
  });

  test('throws error when writing to a non-writable file', () => {
    const existingFile = path.join('testDirectory', 'readonlyFile.txt');
    fs.writeFileSync(existingFile, 'readonly');
    fs.chmodSync(existingFile, 0o444);

    expect(() => outputFileSync(existingFile, 'new content'))
      .toThrowError();
  });
});
