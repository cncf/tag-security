#!/usr/bin/env bash

npm install -g cspell
git fetch origin main:main
git diff --name-only main $HEAD | grep .md | grep . && xargs -L1 npx cspell -c ./ci/spelling-config.json || echo "no markdown files changed"