#!/usr/bin/env bash

npm install -g cspell
git fetch origin master:master
git diff --name-only master $HEAD | xargs -L1 npx cspell
