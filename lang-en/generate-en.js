import { loadBlacklist } from "../blacklist/blacklist.js";
import { processCorpus } from "../lib/corpus.js";
import { en } from "./en.js";

await processCorpus({
  language: en,
  files: [
    "/mnt/userdata/corpus/books_large_p1.txt",
    "/mnt/userdata/corpus/books_large_p2.txt",
    // "/mnt/userdata/corpus/enwiki-20220201-clean.txt",
    // "/mnt/userdata/corpus/1-billion-word-language-modeling-benchmark-r13output/**/*",
  ],
  blacklist: loadBlacklist().addFiles("lang-en/blacklist.txt"),
});
