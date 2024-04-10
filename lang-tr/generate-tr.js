import { pathTo, readCsv, writeDict } from "../lib/io.js";
import { loadStoplist } from "../stoplist/stoplist.js";
import { tr } from "./tr.js";

writeDict(tr, await processDict());

async function processDict() {
  const stoplist = loadStoplist()
    .addFile("lang-tr/stoplist-english.txt")
    .addFile("lang-tr/stoplist-profanity.txt")
    .addFile("lang-tr/stoplist-garbage.txt")
    .delete("bana", "ben", "de", "geri", "hadi", "mi", "ne", "sana", "ve");
  // const aspell = Aspell.tryMake(tr);
  const dict = new Map();
  for await (const [word0, f0] of readCsv(pathTo("lang-tr/dict.csv"))) {
    const word = word0.toLocaleLowerCase("tr");
    const f = Number(f0);
    if (tr.testWord(word) && stoplist.allow(word)) {
      dict.set(word, (dict.get(word) ?? 0) + f);
    }
  }
  return [...dict.entries()];
}
