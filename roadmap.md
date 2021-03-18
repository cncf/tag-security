# SIG Security Roadmap

### Overview
Note:  SIG-Security was rebranded from SAFE working group. The below roadmap includes SAFE WG and SIG-Security in its timeline.

|     | #2 Discover | #3 Describe | #4 Identify
| --- | --- | --- | --- |
| Artifacts | Personas<br/>Use Cases<br/>Categories | Standards<br/>Common Definitions<br/>Block Architecture | Catalog Projects<br/>Fill in Boxes<br/>Identify Gaps
| Topics | Presentations<br/>SIG members & guests | Standards in Practice<br/>Real World Systems Architecture | Platforms & Products<br/>Tools & Libraries

### Details

1. **Charter** the SAFE Working Group. Draft vision, process and initial members 
   (done, see below)
2. **Discover** (in progress)
   * Explore the problem space of the working group
   * Investigating what is happening in the community today with respect to security for cloud native applications and infrastructure
   * [Presentations](issues?utf8=%E2%9C%93&q=is%3Aclosed+is%3Aissue+label%3Ausecase-presentation+) from members & guests
   * Describe [personas & use cases](usecase-personas/)
   * Draft a picture or set of categories that will serve as a starting point for an evaluation framework
   * Solicit real world use cases and practices (and compensating controls) for projects
3. **Describe** the landscape
   * Define the terminology used in the output documents, and in the community
   * Describe the current state (landscape) of cloud native security, which might include:
      * existing standards
      * existing open source, and proprietary, solutions
      * common patterns in use today for system that works for cloud-native apps. For example:
        * Extract end-to-end view of secure access, and
        * Common layering or a block architecture
4. **Identify** existing security components in CNCF and projects in the CNCF landscape and catalog
   * Identify gaps and make recommendations to the community and TOC
   * Continually monitor the viability of the existing projects and update the landscape document
   * Document and disseminate best practices (provide training?)

### Completed

|   Milestone  | Date | Action
| --- | --- | --- |
| First Community Translation | 27 Feb 2021 | [Chinese translation of Whitepaper](https://github.com/cncf/sig-security/pull/471) |
| Security Assessments => Reviews | 23 Feb 2021 | Retrospective resulted in [process updates](https://github.com/cncf/sig-security/pull/488) |
| APAC meetings start | 1 Feb 2021 | [Regular meeting time added to README](https://github.com/cncf/sig-security/pull/518)
| Expanded to 5 Tech Leads | 13 Jan 2021 | [TOC Approves](https://lists.cncf.io/g/cncf-toc/topic/79052801#5599) [@ashutosh-narkar](https://github.com/ashutosh-narkar), [@achetal01](https://github.com/achetal01), [@anvega](https://github.com/anvega) |
| Cloud Native Security Whitepaper v1 | 18 Nov 2020 | [markdown source and images in repo](https://github.com/cncf/sig-security/pull/452) |
| First five security assessments | 21 Oct 2020 | [in-toto, OPA, SPIFFE/SPIRE, Harbor, Keycloak](https://github.com/cncf/sig-security/issues/167) |
| DoD Kubernetes/Container Security controls proposed | 26 Jun 2020 | LF collaboration with US DoD [merged to DoD repo](https://repo1.dso.mil/dsawg-devsecops/kubernetes-srg/k8-srg-artifacts/-/tree/master/linuxfoundation) |
| First Tech Leads  | 25 Feb 2020 | [TOC approval](https://lists.cncf.io/g/cncf-toc/topic/71341283#4198) |
| Security Assessment Intake Process | 7 Jan 2020 | [intake process and prioritization](https://github.com/cncf/sig-security/pull/296) |
| First Cloud Native Security Day | 19 Nov 2019 | [event](https://events19.linuxfoundation.org/events/cloud-native-security-day-2019/) organized by [@mfdii and @TheFoxAtWork](https://github.com/cncf/sig-security/issues/209) |
| Software supply chain catalog  | 14 Nov 2019 | [catalog](https://github.com/cncf/sig-security/pull/284) |
| Personas & Use cases | 23 Sept 2019 | [issue#246](https://github.com/cncf/sig-security/issues/246)
| Policy formal verification overview | 10 Sept 2019 | [documentation](https://github.com/cncf/sig-security/pull/242)
| First Security Assessment | May 2019 | in-toto - [issue#166](https://github.com/cncf/sig-security/issues/166)  |
| Updated Charter and Governance ratified by CNCF TOC |  7 May 2019 | [New repo](https://github.com/cncf/sig-security/tree/master/governance) |
| First cut security audit guidelines  | 2 May 2019 | [guidelines](https://github.com/cncf/sig-security/pull/125) |
| Moved SAFE WG to CNCF  | 15 Apr 2019 | [Repo rename](https://github.com/cncf/sig-security/pull/148) |
| CNCF WG proposal | 21 Aug 2018 | [CNCF SIG-Security charter and roles](https://github.com/cncf/toc/pull/146) |
| Policy WG merged | 10 Aug 2018 | [Merging policy WG](https://github.com/cncf/sig-security/blob/master/policy-wg-merging.md)  |
| First KubeCon Presentations | 2-4 May 2018 | [intro](https://kccnceu18.sched.com/event/ENw3/safe-wg-intro-jeyappragash-j-j-padmeio-ray-colline-google-any-skill-level) and [deep dive](https://kccnceu18.sched.com/event/ENw5/safe-wg-deep-dive-ray-colline-google-intermediate-skill-level) |
| Initial Commit for SAFE repo | 13 Mar 2018 | [First commit](https://github.com/cncf/sig-security/commit/fe999bd637456ade5e6cc8866d0db4107a0d9778) |
| Informal discussions at Kubecon Austin | Dec 2017 | Meeting with CNCF community and gathering feedback |
