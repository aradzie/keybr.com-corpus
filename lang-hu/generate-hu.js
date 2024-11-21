import { loadBlacklist } from "../blacklist/blacklist.js";
import { Aspell } from "../lib/aspell.js";
import { sortByCount } from "../lib/dict.js";
import { dictPath, pathTo, readDict, writeDict } from "../lib/io.js";
import { hu } from "./hu.js";

await writeDict(dictPath(hu), await processDict());

async function processDict() {
  const blacklist = loadBlacklist(hu);
  const aspell = Aspell.tryMake(hu);
  const dict = new Map();
  for (const [word0, f] of await readDict(pathTo("lang-hu/dict.csv"))) {
    const word = word0.toLocaleLowerCase("hu");
    if (hu.testWord(word) && blacklist.allow(word) && aspell.has(word)) {
      dict.set(word, (dict.get(word) ?? 0) + f);
    }
  }
  return sortByCount([...dict.entries()]).slice(0, 10100);
}
