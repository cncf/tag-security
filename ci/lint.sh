#!/usr/bin/env bash

npm install -g markdownlint-cli
git fetch origin main:main
# To run this on the entire repo, replace the following command with `$(find ./ -type f | grep .md)`
for file_name in $(git diff --name-only $HEAD main); do
  if [[ $file_name == *".md" ]]; then
    markdownlint -c ./ci/lint-config.json "$file_name"
  fi
done
