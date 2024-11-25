import dictionary from "dictionary-nl";
import { Language } from "../lib/language.js";

const reAlphabet = /^[abcdefghijklmnopqrstuvwxyz]+$/;
const reVowels = /[AEIJOUYaeijouy]/;

export const nl = new Language("nl", dictionary, (word) => {
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
