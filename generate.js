import { readFileSync } from "node:fs";
import { Dict } from "./lib/dict.js";
import { pathTo, writeDict } from "./lib/io.js";
import { languages } from "./lib/languages.js";
import { scanWords } from "./lib/words.js";

for (const language of languages) {
  const dict = new Dict(language);
  const corpus = readCorpus(language.id);
  if (corpus != null) {
    for (const word of scanWords(corpus, language.testWord)) {
      dict.add(word);
    }
    writeDict(language, dict.build());
    console.log(`[${language.id}] Generated frequency list`);
  }
}

function readCorpus(id) {
  const path = pathTo(`corpus`, `corpus-${id}.txt`);
  try {
    return readFileSync(path, "utf-8");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
  return null;
}
