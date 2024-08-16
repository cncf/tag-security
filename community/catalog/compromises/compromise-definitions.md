# Types of Supply Chain Compromise

This document serves to provide a consistent set of definitions for the
Supply Chain Compromise Catalog.  The types of compromise may be expanded
in the future as new or more distinct compromises occur.  When this happens,
these definitions will be updated.

Index:

* [Dev Tooling](#dev-tooling)
* [Negligence](#negligence)
* [Publishing Infrastructure](#publishing-infrastructure)
* [Source Code](#source-code)
* [Trust and Signing](#trust-and-signing)
* [Malicious Maintainer](#malicious-maintainer)
* [Attack Chaining](#technique-attack-chaining)

## Dev Tooling

Occurs when the development machine, SDK, tool chains, or build kit have
been exploited.  These exploits often result in the introduction of a
backdoor by an attacker to own the development environment.

- _Mitigation_ - Use of trusted binary repositories. Verification of
provenance (i.e. signatures) and/or integrity (i.e. checksums) of
developer tooling downloads. Bootstrapping development toolchain from a
minimal, trusted and auditable seed (ideally source code).

_Reference(s)_:

- [Mitre: Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)

## Negligence

Occurs due to a lack of adherence to best practices. TypoSquatting attacks
are a common type of attack associated with negligence, such as when a
developer fails to verify the requested dependency name was correct
(spelling, name components, glyphs in use, etc).

_Reference(s)_:

- [Slashdot Article Regarding PyPI Attacks](https://developers.slashdot.org/story/17/09/16/2030229/pythons-official-repository-included-10-malicious-typo-squatting-modules)

## Publishing Infrastructure

Occurs when the integrity or availability of shipment, publishing, or
distribution mechanisms and infrastructure are affected.  This can result
from a number of attacks that permit access to the infrastructure.

- _Mitigation_ - This kind of compromise can be deterred or defeated by
implementing code-signing.  Code-signing requires attackers to perform
multiple operations to be successful, making the level of effort higher.

_Reference(s)_:

- [Mitre: Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)

## Source Code

Occurs when a source code repository (public or private) is manipulated
intentionally by the developer or through a developer or repository
credential compromise.  Source Code compromise can also occur with
intentional introduction of security backdoors and bugs in Open Source
code contributions by malicious actors.

_Reference(s)_:

- [Mitre: Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)

## Trust and Signing

Occurs when the signing key used is compromised, resulting in a breach
of trust of the software from the open source community or software
vendor.  This kind of compromise results in the legitimate software
being replaced with a malicious, modified version.

- _Mitigation_ - Follow [best practices](https://www.entrustdatacard.com/knowledgebase/best-practices-for-code-signing-certificates)
regarding code signing key protection.  A more in depth explanation
can be found from [NIST](https://csrc.nist.gov/CSRC/media/Publications/white-paper/2018/01/26/security-considerations-for-code-signing/final/documents/security-considerations-for-code-signing.pdf)

_Reference(s)_:

- [Mitre: Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)
- [Wikipedia Code Signing](https://en.wikipedia.org/wiki/Code_signing)

## Malicious Maintainer

Occurs when a maintainer, or an entity posing as a maintainer, deliberately
injects a vulnerability somewhere in the supply chain or in the source code.
This kind of compromise could have great consequences because usually
the individual executing the attack is considered trustworthy by many.
This category includes attacks from experienced maintainers going rogue,
account compromise, and new personas performing an attack soon after they have
acquired responsibilities.

_Reference(s)_:

- [Mitre: Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)

## Technique: Attack Chaining

Sometimes a breach may be attributed to multiple lapses, with several
compromises chained together to enable the attack. The attack chain may
include types of supply chain attacks as defined here. However, catalogued
attack chains often include other types of compromise, such as social
engineering or a lack of adherence to best practices for securing publicly
accessible infrastructure components.
