const { createLinkSync } = require("../../../../../lib/ensure/link.js");
const fs = require("graceful-fs");
const path = require("path");
const { areIdentical } = require("../../../../../lib/util/stat");

describe("createLinkSync", () => {
  test("does not fail when linking files in base path", () => {
    const baseDir = fs.mkdtempSync("base");
    const src = path.join(baseDir, 'src.txt');
    fs.writeFileSync(src, 'content');
    const destination = path.join(baseDir, 'dest.txt');

    createLinkSync(src, destination);
    const srcStat = fs.lstatSync(src);
    const dstStat = fs.lstatSync(destination);
    expect(areIdentical(srcStat, dstStat)).toBeTruthy();

    fs.unlinkSync(destination);
    fs.unlinkSync(src);
    fs.rmdirSync(baseDir);
  });
});
