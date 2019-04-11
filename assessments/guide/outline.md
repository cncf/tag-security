# Outline

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


