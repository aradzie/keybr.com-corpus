const reAlphabet = /^[абвгдежзийклмнопрстуфхцчшщъыьэюя]+$/u;
const reVowels = /[АЕИЙОУЫЭЮЯаеийоуыэюя]/;

export function testWord_ru(word) {
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
