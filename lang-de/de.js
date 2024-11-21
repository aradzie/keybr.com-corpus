import { Language } from "../lib/language.js";

const reAlphabet = /^[A-ZÄÖÜ]?[a-zäöüß]+$/;
const reVowels = /[AEIOUÄÖÜaeiouäöü]/;

export const de = new Language("de", (word) => {
  if (word.length < 2 || word.length > 15) {
    return false;
  }
  if (!reAlphabet.test(word)) {
    return false;
  }
  if (!reVowels.test(word)) {
    return false;
  }
  return true;
});
