const reAlphabet = /^[aąbcćdeęfghijklłmnńoóprsśtuwyzźż]+$/u;
const reVowels = /[AĄEĘIJOÓUYaąeęijoóuy]/;

export function testWord_pl(word) {
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
