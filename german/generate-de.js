import { MultiDict } from "../lib/dict.js";
import { readLines, writeDict } from "../lib/io.js";
import { de } from "../lib/languages.js";
import { scanWords } from "../lib/words.js";
import { stoplist } from "./stoplist.js";

// https://github.com/GermanT5/wikipedia2corpus

// At the time of writing this comment the corpus has 55138344 lines.

const dict = new MultiDict(de);

function checkpoint() {
  writeDict(de, dict.build());
}

async function processCorpus(file, limit = 55_138_344) {
  let index = 0;
  for await (const line of readLines(file)) {
    for (const word of scanWords(line, de.testWord)) {
      if (stoplist.allow(word)) {
        dict.add(word);
      }
    }
    index += 1;
    if (index % 100000 === 0) {
      const pct = Math.round((index / limit) * 1000) / 1000;
      console.log(`${index}, ${Math.round(pct * 100)}%`);
      checkpoint();
      if (typeof gc === "function") {
        gc();
      }
    }
    if (index === limit) {
      break;
    }
  }
  checkpoint();
}

await processCorpus("/home/caustic/Downloads/dewiki-20220201-clean.txt");
