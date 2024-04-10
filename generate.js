import { existsSync } from "node:fs";
import { loadBlacklist } from "./blacklist/blacklist.js";
import { processCorpus } from "./lib/corpus.js";
import { pathTo } from "./lib/io.js";
import { languages } from "./lib/languages.js";

const blacklist = loadBlacklist();

for (const language of languages) {
  const file = pathTo(`lang-${language.id}`, `corpus.txt`);
  if (existsSync(file)) {
    await processCorpus({ language, file, blacklist });
  }
}
