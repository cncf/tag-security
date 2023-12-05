# Communication

## Slack

[#thanos](https://slack.cncf.io/)

**Project proposal and Initial questions**

Hi!
I am Saurabh Rajguru and my team of five students from New York University are carrying out a security self-assessment of the [Thanos Project](https://thanos.io/).

This assessment is inline with the CNCF Security Technical Advisory Group's (CNCF Security TAG) security assessment process.
The [self-assessment](https://github.com/cncf/tag-security/blob/main/assessments/guide/self-assessment.md) is the first step for initiating a joint assessment with the CNCF Security TAG.

This is being done as part of a graduate level course under Justin Cappos, Professor at New York University. Refer [[1]](https://github.com/cncf/tag-security/issues/1102)
He is a [Technical Lead](https://github.com/cncf/tag-security/blob/main/governance/roles.md#role-of-technical-leads) and [Security Assessment Facilitator](https://github.com/cncf/tag-security/blob/main/governance/roles.md#facilitation-roles) in CNCF Security TAG.

We need help with reviews and feedback from the maintainers on our draft of the security assessment. PFB the link to our assessment. We will be submitting this assessment to the CNCF TAG repository so that they can help with initiating a joint assessment for Thanos. It would be great if some of you could join an online meeting with us and we can explain what we have done and the expectation.
<https://github.com/Lanelle1398/tag-security/blob/main/assessments/projects/thanos/self-assessment.md>

---

Response from: Bartek Plotka

> CNCF OSS projects team like ours does not have expertise to advise you on some security nomenclature specific to Security research. I would expect you to tell us what security function and features you would see in our project.

* The goal of this document is to serve as an initial document which gives the current overall picture of the project. The goal is to document the implementation, tooling and deployment of Thanos. The working components and the actions they perform have to be outlined along with security relevant best practices and some high level threat modelling.
* The primary goal of this document is not to find vulnerabilities in Thanos source code or application.

> Also calling this “self-assesment” where we didn’t participate other than review is interesting
> https://github.com/Lanelle1398/tag-security/blob/main/assessments/projects/thanos/self-assessment.md#actors

Reply from Justin Cappos: Right, usually the project would do the assessments as part of the TAG Security process.  It seems that some projects are too busy, which is why the Security Pals are going through to help spur this along now...

> Who is an actor in security self-reviews? Processes are actors? I though it’s rather humans like users (you have that listed). I am missing the descriptors of potential bad actors. Also missing operators, so “users” of Thanos who deploy and maintain it. But again I am not expert.

* Actors are not equivalent to Threat Actors. Instead of looking at the human element (actors using different parts of the system), this is looking at functional elements that are able to act upon each other.
* “These are the individual parts of your system that interact to provide the desired functionality. Actors only need to be separate if they are isolated in some way. For example, if a service has a database and a front-end API, but a vulnerability in either one would compromise the other, then the distinction between the database and front-end is not relevant. The means by which actors are isolated should also be described, as this is often what prevents an attacker from moving laterally after a compromise.” - TAG Security


> Logging and monitoring of Thanos components to detect security breaches. What does it mean? What exactly security breaches you have in mind? I think I am generally missing the description of potential security consequences/breaches. What can go wrong. For example common misconception is DDoS. Is Thanos being down a security issue? Who is responsible for it? Operator or Thanos project? Any big query can kill some Thanos component if you are not careful with limits. Is that vulnerability? Lot’s of those where mistakenly submitted to Thanos project - we would love to have some messaging around this to avoid that.

I agree that the responsibility of all security related problems is not with the Thanos project. One of the aims of this document is to specify the goals and non-goals with respect to security. So for eg. running a big query that can bring down Thanos components will be added to the Non-goals section. Thanks for pointing it out. We will try to clearly state the conditions which can affect the availability/integrity/confidentiality of Thanos data/components and whether this is under the Goals or Non-Goals.

> Thanos does not currently document meeting particular compliance standards. What compliance you would see us meeting officially given the nature of our project?

We are not suggesting any compliance standards that have to be met currently. This document only states that there is no particular compliance standard that is met for now.

> To sum up, I am missing recommendations to us what to improve, what’s confusing for others. This document is a bit mixup of Thanos intro and some generic security thoughts, but maybe it’s a good start?

Thanks a lot for all the questions and the feedback. I understand that this a new format for a document and we will gladly explain further on any questions about this document. Please feel free to reach out to me or Lanelle. Also, since we are working on this only till 12th December, I request you to let us know a convenient time where we can go over this document together in a meeting this week. We will be submitting this assessment in a Pull request to the CNCF TAG Security repository.

We are maintaining a log of this communication at: https://github.com/Lanelle1398/tag-security/blob/main/assessments/projects/thanos/communicate.md  
It also has reference links to our objective and approach.  
If you would like us to take some actions (making a google doc, submitting a pull request, correct/add/remove some information etc) before the meeting please let us know.

## Questions to ask Maintainers

1. The admin api of Prometheus has to be enabled for Sidecar to get external labels. Is the admin api only used for fetching labels? Do we need complete admin access or is this only for labels?

Development Pipeline:
1. Do you have branch protection or repo security features in place?
2. Are committers required to sign their commits, or a contributor license agreement?
3. Do you have automated testing or fuzzing on every pull request?
4. Do you have software composition analysis or dependency management tooling?
5. How many reviewers are required for a pull request to be approved?
6. Do you have any measures around code owners?
7. Is your release process automated?
8. Does every release include an automatically generated Software Bill of Materials?
9. Do you sign releases?
10. Are container images immutable and signed?
