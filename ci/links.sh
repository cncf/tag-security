#!/usr/bin/env bash

set -e
shopt -s globstar

FAILURE=0

git config --global --add safe.directory /usr/src/app
npm install -g markdown-link-check
git fetch origin main:main
# To run this on the entire repo, replace the following command with `$(find ./ -type f | grep .md)`
for file_name in $(git diff --name-only $HEAD main -- ./**/*.md); do
  npx markdown-link-check --config ./ci/link-config.json --progress --verbose "$file_name" || FAILURE=1
done

exit $FAILURE
