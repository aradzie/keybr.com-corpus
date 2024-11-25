import { loadBlacklist } from "../blacklist/blacklist.js";
import { sortByCount } from "../lib/dict.js";
import { dictPath, pathTo, readDict, writeDict } from "../lib/io.js";
import { SpellChecker } from "../lib/spell-checker.js";
import { hu } from "./hu.js";

await writeDict(dictPath(hu), await processDict());

async function processDict() {
  const blacklist = loadBlacklist(hu);
  const spellChecker = new SpellChecker(hu);
  const dict = new Map();
  for (const [word0, f] of await readDict(pathTo("lang-hu/dict.csv"))) {
    const word = word0.toLocaleLowerCase("hu");
    if (hu.testWord(word) && blacklist.allow(word) && spellChecker.has(word)) {
      dict.set(word, (dict.get(word) ?? 0) + f);
    }
  }
  return sortByCount([...dict.entries()]).slice(0, 10100);
}
