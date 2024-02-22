import { processCorpus } from "../lib/corpus.js";
import { fr } from "../lib/languages.js";
import { loadStoplist } from "../stoplist/stoplist.js";

await processCorpus({
  language: fr,
  file: ["/home/caustic/Downloads/corpus/opensubtitles/fr.txt"],
  stoplist: loadStoplist()
    .addFile("french/stoplist.txt")
    .addFile("french/stoplist-english.txt"),
});
