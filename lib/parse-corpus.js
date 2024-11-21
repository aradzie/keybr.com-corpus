import { loadBlacklist } from "../blacklist/blacklist.js";
import { Aspell } from "./aspell.js";
import { Dict, sortByCount } from "./dict.js";
import {
  dictPath,
  findFiles,
  pathTo,
  readLines,
  writeDict,
  writeRejected,
} from "./io.js";

export async function parseCorpus({
  language,
  inputFiles,
  outputFile = dictPath(language),
  blacklistFiles = [],
  DictType = Dict,
  replace = new Map(),
} = {}) {
  console.log(`Processing corpus [${language.id}]`);

  const dict = new DictType(language);
  const aspell = Aspell.tryMake(language);
  const blacklist = loadBlacklist(language).addFiles(blacklistFiles);
  const rejected = new Set();

  for (const file of await findFiles(inputFiles, true)) {
    await scanFile(file);
  }

  async function scanFile(file) {
    console.log(`Scanning file ${file}`);
    for await (const line of readLines(file)) {
      for (let word of language.findWords(line)) {
        word = replace.get(language.stem(word)) ?? word;
        if (word) {
          if (blacklist.allow(word) && aspell.has(word)) {
            dict.add(word);
          } else {
            rejected.add(word);
          }
        }
      }
    }
    const entries = sortByCount(dict.build()).slice(0, 10100);
    await writeDict(pathTo(outputFile), entries);
    await writeRejected(pathTo(outputFile) + ".rejected", rejected);
  }
}
