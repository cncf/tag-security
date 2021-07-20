# Cloud Native Security Map

## About the Cloud Native Security Map

The Cloud Native Security Map(cnsmap) is a interactive medium for the
consumption of the security whitepaper. In addition to the content of the
whitepaper, the cloud native security map also provides additional practitioner
context and lists of cloud native projects.

The cnsmap mirror is hosted at: <https://cnsmap.vercel.app/>

### Goals and Non-goals

Goals

- Provide a mapping of CNCF and open source projects to areas of CN Security
  whitepaper
- Provide a practical viewpoint and information on topics in the CN Security
  whitepaper
- Identify gaps in CN Security in the ecosystem and make recommendations to TOC
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

In order to have more useful information and stability, there are some guidelines by which projects are selected to be listed in the CNSMAP. These are used as guiding principles and projects listed generally meet most of these properties.
- Number of contributors: Ideally at least 3 maintainers/contributors to be able to continue supporting the project if some contributors are not able to keep working on the project. This is common practice for having good continuity criteria.
- Lifetime of the project: The project should be more than 6 months older, this helps to have more confidence in the project potentially due to initial bug fixes discovered in the first few public versions.
- Backing by a foundation and strong governance: Projects that are part of the CNCF, Linux Foundation, or other type of open source foundation is an indication that there is stronger and open governance of the project.
- Multi-organization governance: Projects that have maintainers that are from multiple organizations are favored to prevent an organization single point of failure or control for the project.
- Security tab available for the project on the github or codehost platform: People have the opportunity to communicate security flaws but also identify how the security policy is defined for that project. This shows maturity of security process of the project.
- Contributions in the last 12 months: There is activity and the project should not be abandoned, the contributions are meaningful.
- Releases in the last 12 months: The maintainers/contributors are updating the project and new versions are released within the last year of the project to be included in the listing.
- Issues closed within 6 months: Issues reported by users or contributors are closed in a reasonable time.

## Logistics

### Code and content

The Cloud Native Security Map content and code is located in the [cnsmap
branch](https://github.com/cncf/tag-security/tree/cnsmap). All content is
maintained within the [content
subfolder](https://github.com/cncf/tag-security/tree/cnsmap/content).

### Community

To contribute, you may open a PR against the [cnsmap
branch](https://github.com/cncf/tag-security/tree/cnsmap). Also join the
[#tag-security-whitepaper-map](https://cloud-native.slack.com/archives/C01NT4P84AK)
to join the discussions.

### Hosting

The current mirror is hosted on [Vercel](https://vercel.com/). However, because
of organizational restrictions on Vercel accounts, the code is currently hosted
from [lumjjb/cnsmap](https://github.com/lumjjb/cnsmap) which tracks the upstream
branch with eventual consistency.
