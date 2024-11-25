import dictionary from "dictionary-tr";
import { Language } from "../lib/language.js";

const reAlphabet = /^[abcçdefgğhIıİijklmnoöprsştuüvyz]+$/;
const reVowels = /[AEIİJOUYaeıijoöuüy]/;

export const tr = new Language("tr", dictionary, (word) => {
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
