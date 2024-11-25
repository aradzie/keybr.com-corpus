import dictionary from "dictionary-fa";
import { Language } from "../lib/language.js";

const reAlphabet = /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/;

export const fa = new Language("fa", dictionary, (word) => {
  if (word.length > 15) {
    return false;
  }
  if (!reAlphabet.test(word)) {
    return false;
  }
  return true;
});
