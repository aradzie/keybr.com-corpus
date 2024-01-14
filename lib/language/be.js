const reAlphabet = /^[абвгдежзійклмнопрстуўфхцчшыьэюя]+$/u;
const reVowels = /[АЕІЙОУЎЫЭЮЯаеійоуўыэюя]/;

export function testWord_be(word) {
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
