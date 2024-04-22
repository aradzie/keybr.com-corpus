import { Language } from "../lib/language.js";

const reAlphabet = /^[aábcdeéfghiíjlmnñoópqrstuúvxyz]+$/u;
const reVowels = /[AÁEÉIÍJOÓUÚYaáeéiíjoóuúy]/;

export function testWord_es(word) {
  if (word.length > 20) {
    return false;
  }
  if (!reAlphabet.test(word)) {
    return false;
  }
  if (!reVowels.test(word)) {
    return false;
  }
  return true;
}

export const es = new Language("es", testWord_es);
