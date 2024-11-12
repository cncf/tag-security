---
title:  Software Supply Chain Security Best Practices v2
date:   2024-11-08 12:00:00 +0000
author: Marina Moore
---

Software supply chain attacks cost over $45 billion in 2023, with projections exceeding [$80 billion by 2026](https://www.juniperresearch.com/press/study-reveals-staggering-cost-of-software-supply/).
Software supply chain attacks occur when the materials or processes of producing software are themselves compromised, resulting in vulnerabilities targeting downstream consumers of the produced software.
The CNCF Technical Advisory Group (TAG) for Security maintains a [detailed catalog](https://tag-security.cncf.io/community/catalog/compromises/) of known supply chain attacks, illustrating the scope of this field.
To provide guidance in this space, TAG Security is releasing a new version of the Software Supply Chain Best Practices White Paper.

The first version of the Software Supply Chain Best Practices White Paper raised awareness about this issue, and provided guidance about the current best practices at the time.
The paper was referenced by many prominent groups including in the [NIST SSDF](https://csrc.nist.gov/projects/ssdf).

Since the publication of the first version of this paper, the industry has seen an explosion of new tools and adoption of existing tools for securing the software supply chain.
In particular, the use of attestations and SBOMs has matured, with improved tooling for both generation and consumption of this metadata.
There has also been increasing awareness of the scope of potential attacks on the software supply chain, with many organizations starting to adopt best practices.
Audits of projects in the cloud native ecosystem have included [assessment of their software supply chain security posture](https://www.cncf.io/blog/2023/04/19/building-secure-software-supply-chains-in-cncf-with-slsa-assessments/).

To build on the success of the original white paper, and to reflect the maturing ecosystem around software supply chain security, we made some larger changes to the whitepaper that warrant the release of a new version.
The updates to the paper include an exploration of the different personas that may be coming to the paper looking to learn about particular aspects of software supply chain security.
The new version also includes updates to the best practice recommendations to reflect the current state of the ecosystem.

To learn more, we welcome you to read the [paper](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/suply-chain-security-paper-v2/SSCBPv2.md)!
