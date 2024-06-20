#!/usr/bin/env bash

set -eo pipefail
shopt -s globstar

function spellcheck () {
    FAILURE=0
    git diff --name-only --diff-filter=AM main $HEAD -- ./**/*.md | \
        xargs --no-run-if-empty -L1 npx cspell --show-suggestions -c ./ci/spelling-config.json || FAILURE=1
    return $FAILURE
}

function printhelp () {
    echo
    echo "Spelling errors detected in markdown files (see above output for details)."
    echo "If the errors are names, external links, or unusual but accurate technical words,"
    echo "then you should create an inline comment like:"
    echo "<!-- cSpell:ignore someword someotherword -->"
    echo "Of course, you should only include non-dictionary words that are correctly spelled!"
    echo
    echo "If the error happens because of a common technical term or proper name that is likely"
    echo "to appear many times, then please edit \"ci/spelling-config.json\" and add it to the"
    echo "\"words\" list."
    echo

    return 1
}


git config --global --add safe.directory /usr/src/app
npm install -g cspell
git fetch origin main:main
# Print help if spellcheck fails
spellcheck || printhelp
