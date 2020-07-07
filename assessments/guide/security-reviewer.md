# Security reviewer

## Lead reviewer
The lead reviewer serves as the primary security assessment facilitator, often coordinating responses between the project and reviewers, ensuring communications are performed in a timely fashion as described in the [guide](./).  The lead reviewer also responsible for coordinating and recruiting additional reviewers as appropriate, reviewing and deliberating conflict of interest statements, and managing the documentation updates (self-assessment and final assessment) to the project's assessment folder.

The lead reviewer is further tasked with performing the clarifying questions phase of the security assessment.  The lead reviewer may identify another reviewer to perform this task on their behalf; serving as their delegate or designee for that task.  

## Reviewers
Reviewers seek to understand the system and probe its security.
Design level issues should be considered as well as any high
level problems with the project’s setup and operation. The [guide](./)
is intended to provide an independent analysis based primarily on documents
provided by the project itself.

Reviewers may look at code, but aren't required to do so. Reviewers are encouraged to familiarize themselves with the contents of the repo, such as any instructions, guides, docs, or process information to better assist them in their function as a reviewer. 

Reviewers are expected to ask questions to understand if there are hidden
assumptions, underestimated risk, or design issues that harm or risk
the security of the project.

A reviewer may be delegated to perform specific tasks by the lead security reviewer in order to ensure the appropriate experience is leverage in conducting the activity.  This may include but is not limited to the clarifying questions phase.

Reviewers are encouraged to reach out to community members to resolve
some questions, especially involving deployment scenarios and the impact
of attacks.

## Qualifications

### Required 
Unless approved by SIG-Security chairs, the lead reviewer will have previously performed a CNCF security assessment.  Exemptions to this are reviewed case by case upon established need by the CNCF SIG-Security chairs in order to bootstrap the process as appropriate.  If a lead reviewer has not previously performed a security assessment, and the chairs concur with them fulfilling the role, it is encouraged that at least 1 additional reviewer have experience and be leveraged as the delegate or designee by the lead.

### Preferred
It is preferred reviewers have previous experience performing formal or informal software or security audits or assessments for a variety of organizations.  An ideal reviewer should also have been the recipient of CNCF project security assessments for a software project they manage.  

Note: Participation through shadowing is encouraged from members who are not qualified for security reviews, to facilitate their development of the necessary skills to be a reviewer in the future.

## Time and effort
The level of effort for the reviewers is expected to be 10 hours per review. Correspondance, project availability, and clarification of a project's scope or other details in the ticketed request for project security assessment may require additional time. However, analysis is expected to be concluded in a few weeks -- usually 3 weeks.  Effort is expected to include and may not be limited to:
* reviewing existing security documentation
* reviewing ticketed request for project security assessment
* analysis of security assertions and assumptions
* attending project presentation with Q&A
* discussion via Slack or additional live Q&A sessions

## Expectations

GitHub issues are assigned to security reviewers. Security reviewers are
expected to conduct an in-depth review described in the [Security Assessment
Guide](./). The lead security reviewer should seek the approval of the other
participating security reviewers and at least 1 co-chair before merging.

## Conflict of interest

There is a possibility of a conflict of interest that can arise between a security reviewer and
the project being reviewed due to the closely-knit nature of the community. Having clear
guidelines for conflict of interest situations are important to prevent:

- Individuals from intentionally or unintentionally promote their own company's project
- SIG-Security chairs and assessment leads could intentionally or unintentionally limit the participation of an individual unfairly by asserting conflict of interest
- Security reviews being stalled while groups belabor on who should be allowed to participate

The conflicts of interest lie on a spectrum, and are classified into hard and soft conflicts.
Hard conflicts makes a reviewer ineligible to review a project.
A soft conflict allows a reviewer to review a project, but not as a [project lead](./project-lead.md).
A reviewer with a soft conflict is required to document the nature of the conflict in the
security assessment ticket. It is the responsibility of the security reviewer
to make known his/her own conflict of interests.

### Reviewing conflict of interest
For each project, 2 SIG-Security chairs or a SIG-Security Chair and the security assessment facilitator must confirm that the lead reviewer has no conflicts, and any conflicts escalated by the lead reviewer are reviewed and decided upon.  A reviewer may be ineligble to participate in the security assessment if:
* Hard conflicts exist
* Multiple soft conflicts exist

Reasons for accepting and rejecting conflicts are to be documented.

#### Below are classifications of hard/soft conflicts:

Hard conflicts:
- Reviewer is a maintainer of the project
- Reviewer is a direct report of/to a maintainer of the project
- Reviewer is paid to work on the project
- Reviewer has significant financial interest directly tied to success of the project

Soft conflicts:
- Reviewer belongs to the same company/organization of the project, but does not work on the project
- Reviewer uses the project in his/her work
- Reviewer has contributed to the project.
- Reviewer has a personal stake in the project (personal relationships, etc.)
