import { loadBlacklist } from "../blacklist/blacklist.js";
import { Aspell } from "./aspell.js";
import { Dict, sortByCount } from "./dict.js";
import {
  dictPath,
  findFiles,
  readLines,
  writeDict,
  writeRejected,
} from "./io.js";

export async function processCorpus({
  language,
  files,
  blacklist = loadBlacklist(),
  DictType = Dict,
  replace = new Map(),
} = {}) {
  console.log(`Processing corpus [${language.id}]`);

  const rejected = new Set();

  const aspell = Aspell.tryMake(language);

  const dict = new DictType(language);

  for (const file of await findFiles(files, true)) {
    await scanFile(file);
  }

  async function scanFile(file) {
    console.log(`Scanning file ${file}`);
    let index = 0;
    for await (const line of readLines(file)) {
      for (let word of language.findWords(line)) {
        word = replace.get(word) ?? word;
        if (word) {
          if (blacklist.allow(word) && aspell.has(word)) {
            dict.add(word);
          } else {
            rejected.add(word);
          }
        }
      }
      index += 1;
      if (index % 100000 === 0) {
        console.log(`Scanning file ${file}, ${index}`);
        await checkpoint();
        if (typeof gc === "function") {
          gc();
        }
      }
    }
    await checkpoint();
  }

  async function checkpoint() {
    const file = dictPath(language);
    await writeDict(file, sortByCount(dict.build()).slice(0, 10100));
    await writeRejected(file + ".rejected", rejected);
  }
}
