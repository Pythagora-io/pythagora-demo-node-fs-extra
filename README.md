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

2. `outputFileSync` crashes if no `args` are sent:
    ```javascript
   test('writes empty file with no content', () => {
   const filePath = path.join('testDirectory', 'emptyFile.txt');
       outputFileSync(filePath);
       const result = fs.readFileSync(filePath, 'utf8');
       expect(result).toBe('');
   });
    ```

3. `isSrcSubdir` says `/test/src` is subfolder of itself:
    ```javascript
   test('should return false if dest is the same as src', () => {
      expect(isSrcSubdir('/test/src', '/test/src')).toBe(false);
   });
   ```

4. `moveSync` copies original folder instead of moving it:
    ```javascript
   test('moveSync_dir_case_change', () => {
   const tempDir = os.tmpdir();
   const src = path.join(tempDir, 'Testcase');
   const dest = path.join(tempDir, 'testcase');

       if (fs.existsSync(src)) fs.rmdirSync(src);
       if (fs.existsSync(dest)) fs.rmdirSync(dest);

       fs.mkdirSync(src);
       moveSync(src, dest);

       expect(fs.existsSync(src)).toBe(false);
       expect(fs.existsSync(dest)).toBe(true);
   });
   ```
