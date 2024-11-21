import { Language } from "../lib/language.js";

const reAlphabet = /^[abcdefghijklmnoprstuvwxyåäö]+$/;
const reVowels = /[AEIJOUYÅÄÖaeijouyåäö]/;

export const sv = new Language("sv", (word) => {
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
