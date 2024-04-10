import { readFileSync } from "node:fs";
import { fromCsv } from "../lib/csv.js";
import { sortByCount } from "../lib/dict.js";
import { pathTo, writeDict } from "../lib/io.js";
import { el, testWord_el } from "./el.js";

writeDict(el, await processDict());

async function processDict() {
  const text = readFileSync(pathTo("lang-el/el_50k.csv"), "utf-8");
  let dict = fromCsv(text);
  dict = sortByCount(dict)
    .filter(([word]) => testWord_el(word))
    .slice(0, 10000)
    .map(([word, count]) => [word, Math.round(count / 200)]);
  return dict;
}
