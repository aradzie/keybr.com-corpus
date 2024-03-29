const reAlphabet = /^[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя]+$/u;
const reVowels = /[АЕЄИІЇЙОУЮЯаеєиіїйоуюя]/;

export function testWord_uk(word) {
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
