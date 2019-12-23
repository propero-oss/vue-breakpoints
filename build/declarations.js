const { readdirSync, readFileSync, writeFileSync, unlinkSync } = require("fs");

const declarationFiles = readdirSync("dist").filter(it => it.endsWith(".d.ts"));
const declaration = readFileSync("dist/" + declarationFiles[0]).toString(
  "utf8"
);
const extension = readFileSync("build/vue-extension.txt").toString("utf8");
writeFileSync("dist/VueBreakpoints.d.ts", declaration + "\n" + extension);
declarationFiles.forEach(it => unlinkSync("dist/" + it));
