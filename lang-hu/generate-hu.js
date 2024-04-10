import { Aspell } from "../lib/aspell.js";
import { pathTo, readCsv, writeDict } from "../lib/io.js";
import { loadStoplist } from "../stoplist/stoplist.js";
import { hu } from "./hu.js";

writeDict(hu, await processDict());

async function processDict() {
  const stoplist = loadStoplist().addFile("lang-hu/stoplist-english.txt");
  const aspell = Aspell.tryMake(hu);
  const dict = new Map();
  for await (const [word0, f0] of readCsv(pathTo("lang-hu/dict.csv"))) {
    const word = word0.toLocaleLowerCase("hu");
    const f = Number(f0);
    if (hu.testWord(word) && stoplist.allow(word) && aspell.has(word)) {
      dict.set(word, (dict.get(word) ?? 0) + f);
    }
  }
  return [...dict.entries()];
}
