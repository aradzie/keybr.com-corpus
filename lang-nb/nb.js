import dictionary from "dictionary-nb";
import { Language } from "../lib/language.js";

const reAlphabet = /^[abcdefghijklmnoprstuvwyæøå]+$/;
const reVowels = /[AEIJOUYÆØÅaeijouyæøå]/;

export const nb = new Language("nb", dictionary, (word) => {
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
