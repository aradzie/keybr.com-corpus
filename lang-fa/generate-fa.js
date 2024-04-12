import { processCorpus } from "../lib/corpus.js";
import { fa } from "./fa.js";

await processCorpus({
  language: fa,
  file: ["~/Downloads/corpus/opensubtitles/fa.txt"],
});
