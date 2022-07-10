#!/usr/bin/env bash
npm install -g cspell
git fetch origin main:main
git diff --name-only --diff-filter=AM main $HEAD | grep '\.md$' | xargs --no-run-if-empty -L1 npx cspell --show-suggestions -c ./ci/spelling-config.json
