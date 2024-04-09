import { pathTo, readCsv, writeDict } from "../lib/io.js";
import { tr } from "../lib/languages.js";
import { loadStoplist } from "../stoplist/stoplist.js";

writeDict(tr, await processDict());

async function processDict() {
  const stoplist = loadStoplist()
    .addFile("turkish/stoplist-english.txt")
    .addFile("turkish/stoplist-profanity.txt")
    .addFile("turkish/stoplist-garbage.txt")
    .delete("bana", "ben", "de", "geri", "hadi", "mi", "ne", "sana", "ve");
  // const aspell = Aspell.tryMake(tr);
  const dict = new Map();
  for await (const [word0, f0] of readCsv(pathTo("turkish/dict.csv"))) {
    const word = word0.toLocaleLowerCase("tr");
    const f = Number(f0);
    if (tr.testWord(word) && stoplist.allow(word)) {
      dict.set(word, (dict.get(word) ?? 0) + f);
    }
  }
  return [...dict.entries()];
}
