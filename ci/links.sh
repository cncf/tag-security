#!/usr/bin/env bash

npm install -g markdown-link-check
git fetch origin master:master
for file_name in $(git diff --name-only $HEAD master); do
  if [[ $file_name == *".md" ]]; then
    npx markdown-link-check "$file_name"
  fi
done
