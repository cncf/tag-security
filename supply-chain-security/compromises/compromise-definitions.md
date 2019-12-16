# Types of Supply Chain Compromise

This document serves to provide a consistent set of definitions for the Supply Chain Compromise Catalog.  The types of compromise may be expanded in the future as new or more distinct compromises occur.  When this happens, these definitions will be updated.

Index:

|---|---|
|[Dev Tooling](##dev-tooling)|[Negligence](##negligence)|
|[Publishing Infrastructure](##pub-infra)|[Source Code Compromise](##source-code)|[Trust & Signing](##trust-sign)||

(##source-code)## Source Code Compromise
Occurs when a source code repository (public or private) is manipulated intentionally by the developer or through a developer or repository credential compromise.  Source Code compromised can also occur when source code in open-source dependencies is manipulated in a manner to make them more useful (more appealing for use in order to guarantee download of malicious content, trojan horse like).

_Reference(s)_:
- [Mitre: Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)


(##pub-infra)## Publishing Infrastructure
Ooccurs when the integrity or availability of shipment, publishing, or distribution mechanisms and infrastructure are affected.  This can result from a number of attacks that permit access to the infrastructure.
- _Defeat_ - This kind of compromise can be deterred or defeated by implementing code-signing.  Code-signing requires attackers to perform multiple operations to be successful, making the level of effort higher.

_Reference(s)_:
- [Mitre: Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)


(##negligence)## Negligence
Associated with TypoSquatting attacks, the developer failed to verify the requested package or source code was spelled correctly.  

_Reference(s)_:
- [Slashdot Article regarding PyPI attackes](https://developers.slashdot.org/story/17/09/16/2030229/pythons-official-repository-included-10-malicious-typo-squatting-modules)


(##dev-tooling)## Dev Tooling
Occurs when the development machine, SDK, toolchains, or build kit have been exploited.  These exploits often result in the introduction of a backdoor by an attacker to own the development environment.

_Reference(s)_:
- [Mitre: Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)


(##trust-sign)## Trust & Signing
Occurs when the signing key used is compromised, resulting in a breach of trust of the software from the open source community or software vendor.  This kind of compromise results in the legitimate software being replaced with a malicious, modified version.

- _Defeat_ - Follow [best practices](https://www.entrustdatacard.com/knowledgebase/best-practices-for-code-signing-certificates) regarding code signing key protection.  A more indepth explanation can be found from [NIST](https://csrc.nist.gov/CSRC/media/Publications/white-paper/2018/01/26/security-considerations-for-code-signing/final/documents/security-considerations-for-code-signing.pdf)

_Reference(s)_:
- [Mitre: Supply Chain Compromise](https://attack.mitre.org/techniques/T1195/)
- [Wikipedia Code Signing](https://en.wikipedia.org/wiki/Code_signing)


