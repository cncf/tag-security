# Security TAG Charter

This charter describes operations as a [CNCF TAG](https://github.com/cncf/toc/tree/main/tags). The [Focus](#focus) section below describes what is in and out of scope,
and [Governance](#governance) section describes how our operations are consistent with CNCF policies with links to more detailed documents.

**Mission:** to reduce risk that cloud native
applications expose end user data or allow other unauthorized access.

## Motivation
Security has been an area in which open source can flourish and sometimes
has done so; however, with cloud native platforms and applications, security
has received less attention than other areas of the cloud native landscape.

This means that there is less visibility about the internals of security
projects, and fewer projects being deeply integrated into cloud native tooling.
While there are many open source security projects, there are fewer security
experts focused on the cloud native ecosystem. This has contributed to a culture
where people feel they cannot understand how to securely set up and operate
cloud native systems, due to obscurity and uncertainty. Cloud native principles
have encouraged the development of tools that help manage fast changing
environments, and which have the promise of both simplifying and improving
security.

Making security more open and understandable is an essential part of this
change. Talking to customers, security is the most important and least
understood part of the cloud native transition. Security is not an easy field,
and it is difficult to measure and value the inputs precisely, which can also
cause issues with evaluation of security software and designs.

Distributed deployments across heterogeneous infrastructure are increasingly
common for cloud native applications.
Without common ways to programatically ensure consistent policy,
it is increasingly difficult to evaluate system architecture security at scale.
Emerging common architectural patterns offer the opportunity
improve overall security in cloud native systems.

## Focus

In addition to the [CNCF security-related projects](cncf-projects.md), there
are three key focus areas:
* Protection of heterogeneous, distributed and fast changing systems, while
providing needed access
* Common understanding and common tooling to help developers meet security
requirements
* Common tooling for audit and reasoning about system properties.


### In scope

Terminology note: Security TAG uses the term "end user" to describe the humans
who use cloud native applications, whereas CNCF refers to companies that operate
cloud native systems as CNCF End Users. In the context of security, we often
need to discuss how a particular control affects the people who use the software
deployed by a company or organization.

When we use the word "security" within this group, it is defined to be inclusive
of concerns that affect the integrity of the a cloud native
system or the privacy of its users,  specifically how to enable secure
access, policy control and safety for operators, administrators,
developers, and end-users  across the cloud native ecosystem.

Security TAG will consider [proposals](process.md) from its members or delegated
tasks from the CNCF TOC that are consistent with the mission, including
the following activities:

* Publish educational resources on cloud native security
  * Videos and/or slides from invited presentations by security providers and use cases
  * Answer the following questions (referring to already existing resources where possible):
      * What is different about cloud security? (including hybrid and multi-cloud)
      * What are effective practices for implementing policy controls?
      * How can we test, validate, explain, audit our systems?
      * What additional measures are needed, specific to cloud, in highly regulated environments?
  * Personas and use cases
  * Common vocabulary to talk about and understand cloud native security
  * CNCF project ecosystem & landscape
  * Define security scenarios (e.g. network configuration, application security, service orchestration)
  * Block architecture(s) for secure access
  * Highlight trade-offs (e.g. Expressibility vs Explainability)
  * Best practices and anti-patterns (potentially highlighting where there is disagreement on these)
* Security assessments of specific proposals or projects
* Identify projects for consideration for CNCF
* Cross-pollinate knowledge by participating and inviting people from other projects and TAGs to share security practices
* Integrate relevant external standards, such as from CII or NIST, as part of educational resources and/or TAG processes

Given that the group is comprised of volunteers, specific requests from the TOC
may be queued according to the bandwidth of the group. The co-chairs will
facilitate prioritization under the guidance of the Security TAG TOC liaison.

### Out of scope
* Not a standards body: We won't be creating standards.
* Not an umbrella organization: We interact with other groups for knowledge
  sharing, not decision-making.
* Not a compliance body
* Not a certification board for security of individual projects
* We will not
  * answer any specific questions regarding the state of security of any project
    or product
  * consider device security unless there is some impact to cloud systems.
  * explore trust and safety concerns that are not specific to cloud
    (e.g. fraud detection, user generated content moderation, spam filtering,
    phishing, cross-site scripting attacks, SQL injection, etc.)
* We will not ensure the safety of any operational system.
* This is not related to vulnerability detection and handling any specific
  security vulnerability or attack.

## Governance

Security must be addressed at all levels of the stack and across the whole
ecosystem, so the group seeks to encourage participation and membership across
a wide range of roles, from diverse companies and organizations.

### Cross-group relationships
To focus our efforts, we avoid duplication by developing relationships with
other groups that
focus on a particular technology (such as Kubernetes SIGs) or have a broader
mandate (such as government organizations).

As a guide to visitors, we maintain the list of groups in the TAG
[README](https://github.com/cncf/tag-security#related-groups).

Co-chairs are responsible to ensure periodic cross-group knowledge sharing,
which is accomplished by cross-group membership, invitation to present at
a TAG meeting and/or offering to present to the related group.

## Operations
Security TAG operations are consistent with standard TAG operating guidelines
provided by the CNCF Technical Oversight Committee
[TOC](https://github.com/cncf/toc).

Full details of process and roles are linked from [governance README](/governance).
