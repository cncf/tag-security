# Handling build-time dependency vulnerabilities

## Problem statement

Building software comes with a need for handling and managing dependencies,
including the management of fallout from any vulnerabilities found within those
dependencies. This problem is only made worse by large dependency trees that are
common in many software ecosystems. In this regard, there are a number of issues
to tackle, with the space of solutions for them being intertwined:

1. As a maintainer of a library, how do you ensure that vulnerabilities in your
   library (found by third-parties) are reported to you securely?
2. As a developer of a library, how do you advertise the discovery of a
   vulnerability to your dependents?
3. As a consumer of other libraries, how can you tell if one of your
   dependencies is affected by a vulnerability?
4. As a consumer of other libraries, how do you mitigate the effect of a
   vulnerability in a dependency? Does this change with how far up the
   dependency tree the issue is? How do you advertise the discovery of such
   vulnerabilities?

This document is intended as a high-level overview of policies for package
maintainers who have responsibilities for libraries and/or dependent projects.
For another take on the subject, see [this
article](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html).

## Mitigations

In the long run, the hope would be that the solutions to all of these issues
will be standardized across all software ecosystems. Users and developers alike
should find it facile to identify the issues in question. However, only some of
these issues have a suitable answer currently, and in many cases the answer is
ecosystem-dependent.

### Having vulnerabilities in your library reported to you

Vulnerabilities in your system should be reportable in a secure way that
minimizes risk to existing users while you implement fixes or mitigations.

While some vulnerabilities will be discovered by the developers and maintainers
of the library, others might be uncovered by researchers, users, or other third
parties. A secure, private channel must exist for them to disclose their
findings and seek advice or information on further steps. The channel must be
closely monitored, and should be clearly advertised as part of the security
policy.

Reports should be thoroughly investigated, with frequent updates to the
reporting party, and acknowledgement of their contribution following the public
disclosure.

More in-depth information can be found in [the guide for coordinated
vulnerability disclosure for open source
software](https://github.com/ossf/oss-vulnerability-guide) created by the
OpenSSF.

### Disclosing vulnerabilities in your library

Disclosure of vulnerabilities should generally be done in a standardized fashion
to allow downstream users to identify issues automatically regardless of how far
the library is on the dependency chain. The OpenSSF guide mentioned previously
also provides a thorough discussion of disclosure policies.

This is one of the few cases in which an industry-wide solution exists: issuing
a [Common Vulnerabilities and Exposures (CVE)](https://cve.mitre.org/) report,
usually stored in an official database, such as the [National Vulnerability
Database](https://nvd.nist.gov/).

Alternative databases and report formats exist, mostly on an ecosystem level -
you can see a list of OpenSSF-endorsed alternatives for specific ecosystems
[here](https://github.com/ossf/osv-schema). An aggregator for these alternatives
can be found in [OSV](https://osv.dev/).

### Identifying vulnerabilities in your build-time dependencies

Checks for vulnerabilities in your project should happen automatically and
continuously.

Tooling around this issue typically piggybacks on a build system, such as
[`npm-audit`](https://docs.npmjs.com/cli/v8/commands/npm-audit) or
[`cargo-audit`](https://docs.rs/cargo-audit/latest/cargo_audit/index.html),
however more generic solutions exist (e.g., the GitHub Dependabot alerts).
Results from such tools should be treated similarly to any other disclosed
vulnerabilities related to the project.

### Mitigating and documenting vulnerabilities in dependency tree

Vulnerabilities reported by the tools mentioned in the previous section must be
thoroughly investigated, with prompt disclosure of the issue to users. The
outcome of this investigation should be made publicly available, however the
policy driving this process should also be clearly documented. The policy should
include:

- How detection of vulnerabilities among dependencies is achieved
- What the response is when such a vulnerability is found
- Where and how the response process is documented

This policy should be easily available for any client looking for
security-related information.

When it comes to actually mitigating the vulnerability, the exact course of
action should be dictated by:

- The severity of the vulnerability and how relevant it is in the context of
   your project.
- Whether there are options for updating your dependency tree to a version of
   the library that is not subject to the vulnerability, or that avoids the
   vulnerable library.
- Whether there are other mitigation steps that users of your project can take
   to avoid the vulnerability, particularly when a patch is not available.

Mitigations should be aligned with the severity of the issue, and should be as
comprehensive as possible.

When the possibility of updating your code depends on other, intermediate
libraries being updated first, you should pursue these changes with the library
maintainers and/or help fix the issue (if you can). The responsibility for
ensuring a timely update does not, however, lie with you in these circumstances.
If possible, alternative/temporary mitigations should be put in place or
documented.
