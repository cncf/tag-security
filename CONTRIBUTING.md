# Contributing

We welcome new contributors to this community. If you are contributing to the
CNCF and/or TAG-Security for the first time, it's okay if you feel overwhelmed.
We, as a community, are here to help you with any problems you face. Open
source is about collaboration and supporting each other.

## Get Involved

To become familiar with the team and understand how you will contribute, start
by reading our [TAG Security charter].

New members are advised to:

- Join the [CNCF Slack], and introduce yourself on the the [#tag-security]
  channel.
- Review the following documents:
  - [README.md]
  - [CODE-OF-CONDUCT.md]
- Get involved by:
  - Joining the meetings and expressing your area of interest or if you want to
    work on any specific issue.
  - Expressing your thoughts or asking questions on an issue you find
    interesting.
  - Choosing an issue where [help is needed] and commenting on it to express
    interest.

## Contribute to this Repo

As a new contributor, you might find it difficult to know where to start. Don't
worry! We've got you covered.

To get more people involved, we have issues marked as [good-first-issues].
These issues have a smaller scope and are great to start with. If the details
on how to resolve an issue are missing or incomplete, please tag the person who
created the issue.

### Before Your First PR

Before you make your first PR, please review the following resources:

- [How to submit contributions]
- [Collaborating with pull requests]

Our PRs follow a particular writing style. Check out the [style guide].

## Give Pull Request (PR) Reviews

Except for urgent or very small grammar or spelling fixes, we leave pull
requests open for at least 24 hours for review/comment.

A favorable review is determined by the PR's compliance with the contributing
guide, writing style, and alignment with the TAG goals, objectives, and scope.
PRs should be discussed with TAG members via Slack or issues before submission.

Reviewer suggestions that are not required (but may increase the quality of the
contribution) should be highlighted by the reviewer as a "nit." These are
different from items that are preferred by the repo's style which should be
consistently applied.

### Preferred Language

Preferred language changes are minor but important suggestions and changes
encouraged for consistency in the repo, not to be confused with nits.

Example of preferred language change:

```markdown
They use cloud-native technologies with a clear understanding of risks and
the ability to validate that their security policy decisions are reflected in
deployed software.
```

Example Reviewer Comment:

> Per TOC definition, "cloud native" is not hyphenated.

### Nits

Reviewers are encouraged to limit the amount of nitpicking done on a
contribution. If there is a significant number of small errors, create a
summary comment discussing the trend that should be addressed instead.

Example of a nit change:

```markdown
They use cloud technologies with a clear understanding of risks and the ability
to validate that their security policy decisions are reflected in deployed
software.
```

Example Reviewer Comment:

> "Ability" is a human-oriented term; "capability" is more technical and may
  be more appropriate.

### Merging Pull Requests

PRs may be merged after at least one qualified review has occurred, depending
on the type of changes reflected in the PR. The merging party needs to verify a
review has occurred, the PR aligns with this guide, and is in scope of the TAG.

## Communicate with the TAG

Join the mailing list and other [communication channels]. We encourage
participation in any way possible, supporting asynchronous communication and
contributions to our documentation.

### Reporting Security Issues

This group engages in [security reviews] of projects to improve their security
posture. Discussions about potential issues must adhere to the project's
security reporting process and remain close-held to ensure responsible
disclosure.

### Identifying and Creating Slack Channels

TAG-Security channels are identified with the "tag-security-" prefix. Only
chairs or tech leads should create tag-security-related channels. Channels
should include a header for their purpose. Refer to the [CNCF Slack guidelines]
for more information.

### Code of Conduct

All contributors are expected to abide by the [code of conduct].

### Posting Outside Content

TAG-Security channels are for cloud native security discussions. Outside
content should be relevant to the cloud native community and not
self-promoting.

## Present to the TAG

Part of the STAG activities include having guest presentations by members of the community.
We welcome any topic related to our mission and charter. Typical topics include projects,
real-world use-cases, challenges or success stories. However, presentations must follow the
following guidelines.

### Guidelines

- Presentations are encouraged to expose the TAG to cloud native open source projects, cloud native security concepts, and other cloud native or security groups.
- Presentations should fit with [our charter](https://github.com/cncf/toc/blob/main/tags/tag-charters/security-charter.md)
- Presentations should not be scheduled on the Agenda until the issue is filled in and the TAG representative has performed due diligence on the issue
- Presentations should abide by the CNCF code of conduct

Examples of topics that are within scope:

- Open source project presentations
- Security use-cases and case studies
- Open source community efforts - whitepapers, communities, standards, etc.

Examples of topics that do NOT meet the guidelines:

- Vendor pitches and marketing heavy presentations
- Topics unrelated to security
- Topics that are help desk questions, that have a definitive, known searchable answer

## Writing Style

Consistency creates clarity in communication. If you find yourself correcting
for consistency, propose additional style guidelines via PR to this document.

Here are some additional sources for good content guidelines:

- [18F Content Guide]

### Common Terms

- When referring to users and use cases, ensure consistency with [use cases].
- See the [CNCF Style Guide] for common terms. Note that "open source" and
  "cloud native" are not hyphenated and all lower case, except at the beginning
  of a sentence.

### Additional Formatting

- Headlines, page titles, subheads, and similar content should follow sentence
  case and should not include a trailing colon.
- Paragraphs should not start with leading indents.
- Wrap lines at 80 characters, except where it would break a link.
- Place markdown links together at the bottom of the file.

### File & Directory Naming Conventions

- Every directory should have a README.md with useful introductory text.
- All other file and directory names should be all lower case with dashes to
  separate words.

[good-first-issues]: https://github.com/cncf/tag-security/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22
[How to submit contributions]: https://opensource.guide/how-to-contribute/#how-to-submit-a-contribution
[Collaborating with pull requests]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests
[style guide]: #writing-style
[TAG Security charter]: governance/charter.md
[CNCF Slack]: https://slack.cncf.io/
[#tag-security]: https://cloud-native.slack.com/messages/CDJ7MLT8S
[README.md]: README.md
[CODE-OF-CONDUCT.md]: CODE-OF-CONDUCT.md
[help is needed]: https://github.com/cncf/tag-security/labels/help%20wanted
[communication channels]: README.md#Communications
[security reviews]: /community/assessments/README.md
[CNCF Slack guidelines]: https://github.com/cncf/foundation/blob/main/slack-guidelines.md
[code of conduct]: ./CODE-OF-CONDUCT.md
[CNCF Style Guide]: https://github.com/cncf/foundation/blob/main/style-guide.md
[18F Content Guide]: https://content-guide.18f.gov/
