import dictionary from "dictionary-ga";
import { Language } from "../lib/language.js";

const reAlphabet = /^[aábcdeéfghiílmnoóprstuúv]+$/;
const reVowels = /[aáeéiíoóuúy]/;

export const ga = new Language("ga", dictionary, (word) => {
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