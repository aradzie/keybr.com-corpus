import { Language } from "../lib/language.js";

const reAlphabet = /^[aăâbcdefghiîjlmnoprsștțuvxz]+$/u;
const reVowels = /[AĂÂEIÎJOUaăâeiîjou]/;

export const ro = new Language("ro", (word) => {
  if (word.length > 20) {
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
