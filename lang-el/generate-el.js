import { sortByCount } from "../lib/dict.js";
import { dictPath, pathTo, readDict, writeDict } from "../lib/io.js";
import { el } from "./el.js";

await writeDict(dictPath(el), await processDict());

async function processDict() {
  let dict = await readDict(pathTo("lang-el/el_50k.csv"));
  dict = sortByCount(dict)
    .filter(([word]) => el.testWord(word))
    .slice(0, 10000)
    .map(([word, count]) => [word, Math.round(count / 200)]);
  return sortByCount(dict);
}
