# Purpose

To provide the CNCF’s TOC with effective information about the security of
different projects, this document outlines the procedure by which a project
should be assessed during a TAG-Security Security Assessment (TSSA).

* [Roles](#roles)
* [TSSA package steps](#tssa-package-steps)
  * [Abbreviated project assessment](#abbreviated-project-assessment)
    1. [Self-assessment](#complete-a-self-assessment)
    2. [Create issue](#create-a-presentation-issue)
    3. [Present](#present-the-project-and-self-assessment)
    4. [Submit PR](#submit-a-pr-to-include-the-self-assessment-in-the-repo)
  * [More detailed project assessment](#more-detailed-project-assessment)
    1. [Create issue](#create-tracking-issue)
    2. [Self-assessment](#project-creates-a-self-assessment)
    3. [Reviewers assigned](#project-provides-the-self-assessment-and-reviewers-are-assigned)
    4. [Conflict of interest](#conflict-of-interest-statement-and-review)
    5. [Clarifying questions](#clarifying-questions-phase)
    6. [Assessment](#security-assessment)
    7. [Presentation](#presentation)
    8. [Final artifacts](#final-artifacts-which-are-committed)
    9. [Survey](#post-assessment-survey)
* [Additional process notes](#additional-process-notes)

## Roles

* [project lead](project-lead.md)
* [security reviewers](security-reviewer.md)

## TSSA package steps

The TSSA package is developed over time as projects grow in maturity
and advance through the CNCF.  The below section breaks the creation of the
package into steps that mirror the [current TOC process
stages](https://github.com/cncf/toc/tree/main/process).

### Abbreviated project assessment

Projects which are very early on in their maturity may use a short process to
get some initial feedback by documenting their threat model and security design.
They use an abbreviated process which does not result in a joint assessment or a
detailed review by TAG Security.

Note: Responsible roles for specific items are in **bold**

#### Complete a self-assessment

The [self-assessment](self-assessment.md) provides projects with the opportunity to examine the
existing security provisions of the project.  It can serve as their initial
security documentation for users.

#### Create a presentation issue

This presentation should go over the self-assessment and provide TAG-Security
with an initial understanding of the project.  It is recommended the **project
lead** submit the [presentation issue](https://github.com/cncf/tag-security/issues/new?assignees=&labels=usecase-presentation&template=presentation.md&title=%5BPresentation%5D+Presentation+Title) as the primary point of contact (POC).

#### Present the project and self-assessment

To get rough feedback, please add the presentation to proposed agenda topics in the [meeting
notes](https://docs.google.com/document/d/170y5biX9k95hYRwprITprG6Mc9xD5glVn-4mB2Jmi2g/)
and include the POC or **project lead**.  The community may provide feedback on
the self-assessment or ask questions about the project.  Include anything you
feel important in an updated self-assessment based on feedback and discussion.

#### Submit a PR to include the self-assessment in the repo

After the presentation, the **project lead** or their designee should submit a
PR, citing the presentation issue number to add the self-assessment to
[assessments/projects](/community/assessments/projects)
under its own folder.  The ticket may then be closed after merged in.

### Joint assessment

A more mature project will likely want a more complete and comprehensive assessment
of the project's security.

Note: Responsible roles for specific items are in **bold**. If an incubation
project did not complete a self-assessment during sandbox, they are recommended
to start with the self-assessment before pursing joint assessment.

#### Create tracking issue

The [tracking issue](https://github.com/cncf/tag-security/issues/new?assignees=&labels=triage-required&template=joint-assessment.md&title=%5BTSSA%5D+Project+Name) serves to initiate the joint-assessments.  It provides an initial
 set of information to assist TAG-Security in  prioritizing the joint assessment as
well as provide potential reviewers with a central location to manage the
effort.

* Issue may be a request from **TOC liaison** or **project** itself
* [**Security Assessment
Facilitator**](https://github.com/cncf/tag-security/blob/main/governance/roles.md#facilitation-roles)
 with help from the **technical leads** and **co-chairs** if appropriate, will
determine if the project is ready for joint-assessment.  If ready, a channel will be
created to coordinate the activities.

#### Project creates a self-assessment

As is listed in the above section, the project should create a self-assessment.
This should be created as a google doc to make it easier for the TAG Security
members to edit and comment upon.

#### Project provides the self assessment and reviewers are assigned

The project provides the reviewers with security relevant information about
 their project.  The self assessment can include links to external documents and
 sources within the project's repository or website to provide additional
details or reference where a process is kept.

* **[Project lead](project-lead.md)** responds to the issue with draft
     self assessment
* Issue assigned to **lead [security reviewer](security-reviewer.md)** who will
     recruit at least two additional reviewers, if one is not already assigned.
     The security assessment facilitator will also likely help in this task.

#### Conflict of interest statement and review

In order to remediate unfair advantage or ethical issues all reviewers are
required to provide a statement indicating all hard and soft conflicts they
maintain prior starting the security review.

* **Lead security reviewer and additional security reviewers** comment any
     conflict of interest in the project's assessment ticket using the below format:

| Hard Conflicts | Y/N |
| :------------- | :-: |
| Reviewer is a currently a maintainer of the project |  |
| Reviewer is direct report of/to a current maintainer of the project |  |
| Reviewer is paid to work on the project |  |
| Reviewer has significant financial interest directly ties to the success of the project |  |

| Soft Conflicts | Y/N |
| :------------- | :-: |
| Reviewer belongs to the same company/organization of the project, but does not work on the project |  |
| Reviewer uses the project in their work |  |
| Reviewer has contributed to the project |  |
| Reviewer has a personal stake in the project (personal relationships, etc.) |  |

* The **lead security reviewer** will confirm all conflicts are specified and
     escalate any conflict concerns, hard conflicts or multiple soft conflicts,
to the **Security Assessment Facilitator** for concurrence to proceed or if a
reviewer is ineligible to participate.  Specific instructions are found on the
[security reviewer](security-reviewer.md) page.

#### Clarifying questions phase

The clarifying questions phase is the responsibility of the **Lead security
reviewer** to ensure it is complete.  They may delegate this task to another
reviewer. This phase enables security reviewers to focus on the security and
technical details of the project.  The clarifying question phase is conducted
prior to the *3 week* time frame for a TSSA.

* **Lead security reviewer or their designee** will perform an initial, clarifying
     assessment to:
  * Verify completeness
  * Ask for clarification
  * Ensure terms are defined
  * Ensure concepts introduced are explained with context
  * Provide quick feedback

**Importantly, comments on the document should be addressed in the document text, as
the comments will be lost when the document is later converted to markdown.**

#### Security assessment

The TSSA process provides time for the security reviewers and the project to
address security and technical details associated with the project.  Information
created or received out of the assessment is leveraged in finalizing the self
assessment and creating the project's TSSA package in the README file.

* **Project** posts their document to the project security assessment channel,
     allowing at least one week for review prior to Q&A
* **Security reviewers** review the self-assessment document, links, and other
     materials provided by the project and provide  comments and questions
  * It is highly recommended that security reviewers familiarize themselves with
        the project's repo and docs if available
* **Security reviewers and project lead/POCs** ensure all reviewer questions,
     comments, and feedback are addressed and finalize the self assessment.
     The project has final edit discretion on the self assessment document.
* **The assessment team meets and presents their recommendations to the project**
     in the form of a draft joint assessment.   The project and assessment team
     work together to augment and improve this document, with the assessor having
     final edit discretion.

#### Presentation

The presentation is designed to inform members of TAG Security of the project,
its intent, what it accomplishes, and provides the opportunity for additional
questions and feedback to the reviewers and project.

* Project lead presents to TAG during TAG meeting
* Presentation is recorded as part of standard TAG process
* Presentation slides are linked in the /community/assessments/projects/project-name/ folder

The assessment team also should give a quick rundown of the assessment recommendations.

#### Final artifacts which are committed

The self assessment and joint assessment are added to the repository under a
directory named for the project name.   The issue may then be closed and the PR
merged.  

#### Post-assessment survey

The [post-assessment survey](review-survey.md) should be completed by the **reviewers**, **project lead**, and other
members of the TSSA.  Once complete the survey may be shared directly to the
Security Assessment Facilitator, technical leads, and co-chairs or be part of the PR into the
/assessments/projects/project-name folder.

## Additional Process Notes

Iteration is expected; however, we expect quick turnaround (at most a week). In
rare cases unrelated issues can unexpectedly interrupt the process and it may be
appropriate to address specific concerns rather than continuing with the TSSA.
We encourage open communication between project lead and security reviewers:

* At any time, the project lead may request additional time to respond to
  feedback from security reviewers
* Project lead or lead security reviewer may pause the process where a delay of
  over a week cannot be accommodated by the review team. Simply close the GitHub
  issue with a note to TAG co-chairs.
