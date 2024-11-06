# Software Supply Chain Best Practices v2

Authors: Original White Paper authors, Marina Moore, Michael Lieberman, John Kjell, James Carnegie, Ben Cotton
Reviewers:

## Scope

This new publication modernizes the original Supply Chain Best Practices whitepaper by highlighting changes and improvements to supply chain security tools and practices since the time of its writing.
It also adds discussion of personas, and how different groups of people should approach this whitepaper to get relevant guidance.
As with the original version, this paper provides the community with a series of recommended practices, tooling options, and design considerations that can reduce the likelihood and overall impact of a successful supply chain attack.
It provides a holistic, end-to-end guide for organizations and teams to build a resilient and verifiable supply chain.

Some specific changes and additions to the original whitepaper include:

* The addition of [personas](#audiencepersona) and guidance for how different audiences can approach this paper.
* Audit data handling best practices – clear, simple audits for third parties to run.
Ensures third parties are securing data, limiting access, monitoring for data security events as required.
* Discussion of VEX.
* Some discussion of build systems has been removed, with a reference to the Software Factory whitepaper.
* Discussion of providing cryptographic verification that correct actions were performed (e.g., ensuring tests were actually run).
* Updates to examples of attacks and tools to reflect recent changes.

### Out of Scope

The software supply chain security space is vast, so not all topics could be included in this document.
The following is a non-comprehensive list of topics that did not fit in this paper, but could be explored in future work.

* Supply chain threat modeling
* Hardware supply chain security
* Details about determining supply chain policy
* Application security
* Certificate/root of trust management
* Monitoring
* Governance (see [Automated governance WG](https://github.com/cncf/tag-security/blob/main/community/working-groups/automated-governance/README.md))
* [Zero trust](https://github.com/cncf/tag-security/pull/1229)
* Incident response and mitigation
* [Compliance](https://github.com/cncf/tag-security/blob/main/community/working-groups/compliance/README.md)

## Introduction

Software supply chain attacks cost over $45 billion in 2023, with projections exceeding  more than $80 billion by 2026[^1].
According to the Verizon DBIR 2024[^2], supply chain attacks grew 68% year-over-year.
Aggregated risk from software supply chain compromises continues to grow as the relative ease of exploitation and exponential network effects of compromises have been demonstrated, enticing  further attacks.
This growth is evidenced by what multiple software supply chain vendors are witnessing in the field, with some claiming growth rates as high as 200% recently³.

Software supply chain attacks occur when the materials or processes of producing software are themselves compromised, resulting in vulnerabilities targeting downstream consumers of the produced software.
Although the number of known, successful exploits remains comparatively small, the impact of these attacks has been extensive, as evidenced by incidents such as Log4j, NotPetya, and SolarWinds.
The CNCF Technical Advisory Group (TAG) for Security maintains a detailed catalog ([link](https://tag-security.cncf.io/community/catalog/compromises/)) of known supply chain attacks to raise awareness of the increasing frequency of such occurrences coupled with lower barriers to success.

This paper presents a holistic view of the software supply chain, providing information for both newcomers and experienced professionals in the field.

### Non-goals

This paper does not detail tool-specific configurations, but it refers to existing documentation where it is reasonable and appropriate to ensure the reader has the most recent information.
This paper does not provide instructions on assessing existing supply chains for security risk.
This paper is not an end-all solution for resolving or preventing supply chain attacks.
The components of this paper should be evaluated by the reader for usability and applicability in relation to their organization’s risk tolerance and environmental requirements.

### Projects and Products

Where possible the authors strive to provide the readers with CNCF open source projects as examples.
However, it is recognized that some of these projects may not yet be productized or available “off-the-shelf”.
As a result, this paper may also refer to other projects, including both open source and commercial products.
All such references, including references to existing documentation, are given as examples to the reader in an effort to provide real-world relatability.
Readers should understand that these references are not an endorsement of any project or product by the CNCF or the paper’s authors and reviewers.

## Table of Contents

[Scope](#scope)

[Introduction](#introduction)

[Table of Contents](#table-of-contents)

[Detailed Table of Contents](#detailed-table-of-contents)

[Part 1: How to read this paper](#part-1-how-to-read-this-paper)

[Audience/persona](#audiencepersona)

[Part 2](#part-2-overview)

[Securing the Software Supply Chain](#securing-the-software-supply-chain)

[Concepts](#concepts)

[Part 3: Software supply chain best practices reference](#part-3-best-practices-reference)

[Software supply chain overview](#software-supply-chain-overview)

[Source Code](#source-code)

[Materials](#materials)

[Build Pipelines](#build-pipelines)

[Artifacts](#artifacts)

[Deployments and Distribution](#deployments-and-distribution)

## Detailed Table of Contents

[Scope:](#scope)

>[Out of Scope](#out-of-scope)

[Introduction](#introduction)

>[Non-goals](#non-goals)
>[Projects and Products](#projects-and-products)

[Table of Contents](#table-of-contents)

[Detailed Table of Contents](#detailed-table-of-contents)

[Part 1: How to read this paper](#part-1-how-to-read-this-paper)

[Audience/persona](#audiencepersona)

>[Developer](#developer)
>[Producer’s Security Team](#producers-security-team)
>[Compliance-focus, big-picture (CISO)](#compliance-focused-big-picture-ciso)
>[Ops/platform folks setting up supply chain infrastructure](#ops-and-platform-teams-building-supply-chain-infrastructure)
>[Security team of consumer (verifier)](#security-team-of-consumer-verifier)
>[End User Concerns & Use Cases](#end-user-concerns-and-use-cases)

[Part 2](#part-2-overview)

[Securing the Software Supply Chain](#securing-the-software-supply-chain)

[Concepts](#concepts)

>[Metadata](#metadata)
>[Policy](#policy)
>[Testing](#testing)
>[Zero trust](#zero-trust)
>[Root of trust](#root-of-trust)

[Part 3: Software supply chain best practices reference](#part-3-best-practices-reference)

[Software supply chain overview](#software-supply-chain-overview)

[Source Code](#source-code)

>[Verification](#verification)
>[Automation](#automation)
>[Controlled Environments](#controlled-environments)
>[Secure Authentication](#secure-authentication)

[Materials](#materials)

>[Verification](#verification-1)
>[Automation](#automation-1)

[Build Pipelines](#build-pipelines)

>[Verification:](#verification-2)
>[Automation:](#automation-2)
>[Controlled Environments:](#controlled-environments-1)
>[Secure Authentication/Access:](#secure-authentication-and-access)

[Artifacts](#artifacts)

>[Verification](#verification-3)
>[Automation](#automation-3)
>[Controlled Environments](#controlled-environments-2)

[Deployments and Distribution](#deployments-and-distribution)

>[Verification](#verification-4)
>[Automation](#automation-4)

[An Example Secure Supply Chain](#an-example-secure-supply-chain)

## Part 1: How to read this paper

## Audience/persona

At a high level, software supply chain security has two main perspectives: software producers and software consumers.
Software producers are looking to secure the software they produce and distribute.
Software consumers are looking to ensure that they only ingest and operate software that is safe and trustworthy.
In addition, there are distributors focused on securely storing trustworthy software and distributing it to consumers.

Software Producers are focused on developing software for any number of reasons, but want to deliver software with features that satisfy the needs of their consumers.
Most producers care about security, but depending on their specific role within a project, team, or organization, it might not be a major part of their work.
For example, open-source maintainers, software developers working at end-user companies, or developers working at software vendors fall under this category.

Software Distributors are focused on storing software artifacts along with metadata from producers and distributing them to consumers.
Distributors often care about ensuring that they only store and distribute trustworthy software that meets a security standard.
Open source distributors like PyPI and Maven Central are examples.
Vendors can also distribute their software to customers or through internal company software repositories.

Software Consumers are focused on ingesting and running software.
This software can come from another project in the same organization, an external vendor, or it could be software from the open source community.
Software Consumers want to ensure the software they ingest and run is safe to use and is from trustworthy sources.
They also want to be able to ensure this safety in a cost-effective manner.
Most consumers don’t want to run complex and expensive security scans against every piece of software they ingest, except in very high-risk scenarios.
They want to be able to ingest metadata coming from trusted sources and verify as needed.

There are people, teams, and organizations that might do all three, but it is easy for us to break up the practices into falling into one or more of the three categories of Software Producer, Software Storage and Distributor, and Software Consumer.
Even though someone may primarily fill the role of Software Producer, they will inevitably also act as a Software Consumer when pulling in dependencies when developing and building their software.

Below is a list of other personas that fall into one or more of the categories but it is worthwhile to call out some of their specific use cases.
For each persona there is discussion as to  where to start with software supply chain security.
More details about the suggested best practices can be found in part 3 of this document.

### Developer

Developers are not only responsible for adding new features and fixing bugs, but also managing application dependencies, version control system configuration (VCS), and often also Continuous Integration and Delivery (CI/CD) configurations.
Moreover, much of their work happens locally[^3], so managing the security of workstations has never been more important.

Fortunately, more and more developer work happens in source control.
This is great news for security, consistency, recoverability, auditability, and collaboration, but it also means at the forefront of supply chain security.
The changes developers make (or fail to make) have a direct impact on an organization’s supply chain security, and in many cases, also the supply chain security of downstream consumers, their consumers, and so on.

#### Where do I start?

One of the most impactful actions developers can take to improve and maintain the security of their supply chain is to ensure that all dependencies are kept up to date.
This means accepting those automated PRs, running  `npm audit` (or equivalent) regularly, updating container base images and keeping workstations up to date with the latest patches.
Even this isn’t an easy task, especially when it comes to keeping dependencies up to date on projects that are not currently being actively developed.

#### Then what?

The supply chain is only as secure as its weakest link, so even if all dependencies are kept up to date, a simple misconfiguration, leaked access token or unauthorized change to an upstream project can cause the whole chain to fall apart.
As with all security, the best strategy for the supply chain is defense in depth (often referred to as  “layers on the onion”).
For developers, this means also paying attention to the other areas:

##### Choosing New Libraries and Base Images

* **Minimize Dependencies:** Where possible, minimize the number of dependencies so that each can be more easily audited.
Use dependencies from the same organization or vendor to minimize sources of trust.
* **Publisher Trust**: Investigate whether the publishers of the libraries or base images are reputable,trustworthy, and whether their dependencies are also trustworthy.
Minimize the number of publishers to simplify the work of investigating publishers.
* **Regular Updates and Patches**: Check if the publisher regularly updates their products and quickly releases patches for known vulnerabilities, including those from their dependencies.
* **Best Practices in Supply Chain Security**: Assess whether the publisher follows security best practices, including distributing signed [attestations](#attestations) and securely managing dependencies.
* **Secure Supply Chain Consumption Framework ([S2C2F](https://github.com/ossf/s2c2f)):** Follow best practices for ingesting open source software, including how to handle  upstream projects that might not adhere to supply chain security best practices.
* **Dependency Confusion of Package Managers**: Be vigilant about package names to avoid importing malicious packages that mimic legitimate ones.
* **Typo-squatting**: Double-check spellings in package names and URLs to avoid downloading counterfeit libraries that could contain malicious code.
* **Recursive dependencies**:Ensure that all recursive dependencies are audited by either you or the vendor.
If possible, minimize recursive dependencies and perform more scrutiny on each one.

##### Protecting Source Code (see [Producer](#producers-security-team))

* **Signing Commits/Pushes**: Use cryptographic signing of commits and pushes to verify author identity and prevent unauthorized changes.
* **Git Security**: Implement strong access controls, use two-factor authentication for repository access, and regularly review access logs.
* **Workstation Security**: Ensure your workstation is protected with the latest antivirus software, firewalls, and is regularly updated to prevent vulnerabilities.
* **Secure Coding Practices**: Adopt and promote secure coding practices within your team to minimize vulnerabilities in the codebase.

##### Protecting the Build

* **Audit**: Regularly review and audit your build processes and automation tools to ensure they are free from vulnerabilities.
* **Scanning**: Integrate vulnerability scanning in your CI/CD pipeline to detect and address security issues before build and deployment.
* **Testing**: Ensure that tests are automatically run before deployment.
* **Shared Workflows**: Ensure use of shared CI/CD workflows and that they are secure and only include necessary permissions and access.
* **Isolation**: Utilize environment isolation techniques such as containerization to limit the impact of potential compromises, and to isolate one build from another.
* **Minimal build environment:** Keep the environments running the build minimal in order to minimize attack surface.
* **Supply chain Levels for Software Artifacts (SLSA)**: Aim to achieve higher levels of SLSA to ensure your build processes are comprehensively secure.
* **Reproducible builds:** Ensure that binaries are consistently generated from their source code to make tampering evident.

##### Supporting Downstream

* **VEX (Vulnerability Exploitability eXchange)**: Provide clear and actionable information about the exploitability of vulnerabilities in components you produce.
* **Scoring System**: Provide a data-driven estimation, such as Exploit Prediction Scoring System (EPSS), for the likelihood a vulnerability in one or more components will be exploited in the wild.
* **Signed Attestations**: Use signed [attestations](#attestations) to provide verifiable evidence of the integrity and origin of your software artifacts.
  * **Software Bill of Materials (SBOM)**: Generate and distribute [SBOMs](#sbom) to provide transparency about the versions and components in your software.
  * **Provenance**: Ensure that all software artifacts include information about their origin and the process used to build them.

### Producer’s Security Team

In the quest to secure the Software Supply Chain, the synergy between developers, Chief Information Security Officers (CISOs), and operations teams emerges as a cornerstone.
This collaboration is vital to preemptively identify vulnerabilities and swiftly respond to incidents.
Through this collaboration, organizations can develop a culture of security awareness that can transform developers from mere code creators to responsible actors in the Software Supply Chain (SSC).
To do so, open communication must be established between the security team and developers, encouraging a proactive sharing of information on emerging threats.
To aid in these endeavors, a selection of tools and processes must be established.
In particular, the producer should:

* Have secure coding best practices in place to ensure integrity and consistency across the code base.
* Monitor dependencies used by their software, and respond to any incidents or vulnerabilities in these dependencies (see [SBOM](#sbom) and [VEX](#require-sboms-and-vex-statements-from-third-party-suppliers)).
* Provide a template or stylesheet compatible with developers' preferred IDEs, containing the best coding guidelines.
* Use a vulnerability risk assessment solution to scan the code, packages, and third party dependencies.
This assessment should cross-reference the CVSS database with databases such as Nessus to identify vulnerabilities and to discover the latest packages or implement fixes.

### Compliance-focused, big-picture (CISO)

The Chief Information Security Officer (CISO) plays a pivotal role in managing organizational risk.
Their duties include achieving and upholding compliance with regulatory standards, as well as providing evidence to auditors and the board.
They are tasked with establishing and implementing policies and procedures derived from industry best practices, which must be adhered to by both their team and the management personnel across the organization.
Although typically not engaged in daily cybersecurity or vulnerability issues, they must maintain a comprehensive understanding of the company's threat landscape.
This includes determining the organization's risk tolerance, necessitating an assessment of current threats, estimated costs of mitigation, and the Mean Time to Remediate (MTTR).
The ultimate objective is to safeguard the organization against large-scale data breaches and incidents that could severely impact the business and damage its reputation.
Ignoring these risks is not an option, and failure to comply or inadequately handling threats may result in legal action.

### Ops and Platform Teams Building Supply Chain Infrastructure

Ops/platform teams are responsible for selecting and configuring the tools that manage the supply chain.
To tackle this critical step, a focus on simplicity and observability is essential.

#### Achieving Observability

Having a complete view and understanding the current state of the supply chain is crucial.
Employing observability tools that aggregate data across various points of the supply chain enables real-time visibility into potential vulnerabilities.
This awareness enables teams to proactively address security concerns, adapt to threats while continuously refining and improving security strategies.

#### Policy enforcement

The creation of explicit security [policies](#policy) sets the stage for secure supply chain practices; however, the real challenge lies in consistently enforcing these policies.
Leveraging policy-as-code solutions allows for the automation of these enforcements, ensuring that every step and element of the supply chain adheres to established security standards.
To strengthen policy enforcement, continuous validation ensures that security policies are not only adhered to at the outset, but also continuously improved as the supply chain evolves.

### Security Team of Consumer (Verifier)

End-users of software must establish trust in the software they consume.
In order to safely consume software, verifying the security, integrity, and authenticity of the product is essential to safeguard against supply chain vulnerabilities.

The first step in secure consumption for a verifier is ensuring that they are requesting the correct packages.
Software repositories for open-source software, such as npm and PyPI, allow any developer to upload packages.
While this decreases the barrier to entry for developers, it means that not all software on these repositories will meet an organization’s security standards, and attackers may upload malicious packages with techniques like typosquatting or dependency confusion.
Ideally, the consumer will audit all consumed software, creating an allowlist of packages they consume.
Even if an organization does not have the resources to audit every package, they can ensure that the same packages are requested on every download by creating a lock file with dependency digests or similar, reducing the opportunities for typos.
Once packages have been selected, the next step is to verify their authenticity.

#### Verifying Software Integrity and Authenticity

Consumers should verify the source and integrity of software prior to utilization.
Signature and checksum validation were once standard methods of doing so, but are no longer enough to ensure provenance and integrity.
[Attestations](#attestations) about software artifacts provide additional information about what the signer is attesting to and how the software was built.
As such, consumers should verify these against their own [supply chain policy](#policy).

Specifically, consumers should consider:

- Requesting and verifying attestations from the producers of software they consume.
- Evaluating Provenance of that software.
- Understanding their dependencies through the use of [SBOMs](#sbom).

In some cases, upstream producers may not follow best practices, and may not provide attestations.
When this happens, consumers can:

* Mitigate this risk by either auditing software that is consumed or building the software in-house.
* Engage with upstream producers to help improve their supply chain practices
* Perform [Software Composition Analysis (SCA)](#run-software-composition-analysis-on-ingested-software) on consumed packages.

### End User Concerns and Use Cases

End users come in various forms: from enterprises that use open-source software without releasing their software externally, to non-technical users downloading open-source software for personal use.
This document focuses on the safe consumption of software without consideration of its intended use.
For use cases where software is being used to develop more software look, refer to the [**Developer**](#developer) persona.

#### Where do I start?

For the end user consumer it might seem like security is not something you should have to deal with.
It’s the problem of those providing me with software.
This is mostly true when you buy software from vendors.
There’s often contracts or agreements in place that if a vulnerability comes up in vendor provided software it’s the responsibility of the vendor to report to end users and fix that vulnerability.
This isn’t true for open source software.
A piece of open source software might be backed by a company or large non-profit organization like the CNCF, or it might be a project maintained by just one individual.
In the latter case it’s impossible to rely on an individual with which there’s no agreement on your security.

As an end user, whether or not you’re using software as part of a business or just for personal use, you need to start by figuring out how comfortable you are with different levels of supply chain risk.
This is often called a risk appetite.
If you are using open source software in an isolated environment, not touching any sensitive data you might be a bit more open to using software that isn’t following most security best practices.
If you are using open source software to do something that deals with sensitive information you would want the software to be demonstrably more secure.

Once you have an understanding of what are the important things to focus time and money on in protecting you need to threat model.

#### Then what?

As an end user, once you have an understanding of what you’re looking to protect and how much time and effort you’re willing to spend on it, you need to get started on actually protecting yourself from potential security issues.
Most end users are not security experts and most businesses’ core competencies are not related to cybersecurity.
The most important thing as an end user you can do is be vigilant.
Download software from trustworthy places, update your software regularly, and follow other best practices.

This won’t protect you from a lot of sophisticated software supply chain attacks, but it helps prevent the most common ones.
Having more end users companies fund and contribute to the projects they use also helps here.

##### Protecting Ingestion (see [consumer](#security-team-of-consumer-verifier))

* **Publisher Trust**: Use software trusted sources.
* **Verify Security**: Ingest security metadata like [SBOMs](#sbom), in-toto [attestations](#attestations) like SLSA, etc.
and verify that it fits your security needs.
* **Secure Supply Chain Consumption Framework ([S2C2F](https://github.com/ossf/s2c2f)):** Follow best practices around consuming open source software.
The more technical your team is the more you can do on this front.

##### Protecting Runtime

* **Store Software Security Metadata**: Store SBOMs, in-toto attestations, etc.
from your SDLC processes and your dependencies.
* **Have Supply Chain Observability:** Analyze supply chain metadata like SBOMs and in-toto attestations and correlate it with runtime behavior to better respond to supply chain incidents like vulnerabilities or attacks.
* **Have software update processes**: Understand what to do when there’s a new version of software released or vulnerability discovered.

##### Protecting the Ecosystem

* **Fund Open Source**: Well-funded open source has a strong correlation with better security posture.
Help fund security initiatives and critical open source projects.
* **Contribute to Open Source:** Contributing back to the open source projects you use is also a good way to help with supply chain security.
This includes more than just code contributions, when you discover issues, report them.

## Part 2: Overview

## Securing the Software Supply Chain

A supply chain is “a process of getting a product to the customer.” This sentence hides a lot of complexity.
As we learned during the COVID-19 pandemic, the supply chains for manufactured goods are complex and can be disrupted by events anywhere along the way.
A shortage of computer chips for cars can drive up the cost of new vehicles — and then used vehicles.
Social distancing policies at loading docks result in dozens of ships waiting offshore to unload.
An error in ship navigation can result in a blocked canal.
The supply chain includes everything that goes into a product through every upstream step.

Supply chains don’t just exist for manufactured goods.
Software has a supply chain, too.
This includes the work that goes into writing, testing, and distributing the software.
It also includes the same work for the applications and upstream libraries used to write, test, and distribute the software.
The dependencies can go many layers deep, with developers not knowing what the software they build atop is composed of.
Software delivered to a consumer may contain malicious code or an active exploit prior to or upon installation and use; these vulnerabilities may be inserted or exploited at any stage in the development process, from early development to deployment.

When it comes to open-source software, the traditional supply chain concept starts to look a little different from commercial software.
Supply chains for commercial software are built on a vendor-buyer relationship defined by contracts with requirements for quality, functionality, support, and delivery times.
Open source software doesn’t require that two-way relationship.
In fact, developers often don’t know who is using the project until someone comes with a bug report or feature request.
While commercial software vendors can charge extra if their customers need more stringent security requirements, open source projects have to find their own resources to meet those needs.

It’s no surprise, then, that some open source maintainers push back on the idea of being part of a large company’s supply chain, particularly when the open source project is a hobby or passion project.
But supply chain security is important for everyone, whether working on a single-developer project or a giant project like Kubernetes.
No matter what software you’re writing, you’re using software to do it.
Improvements to the security of the software ecosystem are beneficial for everyone.
It’s not just about producing more secure software, it’s also about knowing what’s in your own supply chain and who produced that software, so that you can respond quickly to vulnerabilities in upstream code.

In the rest of this document, we will provide an [overview of software supply chain concepts](#concepts) before delving into best practices for each of its stages.
All of these best practices are designed so that readers can start small, and build up  until they have secured their entire software supply chain.
Not all supply chains look alike, so much of this guidance leaves specific policy choices to the implementer to decide based on their threat model and risk assessment.
A software supply chain is made up of many people and machines, and only by working together to secure each link in the chain can we make it more secure.

## Concepts

Before providing detailed security best practices for each of the steps in the software supply chain, some tools and concepts that are relevant throughout the software supply chain are discussed.
These concepts come up in many of the stages of the supply chain, so they are described here for brevity.

### Metadata

There are several types of metadata that can be associated with artifacts in order to improve software supply chain security.
Discussed here are SBOMs, VEX, and attestations.
All of the metadata produced during the software supply chain needs to be stored and distributed.
Storage mechanisms include OCI and [Github](https://github.blog/changelog/2024-06-25-artifact-attestations-is-generally-available/).
These storage mechanisms allow software consumers to find and verify metadata associated with the artifacts they consume.

#### SBOM

A Software Bill of Materials (SBOM) is a detailed inventory of all components, libraries, and dependencies used in a software application and the environment in which it was built.
SBOMs can help software consumers determine their transitive dependencies, and to determine whether they are impacted by a vulnerability.
However, just having an SBOM has little value without tooling to interrogate, aggregate, and otherwise reason about it.

With the right tooling, SBOMs can help with:

* **Vulnerability Management**: Provides detailed visibility into software components, helping to identify and quickly remediate vulnerabilities
* **License Management**: Helps with the identification and management of software licenses in line with organizational policy to avoid legal issues.
* **Incident Response**: Facilitates quick identification and remediation of issues by providing a clear inventory of components.
* **Transparency**: Enhances understanding of the software supply chain, making it easier to track and manage dependencies.
* **Compliance**: Helps meet regulatory requirements by documenting all software that comprises the application or system
* **Ecosystem Agnostic**: Standard formats for SBOMs (such as CycloneDX and SPDX)  allow for consistent communication across different tools and platforms.

SBOMs are often generated by scanning package manager indexes post-build (for example Syft and Trivy), but this approach can be error prone, not least because components are often built from source, so the identity of the package is harder to discover.
The software build process is the only time when there’s an intersection of the source code, dependencies, and produced software.
This makes build tools the ideal producer of accurate and attested SBOMs.
SBOMs are generated by the software producer or vendor, and represent the state of the released software as understood by the producer.
As such, SBOMs may not contain information about all dependencies, and do not include vulnerability information about the package itself.

#### VEX

The generation of Vulnerability Exploitability eXchange (VEX) documents for software artifacts is a proactive measure to communicate the exploitability of vulnerabilities within specific environments.
During this process, it is possible to include a parameter describing the state of given vulnerabilities present in the report (AFFECTED, NOT AFFECTED, UNDER INVESTIGATION, FIXED).
For example, there might be false positives or trails of unused libraries.
Those need to be listed inside the report, and specifying the status could help evaluating the actual security impact.
VEX documents are typically in JSON or XML format.
A parser or dedicated VEX processing tool can be used to ingest and analyze the data.
The information within a VEX document can be used to assess the risk a vulnerability poses to the product and identify possible mitigation strategies.
For example, an SBOM generated with CycloneDX can include a section dedicated to vulnerabilities within the listed components.
This section can reference a separate VEX document or embed vulnerability details directly in the SBOM.
Python tools like "vexy" can analyze a CycloneDX SBOM and generate a corresponding VEX document.
This VEX file would then detail the exploitability of the identified vulnerabilities within the context of the specific product that uses those components.
VEX is not yet widely adopted, however it is a useful tool to consider when producing SBOMs and consuming artifacts.

#### Attestations

Attestations are signed records of actions that occurred in the software supply chain.
They enable policy evaluation by providing verifiable information about what occurred in the software supply chain.
With these claims, a verifier can ensure that the steps described in policy were performed by the actors described in policy.
in-toto, an incubating project of the CNCF, is a popular specification for software supply chain attestations Attestations have a lifecycle that includes:

* **Creation:** Attestations are created during the execution of the software supply chain as signed statements by the actors performing steps.
For example, the build system could create an attestation that includes the inputs and outputs of the build, signed by the workload identity of the build machine.
There are a variety of tools for creating in-toto attestations, including Witness, Tekton and Syft.
* **Distribution:** Attestations must be distributed to verifiers and be associated with the particular artifact or metadata.
Tools like TUF and Archivista can be used for such distribution (see [Deployment and Distribution](#deployments-and-distribution) for details about secure distribution).
* **Verification:** Attestations must be verified against the supply chain policy.
Verifiers can check for inconsistencies between the attestations of what occurred in the software supply chain, and what the policy requires from it.
Such verification ensures that the supply chain policy is adhered to.

**Storage:** Attestations should be stored after verification for future use.
If a vulnerability is discovered later, attestations can be used as an audit trail to determine where in the supply chain the vulnerability was introduced.
Storage mechanisms include Archivista, OCI, and [GitHub](https://github.blog/changelog/2024-05-02-artifact-attestations-public-beta/).

### Policy

Software supply chain policy describes requirements for the software supply chain, defined in software, including authorized actors and expected actions.
This policy can then be evaluated against attestations as part of the verification process.
Policy will evolve with an organization’s supply chain security posture, first capturing the current process, then stricter security requirements as the organization’s threat model and risk assessment evolve.
More detail about software supply chain policy, including its evaluation and enforcement, is described in a [blog post](https://www.cncf.io/blog/2024/02/14/policy-as-code-in-the-software-supply-chain/#:~:text=%E2%80%9CPolicy%2Das%2DCode%E2%80%9D,of%20operational%20and%20security%20guidelines.) by TAG Security.

### Testing

Properly testing and verifying software is a crucial aspect of ensuring not only its functionality, but also its security.
Testing should be considered and attested to at each step of the delivery lifecycle.
Test results should be captured as signed, verifiable attestations and which are stored in a metadata store so that it can be evaluated against supply chain policy.
Software supply chain policy should list any expected tests to ensure they are run before deployment.

### Zero Trust

Software supply chain security heavily relies on an understanding of which actors are performing which actions in the software delivery lifecycle.
Metadata like SBOMs and attestations help shed light on what is happening in the software supply chain, but the data are only as trustworthy as the identities that created them.
Zero trust can be used for continuous verification of identities performing actions to determine whether these identities were authorized to perform those actions.
For example, a system could verify which people wrote code, which systems built the software, and which systems ran deployments.
The verified identities may be a public identity like the Linux Foundation or a pseudonymous identity.
A pseudonymous identity can be associated with a cryptographic key or other consistent identifier that indicates that the same actor is performing an action over time.
Such consistency can be used to establish trust even without verifying a human identity.

### Root of Trust

A root of trust is an entity that provides the initial trust anchor for a system.
This trust anchor can then have a chain of trust that can be used to determine other trusted parties, such as developer signing keys.
The root of trust should be hardened (for example, using offline keys, and requiring a threshold of keys), as it is used to establish trust in other keys or devices.
For example, the Sigstore project uses a TUF root of trust, which requires a threshold of offline keys to make changes to the root of trust, then this root chains trust to keys used by the Sigstore service.
Clients embed the TUF root, and can use it to securely determine the currently trusted keys for Sigstore.
In this way, clients always can receive updates to keys used by Sigstore, and in fact always have the most recent keys.
The level of hardening of a root of trust is dependent on the organization’s threat model and risk assessment.
For example, a hobby project may use online keys to improve automation of the root of trust, while a certificate authority may require a threshold of offline keys for improved compromise resilience.
Each organization should perform a risk assessment to determine the scope and severity of a root of trust breach, and harden it accordingly.

## Part 3: Best Practices Reference

## Software supply chain overview

The software supply chain consists of all of the steps taken to move code from source to production.
While every supply chain is unique, there are some general steps that are used by most software supply chains.
Each of these is described in more detail below, along with specific security risks and recommendations for each stage of the software supply chain.
The stages are:

* [Source code](#source-code)
* [Materials](#materials)
* [Build Pipelines](#build-pipelines)
* [Artifacts](#artifacts)
* [Deployments and Distribution](#deployments-and-distribution)

![SLSA diagram showing an example build pipeline with producer, source, build, distribution, dependencies, and consumer, with potential threats at and between each stage.][image1]
To illustrate how these stages fit together, consider the above diagram from the SLSA project.
This illustration of the supply chain threats highlights all the areas where something can go wrong.
This can be either a malicious attack, or it could be benign but still causing vulnerabilities.

* **Producer** \- Developer can be malicious or untrained
* **Authoring & Reviewing** \- Mistakes can be made, reviewers can be malicious or miss something
* **Source Code Management** \- Incorrect security settings, and the source code systems can get compromised
* **External Build Parameters** \- Malicious or insecure inputs to the build, like a bad compilation flag
* **Build Process** \- Build can be compromised or the software can be built insecurely
* **Artifact Publication** \- A wrong or malicious artifact can be published
* **Distribution Channel** \- Artifact host or tooling can be compromised
* **Package Selection** \- Downloading the wrong package due to typo or other reason

This paper condenses the threats described in this diagram into 5 sections.
The steps from this diagram map to the stages in this paper as follows:

* **Source code**: Threats from A, B, and C in the diagram (the source threats) map to the [source code](#source-code) section below.
* **Materials**: The dependencies map to the [materials](#materials) section.
* **Build Pipelines**: Steps D and E are described in the [build pipelines](#build-pipelines) section.
* **Artifacts**: Step F maps to the [artifact](#artifacts) section.
* **Deployments and Distribution**: Steps G, H, and I are described in the [deployments and distribution](#deployments-and-distribution) section.

This illustration of the software supply chain simplifies some aspects.
Each software supply chain has dependencies on other software, which has its own software supply chain.
In this way the software supply chain is recursive, with each piece of software building on the software supply chain of its dependencies.
While software consumers can and should validate the software supply chain of their immediate dependencies, this will not encompass the entire supply chain unless they also validate the dependencies of those dependencies, and so on.

## Source Code

The foundational construct of any software supply chain is the source code.
The initial step in securing a supply chain is establishing and ensuring the integrity of the source code.
"Integrity" in this context means that the source code and tags found in the repository have not changed or been altered from when the code was created by the developer.
This includes potential malicious changes introduced by a local compromise on the developers machine.
To maintain integrity, organizations should take steps to verify the provenance of the code added to their first party products and libraries.

It is fundamental to the supply chain that the development activity employs software development best practices.
Agile methodologies of "continuous improvement" have been embraced in the industry and enabled through CI/CD pipelines and automated testing.
These pipelines must be properly configured to access source code on-demand in order to build, deploy, and release artifacts at the cadence the organization needs.

Identity and Access management (IAM), including role creation and local developer accounts, is the biggest attack vector, regardless of platform or vendor[^4].
It is critical to carefully manage IAM policies, including requiring multi-factor authentication (MFA), to ensure they are not overly permissive, but still provide both developers and agents secure access to source code.
Pipeline agents and human developers must have their access and privileges calibrated to their roles within the organization and be given secure means to authenticate to those roles.

While the recommendations here assume that source code is tracked in a Git repository, they apply to any modern version control system (VCS).
The assumption is that there is a centrally managed canonical copy of the repository (for example, on github.com) that all developers contribute their changes to and pull new changes from.
If the VCS is not Git, it’s also necessary to confirm what integrity guarantees the VCS provides for its tracking of files and changes, such as the hashing algorithm.

### Verification

#### Declare protected repository namespaces

The repository responsible for storing source code and tracking changes must also include policy that indicates which parts of the repository are protected and who can make changes to them.
For example, repositories typically have a primary branch such as `main`.
Changes to this branch and a handful of others should be approved by trusted maintainers.
Another example of protected namespaces are in enterprise contexts that use a monorepo to manage multiple projects.
As different teams may be responsible for different projects, this should be clearly defined in the repository’s policy.

Source control platforms such as GitHub and GitLab include mechanisms for specifying protected branches as well as protected files/folders.
Open source tools like Peribolos (part of Prow) can be used to declare access control rules for GitHub.
This tool is used by Kubernetes.
Another option that also enables *verification* of policy enforcement is gittuf, an OpenSSF sandbox project.

#### Authenticate and monitor repository activity

The primary copy of the repository which serves as a synchronization point for all developers should limit who can push to it.
This baseline access control protection is offered by all popular source control platforms.
However, in addition, each push should also be verified to ensure the developer is authorized to push to that repository namespace.
This goes hand in hand with the use of protected namespaces mentioned above: while that sets expectations on the policy applicable to a protected namespace, here that policy is applied to verify the validity of a push to the repository.

There are several mechanisms to authenticate the developer pushing to the repository.
Popular source control platforms like GitHub already do so, and enforce policies such as branch protection and code review requirements.
Other mechanisms that are independently verifiable include Git’s support for signed pushes as well as the “reference state log” maintained by gittuf for a Git repository.

Finally, all repository activity should be recorded in an audit log, and this audit log should be monitored.
As before, source control platforms include audit logs on a repository and organization basis.
These logs should be inspected to detect unauthorized changes to a repository or the policies themselves due to the compromise of a privileged developer account.

#### Enforce independent 2-party review

The author(s) of a request may not also be the approver of the request.
At least two individuals, of which one should have write access to the branch, that are independent of the request should review and approve the request.
Some organizations may find an engineering manager or a lead engineer, who is an informed security practitioner to be sufficient for this role.
Reviewers should have a similar level of knowledge as the author(s), implying equal or greater expertise to provide informed review.

#### Require verification attestations / confirmation

Verification of source code policies should be captured as attestations.
This allows other systems such as a CI pipeline to verify that source code policies were enforced and met for a specific revision prior to performing a build.
Ongoing work such as the SLSA source track is defining guidelines about how to generate attestations at different levels.

### Automation

#### Prevent committing secrets to source code repository

Secrets such as credential files, SSH keys, access tokens, and API keys should not be committed to the source code repository unless encrypted prior to placement.
Tooling exists to detect secret key leaks, such as git-secrets or trufflehog, which can be integrated using either a client-side hook (pre-commit), server-side hook (pre-receive or update), or as a step in the CI process.

Some DevOps platforms and integrations provide a default list of files which cannot be pushed to the repository.
These lists can be extended to include more domain specific files which may contain sensitive materials.

##### Automate software security scanning and testing

Software best practices include the use of unit, functional, and end-to-end testing to identify bugs and errors in the code before release.
In addition, security specific scans should be performed, including Static Application Security Tests (SAST) and Dynamic Application Security Tests (DAST).
Static scan tooling should be integrated as early in the development process as possible, including integration into the IDE.
For more details on application security best practices refer to the [OWASP](https://owasp.org/) standards and tools.

During the build process the metadata from security tooling such as SAST tooling should be recorded and linked to a hash of the build artifact to provide provenance.
Both the coverage and results of these tests should be published as part of the repository information to help downstream consumers of software better assess the stability, reliability, and/or suitability of a product or library, possibly as an in-toto attestation.

### Controlled Environments

#### Establish and adhere to contribution policies

Modern VCS platforms allow repository administrators to define configuration options or rules to enforce security, hygiene and operational policies.
These rules can help enforce policies during different stages of software development allowing standardization across different team members.
For example, automated deletion of branches, policies for code reviews, role based contribution and automated checks can be performed.
It is recommended that repository administrators define a baseline of these rules.
General contribution policies should also define what is and is not considered an acceptable contribution so that potential contributors are made aware in advance.

#### Define roles aligned to functional responsibilities

Define roles corresponding to the different actors interacting with source code repositories, and assign access controls based on their responsibilities while enforcing the principle of least privilege.
Examples of roles include Developer, Maintainer, Owner, Reviewer, Approver, and Guest.
Grant each role fine-grained permissions for repository access control.

### Secure Authentication

#### Enforce MFA for accessing source code repositories

Multi-factor authentication (MFA) should be required at the VCS level for all software projects.
MFA provides an additional layer of security, normally by requiring a soft or physical token in addition to traditional credentials, thus requiring two compromises in order for an attack to be successful.

#### Use SSH keys to provide developers access to upstream source code repositories

Developers contributing source code require a non-interactive way to access source code hosted repositories from their development tools.
Instead of using passwords which are prone to common hacking techniques like brute force, password guessing and password spraying,
SSH keys[27](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-27-4616ccb4d6ae4a3472a432b18926f014) or SSH certificates[28](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-28-4616ccb4d6ae4a3472a432b18926f014) should be used.
Agents in CI/CD pipelines should also be configured to access repositories using SSH Keys.
All modern platforms like Github, Gitlab, BitBucket provide guidance on configuring access using SSH keys[29](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-29-4616ccb4d6ae4a3472a432b18926f014), including rotation and revocation of these keys.

There are environments where SSH may not be a viable authentication mechanism due to network policies.
One possible approach to authentication is frequently rotating Access Tokens, scoped to only the necessary functions.
It is important to note that the problem with tokens is their distribution, exposing credentials to Man in the Middle (MITM) and other classes of attack.
Tokens, in this context, should only be used if they are short lived and issued with an out-of-band identity management system such as [SPIRE](https://github.com/spiffe/spire).

#### Use short-lived/ephemeral credentials for machine/service access

Modern VCS platforms allow the use of randomly generated short lived tokens for the access management of machines and services such as CI/CD pipeline agents.
Short-life credential issuance encourages the use of fine grained permissions and automation in provisioning access tokens.
Short-lived signing keys, such as those used by Sigstore, do not require key rotation as new keys are used for each signing event.
These permissions further restrict the type of operation that can be performed at the repository level.

Short-lived access tokens should be considered instead of password-based credentials so that tokens are continuously authenticated.
These tokens shouldn't be confused with the long-lived and non-refreshable personal access tokens (PAT) such as those [available on GitHub](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token), as these PATs will have similar security properties as a shared secret or password type of credential.

## Materials

The overall quality and consistency of any “manufacturing” process largely depends on the quality and consistency of the goods used as inputs.
Producers must take care to verify the quality of these materials.
For software supply chains, the quality of the dependencies, direct or transitive[^5] should be verified.
Ensuring dependencies are retrieved from trusted sources and have not been tampered with is a key part of the software supply chain.
Depending upon the required risk profile, it may be appropriate to identify trusted repositories and rely directly upon them, in addition to disabling access to all other repositories.

### Second and Third-Party Risk Management

When making determinations on accepting, limiting, or denying the use of second- and third-party software, organizations should use risk management processes to understand the risk presented by these materials.
Not all software an organization may intend to use has the same level of support behind it, which may reflect significant differences in the overall level of quality, security, or responsiveness to issues across dependencies.
Particularly from the perspective of security, organizations should consider whether proposed dependencies have mechanisms for managing externally reported vulnerabilities.

Most foundation- or corporate-supported open source projects make it standard practice to report Common Vulnerabilities and Exposures (CVEs) and patch affected code.
However, a CVE is a lagging signal.
It requires a significant effort to establish and publish a CVE.
A series of continual “operational health” metrics should be used to evaluate the true state of security for a project.
The Open Source Security Foundation (OpenSSF) has produced the [OpenSSF Scorecard project](https://scorecard.dev) aimed at providing a rubric to evaluate the security posture and operational health of open source projects.
In addition, projects should be evaluated to determine whether they adhere to the best practices documented in this paper.

The number of CVEs by itself is not a particularly meaningful metric as not all vulnerabilities have the same impact.
Common Vulnerability Scoring System (CVSS) and Package Vulnerability Scores (PVS) are useful frameworks for assessing and managing vulnerabilities within the software supply chain.
Vulnerability Exploitability eXchange (VEX) documents are an additional source of information.
VEX documents give attestations from software providers about whether or not a package is affected by a particular vulnerability.
For example, a CVE in a software’s source code may not be present in the shipped binaries because the vulnerability is conditioned on a compile-time option that wasn’t used.

These specifications offer a standardized approach to evaluating software packages and their dependencies, facilitating clear and consistent decision making during evaluation.
The integration of the frameworks into security checks and gates throughout the S3C helps reduce risk and improve compliance with regulatory requirements.

Additionally, organizations should always monitor changes to second and third party software and services.
Software and service vendors should list any changes to their Service Level Agreement (SLA) for the service or changes to the software (for example, maintaining a changelog).
It is incumbent on the consumer to review and understand these changes and to
analyze how they will impact their supply chain.

### Verification

#### Verify third party artifacts and open source libraries

Third party artifacts need to be verified using a range of approaches.
All third party artifacts, open source libraries, and any other dependencies should be verified as part of continuous integration.Verification involves verifying their checksums against a known good source and checking any cryptographic signatures.
Any software ingested should be scanned using Software Composition Analysis (SCA) tools to detect whether any vulnerable software is present in the final product.
For even higher confidence, perform penetration and fuzz testing to ensure any third party artifacts are resistant to common attacks and no basic security flaws are present.

#### Require SBOMs and VEX statements from third-party suppliers

Where possible, software vendors should be required to provide [Software Bills of Materials](https://www.ntia.gov/SBOM) (SBOMs) containing the explicit details of the software and versions used within the supplied product and Vulnerability Exploitability eXchange (VEX) statements that indicate whether specific vulnerabilities affect the software.
This provides a clear and direct link to the dependencies, removing doubt on the version of dependencies that are used and thus removing the requirement of using heuristics via SCA tools.
Ideally, signed metadata from the build process should accompany the SBOM.

#### Track dependencies between open source components

A register of a project’s open source components, dependencies, and vulnerabilities should always be maintained to help identify any deployed artifacts with new vulnerabilities.
One of the most popular open source inventory implementations is OWASP Dependency-Track.
Generating, receiving, or maintaining a supply chain inventory will help identify the software vendors, suppliers, and sources used in an organization, as well as the associated software and versions.
Cataloging this inventory into a human and machine readable format allows organizations to correlate vulnerabilities as they are published against in-use or prospective software and to establish any impact.

#### Build libraries from source code

Software dependencies are often distributed in binary form such as tarballs, or stored in a package management repository.
However, there is often no explicit connection between the binary in a repository and the source code itself.
This connection can be made with attestations (such as those used by npm) or through content-addressable build systems  (such as Nix).
When this connection is not made it is entirely possible that the compiled version uploaded to a package repository contains additional or different code when compared to the source code repository.
This often happens, for example, when developers add debugging capabilities to their code.
However, this lack of a one-to-one correlation between source code and binaries also opens up the possibility of malicious additions to the package manager’s version of a dependency.
Consequently, when possible, it is safer and more reliable to build the binaries yourself directly from the source code.
This provides a clear link between the library source code and the compiled binary.
However, because this process is time consuming and resource intensive, it may only be feasible within highly regulated environments.

#### Define trusted package managers, repositories, and libraries

If building from source is not a viable option for every component, components from a trusted supplier which regularly maintains and updates those binary components in a backwards compatible way should be used.
They should be vetted by using metrics and other [testing methods](#testing).
The supplier should publicly document their processes, and have a security incident response process with well defined SLAs.

While there are public repositories and package managers that sign packages and provide the means to verify those signatures, highly regulated environments should minimize ingestion from public repositories, and try to rely on verification by build [reproducibility](https://salsa.debian.org/reproducible-builds/debian-rebuilder-setup).
Less highly regulated environments should only ingest public packages if they can assess the risk level with techniques such as CVE scanning.
If organizations choose to host their own package managers and artifact repositories, they should restrict build machines to pull from only those sources.
These hosted package managers must be properly configured to ensure that they do not have malicious packages and are using best practices for software distribution.
When organizations choose to instead utilize external repositories, they should ensure that packages are signed by the correct authors and limit the pages ingested from untrusted repositories (such as through the use of an allowlist or other validation).

#### Generate an immutable SBOM of the code

While rebuilding a software artifact, it is best practice to also generate its SBOM.
An SBOM provides a machine readable inventory of the contents of the artifact.
Consumers of the software will then be able to analyze the SBOM, correlate it with vulnerability data to directly identify vulnerabilities.
There are currently two well known SBOM specifications: [SPDX](https://github.com/spdx/spdx-spec) and [CycloneDX](https://github.com/CycloneDX/specification).

Ideally, the build process should generate the SBOM.
For third party software, an SBOM can be generated using software composition analysis.
SBOM data generated by using the build-time data will be more accurate because the build process has visibility into the dependencies used to generate the software.
An SBOM generated through scanning isn’t likely to capture issues such as the toolchain vulnerabilities or manually installed software.

### Automation

#### Scan software for vulnerabilities

Before software dependencies are brought into a system and periodically thereafter, they should be analyzed to ensure the vulnerabilities they include pose an acceptable risk to the organization.
If the dependency poses an unacceptable risk, perform triage using a vulnerability management process to decide whether other mitigations may be applied to reduce risk, or whether the software or update should be blocked.

Note that instances may exist where the specific usage of the software does not expose or use the specific code containing the vulnerability.
For these occurrences, analysis mechanisms such VEX or CVSS may be provided to mitigate the vulnerability.

#### Managing software licenses

While not directly a security concern, licensing obligations are an important consideration when adding new dependencies.
The Linux Foundation maintains the [Open Compliance Program](https://compliance.linuxfoundation.org/references/tools/) which provides several tools to ensure released software meets legal and regulatory requirements.
Licensing metadata should be recorded during the build process and distributed within the artifact’s SBOM.

#### Run software composition analysis on ingested software

At a minimum, a Software Composition Analysis (SCA) tool should be run against any dependencies used within the software being built.
The SCA tool will use heuristics to identify the direct and transitive dependencies, and can also verify the contents of the SBOM.
This data can then be correlated against data from a number of feeds containing vulnerability metadata to highlight any vulnerabilities in the dependent packages.
There are several nuances with this approach that may lead to false positives.
Errors may occur when libraries are mapped against vulnerability feeds due to the use of different or inaccurate library identifiers (e.g.
namespace or version strings).
Validation of the security of the open source components should occur before the build process and can complement a range of checks appropriate to organizations risk tolerance.

## Build Pipelines

The build pipeline "assembles" the software artifacts that will be made available to downstream consumers.

Securing the build pipelines themselves is crucial to securing the software supply chain:

* **Build steps**: The function or task to be performed at any point in the "assembly line." A build step should have a single responsibility which may be, for example, to retrieve sources, compile an artifact, or run tests.
* **Build workers**: The machinery or infrastructure carrying out the task.
Historically, a single server might have completed all the steps, but in a cloud native environment the build worker is typically a container which has a 1:1 correlation with a particular step.
* **Build tools**: Any software dependencies required to generate and ensure the integrity of the final artifact(s).
* **Pipeline orchestrator**: The overall build pipeline managing the CI/CD workflow.
Deploys build steps and workers to complete the stages of that pipeline.

Additionally, build metadata produced by these components should be signed and recorded externally in order to facilitate out-of-band verification.

The pipeline is created by joining together a series of hardened build steps.
Each build step should be verified as trusted.
Either by implementing each step through a hardened container image stored within a secured repository and deploying to a hardened orchestration platform such as Kubernetes, or by having attestations for the ingested materials and operations that stem from a trusted root.
As an example, the US Air Force's Platform One is an implementation of this concept, which leverages hardened containers from the Platform One centralized artifact repository called "Iron Bank".
This repository contains signed container images hardened according to the DoD Container Hardening Guide[37](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-37-dbfbf2c033ed60aef07c6cbd23c5b467).

By building the pipeline from hardened components, the likelihood of successful compromise of any build step is reduced.
The pipeline orchestrator controls exactly what each stage is able to perform, implementing the required build step without additional software and reducing the attack surface of each component in the pipeline.
The entire pipeline should be designed such that the compromise of an individual build step (or even multiple build steps) is contained and does not lead to compromise of the entire pipeline.
Out-of-band verification provides defense in depth and mitigates against anything short of loss of the infrastructure’s administrator credentials.

Guiding principles for securing the build pipeline include:

* Each component in the pipeline, from infrastructure to code, should have a single responsibility.
This division of responsibility should support least privilege authorization.
* Steps should have clearly defined build stage inputs and outputs (artifacts) to allow greater control over data flow.
* Clearly defined output parameters enable signing of data to provide non-repudiation of artifacts and metadata.
* All aspects of the pipeline infrastructure and configuration should be immutable.
* Pipeline steps themselves should be subject to automated testing to validate the efficacy of the security controls within the pipeline.
* Pipeline steps should produce signed attestations for out-of-band verification of the build process.

For more detail about build pipelines, see the TAG Security [Secure Software Factory Whitepaper](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/secure-software-factory/secure-software-factory.md).

### Verification

#### Enforcing policy

Project and organizational release policy should be maintained as software supply chain policy.
Metadata produced during the build process should be analyzed to ensure that the products, materials, and processes used during the build pipeline fall within requirements defined in the policy.
Verification of the build policy should be performed in a cryptographically provable way.
The [in-toto](https://in-toto.io/) project can be used to secure a chain of pipeline stages end-to-end with cryptographic guarantees.
It enables supply chain owners to define a "layout" of the software supply chain, and includes a workflow to produce metadata files, or "links", by hashing and signing the inputs and output of the steps in the pipeline.
The presence and output of each build step should be attested to during the build.
Finally, in-toto includes a verification workflow that analyzes the links to ensure that they meet the constraints set in the layout.
The [SLSA framework](https://slsa.dev/) uses in-toto attestations, combined with defined maturity levels that specify the build policy.
Build metadata should be evaluated against the policy by using tools such as [Open Policy Agent](https://www.openpolicyagent.org/) (OPA).
Open Policy Agent provides a language to enforce policy on JSON data derived from any source, such as Terraform or [SPDX](https://spdx.dev/).

#### Validate environments and dependencies before usage

The build environment's sources and dependencies must come from a secure, trusted source of truth.
Checksums and any signatures should be validated both in the downloading or ingestion process, and again by the build worker.
This should include validating package manager signatures, checking out specific Git commit hashes, and verifying digests of input sources and binaries.
After completing this validation, the downloading process could sign all binaries or libraries to generate an attestation or include them in an internal repository that allows future steps to ingest them directly.

#### Validate runtime security of build workers

Out-of-band verification of runtime environment security, as defined by execution of policies using tools such as seccomp, AppArmor, and SELinux, provides defense in depth against attacks on build infrastructure.
Policy rule sets should be created and applied to build infrastructure.
High privilege kernel capabilities such as debugger, device, and network attachments should be restricted and monitored.
Findings should be forwarded to organizational Security Information and Event Management (SIEM) systems for remediation.

#### Validate build artifacts through verifiably reproducible builds

A deterministic build produces equivalent outputs when given the same inputs and enables the detection of unintended changes (whether malicious, such as malware and backdoors, or accidental).
Verifiably reproducible builds improve on this by enabling cryptographic attestation that the given inputs produce the same output.
A verifiably reproducible build is a build process where, given a source code commit hash and a set of build instructions, an end user should be able to reproduce an identical artifact.
We can build on these cryptographic assertions to provide additional security properties, such as artifact flow integrity.
Assurance of the build is obtained when multiple builders, on separate infrastructure, achieve consensus of the build artifact signature.

The ability to build software in a verifiably reproducible manner is of growing importance as the software industry sees more attacks on build infrastructure.
Building software in a reproducible way is not a trivial task however, and care needs to be taken to capture the required build environment and remove non-determinism from all aspects of the process.
In what follows, several recommendations specific to the production of reproducible builds are given.[40](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-40-dbfbf2c033ed60aef07c6cbd23c5b467)

#### Recommendations For Reproducible Builds

##### Lock and Verify External Requirements From The Build Process

External resources introduce a source of risk into systems.
Verification by reproducibility gives security administrators more confidence that external software has not been compromised.
Reaching out to external sources at build time can be a challenge when trying to make builds reproducible.
External resources can change or disappear unexpectedly.
Third party packages that are part of the build process can be vendored (included in the revision control system alongside the code that depends on them).
When this is not feasible, hashes should be recorded of any remote data for verification during future builds.
Pinning specific versions of external requirements increases the consistency and ability to verify build assets throughout a project's lifecycle.
However, if pinned versions are not regularly updated, vital bug fixes and security patches may be missed.
Therefore, it is important to use tools like dependabot or renovatebot to track and update dependency versions regularly.
If an external dependency cannot be verified in some way, replacement or complete removal of the dependency should be considered.

##### Find and Eliminate Sources Of Non-Determinism

Timestamps, locale differences, and embedded version information are just a few of the things that may affect determinism in the build process.
A compiler may produce different output if source files are passed in differing orders.
Some compilers may embed build information such as build time.
The things that may affect determinism in a particular build depends on which tools and compilers are being used.
[Reproducible Builds](https://reproducible-builds.org/) documents and offers solutions for many of these.
Diffoscope[41](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-41-dbfbf2c033ed60aef07c6cbd23c5b467) can be used to identify the sources of build non-determinism.

##### Record The Build Environment

In order to reproduce a build environment, the versions and hashes of all tools and required configurations should be recorded and distributed with the software's source.
Compilers, system libraries, build paths, and operating systems are some of the items that are required to be recorded to properly reproduce a build environment.
Debian has created a .buildinfo[42](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-42-dbfbf2c033ed60aef07c6cbd23c5b467) file format that they use for this purpose.
Storing snapshots of historical build environments allows some forensic analysis and may be more achievable for some teams.

##### Automate Creation Of Build Environments

Other developers or verifiers who wish to build your software need to be able to recreate the build environment with minimum effort.
A project may use scripts to quickly retrieve and set up the required tools in a virtual environment.
For example, tools like Vagrant[43](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-43-dbfbf2c033ed60aef07c6cbd23c5b467) can be used to declaratively create a virtual machine, or Dockerfiles and container images.

##### Distribute Builds Across Different Infrastructure

To detect potential attacks on the build infrastructure an architecture can be deployed to distribute the builds to multiple hosts.
Each host independently and deterministically builds the same component.
A hash of each resulting artifact can then be verified to ensure that the results match, and any divergence can be examined.
To successfully attack such an architecture, the attacker must compromise multiple disparate systems.
Rebuilderd[44](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-44-dbfbf2c033ed60aef07c6cbd23c5b467) is an example of a tool that can be used to set up independent *rebuilder* environments on different infrastructure.
It currently supports rebuilding Arch Linux packages, with support for Debian packages planned for the future.

### Automation

#### Build and related continuous integration/continuous delivery steps should all be automated through a pipeline defined as code

Steps such as build, linting, scanning, and validation should be clearly defined in code that describes a pipeline.
This means that all steps from code checkout, to checksum and signature validation, to building and compilation, to publishing, and eventually to deployment should be automated.
By putting all steps in a pipeline as code, the likelihood of human error is reduced, and the same steps are taken on each build.
The only manual steps during this process should be any code reviews or sign offs.

#### Standardize pipelines across projects

CI/CD processes should be standardized across the enterprise for ease of maintenance and to ensure secure configurations.
This process should be enforced by templating CI/CD pipelines or using shared workflows and verifying that pipelines and shared workflows meet organizational standards.
Open source tools like Jenkins, Tekton, Argo, and Gitlab provide the ability to either template pipelines or include shared workflows in pipelines for enforcing organizational release processes.
Organizations should take care that use of these templates and shared workflows can not be bypassed by developers.

Verification of pipelines should occur before release or distribution.
This can ensure that pipelines are following best practices.
in-toto provides a layout specification enabling out-of-band verification of CI/CD pipelines.

#### Provision a secured orchestration platform to host the build pipeline

During the initialization phase of the platform trust should be bootstrapped in the system.
Methods to bootstrap trust vary by installation type.
The best practices described in the cloud native security whitepaper (including protection from unauthorized access, immutability, availability, auditing and accountability) should be followed during the platform hardening process.
The CNCF provides the Cloud Native Trail Map[45](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-45-dbfbf2c033ed60aef07c6cbd23c5b467) as a starting point for architecting a secure application platform.
Additionally storage and network access need to be provisioned.
The provisioning process should be described as IaC and happen through an automated and audited process.
Cluster administrative credentials should be secured with hardware tokens.
The use of GitOps as a deployment methodology ensures all changes to the system are tracked and can be integrated with organizational identity management systems.

#### Build Workers Should be Single Use

Build Workers, the workloads that perform the Build Steps, should only be used once before being thrown away.
This lowers the blast radius of a compromised build worker, and limits the attack surface by keeping the lifespan of a build worker to a single build operation.
Long lived build workers are prone to configuration drift and can lead to increased risk of attack.
Shorter build worker uptime makes it easier to reason about the operations performed during its lifecycle.
For use cases where future forensics might need to be performed, it is prudent to either snapshot the build worker or to keep it running and quarantine it after its build.

### Controlled Environments

#### Ensure Build Pipeline has minimal network connectivity

The build pipeline should have no network connectivity other than to connect to the trusted sources of source code, the dependency repository and code signing infrastructure.The build workers will require a secure shared storage capability to pass data between each worker.
This prevents the workers from repeatedly retrieving remote data for the build and thus improves performance.
This shared storage must be encrypted and secured to prevent tampering.

#### Segregate the Duties of Each Build Worker

When planning what each build worker will be responsible for, consider segregation of duties within the domain of a particular build.
It is generally better to have specific build workers handle specific parts of a build as opposed to having a single worker handle all steps, e.g.
lint, compile, submit for remote scanning, push artifact etc.
Splitting the build between workers reduces the attack surface for any compromised worker.

#### Pass in Build Worker Environment and Commands

A build worker should have a hermetic (e.g.
isolated and sealed) environment given to it from the broader pipeline, and no ability to define its own environment.
This is because a compromised worker can potentially create an environment of the attacker's choosing, including hostile tooling and persistent threats to pivot or retain access.
In addition to the environment, the worker's commands or actions should be passed in explicitly at provisioning time.
There should be minimal decision logic in the worker itself.
One method of doing this might be to use Kubernetes pod or job objects to deploy the workers for each step in the pipeline.
The object definitions can be used to specify the environmental variables, commands, and volumes relevant to that particular step, while the base image itself remains minimal[46](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-46-dbfbf2c033ed60aef07c6cbd23c5b467).
For environments which do not use Kubernetes as an orchestrator, other methods exist for externally declaring the environment and commands that a container should execute.

#### Write Output to a Separate Secured Storage Repository

The output artifacts of builds require similar security considerations as the inputs and the environment definition.
The output artifacts should be written to separate storage from the inputs.
A process separate from the worker should then upload the artifacts to the appropriate repository for downstream consumption.

### Secure Authentication and Access

#### Only allow pipeline modifications through "pipeline as code"

The pipeline configuration should be deployed through the pipeline as code and should be immutable.
It should not be possible for an administrator to modify an instantiated pipeline to ensure an attacker posing as an administrator cannot interfere with it directly.
This model requires appropriate authentication and authorization to be in place for the configuration of the pipeline.

#### Define user roles

Organizations must define user roles in a build pipeline which should be used to define permission boundaries.
In high security environments, no single user should be able to attest to the validity of a software release.
For example, Policy Administrators are responsible for ensuring organizational policy is encoded into software pipelines and attestation gates.
Administrators are responsible for the maintenance and innovation of a build pipeline.
Inevitably there will be shared responsibilities across these roles.
Teams should carefully define the boundaries and delineate expectations around those shared responsibilities, especially when it comes to security concerns.
For example: how much responsibility do application developers have for security within the pipeline? What are they not responsible for?

#### Follow best practices for establishing a root of trust from an offline source

[Root of trust](https://csrc.nist.gov/glossary/term/roots_of_trust) for a build pipeline should follow standard methods for their establishment a from an offline source.

#### Use short-lived Workload Certificates

Workloads should be issued short lived credentials with automated rotation.
The CNCF maintained SPIFFE/SPIRE project provides a robust identity and certificate orchestration system.
The publication "[Solving The Bottom Turtle](https://spiffe.io/book/)"[47](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-47-dbfbf2c033ed60aef07c6cbd23c5b467) is an excellent resource to consider when designing an organizational workload identity system.
Certificate rotation policy is a decision based on the trade-off of system availability and the security impact of a lost key.
In situations where the use of long-lived certificates is required, a robust certificate revocation system should be implemented.

#### Deploy monitoring tools to detect malicious behavior

Additional security techniques should be integrated into the build pipeline itself to monitor for suspicious or unexpected activity, such as attempts to connect to unexpected endpoints during the build process.
It is especially valuable to provide enhanced monitoring of stages within the pipeline that affect the resulting artifacts (as opposed to stages performing testing on them) as any deviations from their normal process may be a sign of compromise.

#### Sign Every Step in the Build Process

Individual steps in the build process should be attested to for process integrity.
Build step inputs, outputs, and process traces should be collected and evaluated as part of the software release and distribution process.
The final artifact bundle should include these collective signatures and itself be signed to give integrity to the completed artifact and all its associated metadata.
These signatures may use keyless signing methods, like Sigstore, to tie signatures to a developer identity rather than long-lived keys.
The CNCF sponsors in-toto, The Update Framework (TUF), and the SPIFFE/SPIRE projects, each of which support the framework for such an attestation/control system.

## Artifacts

An artifact is the output of the build pipeline once the software has been built and packaged for distribution.
Software artifacts, along with corresponding build metadata, should be hashed and signed by authorized entities.
The signing of software artifacts should follow a process ensuring the integrity and provenance of the artifact at build time, helping to establish trust.
Cryptographic keys used for each artifact should be part of a chain of trust stemming from a secure root of trust.
The signing of an attestation for an artifact is a method of indicating that an artifact has been vetted and approved to be used in a given environment.
Trust is established through cryptographically generated signatures at build time based on a secure hash of the artifact and, in more complex scenarios, whether the artifact has been signed by another process in the supply chain.
For example, consider a scenario where the artifact is signed at build time and the resulting signature is verified before the artifact is scanned for compliance and security.

The signing of artifacts and creation of signed attestations should be performed at each stage of an artifact’s life cycle, along with the verification of signatures and attestations from prior stages, to ensure end-to-end trust.
For added protection, encryption can be used to protect the confidentiality of the artifact, and to ensure only authorized parties are able to use the artifact.

### Verification

#### Validate the Signatures Generated at Each Step

The integrity and provenance of images, deployment configuration, and application packages included in artifacts should all be validated using the signatures generated by each step in its build process to ensure compliance with the organization's requirements.
This includes signatures on attestations.
The contents of attestations should additionally be verified against the software supply chain policy.
Additionally, software metadata, such as SBOMs, should have verified signatures to ensure objects in an artifact's manifest or dependency metadata store have not been tampered with between build and runtime.

#### Perform additional checks on the artifact

Perform additional testing or validation on the built artifact to ensure it meets security expectations.
Once these checks are performed, add a signature to the artifact indicating that it is ready for release.
This signing key for this validation service should be delegated to as the trusted key for this artifact.

##### Policy

In addition to validating the signatures on attestations, the verifier should also check that these attestations adhere to the [software supply chain policy](#policy)y.
For example, this policy could ensure that the output of the source code is the same as the input to the build system, or that the correct entity signed each attestation.

### Automation

#### Use TUF to manage signing of artifacts

The CNCF maintains The Update Framework (TUF), to enable the secure distribution of artifacts.
Signatures and metadata about artifacts are stored, often adjacent to an OCI registry.
TUF makes use of a "root-of-trust" model to delegate trust from a single root to the individual teams or developers who sign artifacts.
This should be used to delegate to the expected signing entity for each artifact, which may be a build server or developer.
It uses additional metadata to allow clients to verify the freshness of content in a repository and protect against common attacks on update systems[48](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-48-b48f8aeca0379d5092f46210756d7d22).
Clients can make use of public keys to verify the contents of the repository.

#### Use a store to manage metadata from in-toto

Organizations that generate in-toto metadata need a way to track and store this metadata.
This may be a database or a dedicated solution such as Archivista or Grafeas.
Archivista is a CNCF project that provides a graph and storage mechanism for in-toto attestations.
Grafeas is an open source artifact metadata API supporting in-toto link attestations as a type, and has a supporting Kubernetes admission controller called Kritis[49](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-49-b48f8aeca0379d5092f46210756d7d22).

#### Distribute in-toto metadata with TUF

The in-toto metadata, along with the supply chain policy for an artifact needs to be securely distributed to users to prevent tampering and rollback attacks.
Delegations in TUF can be used to associate each image with its policy and in-toto metadata, while preventing attacks on their distribution.
This TUF metadata can be stored alongside the artifact or in a metadata store, such as those discussed in the [Metadata](#metadata) section to allow for secure discovery and verification.

### Controlled Environments

#### Limit which artifacts any given party is authorized to certify

It is important that a software delivery and update system must not grant trust universally or indefinitely.
The system must make it clear which artifacts or metadata a given party is trusted to certify using selective trust delegations, such as those in TUF.
Trust must expire at predefined intervals, unless renewed.
Finally, the idea of trust must be compartmentalized \-- a party must only be trusted to perform the tasks assigned to it.

#### Build in a system for rotating and revoking private keys

It is insufficient to cryptographically sign components being distributed and assume they're protected.
Instead, the system must be prepared for *when, not if,* its private keys are compromised.
The ability to rotate and revoke private keys must be built into the distribution mechanism.
This distribution mechanism must allow users to ensure that they are using a currently trusted set of keys, and not keys that have previously been revoked.
This requires a notion of timeliness, similar to the one used by TUF.
Additionally, multiple keys must be used, especially for different tasks or roles, and a threshold of keys must be required for important roles.
Finally, minimal trust must be placed in high-risk keys like those that are stored online or used in automated roles.

#### Use a container registry that supports OCI image-spec images

An internal image registry should be deployed and configured to support internal artifact distribution with the security properties described in this section.
This might be accomplished by distributing metadata using the recently standardized OCI artifact manifest[50](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/sscsp.md#user-content-fn-50-b48f8aeca0379d5092f46210756d7d22).

## Deployments and Distribution

Software delivery systems have been historically prone to several types of attacks.
The Update Framework (TUF) has been designed to be resistant to these attacks.
Therefore, any system designed to distribute software artifacts and their corresponding metadata must have several properties that enable them to counter the attacks defined in the TUF spec: Trust, Compromise Resilience, Integrity, and Freshness.
In addition the system must contain preventive and detective capabilities to monitor its security posture and report if attempts to compromise are discovered.

### Verification

#### Ensure clients can perform Verification of Artifacts and associated metadata

Clients receiving software artifacts and policy from the distribution mechanism must be able to verify the integrity of the downloaded files using the policy.
It’s also vital that the view a client has of the repository is consistent and up to date so the client sees the latest version of all the files it has access to.
This is especially necessary for highly volatile repositories.

Clients must verify the metadata associated with the artifacts.
In addition to authenticating the metadata, such as by verifying its signature(s), the contents of the metadata must be verified as well.
For example, if SLSA provenance is captured for a build process as an in-toto attestation, the signature on the attestation as well as the provenance metadata must be verified against the policy.
Adopters can use different tooling depending on the type of metadata that must be verified, with tools like Witness shipping with policy features to verify different types of in-toto attestations.

#### Ensure clients can verify the “freshness” of files

Since software updates are used to deliver bug fixes and security patches, it is important for
clients to have access to the latest available versions.
Clients must be in a position to recognize
when they are being provided files that are out of date.
Clients must also recognize if they are
unable to obtain updates that exist on the repository.

##### Air-gapped deployment

In air-gapped environments, verifiers will not have live access to artifacts and attestations.
While these artifacts and attestations can be copied into the air-gapped deployment, there may be a lag leading to expired signatures or a failure of freshness checks.
To address this, air-gapped deployments may use a time in the past (such as when artifacts were copied) when making expiration and freshness checks.
Further, all verification should be done before artifacts are copied into the air-gapped environment, with an attestation that such verification occurred.
With this attestation, the verifier can ensure that the artifacts were valid at the time of ingestion.

##### Admission controller/deployment gate

All software supply chain metadata should be verified at the deployment gate, for example by a Kubernetes admission controller.
By performing verification at this stage, any mistakes or vulnerabilities in the software supply chain can be caught and addressed early in the process.
Verification at the deployment gate can supplement, but not replace verification at the end of the pipeline.
Further metadata may be generated or tampered with between the deployment gate and the end user, so verification must also be done by the end user.
The deployment gate verification allows for early detection.

### Automation

#### Use The Update Framework

TUF is a specification for securely delivering software artifacts by combining trust, compromise resilience, integrity, and freshness.
It is a graduated CNCF project and has been deployed in various contexts — PyPI, Datadog, Amazon Web Services for Bottlerocket, Notary, Google Fuchsia, and IBM cloud.
Several TUF implementations exist that can be leveraged by new adopters, including [RSTUF](https://repository-service-tuf.readthedocs.io/) and [tuf-on-ci](https://github.com/theupdateframework/tuf-on-ci).

TUF has also been used to bootstrap trust in delivering software supply chain metadata, specifically those pertaining to in-toto.
The Datadog model combines TUF and in-toto to provide
end-to-end guarantees to the consumer.
This model has been documented in a blog post and
two in-toto Enhancements (ITEs), ITE-2 and ITE-3.

#### Continuous vulnerability scanning

The state of an application’s dependencies is not static because vulnerabilities could be discovered after deployment.
SBOMs and VEX documents can help track which new vulnerabilities might affect the software.

### An Example Secure Supply Chain

Some Assumptions:

* There is a policy that defines who should do what inside the supply chain for an application

1. A developer commits code on their workstation.
2. Tools generate an attestation for that commit based on the developer’s identity.
3. Developer pushes the commit to a remote code repo.
4. A build is triggered based on the push.
5. The build runs pre-build linting, scanning, and other security steps.
6. Each step has a signed attestation generated with an identity tied to the instance of that step running.
7. The build runs any compilation, packaging, and SBOM generation steps.
8. Each step has a signed attestation generated with an identity tied to the instance of that step running.
9. The build runs any post-build scanning and security steps.
10. Each step has a signed attestation generated with an identity tied to the instance of that step running.
11. The build pushes the packaged artifact to a package repository.
12. The package repository verifies that the artifact has all required attestations to be published
13. A consumer which can be a human or an automated system like a deployment system ingests the attestations for the package and confirms with the package system that is what they’re downloading.
14. Once the package is downloaded the consumer verifies that what they received is what is in the attestations.
15. The consumer performs any other security related scans for their risk appetite for that artifact.

[^1]:  [Juniper Research Study Reveals Staggering Cost of Vulnerable Software Supply Chains](https://www.juniperresearch.com/press/study-reveals-staggering-cost-of-software-supply/), May 2023

[^2]:  [Verizon Data Breach Information Report](https://www.verizon.com/business/en-gb/resources/reports/dbir/), May 2024

[^3]:  IDE’s in the cloud are gaining popularity, so this might change in the future.

[^4]:  [CISA report](https://www.cisa.gov/news-events/news/4-things-you-can-do-keep-yourself-cyber-safe)

[^5]:  Direct dependencies are explicitly defined by a developer, but transitive dependencies are defined upstream and often not known to the developer.
For a deeper explanation see [Direct Dependencies vs.
Transitive Dependencies](https://fossa.com/blog/direct-dependencies-vs-transitive-dependencies/).

[image1]: <data:image/png;base64,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>
