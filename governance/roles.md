## Working group roles

* [Three Chairs](#role-of-chairs)
* [Technical Leads](#role-of-technical-leads)
* [Project Leads](#role-of-project-leads)
* [Group Members](#role-of-members)
* [TOC Liaison](#toc-liaison)
* [Facilitation Roles](#facilitation-roles)

The group may have many members. Within this document, "member" may refer to a Chair, a Technical Lead, or a Member.

All members are identified in the SIG [README](/readme.md), with annotations
where they hold an additional role.

### Role of members
* The primary role of a member is to contribute expertise to the group.
* To add yourself as a member, submit a Pull Request (PR) adding yourself
to the list of members.
* Members *SHOULD* remain active and responsive in their Roles.
* Members taking an extended leave of 1 or more months *SHOULD* coordinate with
other members to ensure the role is adequately staffed during the leave.
* Members going on leave for 1-3 months *MAY* work with other members to
identify a temporary replacement.
* Members of a role *SHOULD* remove any other members that have not
communicated a leave of absence and either cannot be reached for more than 1
month or are not fulfilling their documented responsibilities for more than 1
month. This may be done through a super-majority vote of members, or if there
are not enough *active* members to get a super-majority of votes cast, then
removal may occur through a super-majority vote of the Chairs.
* Membership disagreements may be escalated to the Chairs.  Disagreements
among the Chairs may be escalated to the TOC Liaison.
* Members *MAY* decide to step down at anytime and optionally propose a
replacement.
* Members contribute to projects, according to the standard group
  [process](process.md).

### Role of chairs

While CNCF TOC allows for Chairs to serve in purely administrative roles,
SIG-Security was formed with deeply technical Chairs based on early need
to navigate a complex security landscape. Until at least two Technical Leads
are identified, any Chair may act as Technical Lead.

* Primary role of Chairs is to run operations and the governance of the group.
* The Chairs are responsible for ensuring that group meetings are planned
and facilitated effectively, while also engaging group members in leadership
roles. Effective facilitation includes (but is not limited to) the following
activities:
  * setting the agenda for meetings
  * extending discussion via asynchronous communication to be inclusive of
members who cannot attend a specific meeting time.
  * scheduling discussing of proposals that have been submitted
  * asking for new proposals to be made to address an identified need

### Role of technical leads

Technical Leads (TLs) expand the bandwidth of the leadership team. Proposals
must have a TL or Chair working as an active sponsor
(as detailed in [SIG process](process.md)).

The general list of activities for TL are:
  * Establish new subprojects
  * Decommission existing subprojects
  * Resolve cross-subproject technical issues and decisions
  * Propose agenda items for meetings to ensure that open issues are
  discussed with the group when needed

TLs are elected by the following process:
  1. One of the Chairs nominates a candidate to be a TL, and creates a PR that
  adds the TL to the [SIG README](/README.md).
  1. Members are invited to comment and vote according to the regular voting
  process described below.

### Role of project leads

Project Leads will lead larger streams of work that require sustained
effort and coordination.

Project Leads are nominated and approved by the following process:
  1. Project Lead actively participates in the group, making a proposal or
  volunteering to take on a project that has been prioritized by the group
  1. A Chair or TL nominates a candidate.
  1. The nomination is communicated via a pull request annotating the list of members in the [SIG README](/README.md) with a link to the issue tracking the project. The nomination is typically open for a week (but may be shorter with
  LGTM of at least two chairs).
  1. Members are encouraged to review the tracking issue and work together
  to ensure that the Project Lead is set up for success or suggest alternatives.


## TOC liaison

The [CNCF SIG](https://github.com/cncf/toc/blob/master/sigs) process identifies
a TOC Liaison.  The SIG chairs are responsible for establishing effective
communication with the TOC liaison, including further communication to the
wider TOC upon request.

The TOC Liaison will occasionally prioritize SIG activities, as needed by the
TOC, to further the [CNCF mission](https://github.com/cncf/foundation/blob/master/charter.md#1-mission-of-the-cloud-native-computing-foundation).


## Facilitation roles

Members often contribute by working in small groups that research and discuss
options and then share their findings with the rest of the group in a
presentation and typically contribute to the body of work in this
repository (via Pull Request). Some tasks can be effectively executed
by simply chiming in on a github issue and independently contributing a PR
without any particular role or authorization.

This section describes roles where more coordination is helpful and the
work benefits from identifying one or more members who will take
on specific responsibilities.  Our goal is to empower members to move forward
independently, while defining an approval process designed to support
communication and alignment across the wider group.

New roles in this section are typically defined after someone has acted in
that role for some time informally, then proposed as an on-going role by Pull
Request which must be approved by a majority of Chairs.  Process clarifications
are welcome and PRs can be approved by any single Chair.

Members who take on roles are responsible for
understanding the approval policies related to their role and ensure that
commits to the repo are reviewed in accordance with our [governance](./)
and all actions are within roles defined in this document.

**Write access to the repo**: Where applicable, the following roles define
specific areas of the repo or actions on issues where changes require write
access. In any case, governance is not enforced by access permissions, but
rather by members who are expected to thoughtfully consider their actions to
support the group.

**Github permissions note**: Facilitation roles are identified in
[github settings](/.github/settings.yaml) which grants Github permissions.
Pull Requests to appoint members to new Roles must be approved by at least one
Chair, along with whatever additional process, if any, is described in this
document. When a member has multiple roles, the additional role that does not
require additional access are noted in a comment. PRs to remove someone from
a role must be approved by the person themselves or a majority of Chairs.

### Security assessment facilitator

[Security Assessments](/assessments) are part of the on-going work of the group
and led by a Security Assessment Facilitator, who will:

* coordinate security review leads for upcoming security assessments.
* identify and recommend security reviewers.
* contribute to process improvements.
* review and merge PRs in the /assessments directory (ensuring co-chair review
  of significant process changes).
* triage issues related to security assessments.

### Meeting facilitator

The group meetings are an important part of community building and the 
facilitator ensures a welcoming and inclusive atmosphere. In keeping with these
goals, the meeting facilitator has the following responsibilities:
* prepares the meeting notes with template and agenda
* coordinates with presenter, if applicable
* ensures there are scribes
* runs meeting check-in, including partner groups
* leads the meeting through the agenda

Prerequisites:
* active member
* history of regular attendance
* prior participation as scribe

One or more of the following:
* served in another facilitator role
* leader on a project team
* tech lead
* co-chair

Any member who meets the above qualifications is encouraged to add themselves
to the [list of people in this role](/.github/settings.yml).

### Triage team

All members are expected to review Pull Requests (PRs), comment on issues, and
provide meaningful feedback or helpful references.

Members who have contributed regularly, including discussion on multiple
PRs and submitting PRs themselves, can volunteer to participate as a member
of the Triage Team.  Interested members should first join ` #sig-security-triage`
on Slack and flag issues that need attention, ask questions and volunteer
to take on process improvement PRs that may arise.

When there is a vacancy or need additional help, they will ask on Slack for
volunteers to officially join the team.

Each member of the Triage Team will:

* assign labels to issues.
* comment where issues need more detail.
* recommend proposals or suggestions for discussion at working session meetings.
* participate on #sig-security-triage slack channel.

### Project teams

Some on-going projects may have teams where members are identified for
additional roles and may be required to have specific expertise. For visibility,
these additional project roles are listed below:

* [Security Reviewers](../assessments/guide/security-reviewer.md/)
