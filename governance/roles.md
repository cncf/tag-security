# Roles within the TAG

The TAG includes several key roles that are critical to the group's success. The
group will have many members, all serving in varying capacities.  Within this
document, "member" may refer to a Chair, a Technical Lead, or other Member
roles.

The various roles are listed as follows:

* [Role of members](#role-of-members)
  * [Maintaining active members](#maintaining-active-members)
  * [Managing membership](#managing-membership)
* [Role of chairs](#role-of-chairs)
* [Role of technical leads](#role-of-technical-leads)
* [Role of chair emeriti](#role-of-chair-emeriti)
* [Role of project leads](#role-of-project-leads)
  * [Ongoing projects](#ongoing-projects)
* [Role of team leads](#role-of-team-leads)
* [TOC liaison](#toc-liaison)
* [Facilitation roles](#facilitation-roles)
  * [Security assessment facilitator](#security-assessment-facilitator)
  * [Meeting facilitator](#meeting-facilitator)
  * [Meeting scribe](#meeting-scribe)
  * [Triage team](#triage-team)
  * [Project teams](#project-teams)

All chairs and leads are identified in the TAG [README](/README.md).

Members fulfilling any Roles in Security TAG are responsible for understanding
and abiding the by the [governance](./) and policies defined in this group. This
commitment and execution of understanding includes not only commits to the repo,
but also to any approvals or direction required by their Role.

**Write access to the repo**: Where applicable, the following roles define
specific areas of the repo or actions on issues where changes require write
access. In any case, governance is not enforced by [access
permissions](github.md), but rather by members who are expected to thoughtfully
consider their actions to support the group.

## Role of members

* The primary role of a member is to contribute expertise to the group.

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

While CNCF TOC allows for Chairs to serve in purely administrative roles, The
Security TAG was formed with deeply technical Chairs based on early need to
navigate a complex security landscape.

* The primary role of Chairs is to ensure effective operations and governance
  of the group. This includes coordination with the TOC and providing approval
  for governance changes.
* The Chairs are responsible for ensuring that group meetings are planned
  and have facilitators assigned, while also engaging group members in leadership
  roles.
* Chairs are responsible for approving Pull Requests, specifically for
  top-level content of the repository
* Chairs may additionally perform any actions of technical leads as needed,
  especially serving as the Security TAG leadership representative to a project.

## Role of technical leads

Technical Leads (TLs) expand the bandwidth of the leadership team. Proposals
must have a TL or Chair working as an active sponsor (as detailed in [TAG
process](process.md)).

The general list of activities for TL are:

* Acting as maintainers of the TAG Security GitHub repository. This includes
  reviewing pull requests and publications.
* Establish new sub-projects
* Decommission existing sub-projects
* Resolve cross-sub-project technical issues and decisions
* Propose agenda items for meetings to ensure that open issues are discussed
  with the group when needed
* serving as Security TAG leadership representative to ensure the project and
  project lead(s) is successful
  * check in with the project lead regularly to discuss progress, blockers, and
    updates
    * provide mentorship to project lead(s)
    * ensure the schedule set by the project lead(s) is adhered to
    * verify the scope and proposed deliverables of the project are in alignment
      with the [Charter](charter.md) prior to recommendation of becoming a
      project
    * provide the Chairs and others on the leadership team with updates
    * keep the issue up to date for the project lead(s) if they don't have write
      access to do so
    * enforce and encourage company diversity on a given project where possible
    * provide guardrails and guidance to the project and project lead(s) as
      appropriate

TLs are assigned by CNCF Technical Oversight Committee (see [CNCF TAG Tech Lead
nomination and election
process](https://github.com/cncf/toc/blob/master/tags/cncf-tags.md#elections)).

## Role of chair emeriti

After a [Chair](#role-of-chairs) finishes their term, they transition into a
role of [Chair Emeritus](#role-of-chair-emeriti). This allows previous Chairs to
continue to chime in and provide valuable context and contributions to the TAG.
A [Chair Emeritus](#role-of-chair-emeriti) can assume a role of a [technical
lead](#role-of-technical-leads), but in doing so, must be active in
communicating with the co-chairs and technical leads (i.e. participating in the
chair/TL slack and meetings). A Chair Emeritus has the same permissions/access
as technical leads.

## Role of project leads

Project Leads lead specific projects where a deliverable has been defined
within the issue.

Project Leads are nominated and approved by the following process:

1. Project Lead actively participates in the group, initiates the proposal or
   volunteers to take on a project that has been prioritized by the group.
2. A Chair or TL nominates a candidate, or requests the community to
   nominate in a slack thread.
3. The nomination is communicated via a pull request annotating the list
   of members in the [TAG README](/README.md) with a link to the issue tracking
   the project or on the issue tracking the project if a README is not yet made.
   The nomination is typically open for a week (but may be shorter with LGTM
   of at least two Chairs).
4. The issue is updated with the assignment of the project lead as "assignee"
   alongside the TAG Leadership member.
5. Project Leads will be given the OWNER role of the directory or sub-directory
   for their team's activities in order to empower merge/approve.

### Ongoing projects

On the occasion where a project becomes long term, Project Leads are also
given the OWNER role of the directory or sub-directory along with 1 other
nominated individual to ensure continuity in review and ongoing support of
the project.

  1. The nomination is typically open for a week (but may be shorter with LGTM
  of at least two Chairs).
  1. The issue is updated with the assignment of the project lead as "assignee"
  alongside the TAG Leadership member.
  1. Project Leads will be given the OWNER role of the directory or
  sub-directory for their team's activities in order to empower
  merge/approve.

This role may be subject to [lead rotations](#lead-rotations).

Depending on the expected length of the project, Project Leads may be assigned
as OWNERS of the project directory in this repository to help facilitate and
moderate new content to the project.

### Duties of a project lead

Project leads are responsible for the following:

- Adhering to the [project process](https://github.com/cncf/tag-security/blob/main/governance/process.md)
- Proposing and refining the project scope, goal and schedule
- Ensure smooth day-to-day operations of the project. This includes:
  - Ensuring meetings are scheduled, announced and recorded
  - Facilitation of meetings, ensuring minutes are recorded
- Ensure progress and status reports are communicated to the STAG
representative of the project
- Resolving conflict within the project and escalating to leadership
when required
- Outreach and recruitment for the project
- Provide retrospective of a project to the STAG

## Role of STAG representatives

STAG representatives are leadership executive sponsors of a project. The
STAG representative acts as a point of liaison with the STAG leadership team
and takes on a role of mentorship for the project lead(s).

STAG representatives are required to be part of the STAG leadership team.
This includes co-chairs, technical leads and co-chair emeritus roles.
A STAG representative may be of capacity of an individual contributor but
cannot be the project lead of the same project they are representing.

STAG representatives are appointed through the following process:

- A member of the leadership indicates that they would like to be a STAG
representative on a project by:
  - editing the issue's "STAG Representative" field to their github ID.
  - setting the issue milestone to the corresponding milestone created for
  their github ID.
- STAG representatives may change based on discretion of co-chairs.

### Duties of a STAG representative

STAG representatives are responsible for the following:

- Reporting back to the leadership on the status of the project, indicating
when the project requires external governance help. For example, these
include:
  - Project is understaffed or suffers from rampant scope creep.
  - Project is inactive and needs to be discontinued.
  - Inter-personal issues within leads and/or members causing disruption.
- Provide feedback to project lead to whether the current scope and operation
of a project is in line with the vision and governance of the STAG.
- Mentorship of project leads on matters of leadership and governance process.
- Provide privilege facilities that a project lead does not have access to.
Examples are:
  - Creating a ServiceNow ticket with the CNCF for design help
  - Uploading of meeting recordings to youtube
  - Approval of messages to STAG mailing list

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
     the stream of work. The nomination is typically open for a week (but may be
     shorter with LGTM of at least two Chairs).
  1. Members are encouraged to review any existing, relevant issues and work
     together to ensure the Team Lead is set up for success or suggest
     alternatives.
  1. A sub-directory with a README is created with details on how to get involved.
  1. Team Leads will be given the OWNER role of the directory or sub-directory
     for their team's activities in order to empower merge/approve.

This role may be subject to [lead rotations](#lead-rotations).

## TOC liaison

The [CNCF TAG](https://github.com/cncf/toc/blob/master/tags) process identifies
a TOC Liaison.  The TAG Chairs are responsible for establishing effective
communication with the TOC liaison, including further communication to the wider
TOC upon request.

The TOC Liaison will occasionally prioritize TAG activities, as needed by the
TOC, to further the [CNCF mission](https://github.com/cncf/foundation/blob/master/charter.md#1-mission-of-the-cloud-native-computing-foundation).

## Facilitation roles

Members often contribute by working in small groups that research and discuss
options and then share their findings with the rest of the group in a
presentation and typically contribute to the body of work in this repository
(via Pull Request). Some tasks can be effectively executed by simply chiming in
on a github issue and independently contributing a PR without any particular
role or authorization.

This section describes roles where more coordination is helpful and the work
benefits from identifying one or more members who will take on specific
responsibilities.  Our goal is to empower members to move forward independently,
while defining an approval process designed to support communication and
alignment across the wider group.

New roles in this section are typically defined after someone has acted in that
role for some time informally, then proposed as an on-going role by Pull Request
which must be approved by a majority of Chairs.  Process clarifications are
welcome and PRs can be approved by any single Chair.

### Security assessment facilitator

[Security Reviews](/community/assessments) are part of the ongoing work of the group
and led by a security assessment facilitator (referred to in the rest of this
sub-section as a facilitator). The facilitator is responsible for:

* Ensuring that security reviews follow the assessment process.
* Helping to bootstrap security assessments and reviews.
* Determining assessment schedule of reviews, considering TOC requirements.

The facilitator is responsible for coordinating with the TAG-Security co-chairs
and deciding on the order in which security assessments (as submitted in the
[GitHub issues tracker for
TAG-Security](https://github.com/cncf/tag-security/issues?q=is%3Aopen+is%3Aissue+label%3Aassessment)
will be addressed.  The facilitator is then responsible for reaching out to the
project owners (via the GitHub issue said owners previously created in order to
request an assessment), and coordinating the various requirements as outlined
in the ["Joint Security Review" ticket
template](https://github.com/cncf/tag-security/issues/new/choose). Once the
maintainers/owners of the project have been identified, the facilitator is
responsible for reaching out to the TAG-Security community at large (i.e.
typically via attending the weekly general meetings or announcing to the
community [via the `#tag-security`
channel](https://cloud-native.slack.com/archives/CDJ7MLT8S)), and issue a
call/request for reviewers (i.e. a single security assessment lead, and at
least two additional security reviewers), and ensuring all reviewers [read the
conflict of interest disclosure](/community/assessments/guide/security-reviewer.md) and
sign-off on it in the GitHub ticket itself.

From this point forward, the security assessment lead is the primary
individual responsible for driving progress in the assessment process with support from
the security reviewers, as well as the project owners. The security assessment
facilitator will act as a point of contact for escalations and will be
responsible for conducting regular check-ins with the team to ensure that the
assessment moves forward.

Near the conclusion of the assessment (i.e. drafts of the self-assessment
document and the joint review document are published via a pull request against
the TAG-Security GitHub repository), the facilitator will take part in the
review/feedback process alongside the security assessment lead and security
reviewers.

At the conclusion of the assessment (i.e. satisfactory completion of the
final/canonical revisions of the self-assessment document and the joint review
the document, chair approval, etc.), the facilitator is responsible for merging the
pull request(s) associated with the assessment into the `main` branch of the
TAG-Security GitHub repository.

In addition to the aforementioned responsibilities, the facilitator is
responsible for triaging issues that may impede the progress of the review, and
coordinating with the security assessment lead and the TAG-Security co-chairs as
needed (depending on the nature of the issue). The most important aspect to this
responsibility is to provide visibility into the underlying issue so that it can
be identified and remedied as early as possible.

Lastly, the facilitator is expected, based on their experiences while working
with security assessments, to identify any recurring issues or processes (i.e.
"pain points") that impede reviews, and provide recommendations to the
TAG-Security co-chairs on how to remedy or prevent said issues (i.e. does a
process need to change, or is there a better tool or approach to implementing a
specific part of an assessment document, etc.).

### Meeting facilitator

The group meetings are an important part of community building and the
facilitator ensures a welcoming and inclusive atmosphere. In keeping with these
goals, the meeting facilitator has the following responsibilities:

* Prepares the meeting notes with template and agenda.
* Coordinates with presenter, if applicable.
* Ensures there are scribes.
* Runs meeting check-in, including partner groups.
* Leads the meeting through the agenda.

Effective facilitation includes (but is not limited to) the following
activities:

* Setting the agenda for meetings.
* Extending discussion via asynchronous communication to be inclusive of
  members who cannot attend a specific meeting time.
* Scheduling discussion of proposals that have been submitted.
* Asking for new proposals to be made to address an identified need.
* Partnering with Technical Leads to establish a roadmap and manage ongoing
  projects.

Prerequisites:

* Active member.
* History of regular attendance.

One or more of the following:

* Served in another facilitator role.
* Leader on a project team.
* Tech Lead.
* Co-chair.

Any member who meets the above qualifications is encouraged to add themselves to
the [list of people in this role](/.github/settings.yml).

### Meeting scribe

Each meeting must have at a minimal one scribe and preferable with two.

Scribe is expected to perform the following:

* Plan to coordinate/review meeting Agenda with facilitator via Slack before
  start of meeting.
* Summarize discussions and capture into meeting notes (not transcribe
  verbatim).
* Clarify and annotate actions as discussion progresses with assignee and due
  dates.
* Partner with Facilitator to capture major occurring items in the meeting.
* Add links to issues being discussed if not already in Agenda.
* Open new issues to track action items from meeting.

### Triage team

All members are expected to review Pull Requests (PRs), comment on issues, and
provide meaningful feedback or helpful references.

Members who have contributed regularly, including discussion on multiple PRs and
submitting PRs themselves, can volunteer to participate as a member of the
Triage Team.  Interested members should first join `#tag-security-triage` on
Slack and flag issues that need attention, ask questions and volunteer to take
on process improvement PRs that may arise.

When there is a vacancy or need additional help, they will ask on Slack for
volunteers to officially join the team.

Each member of the Triage Team will:

* Assign labels to issues.
* Comment where issues need more detail.
* Recommend proposals or suggestions for discussion at working session meetings.
* Participate on #tag-security-triage slack channel.

### Project teams

Some ongoing projects may have teams where members are identified for additional
roles and may be required to have specific expertise. For visibility, these
additional project roles are listed below:

* [Security Reviewers](/community/assessments/guide/security-reviewer.md)

## Lead rotations

For certain facilitator roles, teams and projects that are ongoing, leadership
rotations should be carried out every 6 months. This is to:

* Ensure leadership continuity of projects and passing on of tribal knowledge
* Ensure diverse perspective/breadth of knowledge
* Prevention of commitment bias in projects
* Provide more leadership opportunities for more community members

A facilitator role/project lead position should be a candidate for rotation if the
project/facilitation task:

* Exists for more than 6 months
* Involves more than 1 person

### Rotation process

The rotation process should start at least 2 weeks before a rotation is due.

1. STAG representative will get feedback on potential candidates from current
   leads and through nominations from the STAG leadership
1. Leads should recommend a number of potential candidates based on the
   current number of lead positions
1. Based on the nominations, STAG leadership will decide on the next lead
   rotation
1. STAG representative will reach out to nominated leads for acceptance of new
   role
1. In the event that no rotation candidates are available, due to lack of
   nominations or unavailability of nominees, the current rotation cycle will be
   skipped. However, reconsideration/restructuring of the project or work will
   be raised and discussed between STAG co-chairs.
1. Validation that proper transition has happened will be done by STAG representative.
1. If there are multiple leads on a project, STAG leadership will work with
   current leads to decide how many leads should be rotated.
