import { Blacklist } from "../lib/blacklist.js";
import { findFiles } from "../lib/io.js";

export function loadBlacklist(language) {
  return new Blacklist()
    .addFiles(
      "blacklist/brand-names.txt",
      "blacklist/city-names.txt",
      "blacklist/country-names.txt",
      "blacklist/person-names.txt",
      "blacklist/usa-state-capital-names.txt",
      "blacklist/usa-state-names.txt",
      "blacklist/other-names.txt",
      "blacklist/roman-numerals.txt",
      "blacklist/profanity.txt",
      "blacklist/sensitive.txt",
    )
    .addFiles(
      findFiles([
        `lang-${language.id}/blacklist*.txt`,
        `lang-${language.id}/blacklist/**/*.txt`,
      ]),
    );
}
