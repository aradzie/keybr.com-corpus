import dictionary from "dictionary-cs";
import { Language } from "../lib/language.js";

const reAlphabet = /^[aábcčdďeéěfghiíjklmnňoóprřsštťuúůvxyýzž]+$/;
const reVowels = /[AÁEÉĚIÍJOÓUÚŮYÝaáeéěiíjoóuúůyý]/;

export const cs = new Language("cs", dictionary, (word) => {
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
