# Security Hygiene Guide for Project Maintainers

> [!NOTE]
> This guide is under revision as part of [#1260](https://github.com/cncf/tag-security/issues/1260). It's contents are accurate, but are expected to be adapted or extended.

## Introduction

Tackling security requirements can be a daunting task, especially in the Cloud Native landscape. There are several resources available to assist the community in their security journey, such as the resources and publications by the CNCF Technical Advisory Group for Security, OpenSSF Best Practices Working Group, and many others.

Security Guidelines for New Projects aims to provide recommendations for new projects to ensure they follow the minimum measures to secure their projects and build incrementally as their maturity grows. These security guidelines can be grouped into the following categories:

1. Securing code repositories
2. Self assessment
3. SECURITY.md
4. Incident management
5. Badging

![](./SecurityGuidelines.png)

**Figure 1**. An overview of security guidelines for new projects

These guidelines are heavily influenced by the contributions of the CNCF Technical Advisory Group for Security, particularly the Cloud Native Security Whitepaper[[1]] and Software Supply Chain Security Best Practices Whitepaper[[2]] and the tooling for these guidelines can be referred to in the CNCF Cloud Native Security Map[[3]].

**Note**

This paper refers to GitHub as the source code management repository due to its popularity in the Open Source ecosystem, however the same guidelines are applicable to any other source code management service as well.

## Goals

This guide aims to outline the minimal security measures for sandbox or early maturity CNCF projects to ensure security measures are included as early as possible for the development and source code management of the project while increasing their awareness of resources to iteratively build secure practices as they enhance the maturity of the project.

## 1. Securing Code Repository

The foundation of a project is its source code and it is essential to ensure the integrity of the source code. Source code repositories such as GitHub allow contributions from numerous members from all across the world in a single repository which is a boon in itself, however if not leveraged securely, it can be a bane. The key to doing so is protecting the repository where the source code lies and introducing changes to the repository in a controlled and secure manner.

This section outlines several measures that can be taken to ensure authorized members have access to the code repository, changes are suggested, suggested changes are reviewed, and changes are introduced to the repository in a secure and controlled manner.

It should be noted that secure device management is assumed - if you have a remote access trojan on your laptop, many of these countermeasures are subverted.

## 1.1 Access management

### Enable Role Based Access Control (RBAC)

Define roles and associated access controls based upon the different personas interacting with the code repositories. The roles should be assigned following least privilege on a need-to know basis based on their assigned responsibilities. For example, GitHub provides roles such as Owner, Maintainer, Developer, Reviewer, Approver, and Guest. Each role should then be given fine-grained permissions with regards to repository access control.

### Strong Authentication mechanisms

Strong authentication mechanisms are key to ensure accounts are not susceptible to several attacks including but not limited to account takeover. We highly recommend the use of password-protected SSH keys or a personal access token (PAT).

However, for certain non-code intensive projects which specifically require accommodation that cannot be made possible using recommended methods (such as access to Github.com via browser), we recommend the use of unique and complex passwords (complexity in terms of a combination of alphanumeric, special characters as well as length). For details regarding configuring an authentication mechanism for GitHub, please refer to GitHub's documentation [GitHub Docs - About authentication to GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github).

### Two Factor Authentication/Multi-factor Authentication

Introducing an additional factor such as "something you have" or "somewhere you are" in the authentication process proves to be of higher effectiveness than relying on one factor "something you know" such as passwords. It is required to configure two factor or multi-factor authentication for your accounts, especially for any privileged accounts. For details regarding configuring a 2FA for GitHub, please refer to GitHub's documentation [GitHub Docs - Securing your account with two-factor authentication (2FA)](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa).

## 1.2 Branch protection

Branches in a source code repository provide a constrained area to develop features without affecting the other areas of the project. There will be certain branches which ought to be protected from unintended changes which impair code integrity. This is where branch protection helps.

Branch protection provides functionality that allows a policy based approach to protecting particular branches. Policies such as who can make changes to certain branches, whether push/force push are permitted, merges with/without certain checks are permitted, whether delete operations are permitted and so on should be reviewed and configured based on the requirements of the project. For details regarding configuring protected branches for GitHub, please refer to GitHub's documentation [GitHub Docs - About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches).

We recommend that any change to the repository should be introduced as part of a pull request and should go through a review process prior to merging. At least two individuals, of which one should have write access to the branch (preferably maintainers), and both of whom are independent of the request must review and approve the request and then the change is to be merged to the project. For projects with small teams where requiring two reviewers is not feasible, it is sufficient to require only a single reviewer. For projects that have a large codebase, the implementation of Code Owners (e.g. via GitHub CODEOWNERS file) is recommended to automatically request reviews to maintainers that are responsible for specific sub-modules or features. For details regarding pull request reviews for GitHub, please refer to GitHub's documentation [GitHub Docs - About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

## 1.3 Managing Contributions

### Issue template

Any ideas, bugs or enhancement suggestions reported to the project need to be tracked, and can then be discussed, triaged and prioritized/de-prioritized for implementation. GitHub Issues are one such avenue that allows tracking and managing ideas until they are brought to fruition. We recommend the following template for proposing changes to the project [CNCF TAG Security Project Resources - Issue Template](/project-resources/templates/ISSUE_TEMPLATE.md).

### Commit signing

Any code committed to the source code repository associated with the project is recommended to be signed to help ensure the integrity of the code and establish identity of the author(s). Git inspired SCMs like [Github](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits), [Gitlab](https://docs.gitlab.com/ee/user/project/repository/gpg_signed_commits/), and [Bitbucket](https://confluence.atlassian.com/bitbucketserver/using-gpg-keys-913477014.html) all provide different mechanisms to sign & enforce git commits.

As the security maturity increases, it is a recommended security practice to store the private signing keys on a hardware token (HSMs or YubiKeys) and the adoption of secure key distribution method(s) is encouraged.

### Secret scanning (recommended)

It is critical to ensure no sensitive information is exposed as part of the source code, the documentation or any configuration in the source code repository. It may sometimes accidentally escape even the vigilant eyes of the contributor and reviewers, hence we recommend automating this activity and implementing secret scanning as part of the continuous integration process in the source code repository.

There are several tools and projects aimed at providing secret scanning services, including but not limited to the ones mentioned in the section "Develop" of the Cloud Native Security Map[[3]]. GitHub also provides its own secret scanning service, you can find more details of this service at [GitHub Docs - Keeping secrets secure with secret scanning](https://docs.github.com/en/code-security/secret-scanning)

### Code scanning (recommended)

Code scanning is an automated security test to identify vulnerabilities and errors in the source code without actually compiling or executing the code. This is a key testing strategy to shift security testing left and we recommend configuring code scanning and utilizing its insights in your projects. There are several tools (both commercial and open source) available to perform the code scanning or an array of languages and technologies. GitHub also provides code scanning functionalities, which can be seen in their documentation - [GitHub Docs - Automatically scanning your code for vulnerabilities and errors](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors).

In addition to scanning your code for identifying vulnerabilities and errors, managing the vulnerabilities dependencies is also important. [Dependabot](https://github.com/dependabot) is one tool that helps in managing vulnerabilities in dependencies by automatically raising a pull request to update vulnerable versions to secure versions of that dependency. These pull requests can be then analyzed, and further action can be taken. Further details of Dependabot and configuring it in your project code repository can be found at [GitHub Docs - Automatically updating dependencies with known vulnerabilities with Dependabot security updates](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates).

For further information on securing the code repository, we recommend reviewing the **GitOps section** of the [CNCF Cloud Native Security Whitepaper](/security-whitepaper/v2/cloud-native-security-whitepaper.md#gitopsnew-in-v2) and the **Control Environments** sections of the [CNCF Software Supply Chain Best Practices paper](/supply-chain-security/supply-chain-security-paper/CNCF_SSCP_v1.pdf)

## 2. Self-assessment

CNCF Technical Advisory Group for Security states that the self-assessment is the initial document for projects to begin thinking about the security of their project, determining gaps in their security, and preparing any security documentation for their users.

A security self-assessment is a great start for a new project to think ahead about the security measures that are important for the project, and also to understand the gaps in the current implementation in a proactive manner, and plan for mitigating them.

Self-assessment dives into the following aspects of the project to understand the current maturity and the gaps in security implementation or the documentation aspects.

1. Background and overview of the project
2. Project architecture
3. Project metadata
4. Goals and Non-goals
5. Actors and Actions
6. Compliance and Regulatory requirements
7. Secure development practices
8. Resolving security issues

A template to perform the self assessment is available at [CNCF TAG Security Project Resources - Self-assessment](/community/assessments/guide/self-assessment.md). All the assessments (self-assessment and joint assessment) conducted by TAG Security can be found at TAG Security GitHub repository. As an example, self assessments are available within the dedicated project folders at [Assessments folder of the CNCF TAG Security GitHub repository](/community/assessments/projects). Further sections (SECURITY.md in particular) in this document provide some of the pointers to address the gaps and create the necessary process & documentation.

## 3. SECURITY.md

Awareness and processes are a big part of enforcing security in any project. A SECURITY.md file in your repository should talk about the security considerations of the project, and the efforts undertaken to ensure that there are policies and processes in place to report vulnerabilities to the project maintainers, and for project maintainers to notify the community of the status of the vulnerabilities. It should also list the dedicated personnel responsible to address these vulnerabilities in a timely manner. In GitHub, the SECURITY.md file creates a security policy, and when someone creates an issue in your repository, they will see a link to your project's security policy. Further information regarding security policy is available at [GitHub Docs - Adding a security policy to your repository](https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository).

CNCF Technical Advisory Group for Security maintains a number of templates to assist projects in addressing these sections, which can be found at [CNCF TAG Security GitHub repository, under Project resources folder](/project-resources). A special thank you to Google's OSS vulnerability guide folks for making the Security TAG aware of this collection of resources upon which much of this content was built on.

Disclaimer: These resources are designed to be helpful to projects and organizations, they require customization and configuration by the project intending to use them. It does not prevent security issues from being found in a project, will not automatically resolve them, and does not place CNCF Security TAG as the responsible party. If changes are made to these templates, projects are not required to pull in a new update.

## 3.1 Security considerations

This document is an outcome of the self-assessment which articulates all the measures taken in the project to tackle the security goals of the project, including but not limited to ensuring its confidentiality, integrity and availability - as well as compliance with any laws or regulations. This may also be the place for security bulletins and to list out the known vulnerabilities and patches available to mitigate them.

## 3.2 Security contacts

This document states who are the personnel to reach out to in case of any security questions regarding the project, including but not limited to the triaging and handling of incoming security issues or security reports. Security contacts could be external participants and are not limited to being the maintainers of the projects. A template for this document is available at [CNCF TAG Security Project resources - Security Contacts](/project-resources/templates/SECURITY_CONTACTS.md)

**NOTE**

CNCF could help create a mailing address (through service desk ticket) should projects need one to assist with managing their security reporting or reporting.

## 3.3 Report vulnerabilities

Vulnerabilities are sensitive information and exposure of information regarding vulnerabilities without the availability of a patch generates unintended risk for all the consumers of this project, hence it should be handled with caution.

At a minimum, the vulnerability reporting policy projects should include is as follows, A template for this document is available at [CNCF TAG Security Project resources - Reporting a Vulnerability](/project-resources/templates/SECURITY.md#reporting-a-vulnerability):

1. The medium to report vulnerabilities - Email, Web form etc.
2. Disclosure timeline
3. Point of contact or mailbox (if any)
4. Bug bounty programs (if any)

In addition to the vulnerability reporting policy, the defined process or co-ordinate the disclosure in a secure manner is highly recommended. There are several methods to accomplish this including encrypting vulnerability reports with GPG keys among others, and projects could leverage them based on their need.

GitHub provides an easy to use, established platform to coordinate the vulnerability disclosure between the maintainers and the reporter in a private manner. Further information on the coordinated disclosure of security vulnerabilities in Github is available at [GitHub Docs - About coordinated disclosure of security vulnerabilities](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/about-coordinated-disclosure-of-security-vulnerabilities).

## 3.4 Embargo Policy

The vulnerabilities reported to the project are then handled by the security point of contact(s) and the rest of the stakeholders of the project. It is important to define a policy the stakeholders need to abide by in order to restrict the unauthorized disclosure of vulnerabilities. An Embargo policy is created for this purpose and at a minimum it should include:

1. The stakeholders - security contacts, project maintainers and any others
2. What is covered under this policy
3. What is unacceptable or acceptable behavior
4. Medium to report violations of the policy (accidental or otherwise)
5. The consequences of any violations
6. Disclosure timeline

A template for this document is available at [CNCF TAG Security Project resources - Embargo Policy](/project-resources/templates/embargo-policy.md)

## 3.5 Security notifications

The vulnerabilities may need to be reported to certain stakeholders, and for this purpose, an embargo notification template can be utilized. The embargo notification at the minimum should include the information stated below:

1. Purpose of the notification
2. Summary of the notification
3. Vulnerability name along with Common Vulnerability Enumeration (CVE), if any
4. Affected versions of the project
5. Severity of the vulnerability
6. Proof of Concept
7. Mitigation or Remediation for the vulnerability along with the fixed versions
8. Timeline of events associated with this notification
9. Any additional information relevant for this notification

A template for this notification is available at [CNCF TAG Security Project resources - Embargo](/project-resources/templates/embargo.md)

## 4. Incident Response

Incident response defines the processes that aid in solving a security issue. This issue may be an internal finding or one that was reported by an external party, in which case it includes the processes between the vulnerability reporting and embargo notification.

Incidence response primarily states how the vulnerability is triaged, replicated, and notified. The incident response process should include the following at a minimum:

1. Identification of the security issue or an incident
  1. What are the affected components?
  2. What type of an issue is it?
  3. How complex is this issue?
  4. How severe is the impact?
  5. What use of interaction and privilege is needed?
  6. Is there an exploit available?
2. Acknowledge the receipt of this problem
3. How can the issue be reproduced or replicated?
  1. If a CVE is already present, request the CVE
4. Patch publication and Notification

In addition to the above, you could also consider adding relevant timelines, including but not limited to third party disclosure timelines. A template for the incident management process is available at [CNCF TAG Security Project resources - Incident Response](/project-resources/templates/incident-response.md)

## 5. OpenSSF best practices badging

The [Open Source Security Foundation (OpenSSF)](https://openssf.org/) Best Practices badge is a way for Free/Libre and Open Source Software (FLOSS) projects to show that they follow best practices[[5]]. This initiative allows projects to voluntarily self-certify, at no cost, by using their web application[[5]] to explain how they follow each best practice. These badges are a great way to showcase the efforts towards securing the project.

The criteria of best practices badging is defined at [Badging Criteria - BadgeApp](https://bestpractices.coreinfrastructure.org/en/criteria/0). We recommend that all projects obtain a best practices badge and that projects determine the desired badging level early in the development cycle and include it in the project milestones, to ensure efforts towards security as accounted for, managed and tracked. As adoption increases and the project becomes more critical, also consider increasing the badging level. As an example of defining this activity, you could consider passing a bronze/silver badging level prior to the "x" release of the project and aim to attain gold badging level within a defined timeframe.

## 6. OpenSSF Security Scorecards

The [OpenSSF Scorecards](https://securityscorecards.dev/) project helps quickly assess your project for risky practices. You can run the tool via the CLI manually or integrate it into your build [via a GitHub Action](https://securityscorecards.dev/#using-the-github-action). There are a variety of checks that are executed by default and the tool is even extensible to allow you to add your own checks. The CNCF highly recommends that projects enable this tool by default and it is integrated into CNCF onboarding tools such as [CLOMonitor](https://clomonitor.io/) or external tools such as deps.dev and more.

## References

1. [CNCF Cloud Native Security Whitepaper][1]
2. [CNCF Software Supply Chain Best Practices Whitepaper][2]
3. [CNCF Cloud Native Security Map][3]
4. [OpenSSF Badge program][4]
5. [CNCF TAG Security Publications][5]
6. [OpenSSF Scorecards][6]
7. [CLOMonitor][7]

## Contributors

- Ragashree M C
- Chris Aniszczyk

## Reviewers

- Andrew Martin (CNCF TAG Security Co-Chair)
- Brandon Lum (CNCF TAG Security Co-Chair)
- Emily Fox (CNCF TOC Security Liaison)
- Justin Cormack (CNCF TOC Security Liaison)
- Faisal Razzak
- Justin Cappos
- Marco De Benedictis
- Sergey Pronin
- Shlomo Zalman Heigh

## Acknowledgements

This paper is influenced by the publications of CNCF Technical Advisory Group for Security, particularly the Cloud Native Security Whitepaper[[1]] and Software Supply Chain Security Best Practices Whitepaper,[[2]] and CNCF Cloud Native Security Map[[3]], programs and initiatives by OpenSSF[[4]] [[6]]. Our sincere gratitude for the contributors of these programs and publications, and to Emily Fox for suggesting the creation of this paper, to the contributors and reviewers of this paper.

[1]: /security-whitepaper/v2/cloud-native-security-whitepaper.md
[2]: /supply-chain-security/supply-chain-security-paper/CNCF_SSCP_v1.pdf
[3]: https://cnsmap.github.io/
[4]: https://bestpractices.coreinfrastructure.org/en
[5]: /publications/README.md
[6]: https://securityscorecards.dev/
[7]: https://clomonitor.io/
