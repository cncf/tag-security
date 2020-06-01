# Purpose

To provide the CNCF’s TOC with effective information about the security of
different projects, this document outlines the procedure by which a project
should be evaluated.

## Roles

* [project lead](project-lead.md)
* [security reviewers](security-reviewer.md)

## Steps

Note: Responsible roles for specific items are in **bold**.

### 1. [Create tracking issue](https://github.com/cncf/sig-security/issues/new?assignees=&labels=assessment&template=security-assessment.md&title=%5BAssessment%5D+Project+Name)
The tracking issue serves to initiate the security assessment process.  It
provides an initial set of information to assist SIG-Security prioritze the
security assessment as well as provide potential reviewers with a central
location to manage the assessment.
   * Issue may be a request from **TOC liason** or **project** itself 
### 2. Project provides self-assessment & reviewers are assigned 
The project performs a self-assessment using the [outline](outline.md) to
provide the reviewers with security relevant information about their project.
The self-assessment can include links to external documents and sources within
the projects repository to provide additional details or reference where a
process is kept.
   * **[Project lead](project-lead.md)** responds to the issue with draft
     document (see [outline](outline.md))
   * Issue assigned to **lead [security reviewer](security-reviewer.md)** who
     will recruit at least one additional reviewer, if one is not already
assigned, and facilitate the process 
### 3. Conflict of interest statement and review
In order to remediate unfair advantage or ethical issues  all reviewers are
required to provide a statement indicating all hard and soft conflicts they
maintain prior starting the security assessment.
   * **Lead security reviewer and additional security reviewers** comment any
     conflict of interest in the project's assessment ticket using the below
format:

| Hard Conflicts | Y/N |
| :------------- | :-: |
| Reviewer is a currently a maintainer of the project |  |
| Reviewer is direct report of/to a current maintainer of the project |  |
| Reviewer is paid to work on the project |  |
|Reviewer has significant financial interst directly ties to the success of the project |  |


| Soft Conflicts | Y/N |
|: ------------- | :-: |
| Reviewer belongs to the same company/organization of the project, but does not work on the project |  |
| Reviewer uses the project in his/her work |  |
| Reviewer has contributed to the project |  |
| Reviwer has a personal stake in the project (personal relationships, etc.) |  |
   * The **lead security reviewer** will confirm all conflicts are specified and
     escalate any conflict concerns, hard conflicts or multiple soft conflicts,
to the **security assessment facilitator** for concurrence to proceed or if a
reviewer is ineligible to participate.  
### 4. Clarifying questions phase
The clarifying questions phase is the responsibility of the **Lead security
reviewer** to ensure it is complete.  They may delegate this task to another
reviewer. This phase enables security reviewers to focus on the security and
technical details of the project.  The clarifying question phase is conducted
prior to the *3 week* timeframe for assessments.
   * **Lead security reviewer or their designee** will perform inital,
     clarifying review to:
      * Verify completeness
      * Ask for clarifications
      * Ensure terms are defined
      * Ensure concepts introduced are explained with context
      * Provide quick feedback 
### 5. Security review
The security review provides time for the security reviewers and the project to
address security and technical details associated with the project.  Information
created or received out of the review is leveraged in making the final
assessment.
   * **Project** posts their document to the project security assessment
     channel, allowing at least one week for review prior to Q&A
   * **Security reviewers** review the self-assessment document and provide
     comments and questions
      * It is highly recommended that security reviewers familiarize themselves
        with the project's repo and docs if available
   * **Security reviewers and project lead/pocs** ensure all reviewer
     questions/comments are addressed and finalize the self-assessment
   * **Lead security reviewer or their designee,** with the assistance of the **security reviewers** create a draft summary document to capture existing comments, feedback, and recommendations prior to the presentation.
### 6. Presentation
The presentation is designed to inform members of SIG Security of the project,
its intent, what it accomplishes, and provides the opportunity for additional
questions and feedback to the reviewers and project.
   * Project lead presents to SIG during SIG meeting
   * Presentation is recorded as part of standard SIG process
   * Presentation slides are linked in the assessments/projects/project-name/
### 7. Final assessment
The final assessment provides a cursory review of the project, background,
summarization of self-assessment, and recommendations to the CNCF, the project,
and other recommendations of note.  The final report should also list the
version or release the assessment covered to better enable tracking for updates
of the review.
   * **Lead security reviewer** creates a branch labeled WIP and provides
     branch information to additional reviewers.
   * **Lead security reviewer** places the draft assessment into branch for finalization
   * **Reviewers** either comment or provide changes (feedback and
     recommendations) to the branch given
   * Either **project lead or reviewers** may request further WG discussion
   * **Project lead** prepares a PR to /assessments/project-docs/project-name/
     when all comments, feedback, and recommendations are incorporated
   * PR approval of at least 1 **co-chair**, alongside other **reviewers'** approvals, is required before merging

## Additional Process Notes

Iteration is expected; however, we expect quick turnaround (at most a week). In
rare cases unrelated issues can unexpectedly interrupt the process and it may
be appropriate to address specific concerns rather than continuing with the
assessment. We encourage open communication between project lead and security
reviewers:
* At any time, the project lead may request additional time to respond to
  feedback from security reviewers
* Project lead or lead security reviewer may pause the process where a delay of
  over a week cannot be accomodated by the review team. Simply close the github
issue with a note to SIG co-chairs.


