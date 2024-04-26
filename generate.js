import { loadBlacklist } from "./blacklist/blacklist.js";
import { processCorpus } from "./lib/corpus.js";
import { findFiles } from "./lib/io.js";
import { languages } from "./lib/languages.js";

for (const language of languages) {
  const prefix = `lang-${language.id}`;
  const files = await findFiles([
    `${prefix}/corpus*.txt`,
    `${prefix}/corpus/**/*.txt`,
  ]);
  const blacklistFiles = await findFiles([
    `${prefix}/blacklist*.txt`,
    `${prefix}/blacklist/**/*.txt`,
  ]);
  if (files.length > 0) {
    await processCorpus({
      language,
      files,
      blacklist: loadBlacklist().addFiles(blacklistFiles),
    });
  }
}
