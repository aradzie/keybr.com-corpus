import { Blacklist } from "../lib/blacklist.js";

export function loadBlacklist() {
  const blacklist = new Blacklist();
  for (const file of [
    "blacklist/brand-names.txt",
    "blacklist/city-names.txt",
    "blacklist/country-names.txt",
    "blacklist/person-names.txt",
    "blacklist/usa-state-capital-names.txt",
    "blacklist/usa-state-names.txt",
    "blacklist/other-names.txt",
    "blacklist/roman-numerals.txt",
    "blacklist/profanity.txt",
  ]) {
    blacklist.addFile(file);
  }
  return blacklist;
}