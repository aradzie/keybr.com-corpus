import { readFileSync } from "node:fs";
import { pathTo } from "../lib/io.js";
import { Stoplist } from "../lib/stoplist.js";

// https://design215.com/toolbox/wordlist.php

export function loadStoplist() {
  const stoplist = new Stoplist();
  for (const item of [
    "stoplist/brand-names.txt",
    "stoplist/city-names.txt",
    "stoplist/country-names.txt",
    "stoplist/person-names.txt",
    "stoplist/usa-state-capital-names.txt",
    "stoplist/usa-state-names.txt",
    "stoplist/other-names.txt",
    "stoplist/roman-numerals.txt",
    "stoplist/profanity.txt",
  ]) {
    const text = readFileSync(pathTo(item), "utf-8");
    const words = text.split(/\s+/g);
    stoplist.add(words);
  }
  return stoplist;
}
