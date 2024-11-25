import dictionary from "dictionary-ro";
import { Language } from "../lib/language.js";

const reAlphabet = /^[aăâbcdefghiîjlmnoprsștțuvxz]+$/;
const reVowels = /[AĂÂEIÎJOUaăâeiîjou]/;

export const ro = new Language("ro", dictionary, (word) => {
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
