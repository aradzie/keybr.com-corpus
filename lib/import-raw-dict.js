import { loadBlacklist } from "../blacklist/blacklist.js";
import { Dict, sortByCount } from "./dict.js";
import { pathTo, readDict, writeDict, writeRejected } from "./io.js";
import { SpellChecker } from "./spell-checker.js";

export async function importRawDict({
  language,
  inputFile = `raw/dict-${language.id}.csv.gz`,
  outputFile = `lang-${language.id}/dictionary-${language.id}.csv`,
  blacklistFiles = [],
  DictType = Dict,
  fix = new Map(),
} = {}) {
  const dict = new DictType(language);
  const spellChecker = new SpellChecker(language);
  const blacklist = loadBlacklist(language).addFiles(blacklistFiles);
  const rejected = new Set();
  const raw = await readDict(pathTo(inputFile));
  for (let [word, count] of raw) {
    word = fix.get(language.stem(word)) ?? word;
    if (word) {
      if (blacklist.allow(word) && spellChecker.has(word)) {
        dict.add(word, count);
      } else {
        rejected.add(word);
      }
    }
  }
  const entries = sortByCount(dict.build()).slice(0, 10100);
  await writeDict(pathTo(outputFile), entries);
  await writeRejected(pathTo(outputFile) + ".rejected", rejected);
}
