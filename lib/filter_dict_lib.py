import csv
import gzip
import unicodedata
from collections.abc import Callable, Iterable
from pathlib import Path


def iter_rows(path: Path) -> Iterable[list[str]]:
  with gzip.open(path, "rt", encoding="utf-8", newline="") as handle:
    yield from csv.reader(handle)


def filter_dict(input_file: Path, output_file: Path,
                is_valid_word: Callable[[str], bool]) -> None:
  total_rows = 0
  kept_rows = 0
  dropped_rows = 0
  malformed_rows = 0

  output_file.parent.mkdir(parents=True, exist_ok=True)
  with output_file.open("w", encoding="utf-8", newline="") as out_handle:
    writer = csv.writer(out_handle)

    for row in iter_rows(input_file):
      if kept_rows >= 30_000:
        break

      total_rows += 1

      if len(row) != 2:
        malformed_rows += 1
        continue

      word = unicodedata.normalize("NFC", row[0].strip().lower())
      count = row[1].strip()
      if not word or not count:
        malformed_rows += 1
        continue

      if is_valid_word(word):
        writer.writerow((word, count))
        kept_rows += 1
      else:
        dropped_rows += 1

  print(
    f"Finished {input_file} -> {output_file}. "
    f"Processed {total_rows:,} rows; kept {kept_rows:,}, "
    f"dropped {dropped_rows:,}, malformed {malformed_rows:,}.",
  )
