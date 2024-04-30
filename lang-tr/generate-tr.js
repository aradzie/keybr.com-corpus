import { loadBlacklist } from "../blacklist/blacklist.js";
import { sortByCount } from "../lib/dict.js";
import { dictPath, pathTo, readDict, writeDict } from "../lib/io.js";
import { tr } from "./tr.js";

await writeDict(dictPath(tr), await processDict());

async function processDict() {
  const blacklist = loadBlacklist()
    .addFiles(
      "lang-tr/blacklist-english.txt",
      "lang-tr/blacklist-profanity.txt",
      "lang-tr/blacklist-garbage.txt",
    )
    .delete("bana", "ben", "de", "geri", "hadi", "mi", "ne", "sana", "ve");
  // const aspell = Aspell.tryMake(tr);
  const dict = new Map();
  for await (const [word0, f] of await readDict(pathTo("lang-tr/dict.csv"))) {
    const word = word0.toLocaleLowerCase("tr");
    if (tr.testWord(word) && blacklist.allow(word)) {
      dict.set(word, (dict.get(word) ?? 0) + f);
    }
  }
  return sortByCount([...dict.entries()]).slice(0, 10000);
}
