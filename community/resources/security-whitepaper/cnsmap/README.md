# Cloud Native Security Map

## About the Cloud Native Security Map

The Cloud Native Security Map (CNSMAP) is a interactive medium for the
consumption of the security whitepaper. In addition to the content of the
whitepaper, the cloud native security map also provides additional practitioner
context and corresponding cloud native projects.

The CNSMAP is hosted at: <https://cnsmap.netlify.app/>

### Goals and Non-goals

Goals

- Provide a mapping of CNCF and open source projects to areas of CN Security
  whitepaper
- Provide a practical viewpoint and information on topics in the CN Security
  whitepaper
- Identify gaps in CN Security ecosystem and provide recommendations to TOC
- Help educate practitioners of what technologies can be used in practice and
  how they tie into each other
- Provide practical tips or examples for how to use tools within this category,
  or why they are important (i.e. example breaches, etc.)
- Provide a reference for frameworks to utilize when developing CN Security
  solutions and architectures.

Non-goals:

- Not an implementation guide on how to implement CN Security
- Demonstrative, not procedural
- Not a checklist of what to do
- Not one technology focused (i.e. not taking 1 reference architecture and
  developing the landscape around it).

### Project listings

In order to have more useful information and stability, there are some
guidelines by which projects are selected to be listed in the CNSMAP. These are
used as guiding principles and projects listed generally meet most of these
properties.

- Number of contributors: Ideally at least 3 maintainers/contributors to be able
  to continue supporting the project if some contributors are not able to keep
  working on the project. This is common practice for having good continuity
  criteria.
- Lifetime of the project: The project should be 6 months old or more, this
  helps provides confidence in the project through remediation or tracking of initial
  bug fixes discovered in the first few public versions.
- Backing by a foundation and strong governance: Projects that are part of the
  CNCF, Linux Foundation, or other type of open source foundation is an
  indication that there is strong and open governance of the project.
- Multi-organization governance: Projects that have maintainers that are from
  multiple organizations are favored to prevent organizational single point of
  failure or control for the project.
- Security tab available for the project on the github or code hosting platform:
  People have the opportunity to communicate security flaws but also identify
  how the security policy is defined for that project. This shows maturity of
  security process of the project.
- Contributions in the last 12 months: There is activity and the project does not
  appear to be abandoned, the contributions are meaningful.
- Releases in the last 12 months: The maintainers/contributors are updating the
  project and new versions are released within the last year of the project to
  be included in the listing.
- Issues closed within 6 months: Issues reported by users or contributors are
  closed in a reasonable amount of time.

## Logistics

### Code and content

The Cloud Native Security Map content and code is located in the [CNSMAP
branch](https://github.com/cncf/tag-security/tree/cnsmap). All content is
maintained within the [content
subfolder](https://github.com/cncf/tag-security/tree/cnsmap/content).

### Community

#### Questions

Join the
[#tag-security-whitepaper-map](https://cloud-native.slack.com/archives/C01NT4P84AK)
slack channel to join the discussions.

#### Contributing to the CNSMAP

The CNSMAP is a live document and needs to be continuously
be updated to meet the current landscape of projects that
adhere to the goals set forth in this document.

To contribute, you may open a PR against the [CNSMAP
branch](https://github.com/cncf/tag-security/tree/cnsmap).

### Hosting

The current CNSMAP is hosted on [Netlify](https://netlify.com/), as part of the
CNCF account for account `cncf-sig-security` (not yet updated to TAG). The site
tracks the CNSMAP branch and deploys on new commits.
