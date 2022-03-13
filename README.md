# CNCF Security Technical Advisory Group

<!-- cspell:disable -->
<!-- markdownlint-disable-next-line MD033 MD013 -->
<img src="design/logo/cloud-native-security-horizontal-darkmodesafe.svg" alt="Cloud Native Security logo" width="400"/>
<!-- cSpell:enable -->

## Quick links

- [Meeting Information](#meeting-times)
- [Slack Information](#communications)
- [New Members](#new-members)
- [Members](#members)

## Objective

STAG facilitates collaboration to discover and produce resources that enable
secure access, policy control, and safety for operators, administrators,
developers, and end-users across the cloud native ecosystem.

## Background

“Cloud Native” is open source cloud computing for applications — a complete
trusted toolkit for modern architectures.  There are multiple projects which
address key parts of the problem of providing access controls and addressing
safety concerns. Each of these adds value, yet for these technical solutions to
be capable of working well together and manageable to operate they will need a
minimal shared context of what defines a secure system architecture.

## Vision

There is a future where operators, administrators and developers feel confident
creating new cloud native applications.  They use cloud technologies with clear
understanding of risks and the ability to validate that their security policy
decisions are reflected in deployed software.

We envision that there could exist an ecosystem of tools that can simplify the
experience of cloud native operators, administrators and developers, including:

1. System security architecture that understands and accommodates the ever
growing heterogeneity of systems and provides a framework to protect resources
and data while servicing their users.
2. Common vocabulary and open source libraries that make it easy for developers
to create and deploy apps that meet system security requirements.
3. Common libraries and protocols that enable people to reason about the
security of the system, such as auditing and explainability features.

## Governance

[STAG charter](governance/charter.md) outlines the scope  of our group
activities, as part of our [governance process](governance) which details how we
work.

## Communications

Anyone is welcome to join our open discussions of STAG projects and share news
related to the group's mission and charter. Much of the work of the group
happens outside of Security TAG meetings and we encourage project teams to share
progress updates or post questions in these channels:

Group communication:

- [Email list](https://lists.cncf.io/g/cncf-tag-security)
- [CNCF Slack](https://slack.cncf.io/) #tag-security channel

Leadership:

- To reach the leadership team (chairs & tech leads), email
  cncf-tag-security-leads@lists.cncf.io
- To reach the chairs, email cncf-tag-security-chairs@lists.cncf.io

### Slack governance

Refer to the [slack governance document](slack.md) for details on slack channels
and posting to the channels.

## Meeting times

Group meeting times are listed below:

- US:   Weekly on Wednesdays at 10:00am UTC-7 (see your timezone
  [here](https://time.is/1000_today_in_PT?CNCF_Security_TAG_Meeting))
- APAC: Bi-weekly on Tuesdays at 1:00pm UTC+11 (see your timezone
  [here](https://time.is/1300_today_in_AEDT?CNCF_Security_TAG_Meeting))

See the  [CNCF Calendar](https://www.cncf.io/calendar/) for calendar invites.

[Meeting minutes and
agenda](https://docs.google.com/document/d/170y5biX9k95hYRwprITprG6Mc9xD5glVn-4mB2Jmi2g/)

### Zoom Meeting Details

<!-- cSpell:ignore cncftagsecurity -->
Meeting Link:
[zoom.us/my/cncftagsecurity](https://zoom.us/j/7375677271?pwd=VkxmTjJ6TDVHK29Qb2tQakE4SitWZz09)
(Password: 77777)

One tap mobile:

| Location | Number |
| --- | --- |
| US - New York | +16465588656,,7375677271# |
| US - San Jose | +16699006833,,7375677271# |

Dial by your location:

| Location | Number |
| --- | --- |
| US - New York | +1 646 558 8656 |
| US - San Jose | +1 669 900 6833|
| US - Toll-free | 877 369 0926 |
| US - Toll-free | 855 880 1246 |
| Australia - Toll-free | 1800 945 157 |

Or [find your local number](https://zoom.us/u/alwlmxlNn).

Meeting ID: 737 567 7271

## Gatherings

Please let us know if you are going and if you are interested in attending (or
helping to organize!) a gathering. Create a [github
issue](https://github.com/cncf/tag-security/issues/new) for an event and add to
list below:

- KubeCon + CloudNativeCon, Europe May 16-20 2022

[Past events](past-events.md)

## New members

If you are new to the group, we encourage you to check out our [New Members Page](NEW-MEMBERS.md)

## Related groups

There are several groups that are affiliated to or do work and cover topics relevant
 to the work of Security TAG. These can be seen [here](governance/related-groups/)

## History

- TAG-Security - renamed STAG ([TOC Issue
  #549](https://github.com/cncf/toc/issues/549))
- SAFE WG - renamed to CNCF Security TAG
- [(Proposed) CNCF Policy Working Group](/policy-wg-merging.md) - Merged into
  SAFE WG

## Members
<!-- cSpell:disable -->

### STAG Chairs

- Brandon Lum ([@lumjjb](https://github.com/lumjjb)), Google [Chair term:
  6/3/2021 - 6/3/2023]
- Aradhana Chetal ([@achetal01](https://github.com/achetal01)), TIAA [Chair
  term: 6/3/2021 - 6/3/2023]

### Tech Leads

- Justin Cappos ([@JustinCappos](https://github.com/JustinCappos)), New York
  University
- Ash Narkar ([@ashutosh-narkar](https://github.com/ashutosh-narkar)), Styra
- Andres Vega ([@anvega](https://github.com/anvega)), VMWare
- Pushkar Joglekar ([@PushkarJ](https://github.com/PushkarJ)), VMWare

### STAG Chair Emeriti

- Dan Shaw ([@dshaw](https://github.com/dshaw)), PayPal [Chair term: 6/3/2019 -
  9/3/2020]
- Sarah Allen ([@ultrasaurus](https://github.com/ultrasaurus)), [Chair term:
  6/3/2019 - 6/3/2021]
- Jeyappragash JJ ([@pragashj](https://github.com/pragashj)), Tetrate.io [Chair
  term: 6/3/2019 - 6/3/2021]
- Emily Fox ([@TheFoxAtWork](https://github.com/TheFoxAtWork)), Apple [Chair
  term: 9/28/2020 - 2/4/2022]

### On-going projects

#### Policy team

Policy is an essential component of a secure system.

[Bi-weekly
meetings](https://docs.google.com/document/d/1ihFfEfgViKlUMbY2NKxaJzBkgHh-Phk5hqKTzK-NEEs/edit?usp=sharing)
at 3:00 PM PT focus on policy concerns and initiatives.

Co-leads

- TBD

Co-chair representative: @achetal01

#### Security reviews

[Security reviews](./assessments) are a collaborative process for the benefit of
cloud native projects and prospective users by creating a consistent overview of
the project and its risk profile.

Facilitator: Justin Cappos ([@JustinCappos](https://github.com/JustinCappos)),
New York University

Co-chair representative: @lumjjb

#### Software Supply Chain Security

Software Supply Chain attacks have come to the wider community's attention
following recent high-profile attack, but have been an ongoing threat for a long
time. With the ever growing importance of free and open source software,
software [supply chain security](./supply-chain-security) is crucial,
particularly in cloud native environments where everything is software-defined.

Weekly meetings at 8:00 AM PT (50 min) (see your timezone [here](https://time.is/0800_today_in_PT?CNCF_Security_TAG_Supply_Chain_WG_Meeting))
See [CNCF calendar](https://www.cncf.io/calendar/) for invite.

Facilitator for current deliverables is listed on the [issue](https://github.com/cncf/tag-security/issues/679)

## Additional information

### CNCF STAG reviews

As part of the [CNCF project proposal
process](https://github.com/cncf/toc/blob/master/process/project_proposals.adoc),
projects should create a new [security review
issue](https://github.com/cncf/tag-security/issues/new?assignees=&labels=assessment&template=security-assessment.md&title=%5BAssessment%5D+Project+Name)
with a
[self-assessment](https://github.com/cncf/tag-security/blob/main/assessments/guide/self-assessment.md).

### Past events and meetings

For more details on past events and meetings, please see our [past events
page](past-events.md)
