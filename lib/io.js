import { globSync } from "glob";
import { createReadStream } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { createGunzip } from "node:zlib";
import { showDiff } from "./diff.js";

export function pathTo(...file) {
  return resolve(dirname(fileURLToPath(import.meta.url)), "..", ...file);
}

export function findFiles(patterns, strict = false) {
  const files = [];
  for (const pattern of patterns) {
    const found = globSync(pattern, {
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
  const input = createReadStream(file);
  const readLines = createInterface({
    input: file.endsWith(".gz") ? input.pipe(createGunzip()) : input,
    crlfDelay: Infinity,
  });
  for await (let line of readLines) {
    line = line.trim().normalize("NFC");
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

export async function readDict(file) {
  const dict = [];
  for await (const [col0, col1] of readCsv(file)) {
    if (col0 && col1) {
      const count = Number(col1);
      if (count > 0) {
        dict.push([col0, count]);
      }
    }
  }
  return dict;
}

export async function writeDict(file, dict) {
  try {
    showDiff(await readDict(file), dict);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
  const csv = dict.map(([word, count]) => `${word},${count}\n`).join("");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, csv);
}

export async function writeRejected(file, words) {
  const text = [...words].sort().join("\n");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, text);
}

export function dictPath({ id }) {
  return pathTo(`lang-${id}`, `dictionary-${id}.csv`);
}
