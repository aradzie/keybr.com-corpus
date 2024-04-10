import { processCorpus } from "../lib/corpus.js";
import { loadStoplist } from "../stoplist/stoplist.js";
import { nl } from "./nl.js";

await processCorpus({
  language: nl,
  file: ["/home/caustic/Downloads/corpus/opensubtitles/nl.txt"],
  stoplist: loadStoplist()
    .addFile("lang-nl/stoplist-profanity.txt")
    .addFile("lang-nl/stoplist-english.txt")
    .add("a,e,es,ge,i,o,on,se,y".split(",")),
});
