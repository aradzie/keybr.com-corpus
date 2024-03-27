import { Aspell } from "../lib/aspell.js";
import { pathTo, readCsv, writeDict } from "../lib/io.js";
import { nb } from "../lib/languages.js";
import { loadStoplist } from "../stoplist/stoplist.js";

writeDict(nb, await processDict());

async function processDict() {
  const stoplist = loadStoplist();
  const aspell = Aspell.tryMake(nb);
  const dict = new Map();
  for await (const [word, f] of readCsv(pathTo("norwegian/dict.csv"))) {
    if (nb.testWord(word) && stoplist.allow(word) && aspell.has(word)) {
      dict.set(word, Number(f));
    }
  }
  return [...dict.entries()];
}
