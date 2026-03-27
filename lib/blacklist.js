import chalk from "chalk";
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
        this.#words.add(this.stem(arg));
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
        this.#words.delete(this.stem(arg));
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
        console.log(chalk.gray(`Adding blacklist file ${file}`));
        const text = readFileSync(file, "utf-8");
        const lines = text.split(/\n/g).filter((line) => line.length > 0);
        for (let line of lines) {
          const index = line.indexOf("#");
          if (index !== -1) {
            line = line.substring(0, index);
          }
          const [word = "", theme = null, explanation = null] = line
            .split("|", 3)
            .map((item) => item.trim());
          if (word.length > 0) {
            this.add(word);
          }
        }
      }
    }

    return this;
  }

  allow(word) {
    return !this.forbid(word);
  }

  forbid(word) {
    return this.#words.has(word) || this.#words.has(this.stem(word));
  }

  stem(word) {
    return word.toLowerCase();
  }

  *[Symbol.iterator]() {
    for (const word of this.#words) {
      yield word;
    }
  }
}
