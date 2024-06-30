# Security resources for projects

This directory is intended to provide CNCF and other open source projects with
resources and templates to assist in kick-starting their security practices.
The templates, guides, and other documents herein assist projects in completion
of the [self-assessment](./community/assessments/guide/self-assessment.md) as well as a few
items in the [CII badging](https://bestpractices.coreinfrastructure.org/en)
process.

We use `<!-- TODO: ... -->` to indicate where action is required but
you won't see those comments when viewing the markdown file in GitHub unless you
view the raw text.

A special thank you to [Google's OSS vulnerability guide
folks](https://github.com/google/oss-vulnerability-guide) for making the
Security TAG aware of this collection of resources upon which much of this
content was built on.

* [SECURITY.md](templates/SECURITY.md)
  * draft security file that outlines subscribing to security bulletins, how
      to report issues, and supported versions.
* [SECURITY_CONTACTS.md](templates/SECURITY_CONTACTS.md)
  * a draft security contacts file to allow potential issue submitters to know
      who they can expect to hear from or how to follow up on issues.
* [ISSUE_TEMPLATE.md](templates/ISSUE_TEMPLATE.md)
  * a draft issue template to remind issue submitters that potential
      vulnerabilities **do not** get submitted as issues.
* [incident-response.md](templates/incident-response.md)
  * a draft, detailed incident response plan that covers how to triage issues,
      confirm vulnerabilities, leverage security advisories, and push a
      patch/release.
* [embargo-policy.md](templates/embargo-policy.md)
  * a draft embargo policy that outlines the time frame and conditions
      surrounding disclosures.
* [embargo.md](templates/embargo.md)
  * a draft embargo notification that details the contents a notification should
    contain.

Disclaimer: These resources are designed to be helpful to projects and
organizations, they require customization and configuration by the project
intending to use them. It does not prevent security issues from being found on a
project, will not automatically resolve them, and does not place CNCF Security
TAG as the responsible party. If changes are made to these templates, projects
are not required to pull in a new update.

## Dependabot Configuration

All public repositories have dependabot graphs and alerts enabled. Projects are
encouraged to also *[enable Dependabot security
updates](https://docs.github.com/en/code-security/supply-chain-security/managing-vulnerabilities-in-your-projects-dependencies/configuring-dependabot-security-updates)*
and *create a [custom configuration for their
project](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/enabling-and-disabling-version-updates)*.

## CNCF project templates

In addition to the security resources provided here, [CNCF's TAG Contributor
Strategy](https://github.com/cncf/tag-contributor-strategy/blob/main/README.md)
has put together an [initial project template
collection](https://github.com/cncf/project-template) with information on
getting started.

## Updates to this directory

The project-resources directory is intended to be a living directory to include
a lot of resources and templates any project or community may find useful as
well as making those projects more security aware through simple and
easy-to-adopt documentation. Updates, suggestions for updates, or discussions
for updates should initiate with an
[issue](https://github.com/cncf/tag-security/issues) and labeled with
"suggestion".

### Contributing updates

All members of the community and projects are welcome to contribute updates to
this directory. We ask potential contributors to refer to the existing content
and discussions as guidance when determining the content of their updates.

It is highly recommended that you seek peer review for your updates beyond that
of the Technical Leads and Chairs. More information on contributions to this
repo may be found in the [contributing file](../CONTRIBUTING.md).

#### New templates & updating contribute.cncf.io

The templates within this folder are linked for availability on the
contribute.cncf.io site. Should new templates be added to this folder or
additional security insights and instructions for maintainers be added, the
contribute.cncf.io site should be updated.

There are two core areas that updates that need to occur:

* maintainers > github > templates for new templates
* maintainers > community > project-health for general security guidance on
  keeping the project secure

To make updates to contribute.cncf.io, please refer to their [contributing guide](https://cncf-contribute.netlify.app/about/contributing/).
