import { loadBlacklist } from "../blacklist/blacklist.js";
import { Aspell } from "./aspell.js";
import { Dict } from "./dict.js";
import { readLines, writeDict } from "./io.js";
import { scanWords } from "./words.js";

export async function processCorpus({
  language,
  file,
  blacklist = loadBlacklist(),
  DictType = Dict,
} = {}) {
  const aspell = Aspell.tryMake(language);

  const dict = new DictType(language);

  await start(file);

  async function start(file) {
    if (typeof file === "string") {
      await scanFile(file);
    } else if (Array.isArray(file)) {
      for (const item of file) {
        await start(item);
      }
    } else {
      throw new TypeError();
    }
  }

  function checkpoint() {
    writeDict(language, dict.build());
  }

  async function scanFile(file) {
    console.log(`Scanning corpus ${file}`);
    let index = 0;
    for await (const line of readLines(file)) {
      for (const word of scanWords(line, language.testWord)) {
        if (blacklist.allow(word) && aspell.has(word)) {
          dict.add(word);
        }
      }
      index += 1;
      if (index % 100000 === 0) {
        console.log(`Scanning corpus ${file}, ${index}`);
        checkpoint();
        if (typeof gc === "function") {
          gc();
        }
      }
    }
    checkpoint();
  }
}
