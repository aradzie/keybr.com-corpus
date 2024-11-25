import dictionary from "dictionary-es";
import { Language } from "../lib/language.js";

const reAlphabet = /^[aábcdeéfghiíjlmnñoópqrstuúvxyz]+$/;
const reVowels = /[AÁEÉIÍJOÓUÚYaáeéiíjoóuúy]/;

export const es = new Language("es", dictionary, (word) => {
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
