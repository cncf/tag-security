# Security Assessment Priorities & Pipeline Intake Process

TAG-Security has a volunteer team of subject matter experts and industry
professionals dedicated to helping TAG-Security members, the TOC, and the larger
CNCF community maintain an understanding of the current state of security in the
cloud native ecosystem and helping cloud native projects succeed.

The following process describes how projects are prioritized for security
assessments.

# Authority

Team members are welcome to submit PRs to streamline this process when
priorities are clear based on the criteria below. As needed, specific leaders
(identified in the [repo root README](/README.md#security-assessments)) will
coordinate the decision-making process.

* The [Security Assessment
  Facilitator](/governance/roles.md#security-assessment-facilitator) is
  responsible for maintaining the assessment queue and may delegate
  responsibilities to specific individuals by defining and filling documented
  roles and/or inviting community participation.
* A named chair provides oversight for the Security Assessment initiative,
  responsible for liaising with the TOC: aligning prioritization with TOC needs
  and goals by finding opportunities to highlight work of Security Assessment
  team, resolving questions/concerns about prioritization, and serving as an
  escalation point for projects or TAG members, if needed.

# Pre-conditions

* The project is either a CNCF project OR an assertion that the project is cloud
  native (any objection must be resolved before an assessment would be
  considered)
* The project has identified a project lead and has a written self-assessment

# Intake priorities

The following priorities are high-level guidance for how to coordinate the
work of the group when there are multiple projects that are ready for an
assessment, exceeding the bandwidth of the group:

1. TOC requests prioritization of a specific project.
    * TOC request will not interrupt an ongoing assessment.
    * TOC requests may jump the prioritized queue of projects waiting for an assessment.
2. Projects that have received a CNCF Security Audit will be reviewed within a
   year of audit. (For future audits, the security assessment will be a
   pre-condition to the audit.)
3. CNCF Projects that request a review (or invited by TAG members), prioritized
   by project maturity (e.g. graduated projects will be highest priority, then
   incubated projects, then sandbox).
4. Non-CNCF Projects that request a review (or invited by TAG members).

The Security Assessment Facilitator, in collaboration with the named chair, has
the discretion to adjust priority in order to streamline the process, or per
their own judgement for other reasons consistent with TAG-Security mission and
charter.  In all cases, the priority queue will be maintained transparently as
described below, along with communication via regular chair-liaison meetings and
TAG-Security reports at TOC meetings.

A project may be accepted into the assessment queue, either by the Security Assessment
Facilitator with concurrence from one (1) co-chair, or by two (2) co-chairs.  This concurrence
is given by commenting on an issue proposing that the project be added to the assessment
queue.  If at any time, the project requesting review ceases communicating, the
Security Assessment Facilitator may remove the project from the queue with
notification to the co-chairs.  The Security Assessment Facilitator will update
the corresponding issue, prior to closing the project's request.

# Updates and renewal

The Security Assessment team will aim to review assessed projects annually,
focusing primarily on any issues or concerns raised in previous assessments,
addressing new functionality that affects risk profile of the project,
and any issue that may have been flagged about the project.

# Managing the assessment queue

Note: this section describes the current process. Anyone is welcome to open a
github issue or submit a pull request suggesting process improvements
or clarifying the documentation. Security Assessment Facilitator or any chair
may take on any of the roles below, updating the queue, as long as the change
is clearly communicated to the group (typically by adding a note to the
relevant github issue).

Each assessment is represented as a github issue, where the description field
follows a [template](/.github/ISSUE_TEMPLATE/joint-review.md)

The queue is visible through [github project](https://github.com/cncf/tag-security/projects/2)

* Anyone may propose a project for assessment, by opening an [issue](https://github.com/cncf/tag-security/issues/new?assignees=&labels=assessment&template=security-assessment.md&title=%5BAssessment%5D+Project+Name)
* Security Assessment Facilitator or their delegate may:
  * move the order of an assessment in the backlog
  * close an issue (with an explanation) to remove a project from the queue.
  * move a project from backlog to in-progress
