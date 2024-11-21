import { loadBlacklist } from "./blacklist/blacklist.js";
import { be } from "./lang-be/be.js";
import { cs } from "./lang-cs/cs.js";
import { sl } from "./lang-sl/sl.js";
import { sv } from "./lang-sv/sv.js";
import { uk } from "./lang-uk/uk.js";
import { processCorpus } from "./lib/corpus.js";
import { findFiles } from "./lib/io.js";

for (const language of [be, cs, sl, sv, uk]) {
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
