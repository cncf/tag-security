#!/usr/bin/env bash

npm install -g cspell
git fetch origin main:main
git diff --name-only main $HEAD | xargs -L1 npx cspell -c ./ci/cspell.json -u -e ci/
