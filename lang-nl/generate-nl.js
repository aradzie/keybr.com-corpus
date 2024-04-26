import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { nl } from "./nl.js";

await processCorpus({
  language: nl,
  files: ["~/Downloads/corpus/opensubtitles/nl.txt"],
  blacklist: loadBlacklist()
    .addFiles("lang-nl/blacklist-profanity.txt", "blacklist/english.txt")
    .add("a,e,es,ge,i,o,on,se,y".split(",")),
});
