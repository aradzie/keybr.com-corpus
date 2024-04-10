import { existsSync } from "node:fs";
import { processCorpus } from "./lib/corpus.js";
import { pathTo } from "./lib/io.js";
import { languages } from "./lib/languages.js";
import { loadStoplist } from "./stoplist/stoplist.js";

const stoplist = loadStoplist();

for (const language of languages) {
  const file = pathTo(`lang-${language.id}`, `corpus.txt`);
  if (existsSync(file)) {
    await processCorpus({ language, file, stoplist });
  }
}
