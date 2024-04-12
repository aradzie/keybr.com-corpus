import { processCorpus } from "../lib/corpus.js";
import { ar } from "./ar.js";

await processCorpus({
  language: ar,
  file: ["~/Downloads/corpus/opensubtitles/ar.txt"],
});
