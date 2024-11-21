export class Language {
  id;
  testWord;

  constructor(id, testWord) {
    this.id = id;
    this.testWord = testWord;
  }

  stem(word) {
    return word.toLocaleLowerCase(this.id);
  }

  *findWords(text) {
    const regexp = /(\p{L}|\d|'|-)+/gu;
    while (true) {
      const match = regexp.exec(text);
      if (match == null) {
        break;
      }
      const word = match[0];
      if (this.testWord(word)) {
        yield word;
      }
    }
  }
}
