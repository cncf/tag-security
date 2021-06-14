# Security TAG Roadmap

* [Overview](#overview)
* [Details](#details)
* [Upcoming](#upcoming)
  * [Ongoing efforts](#ongoing-efforts)
* [Completed](completed)

## Overview
Note:  TAG-Security was rebranded from SAFE working group. The below roadmap
includes SAFE WG and TAG-Security in its timeline.

|     | <i> #2 Discover </i>| #3 Describe | #4 Identify
| --- | --- | --- | --- |
| Artifacts | <i> Personas<br/>Use Cases<br/>Categories </i> | Standards<br/>Common Definitions<br/>Block Architecture | Catalog Projects<br/>Fill in Boxes<br/>Identify Gaps
| Topics | <i> Presentations<br/>TAG members & guests </i> | Standards in Practice<br/>Real World Systems Architecture | Platforms & Products<br/>Tools & Libraries

## Details

1. **Charter** the SAFE Working Group. Draft vision, process and initial members
   (done, see below)
2. **Discover** (Completed)
   * Explore the problem space of the working group
   * Investigating what is happening in the community today with respect to security for cloud native applications and infrastructure
   * [Presentations](issues?utf8=%E2%9C%93&q=is%3Aclosed+is%3Aissue+label%3Ausecase-presentation+) from members & guests
   * Describe [personas & use cases](usecase-personas/)
   * Draft a picture or set of categories that will serve as a starting point for an evaluation framework
   * Solicit real world use cases and practices (and compensating controls) for projects
3. **Describe** (in progress)
   * Define the terminology used in the output documents, and in the community
   * Describe the current state (map) of cloud native security, which might include:
      * existing standards
      * existing open source, and proprietary, solutions
      * common patterns in use today for system that works for cloud native apps. For example:
        * Extract end-to-end view of secure access, and
        * Common layering or a block architecture
4. **Identify** existing security components in CNCF and projects in the CNCF landscape and catalog
   * Identify gaps and make recommendations to the community and TOC
   * Continually monitor the viability of the existing projects and update the landscape document
   * Document and disseminate best practices (provide training?)

## Upcoming

TAG-Security strives to perform annual planning and quarterly reviews of our
roadmap plans.  The Roadmap planning project board for each annum is a live
board and is continually updated.  Boards may have cards added which indicate
early concepts or needs for discovery, prior to become proposals or projects.

| Year | Board Link |
| --- | --- |
| 2021-2022 | [RoadMap Planning Board](https://github.com/cncf/tag-security/projects/4) |

### Ongoing efforts

TAG-Security maintains a few activities as regular business.  Boards tracking
these items linked below.

| Effort | Board Link | Description |
| --- | --- | -- |
| CNCF project security reviews | [Security Review Queue](https://github.com/cncf/tag-security/projects/2) | This board is used to manage upcoming and current security reviews and security review related activities. |
| TAG-Security Projects | [Project Tracking Board](https://github.com/cncf/tag-security/projects/1) | This board is used to manage upcoming proposals (backlog) and ongoing projects. |
| Issue Triage | [Triage Board](https://github.com/cncf/tag-security/projects/3) | This board is used to assist the Triage team in managing the queue of issues. |


## Completed

|   Milestone  | Date | Action
| --- | --- | --- |
| First Community Translation | 27 Feb 2021 | [Chinese translation of Whitepaper](https://github.com/cncf/tag-security/pull/471) |
| Security Assessments => Reviews | 23 Feb 2021 | Retrospective resulted in [process updates](https://github.com/cncf/tag-security/pull/488) |
| APAC meetings start | 1 Feb 2021 | [Regular meeting time added to README](https://github.com/cncf/tag-security/pull/518)
| Expanded to 5 Tech Leads | 13 Jan 2021 | [TOC Approves](https://lists.cncf.io/g/cncf-toc/topic/79052801#5599) [@ashutosh-narkar](https://github.com/ashutosh-narkar), [@achetal01](https://github.com/achetal01), [@anvega](https://github.com/anvega) |
| Cloud Native Security Whitepaper v1 | 18 Nov 2020 | [Markdown source and images in repo](https://github.com/cncf/tag-security/pull/452) |
| First five security assessments | 21 Oct 2020 | [In-toto, OPA, SPIFFE/SPIRE, Harbor, Keycloak](https://github.com/cncf/tag-security/issues/167) |
| First chair rotation | 15 Sep 2020 | [TOC approves](https://lists.cncf.io/g/cncf-toc/topic/77001316#5303) [@TheFoxAtWork](https://github.com/TheFoxAtWork) with new [chair proposal process](https://github.com/cncf/tag-security/pull/419/files)
| DoD Kubernetes/Container Security controls proposed | 26 Jun 2020 | LF collaboration with US DoD [merged to DoD repo](https://repo1.dso.mil/dsawg-devsecops/kubernetes-srg/k8-srg-artifacts/-/tree/master/linuxfoundation) |
| First Tech Leads  | 25 Feb 2020 | [TOC approves](https://lists.cncf.io/g/cncf-toc/topic/71341283#4198) [@lumjjb](https://github.com/lumjjb) [@TheFoxAtWork](https://github.com/TheFoxAtWork)  [@JustinCappos](https://github.com/JustinCappos) |
| Security Assessment intake process | 7 Jan 2020 | [Intake process and prioritization](https://github.com/cncf/tag-security/pull/296) |
| First Cloud Native Security Day | 19 Nov 2019 | [Event](https://events19.linuxfoundation.org/events/cloud-native-security-day-2019/) organized by [@mfdii and @TheFoxAtWork](https://github.com/cncf/tag-security/issues/209) |
| Software supply chain catalog  | 14 Nov 2019 | [Catalog](https://github.com/cncf/tag-security/pull/284) |
| Updated personas & use cases | 23 Sept 2019 | [Added platform implementer](https://github.com/cncf/tag-security/pull/246)
| Policy formal verification overview | 10 Sept 2019 | [Documentation](https://github.com/cncf/tag-security/pull/242)
| First Security Assessment | May 2019 | [In-toto](https://github.com/cncf/tag-security/pull/202)  |
| Updated Charter and Governance ratified by CNCF TOC |  7 May 2019 | [New repo](https://github.com/cncf/tag-security/tree/main/governance) |
| First cut security audit guidelines  | 2 May 2019 | [Guidelines](https://github.com/cncf/tag-security/pull/125) |
| Moved SAFE WG to CNCF  | 15 Apr 2019 | [Repo rename](https://github.com/cncf/tag-security/pull/148) |
| CNCF WG proposal | 21 Aug 2018 | [CNCF TAG-Security charter and roles](https://github.com/cncf/toc/pull/146) |
| Policy WG merged | 10 Aug 2018 | [Merging policy WG](https://github.com/cncf/tag-security/blob/main/policy-wg-merging.md)  |
| First KubeCon Presentations | 2-4 May 2018 | [Intro](https://kccnceu18.sched.com/event/ENw3/safe-wg-intro-jeyappragash-j-j-padmeio-ray-colline-google-any-skill-level) and [deep dive](https://kccnceu18.sched.com/event/ENw5/safe-wg-deep-dive-ray-colline-google-intermediate-skill-level) |
| Personas & use cases | 20 Apr 2018 | [Shared doc into repo markdown](https://github.com/cncf/tag-security/pull/16)
| Initial Commit for SAFE repo | 13 Mar 2018 | [First commit](https://github.com/cncf/tag-security/commit/fe999bd637456ade5e6cc8866d0db4107a0d9778) |
| Informal discussions at Kubecon Austin | Dec 2017 | Meeting with CNCF community and gathering feedback |
