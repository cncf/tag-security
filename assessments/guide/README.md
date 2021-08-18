# Purpose

To provide the CNCF’s TOC with effective information about the security of
different projects, this document outlines the procedure by which a project
should be reviewed.

* [Roles](#roles)
* [Security review package steps](#security-review-package-steps)
  * [New projects](#new-projects)
    1. [Self-assessment](#complete-a-self-assessment)
    2. [Create issue](#create-a-presentation-issue)
    3. [Present](#present-the-project-and-self-assessment)
    4. [Submit PR](#submit-a-PR-to-include-the-self-assessment-in-the-repo)
  * [Growing projects](#growing-projects)
    1. [Create issue](#create-tracking-issue)
    2. [Draft joint review](#project-leverages-self-assessment-to-draft-joint-review)
    3. [Reviewers assigned](#project-provides-the-joint-review-and-reviewers-are-assigned)
    4. [Conflict of interest](#conflict-of-interest-statement-and-review)
    5. [Clarifying questions](#clarifying-questions-phase)
    6. [Review](#security-review-with-optional-hands-on-review)
    7. [Presentation](#presentation)
    8. [Final summary](#final-summary)
    9. [Survey](#post-review-survey)
* [Additional process notes](#additional-process-notes)

## Roles

* [project lead](project-lead.md)
* [security reviewers](security-reviewer.md)

## Security review package steps

The security review package is developed over time as projects grow in
maturity and advance through the CNCF.  The below section breaks the creation of
the package into steps that mirror the [current TOC process stages](https://github.com/cncf/toc/tree/main/process).

### New projects

New projects are projects generally defined as very early on in their maturity.  They may have an innovators pool of users.

Note: Responsible roles for specific items are in **bold**

#### Complete a [self-assessment](self-assessment.md)

The self-assessment provides projects with the opportunity to examine the
existing security provisions of the project.  It can serve as their initial
security documentation for users.

#### Create a [presentation issue](https://github.com/cncf/tag-security/issues/new?assignees=&labels=usecase-presentation&template=presentation.md&title=%5BPresentation%5D+Presentation+Title)

This presentation should go over the self-assessment and provide TAG-Security
with an initial understanding of the project.  It is recommended the **project
lead** submit the issue as the primary point of contact (POC).

#### Present the project and self-assessment

Be sure to add the presentation to proposed agenda topics in the [meeting
notes](https://docs.google.com/document/d/170y5biX9k95hYRwprITprG6Mc9xD5glVn-4mB2Jmi2g/)
and include the POC or **project lead**.  The community may provide feedback on the self-assessment or
ask questions about the project.  Include anything you feel important in an
updated self-assessment based on feedback and discussion.

#### Submit a PR to include the self-assessment in the repo

After the presentation, the **project lead** or their designee should submit a PR,
citing the presentation issue number to add the self-assessment to [assessments/projects](https://github.com/cncf/tag-security/tree/main/assessments/projects) under its
own folder.  The ticket may then be closed after merged in.

### Growing projects

Growing projects are likely to have early adopters, having gone beyond innovators as their sole user base.

Note: Responsible roles for specific items are in **bold**. If an incubation
project did not complete a self-assessment during sandbox, they are recommended
to start with the self-assessment before pursing joint review.

#### [Create tracking issue](https://github.com/cncf/tag-security/issues/new?assignees=&labels=assessment&template=security-assessment.md&title=%5BAssessment%5D+Project+Name)

The tracking issue serves to initiate the joint-reviews.  It provides
 an initial set of information to assist TAG-Security in  prioritizing the
joint review as well as provide potential reviewers with a central
location to manage the effort.
   * Issue may be a request from **TOC liason** or **project** itself
   * [**Security review facilitator**](https://github.com/cncf/tag-security/blob/main/governance/roles.md#facilitation-roles) with help from the **technical leads**
 and **co-chairs** if appropriate, will determine if the project is ready for
 joint-review.  If ready, a channel will be created to coordinate the
activities.

#### Project leverages self-assessment to draft [joint review](joint-review.md)

The project uses the self-assessment created from the sandbox phase to draft the
joint review.  The joint review expands upon content of the
self-assessment and provides the **reviewers** with a central starting point in
reviewing the current security stature of the project.

#### Project provides the joint review and reviewers are assigned

The project provides the reviewers with security relevant information about their
 project.  The joint review can include links to external documents and sources
 within the project's repository or website to provide additional details or
reference where a process is kept.
   * **[Project lead](project-lead.md)** responds to the issue with draft
     document (see [joint review](joint-review.md))
   * Issue assigned to **lead [security reviewer](security-reviewer.md)** who
     will recruit at least one additional reviewer, if one is not already
assigned, and facilitate the process.

#### Conflict of interest statement and review

In order to remediate unfair advantage or ethical issues all reviewers are
required to provide a statement indicating all hard and soft conflicts they
maintain prior starting the security review.
   * **Lead security reviewer and additional security reviewers** comment any
     conflict of interest in the project's review ticket using the below
format:

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
to the **security review facilitator** for concurrence to proceed or if a
reviewer is ineligible to participate.  Specific instructions are found on
the [security reviewer](security-reviewer.md) page.

#### Clarifying questions phase

The clarifying questions phase is the responsibility of the **Lead security
reviewer** to ensure it is complete.  They may delegate this task to another
reviewer. This phase enables security reviewers to focus on the security and
technical details of the project.  The clarifying question phase is conducted
prior to the *3 week* timeframe for reviews.
   * **Lead security reviewer or their designee** will perform initial,
     clarifying review to:
      * Verify completeness
      * Ask for clarifications
      * Ensure terms are defined
      * Ensure concepts introduced are explained with context
      * Provide quick feedback

#### Security review with optional hands-on review

The security review provides time for the security reviewers and the project to
address security and technical details associated with the project.  Information
created or received out of the review is leveraged in finalizing the joint
review and creating the project's security review README file.

If the security reviewers include individuals capable of performing a hands-on
review, the hands-on review is included in this step.
   * **Project** posts their document to the project security review
     channel, allowing at least one week for review prior to Q&A
   * **Security reviewers** review the joint-review document, links, and
     other materials provided by the project and provide  comments and questions
      * It is highly recommended that security reviewers familiarize themselves
        with the project's repo and docs if available
   * **Security reviewers and project lead/pocs** ensure all reviewer
     questions, comments, and feedback are addressed and finalize the joint review
   * **Lead security reviewer or their designee,** with the assistance of the
**security reviewers** create a [draft summary document](joint-readme-template.md) to capture existing
comments, feedback, and recommendations prior to the presentation.

#### Presentation

The presentation is designed to inform members of TAG Security of the project,
its intent, what it accomplishes, and provides the opportunity for additional
questions and feedback to the reviewers and project.
   * Project lead presents to TAG during TAG meeting
   * Presentation is recorded as part of standard TAG process
   * Presentation slides are linked in the /assessments/projects/project-name/

#### Final summary

The final summary provides a cursory review of the project, background,
summary of the joint review, and recommendations to the CNCF, the project,
and other recommendations of note.  The final summary should also list the
version or release the joint review covered to better enable tracking for updates
of the review.
   * **Lead security reviewer** creates a branch labeled WIP and provides
     branch information to additional reviewers.
   * **Lead security reviewer** places the [summary](joint-readme-template.md) into branch for finalization
   * **Reviewers** either comment or provide changes (feedback and
     recommendations) to the branch given and submit PR
   * Either **project lead or reviewers** may request further WG discussion
   * **Project lead** prepares a PR to /assessments/projects/project-name/
     when all comments, feedback, and recommendations are incorporated for the
joint review and presentation slides.
   * PR approval of at least 1 **co-chair**, alongside other **reviewers'**
approvals, is required before merging any artifacts.

#### [Post-review survey](review-survey.md)

The should be completed by the **reviewers**, **project lead**, and other members
of the review.  Once complete the survey may be shared directly to the
facilitator, technical leads, and co-chairs or be part of the PR into the
/assessments/projects/project-name folder.

## Additional Process Notes

Iteration is expected; however, we expect quick turnaround (at most a week). In
rare cases unrelated issues can unexpectedly interrupt the process and it may
be appropriate to address specific concerns rather than continuing with the
review. We encourage open communication between project lead and security
reviewers:
* At any time, the project lead may request additional time to respond to
  feedback from security reviewers
* Project lead or lead security reviewer may pause the process where a delay of
  over a week cannot be accommodated by the review team. Simply close the github
issue with a note to TAG co-chairs.
