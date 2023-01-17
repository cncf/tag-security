#!/usr/bin/env bash

npm install -g markdown-link-check
git fetch origin main:main
# To run this on the entire repo, replace the following command with `$(find ./ -type f | grep .md)`
for file_name in $(git diff --name-only $HEAD main); do
  if [[ $file_name == *".md" ]]; then
    npx markdown-link-check --config ./ci/link-config.json --progress --verbose "$file_name"
  fi
done
