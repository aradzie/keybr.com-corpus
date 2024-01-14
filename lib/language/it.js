const reAlphabet = /^[abcdefghijklmnopqrstuvwxyz]+$/u;
const reVowels = /[AEIJOUYaeijouy]/;

export function testWord_it(word) {
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
