import { Language } from "../lib/language.js";

const reAlphabet = /^[aàbcçdeéèfghijlmnopqrstuùvxyz]+$/u;
const reVowels = /[AÀEÉÈIJOUYaàeéèijouùy]/;

export function testWord_fr(word) {
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

export const fr = new Language("fr", testWord_fr);