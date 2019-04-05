## Project Assessment

In support of the CNCF mission to drive adoption of cloud native technologies,
we have developed a guide to assessing the security of an open source project.

### Goal

The purpose of this effort is to reduce the risk of malicious attacks and 
accidental breaches of privacy by raising awareness of how specific open source 
projects affect the security of a cloud native system.

Each project assessment will:
1. ensure a clear description of the project's design goals and security properties
2. uncover design flaws and document known limitations
3. document next steps toward increasing security of the project itself and/or 
increasing the applications of the project toward increasing security of the 
cloud native ecosystem

This procedure was designed to help the CNCF ensure that projects that are being 
considered for inclusion in the CNCF have reasonable security fundamentals that 
are expected to stop an attacker. It is also intended to help current projects
which were included as part of the CNCF before this process was in place.

### Guide

The project assessment has three parts:
1. Document (see [outline](outline.md))
2. Presentation
3. Assessment


### Not a security audit

Due to the nature and timeframe for the analysis, *this review is not meant
to subsume the need for a professional security audit of the code*.  Audits
of implementation vulnerabilities and similar issues at that level are not
intended to be covered by this assessment.  


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
have previously performed a SAFE WG assessment.  (Exemptions are expected to be
granted bootstrap the process but only in extreme cases later on.)  In
general, a SAFE examiner should have performed security audits for diverse
organizations.  The ideal SAFE examiner should also have been the recipient
of security audits for a software project they manage.  Note that it is
encouraged to have participation (shadowing) from participants that are not
yet qualified to help them gain the necessary skills to be a SAFE examiner
in the future.  

Using this information, the SAFE examiners will try to understand the
system and probe its security.  Specifically design level issues are meant
to be addressed as well as high level problems with the project’s setup and
operation. This is meant to provide an independent analysis and estimation
of the above information.  The goal is to ask questions to understand if
there are hidden assumptions, underestimated risk, or design issues that
harm the security of the project.  It may be useful to reach out to
community members to understand the answers to some questions, especially
involving deployment scenarios and the impact of attacks.


