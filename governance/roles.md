# Roles within the TAG

The TAG includes several key roles that are critical to the group's success.
The group will have many members, all serving in varying capacities.  Within
this document, "member" may refer to a Chair, a Technical Lead, or other
Member roles.

The following is the current listing of member roles:

* [Three Chairs](#role-of-chairs)
* [Technical Leads](#role-of-technical-leads)
* [Chair Emeriti](#role-of-chair-emeriti)
* [Project Leads](#role-of-project-leads)
* [Team leads](#role-of-team-leads)
* [Group Members](#role-of-members)
* [TOC Liaison](#toc-liaison)
* [Facilitation Roles](#facilitation-roles)

All members are identified in the TAG [README](/README.md), with annotations
where they hold an additional role.

Members fulfilling any Roles in Security TAG are responsible for understanding
and abiding the by the [governance](./) and policies defined in this group.
This commitment and execution of understanding includes not only commits to
the repo, but also to any approvals or direction required by their Role.

**Write access to the repo**: Where applicable, the following roles define
specific areas of the repo or actions on issues where changes require write
access. In any case, governance is not enforced by [access permissions](github.md),
but rather by members who are expected to thoughtfully consider their actions
to support the group.

## Role of members

* The primary role of a member is to contribute expertise to the group.
* To add yourself as a member, submit a Pull Request (PR) adding yourself
to the list of members.

### Maintaining active members

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
* Members contribute to projects, according to the standard group
  [process](process.md).

### Managing membership

* Membership disagreements may be escalated to the Chairs.  Disagreements
among the Chairs may be escalated to a Security TAG TOC Liaison.
* Members *MAY* decide to step down at anytime and optionally propose a
replacement.

## Role of chairs

While CNCF TOC allows for Chairs to serve in purely administrative roles,
The Security TAG was formed with deeply technical Chairs based on early need
to navigate a complex security landscape. If the TAG has less than two Technical
Leads, any Chair may act as Technical Lead.

* Primary role of Chairs is to run operations and the governance of the group.
* The Chairs are responsible for ensuring that group meetings are planned
and facilitated effectively, while also engaging group members in leadership
roles. Effective facilitation includes (but is not limited to) the following
activities:
  * setting the agenda for meetings
  * extending discussion via asynchronous communication to be inclusive of
members who cannot attend a specific meeting time.
  * scheduling discussion of proposals that have been submitted
  * asking for new proposals to be made to address an identified need
  * partnering with Technical Leads to establish a roadmap and manage ongoing
    projects

## Role of technical leads

Technical Leads (TLs) expand the bandwidth of the leadership team. Proposals
must have a TL or Chair working as an active sponsor (as detailed in
[TAG process](process.md)).

The general list of activities for TL are:

* Establish new subprojects
* Decommission existing subprojects
* Resolve cross-subproject technical issues and decisions
* Propose agenda items for meetings to ensure that open issues are
  discussed with the group when needed

TLs are assigned by CNCF Technical Oversight Committee
(see [CNCF TAG Tech Lead nomination and election process](https://github.com/cncf/toc/blob/master/tags/cncf-tags.md#elections)).

## Role of chair emeriti

After a [Chair](#role-of-chairs) finishes their term, they transition into a role
of Chair Emeritus. This allows previous Chairs to continue to chime in and provide
valuable context and contributions to the TAG. A Chair Emeritus can assume a role
of a [technical lead](#roles-of-technical-leads), but in doing so, must be active
in communicating with the co-chairs and technical leads (i.e. participating in the
chair/TL slack and meetings). A Chair Emeritus has the same permissions/access as
technical leads.

## Role of project leads

Project Leads lead specific projects where a deliverable has been defined
within the issue.

Project Leads are nominated and approved by the following process:

  1. Project Lead actively participates in the group, initiates the proposal or
  volunteers to take on a project that has been prioritized by the group
  1. A Chair or TL nominates a candidate, or requests the community to
  nominate in a slack thread
  1. The nomination is communicated via a pull request annotating the list
   of members in the [TAG README](/README.md) with a link to the issue tracking
   the project or on the issue tracking the project if a README is not yet made.
  The nomination is typically open for a week (but may be shorter with LGTM
  of at least two Chairs).
  1. The issue is updated with the assignment of the project lead as "assignee"
  alongside the TAG Leadership member.
  1. Project Leads will be given the OWNER role of the directory or sub-directory
  for their team's activities in order to empower merge/approve.
  
### On-going projects
  
  On the occasion where a project becomes long term, Project Leads are also
  given the OWNER role of the directory or sub-directory along with 1 other
  nominated individual to ensure continuity in review and ongoing support of
  the project.

Depending on the expected length of the project, Project Leads may be assigned
as OWNERS of the project directory in this repository to help facilitate and
 moderate new content to the project.

## Role of Team Leads

Team Leads lead larger streams of work that require sustained effort and
coordination and remain ongoing.

Teams must have a Chair sponsor to maintain visibility in the team's work
and to ensure it is progressing.  The Chair sponsor also provides review
and approval as part of the process whether be on engagement or deliverable
publishing (such as with papers).  

On-going projects may not imply a team, and in such case the leadership role
described below to sustain and coordinate.  The on-going project leadership
 position may have an alternate title, such as our initial "Security Assessment
  Facilitator."

Team Leads are nominated and approved by the following process:

  1. Team Lead actively participates in the group, initiates the proposal or
  volunteers to lead a stream that has been prioritized by the group
  1. A Chair or TL nominates a candidate.
  1. The nomination is communicated via a pull request annotating the list of
  members in the [TAG README](/README.md) with a link to the issue tracking
  the stream of work.
  The nomination is typically open for a week (but may be shorter with LGTM of at
  least two Chairs).
  1. Members are encouraged to review any existing, relevant issues and work together
  to ensure the Team Lead is set up for success or suggest alternatives.
  1. A sub-directory with a README is created with details on how to get involved.
  1. Team Leads will be given the OWNER role of the directory or sub-directory for
  their team's activities in order to empower merge/approve.

## TOC liaison

The [CNCF TAG](https://github.com/cncf/toc/blob/master/tags) process identifies
a TOC Liaison.  The TAG Chairs are responsible for establishing effective
communication with the TOC liaison, including further communication to the
wider TOC upon request.

The TOC Liaison will occasionally prioritize TAG activities, as needed by the
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

### Security review facilitator

[Security Reviews](/assessments) are part of the ongoing work of the group
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

One or more of the following:

* served in another facilitator role
* leader on a project team
* tech lead
* co-chair

Any member who meets the above qualifications is encouraged to add themselves
to the [list of people in this role](/.github/settings.yml).

### Meeting Scribe(s)

Each meeting must have at a minimal one scribe and preferable with two.

Scribe is expected to perform the following:

* Plan to coordinate/review meeting Agenda with facilitator via Slack before
start of meeting
* Summarize discussions and capture into meeting notes (not transcribe verbatim)
* Clarify and annotate actions as discussion progresses with assignee and due
dates
* Partner with Facilitator to capture major occurring items in the meeting
* Add links to issues being discussed if not already in Agenda
* Open new issues to track action items from meeting

### Triage team

All members are expected to review Pull Requests (PRs), comment on issues, and
provide meaningful feedback or helpful references.

Members who have contributed regularly, including discussion on multiple
PRs and submitting PRs themselves, can volunteer to participate as a member
of the Triage Team.  Interested members should first join `#tag-security-triage`
on Slack and flag issues that need attention, ask questions and volunteer
to take on process improvement PRs that may arise.

When there is a vacancy or need additional help, they will ask on Slack for
volunteers to officially join the team.

Each member of the Triage Team will:

* assign labels to issues.
* comment where issues need more detail.
* recommend proposals or suggestions for discussion at working session meetings.
* participate on #tag-security-triage slack channel.

### Project teams

Some ongoing projects may have teams where members are identified for
additional roles and may be required to have specific expertise. For visibility,
these additional project roles are listed below:

* [Security Reviewers](../assessments/guide/security-reviewer.md/)
