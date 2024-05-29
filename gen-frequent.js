import { sortByCount } from "./lib/dict.js";
import { pathTo, readDict } from "./lib/io.js";

const dict = sortByCount(await readDict(pathTo("build/dictionary-hr.csv")));

const words = [];
for (const [word] of dict) {
  words.push(word);
  if (words.length === 3000) {
    break;
  }
}
console.log(words.map((word) => `"${word}"`).join(","));
