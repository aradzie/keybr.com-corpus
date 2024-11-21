#!/usr/bin/env bash

for file in dict-*.csv.gz; do
  if [ -f "$file" ]; then
    gunzip "$file"
  fi
done
