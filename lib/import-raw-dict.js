import chalk from "chalk";
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
  inputFile = pathTo(inputFile);
  outputFile = pathTo(outputFile);

  console.log(chalk.bold(`Processing ${inputFile} to ${outputFile}`));

  const dict = new DictType(language);
  const spellChecker = new SpellChecker(language);
  const blacklist = loadBlacklist(language).addFiles(blacklistFiles);
  const rejected = new Set();
  const raw = await readDict(inputFile);
  for (let [word, count] of raw) {
    word = fix.get(language.stem(word)) ?? word;
    if (word) {
      if (
        language.testWord(word) &&
        blacklist.allow(word) &&
        spellChecker.has(word)
      ) {
        dict.add(word, count);
      } else {
        rejected.add(word);
      }
    }
  }
  const entries = sortByCount(dict.build()).slice(0, 10100);
  await writeDict(outputFile, entries);
  await writeRejected(outputFile + ".rejected", rejected);
}
