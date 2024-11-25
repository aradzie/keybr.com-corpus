import dictionary from "dictionary-uk";
import { Language } from "../lib/language.js";

const reAlphabet = /^[абвгдеєжзиіїйклмнопрстуфхцчшщьюя]+$/;
const reVowels = /[АЕЄИІЇЙОУЮЯаеєиіїйоуюя]/;

export const uk = new Language("uk", dictionary, (word) => {
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
