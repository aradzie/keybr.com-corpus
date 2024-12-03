#!/usr/bin/env bash

for file in dict-*.csv; do
  if [ -f "$file" ]; then
    gzip --force -9 "$file"
  fi
done
