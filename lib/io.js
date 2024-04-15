import {
  createReadStream,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { fromCsv, toCsv } from "./csv.js";
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
  const csv = toCsv(sortByCount(dict).slice(0, 10100));
  const path = pathTo(`build`, `dictionary-${id}.csv`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, csv);
}

export function readDict({ id }) {
  const path = pathTo(`build`, `dictionary-${id}.csv`);
  const csv = readFileSync(path, "utf-8");
  return fromCsv(csv);
}
