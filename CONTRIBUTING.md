## Contributing

We aspire to create a welcoming environment for collaboration on this project
and ask that all contributors do the same. For more details, see our
[code of conduct](CODE-OF-CONDUCT.md).

This document covers contributions to this git repository. Please review
[governance](governance) for our mission, charter, and other operations.

### Open source

While this repository does not contain open source code, we manage content
contributions following open source practice, as detailed below.

All contributions to this project will be released under the
[Apache License](LICENSE) By submitting a pull request (PR), you are agreeing to
release the PR contents under this license.

## Communication

Anyone interested in contributing should join the mailing list and other
[communication channels](README.md#Communications)

### Reviewing Pull Requests

If you are new to the group, reviewing pull requests and commenting on issues is
a great way to get involved!  We strongly encourage and support all our members
to participate in anyway they can.

Except for urgent or very small grammar or spelling fixes, such as simple changes discussed below, we leave pull
requests open for at least 24 hours, so that others have the chance to
review/comment.

#### Favorable review

A favorable review is determined by the contents of the PR complying with the
contributing guide, the writing style, and agreement the contents align with the
TAG's goals, objectives, and scope.  It is anticipated that PRs submitted, with
the exception of spelling and grammar changes, have been discussed with members
of the TAG via slack or issues.

##### Nits

Nits are minor suggestions and changes that are strongly encouraged to be
identified and resolved to provide consistency in the repo.  Preferential
language or language that is a matter of preferred usage are not considered
nits.

An example of preferential language:
> They use cloud technologies with clear understanding of risks and the ability to validate that their security policy decisions are reflected in deployed software.

> ability is a human oriented term, capability is more technical and may be more appropriate
```suggestion
They use cloud technologies with clear understanding of risks and the capability to validate their security policy decisions are reflected in deployed software.
```

An example of a nit:
> They use cloud-native technologies with clear understanding of risks and the ability to validate that their security policy decisions are reflected in deployed software.

> per TOC definition of cloud native, it is not hyphenated
```suggestion
They use cloud technologies with clear understanding of risks and the ability to validate that their security policy decisions are reflected in deployed software.
```

#### Simple changes

Simple changes are defined as:
* spelling, typo, grammar
* clarifications, minor updates

A person without access, other than the PR author, can and _is_ encouraged to
review a PR and comment/+1 that they have done a review and found it favorable.
A person with access, including the PR author, may then perform the merge.

A person with access, other than the PR author, can both review **and** merge a
PR if found favorable after review.

[Code owners](CODEOWNERS.md) need to be at least one concurring reviewer or the
merging party.

#### Siginificant changes

Significant changes are defined as:
* major changes to the repo
* extensive changes to repo contents
* other items as determined by the Technical Leads and Co-Chairs (to be updated
  here as they occur)

A person without access, other than the PR author can and _is_ encouraged to
review a PR and comment/+1 that they have done a review and found it favorable.
A second person with access, other than the PR Author, must also review the PR
and provide concurrence prior to merging.

Two persons with access, other than the PR author, must review the PR and
provide concurrence, the last of which should perform the merge.

[Code owners](CODEOWNERS.md) need to be at least one concurring reviewer or the
merging party.

### Merging pull requiests

PRs may be merged after at least one review as occurred, dependent on the type of changes reflected in the PR.  The merging party needs to verify a review has occurred, the PR is in alignment with this guide, and is in scope of the TAG.

### Writing style

Consistency creates clarity in communication.

* Common terms
  * When referring to users and use cases, ensure consistency with [use cases](usecase-personas/)
  * See [CNCF Style Guide](https://github.com/cncf/foundation/blob/master/style-guide.md) for common terms. Note that the following terms are not hyphenated and all lower case, except for capitalizing the first letter when at the beginning of a
sentence:
    * open source
    * cloud native
* Additional Formatting
  * Headlines, page titles, subheads and similar content should follow sentence
    case, and should not include a trailing colon.
  * Paragraphs do not start with leading indent.
  * Wrap lines at 80 characters, except where it would break a link. No need to
    reformat the whole paragraph to make it perfect -- fewer diffs are easier
    for reviewers.
* File & directory naming conventions
  * every directory should have a README.md with useful introductory text
  * all other file and directory names should be all lower case with dashes
    to separate words

If you find yourself correcting for consistency, please propose additional style
guidelines via pull request to this document. Feel free to add references to
good sources for content guidelines below.

Sources:
* [OpenOpps Contribution Guide](https://github.com/openopps/openopps-platform/blob/master/CONTRIBUTING.md)
* [18F Content Guide](https://content-guide.18f.gov/)
