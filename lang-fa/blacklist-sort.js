import { readFileSync, writeFileSync } from "node:fs";
import { pathTo } from "../lib/io.js";

const path = pathTo("lang-fa/blacklist.txt");

const words = readFileSync(path, "utf-8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

const collator = new Intl.Collator("fa");
const sorted = words.sort((a, b) => collator.compare(a, b));
const unique = [...new Set(sorted)];

writeFileSync(path, unique.join("\n") + "\n");
