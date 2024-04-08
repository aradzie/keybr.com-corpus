import { pathTo, readCsv, writeDict } from "../lib/io.js";
import { tr } from "../lib/languages.js";
import { loadStoplist } from "../stoplist/stoplist.js";

writeDict(tr, await processDict());

async function processDict() {
  const stoplist = loadStoplist()
    .addFile("turkish/stoplist-english.txt")
    .addFile("turkish/stoplist-profanity.txt")
    .delete("bana", "ben", "de", "geri", "hadi", "mi", "ne", "sana", "ve");
  // const aspell = Aspell.tryMake(tr);
  const dict = new Map();
  for await (const [word, f] of readCsv(pathTo("turkish/dict.csv"))) {
    if (!dict.has(word) && tr.testWord(word) && stoplist.allow(word)) {
      dict.set(word, Number(f));
    }
  }
  return [...dict.entries()];
}
