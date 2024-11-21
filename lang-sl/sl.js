import { Language } from "../lib/language.js";

const reAlphabet = /^[abcčdefghijklmnoprsštuvzž]+$/u;
const reVowels = /[AEIJOUaeijou]/;

export const sl = new Language("sl", (word) => {
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
