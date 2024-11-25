import dictionary from "dictionary-pl";
import { Language } from "../lib/language.js";

const reAlphabet = /^[aąbcćdeęfghijklłmnńoóprsśtuwyzźż]+$/;
const reVowels = /[AĄEĘIJOÓUYaąeęijoóuy]/;

export const pl = new Language("pl", dictionary, (word) => {
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
