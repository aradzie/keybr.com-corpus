import { processCorpus } from "../lib/corpus.js";
import { loadStoplist } from "../stoplist/stoplist.js";
import { fr } from "./fr.js";

await processCorpus({
  language: fr,
  file: ["/home/caustic/Downloads/corpus/opensubtitles/fr.txt"],
  stoplist: loadStoplist()
    .addFile("lang-fr/stoplist-profanity.txt")
    .addFile("lang-fr/stoplist-english.txt")
    .add("âcdeéhijlmnosu".split("")),
});
