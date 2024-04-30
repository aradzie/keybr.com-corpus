export function toCsv(dict) {
  return dict.map(([word, count]) => `${word},${count}\n`).join("");
}

export function fromCsv(text) {
  const words = [];
  for (const line of text.split(/[\r\n]+/)) {
    if (line.length > 0) {
      const [col0, col1] = line.split(/\s+|;|,/);
      if (col0 && col1) {
        const count = Number(col1);
        if (count > 0) {
          words.push([col0, count]);
        }
      }
    }
  }
  return words;
}
