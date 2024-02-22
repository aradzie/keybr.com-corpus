import { Dict } from "../lib/dict.js";
import { readLines, writeDict } from "../lib/io.js";
import { fr } from "../lib/languages.js";
import { scanWords } from "../lib/words.js";
import { loadStoplist } from "../stoplist/stoplist.js";

const dict = new Dict(fr);

const stoplist = loadStoplist()
  .addFile("french/stoplist.txt")
  .addFile("french/stoplist-english.txt");

function checkpoint() {
  writeDict(fr, dict.build());
}

async function processCorpus(file) {
  let index = 0;
  for await (const line of readLines(file)) {
    for (const word of scanWords(line, fr.testWord)) {
      if (stoplist.allow(word)) {
        dict.add(word);
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

await processCorpus("/home/caustic/Downloads/corpus/opensubtitles/fr.txt");
