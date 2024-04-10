import { createReadStream, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { toCsv } from "./csv.js";
import { sortByCount } from "./dict.js";

export function resolveHome(file) {
  if (file.startsWith("~/")) {
    return join(homedir(), file.substring(2));
  } else {
    return file;
  }
}

export function pathTo(...file) {
  return resolve(dirname(fileURLToPath(import.meta.url)), "..", ...file);
}

export async function* readLines(file) {
  const readLines = createInterface({
    input: createReadStream(file),
    crlfDelay: Infinity,
  });
  for await (let line of readLines) {
    line = line.trim();
    if (line.length > 0) {
      yield line;
    }
  }
}

export async function* readCsv(file, separator = /\s+|;|,/) {
  for await (const line of readLines(file)) {
    yield line.split(separator);
  }
}

export function writeDict({ id }, dict) {
  dict = sortByCount(dict).slice(0, 10100);
  const csv = toCsv(dict);
  const path = pathTo(`build`, `words-${id}.csv`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, csv);
}
