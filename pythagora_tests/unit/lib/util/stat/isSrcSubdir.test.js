describe('isSrcSubdir', () => {
  const {isSrcSubdir} = require('../../../../../lib/util/stat.js');

  test('should return true if dest is subdir of src', () => {
    expect(isSrcSubdir('/test/src', '/test/src/subdir')).toBe(true);
  });

  test('should return false if dest is not subdir of src', () => {
    expect(isSrcSubdir('/test/src', '/test/another/subdir')).toBe(false);
  });

  test('should return false if dest is the same as src', () => {
    expect(isSrcSubdir('/test/src', '/test/src')).toBe(false);
  });

  test('should return true if dest is deep subdir of src', () => {
    expect(isSrcSubdir('/test/src', '/test/src/subdir/sub-subdir')).toBe(true);
  });

  test('should return false with relative paths', () => {
    expect(isSrcSubdir('../src', '../another/subdir')).toBe(false);
  });

  test('should return false if src and dest are reversed', () => {
    expect(isSrcSubdir('/test/src/subdir', '/test/src')).toBe(false);
  });
});
