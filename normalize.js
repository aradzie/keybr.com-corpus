import { readFileSync, writeFileSync } from "node:fs";
import { pathTo } from "./lib/io.js";

const lang = `nl`;
const file = `lang-${lang}/blacklist-sensitive.txt`;
const collator = new Intl.Collator(lang, { sensitivity: "base" });

const text = readFileSync(pathTo(file), "utf-8");
const words = text
  .split(/\n/g)
  .map((word) => word.trim())
  .filter((word) => word.length > 0)
  .filter((word) => !word.includes("'"))
  .filter((word) => !word.includes("-"))
  .map((word) => word.toLocaleLowerCase(lang))
  .sort((a, b) => collator.compare(a, b));
const unique = [...new Set(words)];
writeFileSync(pathTo(file), unique.join("\n"));
