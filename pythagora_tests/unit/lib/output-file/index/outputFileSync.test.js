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

  test('writes buffer content to file', () => {
    const filePath = path.join('testDirectory', 'bufferFile.txt');
    const bufferContent = Buffer.from('buffer content', 'utf8');

    outputFileSync(filePath, bufferContent);
    const result = fs.readFileSync(filePath, 'utf8');

    expect(result).toBe('buffer content');
  });
});
