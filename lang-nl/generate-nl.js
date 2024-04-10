import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { nl } from "./nl.js";

await processCorpus({
  language: nl,
  file: ["~/Downloads/corpus/opensubtitles/nl.txt"],
  blacklist: loadBlacklist()
    .addFile("lang-nl/blacklist-profanity.txt")
    .addFile("lang-nl/blacklist-english.txt")
    .add("a,e,es,ge,i,o,on,se,y".split(",")),
});
