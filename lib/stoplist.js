export class Stoplist {
  #words;

  constructor() {
    this.#words = new Set();
  }

  add(...args) {
    for (const arg of args) {
      if (Array.isArray(arg)) {
        for (const item of arg) {
          this.add(item);
        }
      } else {
        this.#words.add(arg);
        this.#words.add(arg.toLowerCase());
      }
    }
    return this;
  }

  allow(word) {
    return !this.forbid(word);
  }

  forbid(word) {
    return this.#words.has(word) || this.#words.has(word.toLowerCase());
  }

  *[Symbol.iterator]() {
    for (const word of this.#words) {
      yield word;
    }
  }
}
