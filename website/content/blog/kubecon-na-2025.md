---
title: KubeCon NA 2025 Schedule Announced!
author: Evan Anderson, Jennifer Power
---

[https://kccncna2025.sched.com/list/descriptions/type/Security](https://kccncna2025.sched.com/list/descriptions/type/Security)

The countdown to KubeCon + CloudNativeCon North America 2025 in Atlanta has begun! On July 30, the CNCF released the talk schedule for the last KubeCon of 2025, and as always, the security track is packed with sessions focused on the ever-evolving landscape
of cloud-native tools, projects, and threats. As the premier conference for Kubernetes and cloud native technologies, KubeCon brings together developers, administrators, and enthusiasts from around the globe to share insights, best practices, and the latest
innovations. This year's agenda promises deep dives into securing everything from supply chains and AI workloads to fundamental Kubernetes components.

## Key Sessions and Emerging Themes

One of the attractions of KubeCon is the opportunity to connect and learn from experts in the field. The KubeCon NA 2025 security track highlights several critical and emerging themes in cloud native security. These sessions offer deep dives into new challenges
and practical solutions across the ecosystem.

### AI and Agentic AI Security

We’re not going to bury the lede here – AI is still hot, though AI-focused talks are only about a fifth of the 22 KubeCon talks in the security track schedule. That slice covers most of the bases of security,
however: [practical experience with AI vulnerabilities](https://kccncna2025.sched.com/event/27FeS/the-good-the-bad-and-the-ugly-hacking-3-cloud-native-ai-services-with-1-vulnerability-hillai-ben-sasson-nir-ohfeld-wiz), [identity patterns for agents](https://kccncna2025.sched.com/event/27FbM/securing-ai-agent-infrastructure-authnauthz-patterns-for-mcp-and-a2a-yoshiyuki-tabata-hitachi-ltd),
and [applying security tooling and frameworks](https://kccncna2025.sched.com/event/27Fcr/aligning-enterprise-ai-security-with-mitre-atlas-using-open-source-technologies-doron-caspin-valentina-rodriguez-sosa-red-hat) to AI development.
And if one opinion isn’t enough, there’s also a [panel on securing AI](https://kccncna2025.sched.com/event/27FWu/in-ai-we-trust-securing-the-future-one-agent-at-a-time-lin-sun-christian-posta-soloio-hannah-foxwell-kortensia-andrew-martin-controlplane-ricardo-aravena-snowflake), covering the gamut from
agents to datasets – when existing defenses are sufficient, and where we’ll need to invent new tools and practices.

### Red Team Activities and Practical Security Experiences

No KubeCon would be complete without stories from the humans behind the security news.  From [live hack-and-defense](https://kccncna2025.sched.com/event/27FZo/red-vs-blue-a-live-attacker-defender-showdown-in-kubernetes-security-lucy-sweet-uber-sandeep-kanabar-gen) with Lucy Sweet and Sandeep Kanabar on Day 2 to a panel discussion on [the most useful open source tools](https://kccncna2025.sched.com/event/27Fc5/security-theater-or-real-defense-navigating-open-source-security-in-a-cloud-native-world-rotem-refael-armo-constanze-roedig-technical-university-of-vienna-megan-wolf-defense-unicorns-stefana-muller-salesforce-oshrat-nir-independent),
there’s never a dull moment in security. KubeCon vet Ian Coldwater will share [history lessons from 10 years of Kubernetes Security](https://kccncna2025.sched.com/event/27Fdj/weve-come-a-long-way-baby-the-evolution-of-kubernetes-security-ian-coldwater-independent),
while Wiz researchers highlight the value of defense in depth with [one AI exploit against three different clouds](https://kccncna2025.sched.com/event/27FeS/the-good-the-bad-and-the-ugly-hacking-3-cloud-native-ai-services-with-1-vulnerability-hillai-ben-sasson-nir-ohfeld-wiz).
If you’re sticking around until the end of Day 3, Microsoft researchers have concerning results about [unsafe defaults in popular helm charts](https://kccncna2025.sched.com/event/27Fen/you-deployed-what-data-driven-lessons-on-unsafe-helm-chart-defaults-michael-katchinskiy-yossi-weizman-microsoft).

### Network Defense

While not all attackers come in over the network, it's a pretty popular attack vector, and a perennial topic in the cloud native space.
Whether you prefer a [service mesh](https://kccncna2025.sched.com/event/27FXR/its-2025-why-are-you-ok-with-an-insecure-network-alex-leong-buoyant), [CNI plugin](https://kccncna2025.sched.com/event/27FaL/portable-mtls-for-kubernetes-a-quic-based-plugin-compatible-with-any-cni-apurup-chevuru-michael-zappa-microsoft), or [gRPC configuration](https://kccncna2025.sched.com/event/27FVP/end-to-end-security-with-grpc-in-kubernetes-shiva-abhishek-agrawal-google), you’ll find talks to back up your opinions or
think about encryption in new ways. Of course, the strongest protection against talking to bad actors is to [block them completely with NetworkPolicy](https://kccncna2025.sched.com/event/27FUs/demonstration-of-automatic-kubernetes-network-policies-generation-boaz-michaely-red-hat),
and Boaz Michaely brings tools to automatically write and apply policies. [Quantum-resistant network encryption](https://kccncna2025.sched.com/event/27FZK/quantum-resistant-kubernetes-realities-risks-versioning-pitfalls-fabian-kammel-controlplane) is also arriving on the scene whether
you’re ready for it or not, and that’s not to mention the SPIFFE/SPIRE rollouts we’ll be talking about in the Identity section of the highlights.

### Identity

Identity is another perennial KubeCon topic! If you’ve been stuck trying to implement the graduated SPIFFE and SPIRE projects to manage machine identity,
two case studies from [Uber](https://kccncna2025.sched.com/event/27FdO/authenticating-and-authorizing-every-connection-at-uber-yangmin-zhu-matt-mathew-uber) and [State Farm](https://kccncna2025.sched.com/event/27FVt/from-bespoke-to-bulletproof-spiffespire-with-eso-for-enterprise-zero-trust-may-large-ivy-moore-state-farm) may help you get un-stuck.
And just in time, because the addition of AI agents has added new wrinkles – TAG Tech Lead Yoshiyuki Tabata is here to [iron out the confusion](https://kccncna2025.sched.com/event/27FbM/securing-ai-agent-infrastructure-authnauthz-patterns-for-mcp-and-a2a-yoshiyuki-tabata-hitachi-ltd).
Yoshiyuki has also teamed up with Gabriele Bartolini from EDB to show how you can [use identities to manage Postgres access](https://kccncna2025.sched.com/event/27FXv/modern-postgresql-authorization-with-keycloak-cloud-native-identity-meets-database-security-yoshiyuki-tabata-hitachi-ltd-gabriele-bartolini-edb) – and ditch managing passwords as long-lived secrets.

### Supply Chain Security

As stewards of hundreds of open-source projects, the TAG is deeply concerned with how software is made and distributed. This KubeCon, learn about [safely consuming OSS software](https://kccncna2025.sched.com/event/27Fap/safely-sourcing-oss-beyond-0-cves-john-kjell-controlplane) with TAG Tech Lead John Kjell, and deep-dive
on [managing (and updating) Kubernetes addons](https://kccncna2025.sched.com/event/27FYn/patch-me-if-you-can-tackling-outdated-addons-before-they-become-a-risk-stevie-caldwell-andy-suderman-fairwinds) with the SRE team from Fairwinds. And as your last takeaway of the conference (literally – the last talk in the track!), [test your knowledge of supply chain security tools](https://kccncna2025.sched.com/event/27Fez/the-ultimate-container-challenge-an-interactive-trivia-game-on-supply-chain-security-aurelie-vache-ovhcloud-sherine-khoury-red-hat)
with Aurélie Vache and Sherine Khoury. It sounds like a dynamic (and fun!) event.

## Insights from TAG Security and Compliance

KubeCon isn't just a conference; it's the ultimate platform for connection and collaboration. This event is a key opportunity for the TAG to engage the community and get crucial feedback from practitioners on the front lines of cloud native security.
The TAG sessions focus on community engagement to unify security standards, boost best practices, and foster a more secure cloud native environment.

### Learn about the TAG

Think you know the CNCF playbook? Join Eddie Knight, Evan Anderson, and Brandt Keller as they dive into the CNCF reboot and how TAG Security and Compliance fits into the larger picture.
In [A Parallel World: Understanding CNCF’s TOC, TAGs, and TCGs](https://kccncna2025.sched.com/event/27NnN/a-parallel-world-understanding-cncfs-toc-tags-and-tcgs-eddie-knight-sonatype), Co-chair **Eddie Knight** will talk about the major reboot of the CNCF technical leadership structure and groups executed this year.
From reorganized TAGs to the new TCGs (Technical Community Groups), Eddie will offer practical actions to deepen your community involvement or effectively harness the power of the CNCF support system.
For CNCF projects looking to level up their security maturity, [MUST/SHOULD/MAY: A Tour of TAG Security and Compliance Project Services](https://kccncna2025.sched.com/event/27Nmq/mustshouldmay-a-tour-of-tag-security-and-compliance-project-services-evan-anderson-custcodian-brandt-keller-defense-unicorns) from Tech Lead **Brandt Keller** and Co-Chair **Evan Anderson** is a must-see.
Brandt and Evan will provide a contributor engagement checklist for navigating the landscape of available TAG services and offerings. In addition to getting a jump start on TOC-mandated steps like joint assessments, TAG Security and Compliance has a number of best practices,
initiatives and projects which can benefit CNCF projects and maintainers – it’s not just about getting out of the doghouse, but simplifying end-user adoption.

Don’t miss out on more ways to connect with TAG Security and Compliance leadership. Here are some session highlights featuring the team:

* Tech Lead **John Kjell**'s session, [Safely Sourcing OSS - Beyond 0 CVES](https://kccncna2025.sched.com/event/27Fap/safely-sourcing-oss-beyond-0-cves-john-kjell-controlplane), dives into the deeper stuff lurking in your open-source dependencies. He'll walk through how to spot foundational risks in open-source software,
  like governance failures, confusing documentation, and insecure release pipelines. John will explain how broader open-source ecosystem initiatives are enhancing safe adoption of open source projects by making crucial security metadata transparent and accessible.

* Don't let your database credentials get stuck in the age of static passwords. Tech Lead **Yoshiyuki Tabata** and **Gabriele Bartolini** say that's a security liability in [Modern PostgreSQL Authorization With Keycloak: Cloud Native Identity Meets Database Security](https://kccncna2025.sched.com/event/27FXv/modern-postgresql-authorization-with-keycloak-cloud-native-identity-meets-database-security-yoshiyuki-tabata-hitachi-ltd-gabriele-bartolini-edb).
  They’ll show you how to meet today's security and compliance requirements, demonstrating centralized identity control and fine-grained access policies with PostgreSQL, Keycloak, and CloudNativePG and exploring a concrete example using PostgreSQL 18's new native OAuth support. For Kubernetes database authentication, this could be a game-changer.

* Tech Lead **Yoshiyuki Tabata** joins us again, shifting to the next generation of security challenges in his session, [Securing AI Agent Infrastructure: AuthN/AuthZ Patterns for MCP and A2A](https://kccncna2025.sched.com/event/27FbM/securing-ai-agent-infrastructure-authnauthz-patterns-for-mcp-and-a2a-yoshiyuki-tabata-hitachi-ltd).
  He will explore what it takes to secure communication for new protocols like Model Context Protocol (MCP) and Agent-to-Agent (A2A) and provide a practical blueprint for designing Authentication and Authorization (AuthN/AuthZ) mechanisms,
  applying key principles from the CNCF IAM whitepaper and demonstrating secure AuthZ for an MCP server using Keycloak.

TAG members will also be present at the project pavilion – this is a great opportunity to catch up, find new opportunities, or ask questions. Maybe you’re looking to get involved in the security assessment process, or have questions about your project’s assessment. Maybe you have an initiative to discuss or a suggestion about how to improve the current TAG processes, or you’re just looking for a security connection – come on by!  (We’ll post the booth times when they are announced)

As the newest members of TAG Security and Compliance, we’re looking forward to meeting the community in-person in Atlanta – either in the session tracks, or at the project pavilion in the Solutions Showcase. See you in November!
