
## Working Group Roles

The SAFE Working group aims to have three Chairs, Technical Leads for each substantive block of work, and many members.

Unless otherwise stated, individuals are expected to be responsive and active within
their roles.  Within this section "member" refers to a member of a Chair, Technical Lead or
Members.

### Role of Members
- The primary role of a member is to contribute expertise to the group.
- Initial members are defined at the founding of the WG.
- To add yourself as a member, submit a PR adding yourself to the list of members.
- Members *SHOULD* remain active and responsive in their Roles.
- Members taking an extended leave of 1 or more months *SHOULD* coordinate with other members to ensure the role is adequately staffed during the leave.
- Members going on leave for 1-3 months *MAY* work with other members to identify a temporary replacement.
- Members of a role *SHOULD* remove any other members that have not communicated a leave of absence and either cannot be reached for more than 1 month or are not fulfilling their documented responsibilities for more than 1 month. This may be done through a [super-majority] vote of members, or if there are not enough *active* members to get a super-majority of votes cast, then removal may occur through a [super-majority] vote between Chairs and Technical Leads.
- Membership disagreements may be escalated to the WG Chairs.  WG Chair membership disagreements may be escalated to the CNCF Steering Committee.
- Members *MAY* decide to step down at anytime and propose a replacement.  
- The group will use lazy consensus amongst other members with fallback on majority vote to accept proposal.  The candidate *SHOULD* be supported by a majority of SIG Members or Subproject Contributors (as applicable).
- Members *MAY* select additional members through a [super-majority] vote amongst members. This *SHOULD* be supported by a majority of WG Members.

### Role of Chairs

* Primary role of chairs is to run operations and processes governing the WG.
* The Chairs are responsible for providing technical guidance, for bringing up proposals that have been submitted, and for asking for new proposals to be made.
* A chair will serve in their role for 2 years from when they started in the role, and *MAY* run again indefinitely.
* To fill a vacancy for a new chair, the group will announce with at least two week’s notice that a vote for chair will occur. Each company will have one vote. Any group member is eligible to run for Chair.
* There will be three chairs and their membership will be tracked in [`wg.yaml`]().


### Role of Technical Leads

Technical Leads will lead larger streams of work that require sustained technical leadership. Any new proposal should have a TL working as an active sponsor of the proposal, guiding the proposal with the engagement of community. The general list of activities for TL are
  - Establish new subprojects
  - Decommission existing subprojects
  - Resolve cross-subproject technical issues and decisions

There will be two to three TLs and their membership will be tracked in [`wg.yaml`](). TLs are elected by one of the chairs nominating a candidate and creating a PR that adds the TL to [`wg.yaml`](). Members are invited to comment and vote according to the regular proposal process described below.

## Creating, discussing and accepting proposals

Each proposal is unique and might deviate slightly from the process below. For example, a smaller project may each step. For example, a small addition may not require establishing completion criteria. In general, we encourage this process below to be followed to ensure that contributions are in line with the goals of the Working Group.
### Proposal process

1. **Raise an Issue.** [Create an issue](https://github.com/cn-security/safe/issues/new) in the SAFE repo that outlines the problem to be solved. If possible, include:
  * The customer impact of the problem
  * The scope of the work required

1. **Ask the group for collaboration.** Rather than immediately beginning work on a solution, at the next meeting, bring the issue up for discussion, explain it, and ask if others are interested in collaborating. This ensures that solutions are created with multiple perspectives. The outcome of this conversation will be:
  * The group agrees that this is a problem to solve
  * There are criteria for completion or failure, and those will be added to the issue.
  * At least one person is tasked with creating a solution
  * Those interested in working on the solution either begin work or set up time or expectations with others to begin work.
  * A TL is agrees to actively sponsor the work.

1. **Track progress.** As long as work is ongoing, progress should be tracked in the issue.   
  * Collaborators should update the body of the Issue or PR to include a checklist of work that shows what has been done and what work remains.
  * Additionally, when possible, someone working on the project should attend the weekly meetings and give an update.

1. **Discuss the work at a meeting.** If an objection to a PR is made either in a comment of the PR or in call discussing the meeting, both the person making the objection and the person making the person making the proposal will have time to present their case at the next meeting. If there are not unaddressed concerns, and the Pull Request has been stable for 48 hours, a Chair will add it to the agenda for an upcoming meeting. Ideally, members who contributed to the project will attend that meeting to present their work or answer questions.

1. **Vote, if required.** If there’s not (lazy) consensus among the group, a formal vote is required. Only one member from each company should vote. Members will vote by leaving a comment in the Pull Request to indicate their vote for or against. Members will have a week to vote.

1. **Accept or close the proposal.** Depending on the outcome of a discussion, a Chair will merge or close the work created. When a proposal is closed, the group should create a plan to address the underlying user problem that the proposal addressed.

1. **Support the project going forward.** Some projects require ongoing support. When the work is completed
