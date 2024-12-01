import { be } from "./lang-be/be.js";
import { cs } from "./lang-cs/cs.js";
import { sv } from "./lang-sv/sv.js";
import { uk } from "./lang-uk/uk.js";
import { findFiles } from "./lib/io.js";
import { parseCorpus } from "./lib/parse-corpus.js";

for (const language of [be, cs, sv, uk]) {
  await parseCorpus({
    language,
    inputFiles: findFiles([
      `lang-${language.id}/corpus*.txt`,
      `lang-${language.id}/corpus/**/*.txt`,
    ]),
  });
}
