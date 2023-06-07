const {pathExists} = require('../../../../../lib/path-exists/index.js');
const fs = require('fs');

describe('pathExists', () => {
  beforeAll(() => {
    fs.writeFileSync('file.txt', 'content');
  });

  afterAll(() => {
    fs.unlinkSync('file.txt');
  });

  test('file exists', async () => {
    expect(await pathExists('file.txt')).toBe(true);
  });

  test('file does not exist', async () => {
    expect(await pathExists('nonexistent.txt')).toBe(false)
  });

  test('directory exists', async () => {
    expect(await pathExists(process.cwd())).toBe(true);
  });

  test('directory does not exist', async () => {
    expect(await pathExists('nonexistent-directory/')).toBe(false);
  });

  test('empty path', async () => {
    expect(await pathExists('')).toBe(false);
  });

  test('null path', async () => {
    expect(await pathExists(null)).toBe(false);
  });

  test('undefined path', async () => {
    expect(await pathExists(undefined)).toBe(false);
  });
});
