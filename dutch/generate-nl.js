import { processCorpus } from "../lib/corpus.js";
import { nl } from "../lib/languages.js";
import { loadStoplist } from "../stoplist/stoplist.js";

await processCorpus({
  language: nl,
  file: ["/home/caustic/Downloads/corpus/opensubtitles/nl.txt"],
  stoplist: loadStoplist()
    .addFile("dutch/stoplist-profanity.txt")
    .addFile("dutch/stoplist-english.txt")
    .add("a,e,es,ge,i,o,on,se,y".split(",")),
});
