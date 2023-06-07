# node-fs-extra fork with Pythagora tests

If you want to try it out yourself, just clone the repo and run:
```bash
npm i
npx jest ./pythagora_tests/
```

## Bugs that Pythagora tests caught:

### Edge cases
1. `areIdentical` returns `undefined` instead of `false` if destStat is empty object:
    ```javascript
     test('should return false if destStat is missing ino and/or dev properties', () => {
       const srcStat = fs.statSync(__filename);
       const destStat = {};
       const result = areIdentical(srcStat, destStat);
       expect(result).toBe(false);
    });
    ```

2. `isSrcSubdir` says `/test/src` is subfolder of itself:
    ```javascript
   test('should return false if dest is the same as src', () => {
      expect(isSrcSubdir('/test/src', '/test/src')).toBe(false);
   });
   ```
