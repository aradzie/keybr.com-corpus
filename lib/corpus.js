import { loadBlacklist } from "../blacklist/blacklist.js";
import { Aspell } from "./aspell.js";
import { Dict } from "./dict.js";
import { findFiles, readLines, writeDict } from "./io.js";

export async function processCorpus({
  language,
  files,
  blacklist = loadBlacklist(),
  DictType = Dict,
} = {}) {
  console.log(`Processing corpus [${language.id}]`);

  const aspell = Aspell.tryMake(language);

  const dict = new DictType(language);

  for (const file of await findFiles(files, true)) {
    await scanFile(file);
  }

  async function scanFile(file) {
    console.log(`Scanning file ${file}`);
    let index = 0;
    for await (const line of readLines(file)) {
      for (const word of language.findWords(line)) {
        if (blacklist.allow(word) && aspell.has(word)) {
          dict.add(word);
        }
      }
      index += 1;
      if (index % 100000 === 0) {
        console.log(`Scanning file ${file}, ${index}`);
        checkpoint();
        if (typeof gc === "function") {
          gc();
        }
      }
    }
    checkpoint();
  }

  function checkpoint() {
    writeDict(language, dict.build());
  }
}
