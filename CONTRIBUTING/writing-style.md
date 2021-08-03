# Writing style

Consistency creates clarity in communication.

If you find yourself correcting for consistency, please propose additional style
guidelines via pull request to this document. Feel free to add references to
good sources for content guidelines at the bottom of this guide.

<!-- cSpell:ignore usecase --->
## Common terms

* When referring to users and use cases, ensure consistency with
  [use cases](/usecase-personas/)
* See [CNCF Style Guide][cncf-style] for common terms. Note that the following
  terms are not hyphenated and all lower case, except for capitalizing the
  first letter when at the beginning of a sentence:
  * open source
  * cloud native

## Additional formatting

* Headlines, page titles, subheads and similar content should follow sentence
  case, and should not include a trailing colon.
* Paragraphs do not start with leading indent.
* Wrap lines at 80 characters, except where it would break a link. No need to
  reformat the whole paragraph to make it perfect -- fewer diffs are easier
  for reviewers.

## File & directory naming conventions

* Every directory should have a README.md with useful introductory text.
* All other file and directory names should be all lower case with dashes to
  separate words.

## Sources

<!-- cSpell:ignore Opps --->
* [OpenOpps Contribution Guide][openopps-style]
* [18F Content Guide](https://content-guide.18f.gov/)

[cncf-style]: https://github.com/cncf/foundation/blob/master/style-guide.md
[openopps-style]: https://github.com/openopps/openopps-platform/blob/master/CONTRIBUTING.md
