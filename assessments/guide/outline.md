The SAFE WG has been ask to provide the CNCF’s TOC with effective
information about the security of different projects.  The purpose of this
document is to outline the procedure by which a project should be audited
(by a set of members of the SAFE WG henceforth called SAFE examiners),
including the expected effort from different participants.  This procedure
can help the CNCF ensure that projects that are being considered for
inclusion in the CNCF have reasonable security fundamentals that are
expected to stop an attacker.  

Due to the nature and timeframe for the analysis, *this review is not meant
to subsume the need for a professional security audit of the code*.  Audits
of implementation vulnerabilities and similar issues at that level are not
intended to be covered by this audit.  The purpose of this effort is to 
uncover design flaws and to obtain a clear articulation of what the project's 
design goals and security properties are intended to be.


## Needed information for assessment

First of all, the burden is primarily on the proposing project to
demonstrate it is secure in a manner that is understandable to the broader
community.  The SAFE examiners will help to assess and probe the design.

The proposing project must provide a written document that describes the
project and its security.  The document must contain the following
information, at a minimum.  

* Goal. The intended goal of the projects including the security guarantees
the project is meant to provide (e.g., Flibble only allows parties with an
authorization key to change data it stores)
* Non-goals.  Non-goals that a reasonable reader of the project’s literature
could believe may be in scope (e.g., Flibble does not intend to stop a
party with a key from storing an arbitrarily large amount of data, possibly
incurring financial cost or overwhelming the servers)
* Scenarios.  The scenarios in which the project is expected to be used.
This must be specific enough to provide context for analysis.  (e.g.,
Flibble can be used in any cloud environment.  Three diverse examples are
as follows.  First, when a Flibble server is used by legacy servers as a
database for salted password hashes.  Second, a Flibble cloudlet may be run
on virtualized fog hardware near smartphone users.  Third, a Flibble
distributed service may serve as a backend for a Notary image registry.)
* Expected attacker capabilities.  A description of likely capabilities that
the attacker has in these scenarios should be described.  Both assumptions
about the strength and limitations of attackers should be described.
(e.g., We assume that an attacker may be able to exploit implementation
errors in some set of the servers to take control of them.  However, we
assume the attacker cannot break AES or SHA256.)
* Design.  A description of the system design that discusses how it works.
This is especially critical for any mechanisms that relate to the security
of the system.
* Operation.  A description of the operational aspects of the system, such as
how keys are likely to be managed and stored.
* Attacker motivations.  A discussion about the likely goals of an attacker.
This likely relates closely to the impact of different attacks in the
scenarios.  (e.g., In the password hash case, the attacker wants to expose
those hashes on the Flibble server.  However, a Flibble cloudlet attacker
may find it more interesting to bring down the service.)
* Security degradation.  A discussion about the resulting security when
various attacks are launched.  Note, that no system is secure in all
scenarios, hence it is expected that this will include areas where attacks
compromise all meaningful security.  (e.g., If an attacker is able to
compromise the “master” Flibble server, they may read, write, or delete any
content stored on any system) 
* Attack risk.  A rough estimation of the risk posed by different attacks.
(e.g., The master Flibble server only communicates with Flibble servers
using a minimalistic API that is formally verified and written in Rust.)
* Software.  A link to the software’s repository.
* Development pipeline.  A description of the testing and review processes
that the software undergoes as it is developed and built.
* CII Best Practices.  A brief discussion of where the project is at with
respect to CII best practices and what it would need to achieve the badge.

Using this information, the SAFE examiners will try to understand the
system and probe its security.  Specifically design level issues are meant
to be addressed as well as high level problems with the project’s setup and
operation. This is meant to provide an independent analysis and estimation
of the above information.  The goal is to ask questions to understand if
there are hidden assumptions, underestimated risk, or design issues that
harm the security of the project.  It may be useful to reach out to
community members to understand the answers to some questions, especially
involving deployment scenarios and the impact of attacks.


## Expected time / effort


The level of effort for the team providing the information is expected to
be around 80 hours of work.  Note, that projects that have already
performed a security analysis internally are expected to have much lower
requirements.

The level of effort for the SAFE examiners is expected to be 10 hours.
Despite the fact that there may be some back and forth to get clarification
on a few points, it is expected analysis can usually be concluded in a few
weeks of effort.  This will primarily involve carefully reading the written
document and analyzing the security assertions and assumptions. The SAFE WG
may decide on minimum security best practices for the software development
process that the project must also demonstrate it is following. 

## SAFE examiner qualifications

Unless approved by the SAFE WG chairs, at least one of the examiners will
have previously performed a SAFE WG audit.  (Exemptions are expected to be
granted bootstrap the process but only in extreme cases later on.)  In
general, a SAFE examiner should have performed security audits for diverse
organizations.  The ideal SAFE examiner should also have been the recipient
of security audits for a software project they manage.  Note that it is
encouraged to have participation (shadowing) from participants that are not
yet qualified to help them gain the necessary skills to be a SAFE examiner
in the future.  

