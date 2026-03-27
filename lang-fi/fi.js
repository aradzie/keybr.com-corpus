import { Language } from "../lib/language.js";

const reAlphabet = /^[abdefghijklmnoprstuvyäö]+$/;
const reVowels = /[aeijouyäö]/;

export const fi = new Language("fi", null, (word) => {
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
