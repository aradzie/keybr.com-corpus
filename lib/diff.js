import chalk from "chalk";

export function dictDiff(oldDict, newDict) {
  const oldWords = new Set(oldDict.map(([word]) => word));
  const newWords = new Set(newDict.map(([word]) => word));
  const deleted = [];
  const added = [];
  for (const word of oldWords) {
    if (!newWords.has(word)) {
      deleted.push(word);
    }
  }
  for (const word of newWords) {
    if (!oldWords.has(word)) {
      added.push(word);
    }
  }
  return { deleted, added };
}

export function showDiff(oldDict, newDict) {
  const { deleted, added } = dictDiff(oldDict, newDict);
  if (deleted.length) {
    console.log(
      `Deleted words (${deleted.length}) ${chalk.red(deleted.join(", "))}`,
    );
  }
  if (added.length) {
    console.log(
      `Added words (${added.length}) ${chalk.green(added.join(", "))}`,
    );
  }
}
