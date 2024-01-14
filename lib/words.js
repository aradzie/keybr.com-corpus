export function* scanWords(text, testWord = (word) => true) {
  text = text.normalize("NFC");
  const regexp = /(\p{L}|\d|'|-)+/gu;
  while (true) {
    const match = regexp.exec(text);
    if (match == null) {
      break;
    }
    const word = match[0];
    if (testWord(word)) {
      yield word;
    }
  }
}
