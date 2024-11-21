import { Language } from "../lib/language.js";

export const de = new Language("de", (word) => {
  if (word.length < 2 || word.length > 15) {
    return false;
  }
  return /^[A-ZÄÖÜ]?[a-zäöüß]+$/.test(word) && /[aeiouäöü]/.test(word);
});
