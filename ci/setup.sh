#!/usr/bin/env bash

git fetch origin master:master
git diff --name-only master $HEAD > modified
echo "these files have changed"
cat modified
