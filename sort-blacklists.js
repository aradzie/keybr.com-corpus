import { readFile, writeFile } from "node:fs/promises";
import { findFiles } from "./lib/io.js";

const paths = findFiles([
  "blacklist/**/*.txt",
  "lang-*/blacklist*.txt",
  "lang-*/blacklist/**/*.txt",
]);

for (const path of paths) {
  const match = path.match(/(?:^|\/)lang-([A-Za-z]+(?:-[A-Za-z]+)?)(?:\/|$)/);
  const localeId = match?.[1] ?? "en-US";
  console.log(`${path}|${localeId}`);
  const collator = new Intl.Collator(localeId);
  const words = (await readFile(path, "utf-8"))
    .split("\n")
    .map((line) => line.trim().normalize("NFC"))
    .filter((line) => line.length > 0);
  const unique = [...new Set(words)];
  const sorted = unique.sort((a, b) => collator.compare(a, b));
  await writeFile(path, sorted.join("\n") + "\n");
}
