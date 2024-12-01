import { loadBlacklist } from "../blacklist/blacklist.js";
import { sortByCount } from "../lib/dict.js";
import { dictPath, pathTo, readDict, writeDict } from "../lib/io.js";
import { SpellChecker } from "../lib/spell-checker.js";
import { nb } from "./nb.js";

await writeDict(dictPath(nb), await processDict());

async function processDict() {
  const blacklist = loadBlacklist(nb).addFiles("blacklist/english.txt");
  const spellChecker = new SpellChecker(nb);
  const dict = new Map();
  for (const [word, f] of await readDict(pathTo("lang-nb/dict.csv"))) {
    if (nb.testWord(word) && blacklist.allow(word) && spellChecker.has(word)) {
      dict.set(word, f);
    }
  }
  return sortByCount([...dict.entries()]).slice(0, 10100);
}
