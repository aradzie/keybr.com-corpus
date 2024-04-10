import { Language } from "../lib/language.js";

const reAlphabet = /^[aáâãàbcçdeéêfghiíjklmnoóôõpqrstuúvwxz]+$/u;
const reVowels = /[AÁÂÃÀEÉÊIÍJOÓÔÕUÚaáâãàeéêiíjoóôõuú]/;

export function testWord_pt_BR(word) {
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

export const ptBR = new Language("pt-BR", testWord_pt_BR);
