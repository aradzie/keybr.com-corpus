import { Dict } from "../lib/dict.js";
import { readLines, writeDict } from "../lib/io.js";
import { en } from "../lib/languages.js";
import { scanWords } from "../lib/words.js";
import { stoplist } from "./stoplist.js";

// https://github.com/GermanT5/wikipedia2corpus

const dict = new Dict(en);

function checkpoint() {
  writeDict(en, dict.build());
}

async function processCorpus(file) {
  let index = 0;
  for await (const line of readLines(file)) {
    if (line.length > 100) {
      for (const word of scanWords(line, en.testWord)) {
        if (stoplist.allow(word)) {
          dict.add(word);
        }
      }
    }
    index += 1;
    if (index % 100000 === 0) {
      console.log(`${index}`);
      checkpoint();
      if (typeof gc === "function") {
        gc();
      }
    }
  }
  checkpoint();
}

await processCorpus("/home/caustic/Downloads/enwiki-20220201-clean.txt");
