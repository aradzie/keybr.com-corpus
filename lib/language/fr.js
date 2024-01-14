const reAlphabet = /^[abcçdeéèfghijlmnopqrstuvxyz]+$/u;
const reVowels = /[AEÉÈIJOUYaeéèijouy]/;

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
