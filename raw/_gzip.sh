#!/usr/bin/env bash

for file in dict-*.csv; do
  if [ -f "$file" ]; then
    gzip -9 "$file"
  fi
done
