
## Working Group Roles

The governance of the SAFE Working Group is comprised of:

* [Three Chairs](#role-of-chairs)
* [Technical Leads](#role-of-technical-leads) for each substantive block of work
* Group [Members](#role-of-members)

The group may have many members. Within this document, "member" may refer to a Chair, a Technical Lead, or a Member.

### Role of Members
* The primary role of a member is to contribute expertise to the group.
* Initial members are defined at the founding of the Working Group (WG).
* To add yourself as a member, submit a PR adding yourself to the list of
members.
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
removal may occur through a super-majority vote between Chairs and Technical
Leads. Those roles are described below.
* Membership disagreements may be escalated to the WG Chairs.  Disagreements
among the WG Chairs may be escalated to the CNCF Steering Committee.
* Members *MAY* decide to step down at anytime and optionally propose a
replacement.
* The group will use lazy consensus amongst other members with fallback on
majority vote to accept proposal.  The proposal *SHOULD* be supported by a
majority of WG Members.

### Role of Chairs

* Primary role of Chairs is to run operations and the governance of the WG.
* The Chairs are responsible for providing technical guidance, for bringing up
proposals that have been submitted, and for asking for new proposals to be made.
* A chair will serve in their role for 2 years from the time they started in
the role, and *MAY* run again indefinitely.
* To fill a vacancy for a new chair, the group will announce with at least two
week’s notice that a vote for chair will occur. Each company will have one
vote. Any group member is eligible to run for Chair.
* There will be three chairs and their membership will be tracked in
[`wg.yaml`]().


### Role of Technical Leads

Technical Leads (TLs) will lead larger streams of work that require sustained
technical leadership. Any new proposal should have a TL working as an active
sponsor of the proposal, guiding the proposal with the engagement of community.
The general list of activities for TL are:
  * Establish new subprojects
  * Decommission existing subprojects
  * Resolve cross-subproject technical issues and decisions

There will be two to three TLs and their membership will be tracked in
[`wg.yaml`](). TLs are elected by the following process:
  1. one of the Chairs nominates a candidate to be a TL, and creates a PR that
  adds the TL to [`wg.yaml`]().
  1. Members are invited to comment and vote according to the regular voting
  process described below.

Technical Leads will serve in their role as long as they are necessary. They
can resign at any time. If it's necessary to remove to TL, that will be done by
the WG Chairs. All changes should be reflected in `wg.yaml`.

## Creating, discussing and accepting proposals

Each proposal is unique and might deviate slightly from the process below. For
example, a small addition may not require completion criteria. In general, we
encourage this process below to be followed to ensure that contributions are in
line with the goals of the Working Group.

### Proposal process

1. **Raise an Issue:**
[Create an issue](https://github.com/cn-security/safe/issues/new) in the SAFE
repo that outlines the problem to be solved. If possible, include:
  * The customer impact of the problem
  * The scope of the work required

1. **Ask the group for collaboration:** Rather than immediately beginning work
on a solution, bring the issue up for discussion at a meeting, explain it, and
ask if others are interested in collaborating. This ensures that solutions are
created with multiple perspectives. The outcome of this conversation will be:
  * The group agrees that this is a problem within the scope if the Working
  Group.
  * Criteria for completion are added to the issue that include a "definition
  of done", ideally with validation by the target audience. Also note in the
  issue if it will be a time-bounded or on-going project.
  * At least one person is tasked with creating a solution
  * Those interested in working on the solution either begin work or set up
  time or expectations with others to begin work.
  * A Technical Lead agrees to actively sponsor the work.

1. **Track progress.** As long as work is ongoing, progress should be tracked
both in the Issue or PR and in meetings.
  * Someone working on the project will attend weekly meetings to answer
  questions. In case of their absence, ensure that the Technical Lead or their
  delegate is informed about the latest changes in case questions arise.
  * It's strongly encouraged to include a checklist that shows what has been
  done and what work remains in the Issue or PR.

1. **Discuss the work at a meeting.** If an objection to a PR is made either in
a comment of the PR or during a meeting, the person making the objection and
the person making the proposal will be given time to present their view at the
next meeting. If there are not objections, or if all concerns have been
addressed, and the Pull Request has been stable for 24 hours, a Chair will add
it to the agenda for an upcoming meeting. Ideally, members who contributed to
the project will attend that meeting to present their work or answer questions.

1. **Vote, if required.** In some cases, there's consensus to accept a
proposal, and a vote is not required. If there’s not consensus among the group,
a formal vote is required. A comment will be left on the proposal prompting
members to vote and indicating the time the vote will close. Only one member
from each company should vote. Members will vote by leaving a comment in the
Pull Request to indicate their vote for or against. Members will have a week
after the vote begins to leave their vote.

1. **Accept or close the proposal.** Depending on the outcome of a discussion,
a Chair will merge or close the proposal. If a proposal is closed, the group
should create a plan to address the underlying user problem that the proposal
intended to address.

1. **Support the project going forward.** Some projects require ongoing
support. When work is completed, the body of the Pull Request should specify if
it's expected to require on-going support and if so, who will maintain it.
