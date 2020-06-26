# Security reviewer

Reviewers seek to understand the system and probe its security.
Design level issues should be considered as well as any high
level problems with the project’s setup and operation. The [process](./)
is intended to provide an independent analysis based primarily on documents
provided by the project itself.

Reviewers may look at code, but aren't required to do so. Review of
documents includes asking questions to understand if there are hidden
assumptions, underestimated risk, or design issues that harm or risk
the security of the project.

Reviewers are encouraged to reach out to community members to resolve
some questions, especially involving deployment scenarios and the impact
of attacks.

## Qualifications

### Required

Unless approved by SIG-Security chairs, at least one of the reviewers will have previously performed a CNCF security assessment.  Exemptions to this are reviewed case by case upon established need by the CNCF SIG-Security chairs in order to bootstrap the process as appropriate.

### Preferred

It is preferred that reviewers have prior experience performing formal or informal software or security audits or assessments for a variety of organizations.  An ideal reviewer should also have been the recipient of security assessments or audits for a software project they manage.

Note: Participation through shadowing is encouraged from members who are not qualified for security reviews, to facilitate their development of the necessary skills to be a reviewer in the future.

## Time and effort

The level of effort for the reviewers is expected to be 10 hours per review. Correspondance, project availability, and clarification of a project's scope or other details in the ticketed request for project security assessment may require additional time. However, analysis is expected to be concluded in a few weeks.  Effort is expected to include and may not be limited to:
* reviewing existing security documentation
* reviewing ticketed request for project security assessment
* analysis of security assertions and assumptions
* attending project presentation with Q&A
* discussion via Slack or additional live Q&A sessions

## Expectations

GitHub issues are assigned to security reviewers. Security reviewers are
expected to conduct an in-depth review described in the [Security Assessment
Guide](./).

## Conflict of interest

There is a possibility of a conflict of interest that can arise between a security reviewer and
the project being reviewed due to the closely-knit nature of the community. Having clear
guidelines for conflict of interest situations are important to prevent:

- Individuals from intentionally or unintentionally promote their own company's project
- SIG-Security chairs and assessment leads could intentionally or unintentionally limit the participation of an individual unfairly by asserting conflict of interest
- Security reviews being stalled while groups belabor on who should be allowed to participate

The conflicts of interest lie on a spectrum, and are classified into hard and soft conflicts:
* A hard conflict makes a reviewer ineligible to review a project.
* A soft conflict allows a reviewer to review a project, but not as a [project lead](./project-lead.md).
* It is not unusual for reviewers to have soft conflicts. The diversity of reviewers that are familiar with a project and can provide a deeper insight together with a fresh set of eyes is beneficial to the success of a security review.
  balanced assessment.

A reviewer with a any conflict or potential conflect is required to document the nature of the conflict when volunteering as a reviewer, or at any time as they
become aware of a potential conflict. It is the responsibility of the security 
reviewer to make known his/her own conflict of interests and ensure that
their declaration has been reviewed and approved by lead security reviewer.

The lead security reviewer has the responsibility of ensuring a balanced review,
and as part of that before kicking off the assessment must:
* check that all reviewers have conflict-of-interest declarations
* make their declaration of any potential conflict-of-interest (or lack thereof)
* ask clarifying questions, if needed
* assert that:
  1. they have reviewed all conflict-of-interest declarations;
  2. there are no hard-conflicts;
  3. they believe that the review team is able to provide a balanced and fair assessment

Update the above assertion if a new conflict-of-interest becomes known during
the course of the assessment.

The Security Assessment Facilitator or a SIG-Security chair must review the 
Lead Security Reviewer conflict-of-interest assertion.

If there any conflicts are presented, then 2 SIG-Security chairs must approve
the security review team. Reasons for accepting and rejecting conflicts should
be documented.

Below are classifications of hard/soft conflicts.

Hard conflicts:
- Reviewer is a maintainer of the project
- Reviewer is a direct report of/to a maintainer of the project
- Reviewer is paid to work on the project
- Reviewer has significant financial interest directly tied to success of the project

Soft conflicts:
- Reviewer belongs to the same company/organization of the project,
  but does not work on the project
- Reviewer uses the project in his/her work
- Reviewer has contributed to the project.
- Reviewer has a personal stake in the project (personal relationships, etc.)
