#!/usr/bin/env bash

set -e
shopt -s globstar

FAILURE=0

git config --global --add safe.directory /usr/src/app
npm install -g markdownlint-cli
git fetch origin main:main
# To run this on the entire repo, replace the following command with `$(find ./ -type f | grep .md)`
for file_name in $(git diff --name-only $HEAD main -- ./**/*.md); do
  markdownlint -c ./ci/lint-config.json "$file_name" || FAILURE=1
done

exit $FAILURE
