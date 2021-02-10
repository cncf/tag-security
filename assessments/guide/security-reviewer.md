# Security reviewer

## Lead reviewer
The lead reviewer serves as the primary security review facilitator,
often coordinating responses between the project and reviewers, ensuring
communications are performed in a timely fashion as described in the
[guide](./).  The lead reviewer also responsible for coordinating
and recruiting additional reviewers as appropriate, and managing the
documentation updates (self-review and
final review) to the project's review folder.

The lead reviewer is further tasked with performing the clarifying
questions phase of the security review.  The lead reviewer may identify
another reviewer to perform this task  on their behalf; serving as their
delegate or designee for that task.

## Reviewers
Reviewers seek to understand the system and probe its security.
Design level issues should be considered as well as any high
level problems with the project’s setup and operation. The [guide](./)
is intended to provide an independent analysis based primarily on documents
provided by the project itself.

Reviewers may look at code, but aren't required to do so. Reviewers are
encouraged to familiarize themselves with the contents of the repo, such as
 any instructions, guides, docs, or process information to better assist them in
their function as a reviewer.

Reviewers are expected to ask questions to understand if there are hidden
assumptions, underestimated risk, or design issues that harm or risk
the security of the project.

A reviewer may be delegated to perform specific tasks by the lead security
reviewer in order to ensure the appropriate experience is leverage in conducting
the activity.
This may include but is not limited to the clarifying questions phase.

Reviewers are encouraged to reach out to community members to resolve
some questions, especially involving deployment scenarios and the impact
of attacks.

## Qualifications

### Required 
Unless approved by SIG-Security chairs, the lead reviewer will have previously 
performed a CNCF security review.  Exemptions to this are reviewed case by 
case upon established need by the CNCF SIG-Security chairs in order to bootstrap 
the process as appropriate.  If a lead reviewer has not previously performed a 
security review, and the chairs concur with them fulfilling the role, it is 
encouraged that at least 1 additional reviewer have experience and be leveraged
as the delegate or designee by the lead.

### Preferred
It is preferred reviewers have previous experience performing formal or informal
software or security audits or reviews for a variety of organizations.  An
ideal reviewer should also have been the recipient of CNCF project security
reviews for a software project they manage.

Note: Participation through shadowing is encouraged from members who are not
qualified for security reviews, to facilitate their development of the necessary
skills to be a reviewer in the future.

## Time and effort
The level of effort for the reviewers is expected to be 10 hours per review.  
Correspondance, project availability, and clarification of a project's scope
or other details in the ticketed request for project security review may
require additional time. However, analysis is expected to be concluded in a
few weeks -- usually 3 weeks.  Effort is expected to include and may not be
limited to:
* reviewing existing security documentation
* reviewing ticketed request for project security review
* analysis of security assertions and assumptions
* attending project presentation with Q&A
* discussion via Slack or additional live Q&A sessions

## Expectations

GitHub issues are assigned to security reviewers. Security reviewers are
expected to conduct an in-depth review described in the [Security Review
Guide](./). The lead security reviewer should seek the approval of the other
participating security reviewers and at least 1 co-chair before merging.

## Conflict of interest

There is a possibility of a conflict of interest that can arise between a
security reviewer and the project being reviewed due to the closely-knit nature
of the community. Having clear guidelines for conflict of interest situations
are important to prevent:

- Individuals from intentionally or unintentionally promoting their own
company's project
- SIG-Security chairs and review leads intentionally or
unintentionally limiting the participation of an individual unfairly by
asserting conflict of interest
- Security reviews being stalled while groups belabor on who should be allowed
to participate

The conflicts of interest lie on a spectrum, and are classified into hard and soft conflicts:
* A hard conflict makes a reviewer ineligible to review a project.
* A soft conflict allows a reviewer to review a project, but not as a
[project lead](./project-lead.md).
* It is not unusual for reviewers to have soft conflicts. The diversity of
reviewers that are familiar with a project and can provide a deeper insight
together with a fresh set of eyes is beneficial to the success of a security
review.

All reviewers must provide a conflict declaration to indicate which hard or soft
conflicts do, or do not exist
when they volunteer to be a reviewer.  This is done by placing a comment on the
issue associated with the review.
Should a conflict arise during the time of the review, reviewers should
notify the lead security reviewer when
they become aware of the potential conflict, so the new conflict may be
consulted with the facilitator and/or chairs.

The lead security reviewer has the responsibility of ensuring a balanced review,
and as part of that before kicking off the review must:
* Check that all reviewers have conflict-of-interest declarations,
* Provide their own declaration of any potential conflict-of-interest
(or lack thereof),
* Ask clarifying questions, if needed
* Assert that:
  1. They have reviewed all conflict-of-interest declarations from the reviewers;
  2. There are no hard-conflicts present without a waiver;
  3. They believe that the review team is able to provide a balanced and fair
  review

Update the above assertion if a new conflict-of-interest becomes known during
the course of the review.

The Security Review Facilitator or a SIG-Security chair must review the 
Lead Security Reviewer conflict-of-interest assertion.

If any hard conflicts, or multiple significant soft conflicts, are presented,
then 2 SIG-Security chairs must approve the security review team. Reasons for 
accepting and rejecting conflicts should be documented.
In most cases, the existence of a hard conflict will prevent a SIG member from
 participating in the review for which their hard conflict exists.
Depending on the circumstances of the particular conflict, the review, and
the project, two chairs and the review facilitator may determine if the hard 
conflict may be waived.  Should this occur, the decision's justification will 
be documented to ensure it clearly depicts the circumstances for granting the
waiver.

#### Below are classifications of hard/soft conflicts:

Hard conflicts:
- Reviewer is a maintainer of the project
- Reviewer is a direct report of/to a maintainer of the project
- Reviewer is paid to work on the project
- Reviewer has significant financial interest directly tied to success of the
  project

Soft conflicts:
- Reviewer belongs to the same company/organization of the project,
  but does not work on the project
- Reviewer uses the project in his/her work
- Reviewer has contributed to the project.
- Reviewer has a personal stake in the project (personal relationships, etc.)
