import { glob } from "glob";
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

export function pathTo(...file) {
  return resolve(dirname(fileURLToPath(import.meta.url)), "..", ...file);
}

export function resolveHome(file) {
  if (file.startsWith("~/")) {
    return join(homedir(), file.substring(2));
  } else {
    return file;
  }
}

export async function findFiles(patterns, strict = false) {
  const files = [];
  for (const pattern of patterns) {
    const found = await glob(resolveHome(pattern), {
      cwd: pathTo("."),
      absolute: true,
      nodir: true,
    });
    if (found.length > 0) {
      files.push(...found);
    } else if (strict) {
      throw new Error(`No files found for pattern ${pattern}`);
    }
  }
  return files;
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
