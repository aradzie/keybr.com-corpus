import { loadBlacklist } from "../blacklist/blacklist.js";
import { sortByCount } from "../lib/dict.js";
import { dictPath, pathTo, readDict, writeDict } from "../lib/io.js";
import { SpellChecker } from "../lib/spell-checker.js";
import { el } from "./el.js";

await writeDict(dictPath(el), await processDict());

async function processDict() {
  const blacklist = loadBlacklist(el);
  const spellChecker = new SpellChecker(el);
  let dict = await readDict(pathTo("lang-el/el_50k.csv"));
  dict = sortByCount(dict)
    .filter(([word]) => {
      return (
        // Check that the word consists of only valid letters.
        el.testWord(word) &&
        // Check that the word is not explicitly excluded as profane, offensive, etc.
        blacklist.allow(word) &&
        // Check that this is a word from the dictionary.
        spellChecker.has(word)
      );
    })
    .slice(0, 10000)
    .map(([word, count]) => [word, Math.round(count / 200)]);
  return sortByCount(dict);
}
