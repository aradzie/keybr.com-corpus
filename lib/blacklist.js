import { readFileSync } from "node:fs";
import { pathTo } from "./io.js";

export class Blacklist {
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
      } else if (arg.length > 0) {
        this.#words.add(arg);
        this.#words.add(arg.toLowerCase());
      }
    }
    return this;
  }

  delete(...args) {
    for (const arg of args) {
      if (Array.isArray(arg)) {
        for (const item of arg) {
          this.delete(item);
        }
      } else if (arg.length > 0) {
        this.#words.delete(arg);
        this.#words.delete(arg.toLowerCase());
      }
    }
    return this;
  }

  addFiles(...args) {
    for (const arg of args) {
      if (Array.isArray(arg)) {
        for (const item of arg) {
          this.addFiles(item);
        }
      } else {
        const file = pathTo(arg);
        console.log(`Adding blacklist file ${file}`);
        const text = readFileSync(file, "utf-8");
        const words = text.split(/\s+/g);
        this.add(words);
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
