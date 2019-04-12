# SAFE WG
Working Group Proposal: Secure Access for Everyone (SAFE)

## Objective

Secure Access for Everyone (SAFE) Working Group facilitates collaboration
to discover and produce resources which enable secure access, policy control
and safety for operators, administrators, developers, and end-users across
the cloud native ecosystem.

## Background
“Cloud Native” is open source cloud computing for applications — a complete
trusted toolkit for modern architectures (CNCF presentation).  There are
multiple projects which address key parts of the problem of providing access
controls and addressing safety concerns. Each of these adds value, yet for
these technical solutions to be capable of working well together and manageable
to operate they will need a minimal shared context of what defines a secure
system architecture.

## Vision
There is a future where operators, administrators and developers feel confident
creating new cloud native applications.  They use cloud technologies with clear
understanding of risks and the ability to validate that their security policy
decisions are reflected in deployed software.

We envision that there could exist an ecosystem of tools that can simplify
the experience of cloud native operators, administrators and developers,
including:
1. System security architecture that understands and accommodates the ever
growing heterogeneity of systems and provides a framework to protect resources
and data while servicing their users
2. Common vocabulary and open source libraries that make it easy for developers
to create and deploy apps that meet system security requirements
3. Common libraries and protocols that enable people to reason about the
security of the system, such as auditing and explainability features.

## Charter
The charter of the working group is to reduce risk that cloud native
applications expose end user data or allow other unintended access.
Distributed deployments across heterogeneous infrastructure are increasingly
common for cloud native applications. The working group sees common need
patterns in cloud-native application architecture to improve the security of
the systems. Without common ways to programatically ensure consistent policy,
it is increasingly difficult to evaluate system architecture security at scale.
We propose that the creation of open source libraries, if needed, that enable
interoperability across software and providers will enable the adoption of
common protocols for access control. This will in turn accelerate the adoption
of cloud-native application development models, as well as streamline operations
for both cloud and traditional infrastructure.

## Members

* Dan Shaw ([@dshaw](https://github.com/dshaw)), PayPal [chair]
* Sarah Allen ([@ultrasaurus](https://github.com/ultrasaurus)), [chair]
* Jeyappragash JJ ([@pragashj](https://github.com/pragashj)), Tetrate.io [chair]
* Devarajan P Ramaswamy ([@deva](https://github.com/deva26)), PADME
* Kamil Pawlowski ([@kbpawlowski](https://github.com/kbpawlowski))
* Geri Jennings ([@izgeri](https://github.com/izgeri)), CyberArk
* Howard Huang ([@hannibalhuang](https://github.com/hannibalhuang)), Huawei [Kubernetes Policy WG co-chair]
* Jason Melo ([@jasonmelo](https://github.com/jasonmelo)), NearForm
* Torin Sandall ([@tsandall](https://github.com/tsandall)), OPA
* Sree Tummidi ([@sreetummidi](https://github.com/sreetummidi)), Pivotal [Cloud Foundry Project Lead]
* Christian Kemper ([@ckemper67](https://github.com/ckemper67)), Google
* Ray Colline ([@rcolline](https://github.com/rcolline)), Google
* Doug Davis ([@duglin](https://github.com/duglin)), IBM
* Sabree Blackmon ([@heavypackets](https://github.com/heavypackets)), Docker
* Justin Cormack ([@justincormack](https://github.com/justincormack)), Docker
* Liz Rice ([@lizrice](https://github.com/lizrice)), Aqua Security
* Erik St. Martin ([@erikstmartin](https://github.com/erikstmartin)), Microsoft
* Cheney Hester ([@quiqie](https://github.com/quiqie)), Fifth Third Bank
* Erica von Buelow ([@ericavonb](https://github.com/ericavonb)), Red Hat [Kubernetes Policy WG]
* Mark Underwood ([@knowlengr](https://github.com/knowlengr))
* Rae Wang ([@rae42](https://github.com/rae42)), Google
* Rachel Myers ([@rachelmyers](https://github.com/rachelmyers)), Google
* Evan Gilman ([@evan2645](https://github.com/evan2645)), Scytale.io
* Andrew Weiss ([@anweiss](https://github.com/anweiss)), Docker
* TK Lala ([@tk2929](https://github.com/tk2929)), ZcureZ
* Maor Goldberg ([@goldberg10](https://github.com/goldberg10))
* Andrew Martin ([@sublimino](https://github.com/sublimino)), ControlPlane
* Karthik Gaekwad ([@iteration1](https://github.com/karthequian)), Oracle
* Chase Pettet ([@chasemp](https://github.com/chasemp)), Wikimedia Foundation
* Jia Xuan ([@xuanjia](https://github.com/xuanjia)), China Mobile
* John Morello ([@morellonet](https://github.com/morellonet)), Twistlock
* Alban Crequy ([@alban](https://github.com/alban)), Kinvolk
* Michael Schubert ([@schu](https://github.com/schu)), Kinvolk
* Andrei Manea ([@andrei_821](https://github.com/andrei821)), CloudHero
* Justin Cappos ([@JustinCappos](https://github.com/JustinCappos)), New York University
* Santiago Torres-Arias ([@SantiagoTorres](https://github.com/SantiagoTorres)), New York University
* Brandon Lum ([@lumjjb](https://github.com/lumjjb)), IBM
* JOIN OUR MEETINGS REGULARLY, THEN ADD YOURSELF VIA PULL REQUEST

## Related Groups

* [(Proposed) CNCF Policy Working Group](/policy-wg-merging.md) - Merged into SAFE WG
* [Kubernetes Policy Working Group](https://github.com/kubernetes/community/tree/master/wg-policy)
* [Kubernetes SIG-Auth](https://github.com/kubernetes/community/tree/master/sig-auth)
* [NIST Big Data WG](https://bigdatawg.nist.gov/)

## Communications

Anyone is welcome to join our open discussions of WG projects and share news related to the group's mission and charter. Much of the work of the group happens outside of WG meetings and we encourage project teams to share progress updates or post questions in these channels:

* [Email list](https://groups.google.com/forum/#!forum/cloud-native-security)
* [CNCF Slack](https://slack.cncf.io/) #safe-wg channel

## Meeting Time

The SAFE group meets every Friday at 11:00am PT (USA Pacific):

Join: https://zoom.us/j/665428022

Or iPhone one-tap:
* US: +16699006833,,665428022# or +16468769923,,665428022#

Or Telephone:
* US: +1 669 900 6833 or +1 646 876 9923, Meeting ID: 665-428-022
* International numbers available: https://zoom.us/zoomconference?m=r-YGNTQJzZphTlO4LYkdhAt4oIQpwl2g

## In Person Meetings

Please let us know if you are going and if you are interested in attending (or helping to organize!) an in-person meetup. Create a [github issue](https://github.com/cn-security/safe/issues/new) for an event and add to list
below:

* KubeCon + CloudNativeCon, Barcelona, Spain, May 20 – 23, 2019 - [issue#127]
* KubeCon + CloudNativeCon, San Diego, CA - Nov 18 – 21, 2019 - [issue#128]

Past
* KubeCon + CloudNativeCon, North America, Dec 11-13, 2018 - [issue#29](https://github.com/cn-security/safe/issues/29)
* KubeCon + CloudNativeCon, Shanghai, Nov 14-15, 2018 - [issue#28](https://github.com/cn-security/safe/issues/28)
* [KubeConEU](https://events.linuxfoundation.org/events/kubecon-cloudnativecon-europe-2018/) May 2-4, 2018 in Copenhagen, Denmark ([notes](safe_kubecon.md))

## Meeting Minutes

* [2018-04-12 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - OPA with SAFE Presentation Framework
* [2018-04-11 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session
* [2018-04-05 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Google Open Source Project Onboarding
* [2018-04-04 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session
* [2018-03-29 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Revised presentation framework with in-toto (OPA, Kamus, TOC invited) 
* [2018-03-28 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session
* [2018-03-22 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-03-22 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - SAFE Whitepaper Working Session
* [2018-03-15 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-03-08 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-03-07 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session
* [2018-03-08 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-03-07 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session
* [2018-03-01 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-02-28 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session
* [2018-02-22 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-02-21 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session
* [2018-02-15 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-02-08 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-02-01 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-01-31 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session
* [2018-01-25 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-01-24 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session
* [2018-01-18 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-01-17 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session
* [2018-01-11 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-01-10 SAFE Meeting](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit) - Working Session - :star: [new meeting notes doc](https://docs.google.com/document/d/1WLnEErqODywjkQVTAESpwK8pgIbxsNDp6SqOtw3kjlk/edit)
* [2018-12-21 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-12-13 SAFE WG BOF Deep Dive @ KubeCon + CloudNativeCon North America 2018](https://kccna18.sched.com/event/GrdR/deep-dive-safe-bof-jeyappragash-jeyakeerthi-padmeio-dan-shaw-danshaw-llc)
* 2018-12-11 SAFE WG Dinner @ KubeCon + CloudNativeCon North America 2018
* [2018-12-11 SAFE WG BOF Intro @ KubeCon + CloudNativeCon North America 2018](https://kccna18.sched.com/event/GrbV/intro-safe-bof-jeyappragash-jeyakeerthi-padmeio-dan-shaw-danshaw-llc)
* [2018-12-14 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-12-07 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-11-30 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-11-29 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit) - Working Session
* 2018-11-23 - no meeting
* 2018-11-22 - no meeting :turkey:
* [2018-11-16 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-11-15 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit) - Working Session
* 2018-11-14 - KubeCon Shanghai 2018 Intro Session: [Intro: SAFE (A Cloud Native Security Working Group)](https://kccncchina2018english.sched.com/event/FuLG)
* 2018-11-09 - no meeting: [SPIFFE Community Day](https://docs.google.com/document/d/1Gt91uPgemRuW56P3qnuQfs0VoWn_2n0D8N-LxpnUu5c/edit)
* [2018-11-08 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit) - Working Session
* [2018-10-26 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-10-25 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit) - Working Session
* [2018-10-19 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-10-12 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-10-05 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-10-04 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit) - Working Session
* [2018-09-28 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-09-21 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-09-20 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit) - Working Session
* [2018-09-14 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-09-07 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-09-06 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit) - Working Session
* [2018-08-31 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-08-31 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-08-30 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-08-24 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* 2018-08-21 SAFE WG proposal to the CNCCF TOC
* [2018-08-17 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-08-16 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit) - Working Session
* [2018-08-10 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-08-09 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit) - Working Session
* [2018-08-03 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit)
* [2018-08-02 SAFE Meeting](https://docs.google.com/document/d/1JsEv4vk_61UaF9SaHBRzzPGja-bNsHeLqxa53RPVfos/edit) - Working Session
* [2018-07-27 SAFE Meeting](https://docs.google.com/document/d/1DqqeTguBpalPj-y4nqY0uo8vYn_tU6DJzmbIdoyslhw/edit)
* [2018-07-13 SAFE Meeting](https://docs.google.com/document/d/1sniqXFFcP4vpX2bO6NeB31mzO1YOJrcQy2ryXATSHmk/edit)
* [2018-06-29 SAFE Meeting](https://docs.google.com/document/d/1fyBDIm82xtTYWhZu3gyLahltMdTOxl9aWfOfRxYHapo/edit)
* [2018-06-15 SAFE Meeting](https://docs.google.com/document/d/1usB6Xw1GVjW--RkRw1RPypwvUP_E8trtzg9JTO1ZAkM/edit)
* [2018-06-08 SAFE Meeting](https://docs.google.com/document/d/10iJ3wA7uVI6JMyvIv9qXdxdLCyQeS-djYsTqL_JG3d0/edit)
* 2018-06-01 - no meeting
* [2018-05-25 SAFE Meeting](https://docs.google.com/document/d/1LEXzz1PUaboqyIBg-1QBj-R0T1z6950fsetkBEW7b8g/edit)
* [2018-05-18 SAFE Meeting](https://docs.google.com/document/d/1xzJ29fTOJSioqrDuSkvBfsewV2lvgbr8olmDWb4kdPk/edit)
* [2018-05-11 SAFE Meeting](https://docs.google.com/document/d/1U5SKjp4vvN_I1CEw-O0mf7yhjhLzpRnTsaCxQS3CdIQ/edit)
* KubeCon Europe 2018 Deep-dive Session
* KubeCon Europe 2018 Intro Session
* [2018-04-27 SAFE Meeting](https://docs.google.com/document/d/1mtdBg6-8eGgBCfIFT56dDe_LVRCw5_tSeIAsRH_8KfM/edit)
* [2018-04-20 SAFE Meeting](https://docs.google.com/document/d/1B7G0_V1i8DTX-JIzMquUzFJgJBzZN-NWkJDCi62LOh4/edit) - CNCF TOC Proposal follow-up
* [2018-04-13 SAFE Meeting](https://docs.google.com/document/d/1SVPJzQrEpBixugI1Kjww90RxhaOovdNhWtWb3LsSjYU/edit) - Prep for the SAFE WG proposal presentation to the CNCF TOC on 4/17
* [2018-04-06 SAFE Meeting](https://docs.google.com/document/d/1a_a0dUTdSERgHiAnbUL0r2PNvbTe0SWHmYh7yFhTiFk/edit) - SAFE Personas WhitePaper
* [2018-03-30 SAFE Meeting](https://docs.google.com/document/d/1KwqAlBpb8TAex4_ABFmxpPZq9-MPvK3kraLUW9ws1EE/edit)
* [2018-03-23 SAFE Meeting](https://docs.google.com/document/d/1H3VOI9-GqRAj_tdPL9sECF1c8t4x_sF1G08PqLzlUWM/edit) - NIST Big Data public working group - security and privacy subgroup with Mark Underwood
* [2018-03-16 SAFE Meeting](https://docs.google.com/document/d/1nYN3cy7jrKQbEziT43447w8ZValOuioxEKYE0D4vkPU/edit)
* 2018-03-09 - no meeting
* [2018-03-02 SAFE Meeting](https://docs.google.com/document/d/1vZfDHLh2jy0uH_U_qLpbp64Xy64gu0SrgVLJov4kuMw/edit) - GCP Administrators Bill of Rights with [@raycolline](https://github.com/raycolline)
* [2018-02-23 SAFE Meeting](https://docs.google.com/document/d/1U4x1wynL-JlojF1Qidus97t8bJve3XJWTpc07hHCAxU/edit) - Open Policy Agent (OPA) Use Case with [@tsandall](https://github.com/tsandall) and [@timothyhinrichs](https://github.com/timothyhinrichs)
* [2018-02-16 SAFE Meeting](https://docs.google.com/document/d/1aAldFgdU6EhtmQWCFMefFMaevKumDe08wMlfoCt9mFw/edit) - Cloud Foundry Use Case with [@sreetummidi](https://github.com/sreetummidi)
* [2018-02-07 SAFE Meeting](https://docs.google.com/document/d/1Z30hfVquiRz9dIjek0Tcg540LuX3D4TPhJ3UWpDMltU/edit)
