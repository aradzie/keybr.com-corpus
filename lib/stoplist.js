export class Stoplist {
  #language;
  #words;

  constructor(language) {
    this.#language = language;
    this.#words = new Set();
  }

  add(...args) {
    for (const arg of args) {
      if (Array.isArray(arg)) {
        for (const item of arg) {
          this.#words.add(item);
          this.#words.add(this.#language.stem(item));
        }
      } else {
        this.#words.add(arg);
        this.#words.add(this.#language.stem(arg));
      }
    }
    return this;
  }

  allow(word) {
    return !this.forbid(word);
  }

  forbid(word) {
    return this.#words.has(word) || this.#words.has(this.#language.stem(word));
  }
}
