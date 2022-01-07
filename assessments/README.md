# Security reviews

## Goals

The [security review process](guide) (formerly security assessment process)
is designed to accelerate the adoption of cloud native technologies, based on
the below goals and assumptions.

### 1) Reduce risk across the ecosystem

The primary goal is to reduce the risk from malicious attacks and accidental
breaches of privacy. This process supports that goal in two ways:

   * A clear and consistent process for communication increases detection &
     reduces time to resolve known or suspected vulnerability issues
   * A collaborative review process increases domain expertise within each
     participating project.

### 2) Accelerate adoption of cloud native technologies

Security reviews are a necessary, time intensive process. Each company,
organization and project must perform its own reviews to ensure that it meets
its unique commitments to its own users and stakeholders. In open source, simply
finding security-related information can be overwhelmingly difficult and a time
consuming part of the security review. The CNCF security review, hereafter
"security review," process is intended to enable improved discovery of
security information & assist in streamlining internal and external security
reviews in multiple ways:

   * Consistent documentation reduces review time.
   * Established baseline of security-relevant information reduced Q&A.
   * Clear rubric for security profile enables organizations to align their risk
     profile with the project’s risk profile and effectively allocate resources
     (for review and needed project contribution).
   * Structured metadata allows for navigation, grouping and cross-linking.

We expect that this process will raise awareness of how specific open source
projects affect the security of a cloud native system; however, separate
activities may be needed to achieve that purpose using materials generated by
the reviews, known as artifacts or the security review package.

## Outcome

Each project's security review package shall include a description of:
1. the project's design goals with respect to security
2. any aspects of design and configuration that could introduce risk
3. known limitations, such as expectations or assumptions that aspects of
   security, whole or in part, are to be handled by upstream or downstream
   dependencies or complementary software
4. next steps toward increasing security of the project itself and/or increasing
   the applications of the project toward a more secure cloud native ecosystem

Due to the nature and time frame for the analysis, *this review is not meant to
subsume the need for a professional security audit of the code*.  Audits of
implementation-specific vulnerabilities, improper deployment configurations, etc.
are not in scope of a security review.  A security review is intended to
uncover design flaws, enhance the security mindset of the project, and to obtain
a clear, comprehensive articulation of the project's design goals and
aspirations while documenting the intended security properties enforced,
fulfilled, or executed by said project.

### Benefits of a security review

Having your project undergo the security review process is a key step toward
eliminating security risks.  It allows one to build security as an integral part
of a system and to maintain that security over time.

Security reviews have many benefits, creating:
* a measurable security baseline from that point onward,
* exposure and analysis of security issues, including the risk they introduce,
* validation of security awareness and culture among the developers for building secured projects, and
* a documented procedure, for future compliance, audit, or internal assessment

### Components of the security review package

A complete security review package primarily consists of the following
items:
* [Self-assessment](guide/self-assessment.md).  A written assessment by the project
of the project's current security statue.
* [Joint-review](guide/joint-review.md). A joint review by both the [security
reviewers](guide/security-reviewer.md) and the project team that includes parts
of the self-assessment and expands to include a more comprehensive consideration
of the project's security health.  This artifact, coupled with self-assessment
provide invaluable information for security auditors as well as end-users.
* Presentation. A security focused presentation of the project by the project
  team,
* Review the [joint README template](guide/joint-readme-template.md).
This template is used to create a readme at the end of the joint
review by the security reviewers to provide a high level summary
of the joint review and is considered when reviewing for due
diligence.

### Use of a completed package

Finalized security review packages may be used by the community to assist in
the contextual review of a project but are not an endorsement of the
security of the project, not a security audit of the project, and do not relieve
an individual or organization from performing their own due diligence and
complying with laws, regulations, and policies.

Draft assessments contain *unconfirmed* content and are not endorsed as factual
until committed to this repository, which requires detailed peer review.  Draft
reviews may also contain *speculative* content as the project lead or security
reviewer is performing a review.  Draft reviews are *only* for the purpose
of preparing final artifact and are **not** to be used in any other capacity by
the community.

Final slides resulting from the presentation and the project's joint review
will be stored in the individual project's review folder with supporting
documentation and artifacts from the review.  These folders can be found under
 [assessments/projects](projects/) and clicking on the project name.

## Process

Creating the security review package is a collaborative process for the
benefit of the project and the community, where the primary content is generated
by the [project lead](guide/project-lead.md) and revised based on feedback from [security reviewers](guide/security-reviewer.md)
and other members of the TAG.

* If you are interested in a security review for your project and you are
  willing to volunteer as [project lead](guide/project-lead.md) or you are a
  TAG-Security member and want to recommend a project to review, please [file an
  issue](https://github.com/cncf/tag-security/issues/new?template=joint-review.md)

See [security review guide](guide) for more details.  To understand how we
prioritize reviews, see [intake process](./intake-process.md).