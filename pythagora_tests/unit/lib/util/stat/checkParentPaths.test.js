const {checkParentPaths, areIdentical} = require('../../../../../lib/util/stat.js');
const fs = require('fs');
const path = require('path');

describe('checkParentPaths', () => {
  test('should call cb if src and dest are identical', async () => {
    fs.stat = jest.fn().mockResolvedValue({ino: 1, dev: 1});
    const cb = jest.fn();
    await checkParentPaths('/a/b/c.txt', {ino: 1, dev: 1}, '/a/b/c.txt', 'testFunc', cb);
    expect(cb).toHaveBeenCalled();
  });

  test('destParent is root', async () => {
    const cb = jest.fn();
    await checkParentPaths('/a', {ino: 1, dev: 1}, '/', 'testFunc', cb);
    expect(cb).toHaveBeenCalled();
  });

  test('destParent is srcParent', async () => {
    const cb = jest.fn();
    await checkParentPaths('/a/b/c', {ino: 1, dev: 1}, '/a/b/d', 'testFunc', cb);
    expect(cb).toHaveBeenCalled();
  });
});
