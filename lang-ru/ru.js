import dictionary from "dictionary-ru";
import { Language } from "../lib/language.js";

const reAlphabet = /^[абвгдежзийклмнопрстуфхцчшщъыьэюя]+$/;
const reVowels = /[АЕИЙОУЫЭЮЯаеийоуыэюя]/;

export const ru = new Language("ru", dictionary, (word) => {
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
