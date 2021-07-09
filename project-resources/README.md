# Security resources for projects

This directory is intended to provide CNCF and other open source projects with
resources and templates to assist in kick-starting their security practices.  The
templates, guides, and other documents herein assist projects in completion of
the [self-assessment](assessments/guide/self-assessment.md) as well as a few
items in the [CII badging](https://bestpractices.coreinfrastructure.org/en).

A special thank you to [Google's OSS vulnerability guide
folks](https://github.com/google/oss-vulnerability-guide) for making the
Security TAG aware of this collection of resources upon which much of this
content was built on.

* [SECURITY.md](templates/SECURITY)
  * draft security file that outlines subscribing to security bulletins, how
      to report issues, and supported versions.
* [SECURITY_CONTACTS.md](templates/SECURITY_CONTACTS)
  * a draft security contacts file to allow potential issue submitters to know
      who they can expect to hear from or how to follow up on issues.
* [ISSUE_TEMPLATE.md](ISSUE_TEMPLATE.md)
  * a draft issue template to reminder issue submitters that potential
      vulnerabilities **do not** get submitted as issues.
* [incident-response.md](incident-response.md)
  * a draft, detailed incident response plan that covers how to triage issues,
      confirm vulnerabilities, leverage security advisories, and push a
      patch/release.
* [embargo-policy.md](embargo-policy.md)
  * a draft embargo policy that outlines the time frame and conditions
      surrounding disclosures.
* [embargo.md](embargo.md)
  * a draft embargo notification that details the contents a notification should
    contain.

## CNCF project templates

In addition to the security resources provided here, [CNCF's TAG Contributor
Strategy](https://github.com/cncf/tag-contributor-strategy/blob/main/README.md)
has put together an [initial project template
collection](https://github.com/cncf/project-template) with information on
getting started.
