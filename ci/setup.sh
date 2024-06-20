#!/usr/bin/env bash

set -e

git config --global --add safe.directory /usr/src/app
git fetch origin main:main
git diff --name-only main $HEAD > modified
echo "these files have changed"
cat modified
