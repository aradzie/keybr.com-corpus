import { Language } from "../lib/language.js";

const reAlphabet = /^[aābcčdeēfgģhiījkķlļmnņoprsštuūvzž]+$/;
const reVowels = /[aāeēiījouū]/;

export const lv = new Language("lv", null, (word) => {
  if (word.length > 15) {
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
