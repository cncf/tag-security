# **Dragonfly TAG-Security Security Assessment**

Completed: 29 01 2025
Security reviewers: *Marina Moore @mnm678, Rahul Jadhav @nyrahul, Justin Cappos @JustinCappos*
Project security lead: Gaius @gaius-qi
Project team: *list name and github handle as appropriate*

* Source code: [*https://github.com/dragonflyoss/dragonfly*](https://github.com/dragonflyoss/Dragonfly2)
* Web site: [https://d7y.io/](https://d7y.io/)

## **Background**

Dragonfly 1.0.0 has been open source since November 2017 and used in production environments by adopters. For details, refer to [https://github.com/dragonflyoss/dragonfly/blob/main/ADOPTERS.md](https://github.com/dragonflyoss/dragonfly/blob/main/ADOPTERS.md). It joined the CNCF as a sandbox project in October 2018\. In April 2020, The CNCF TOC (Technical Oversight Committee) voted to accept Dragonfly as an Incubating Project. In April 2021, Dragonfly 2.0 was released after architectural optimization and code refactoring.

Dragonfly provides efficient, stable and secure file distribution and image acceleration based on P2P technology, the goal is to be the best practice and standard solution in cloud native architectures. It is designed to improve the efficiency and speed of large-scale file distribution and used in the fields of file distribution, AI model distribution, cache distribution, log distribution and image distribution.

### **Maturity**

*Use cases, integrations, etc. bulleted, should be available in the joint assessment.*

**Target Users:**

1. End User/Developer: Owners and teams that need simple and secure data transfer and sharing solutions. It reduces the traffic to the origin by serving content from other peer nodes in the cloud.
2. Enterprise: Has large-scale Kubernetes clusters and needs to accelerate image distribution. Supports various container clients such as containerd, Docker, CRI-O, ORAS, etc. It also distributes the large file or large AI model in large-scale cluster.

## **Summary**

The project provides a well-thought out architecture for efficient file distribution. However it is brittle in that compromises of different components are not well compartmentalized.   More analysis about the impact of different attack cases would also be welcome.   A plan for minimizing the security risk of components should be more evident in the project.

## **Recommendations**

*refer to the existing readmes for other projects, such as [SPIFFE/SPIRE](https://github.com/cncf/tag-security/blob/main/community/assessments/projects/spiffe-spire) as a guide for developing this area*

### **CNCF recommendations**

* We’d like to see the project have a follow up audit at some point.     
* We’d recommend that the project be provided with resources to improve the threat modeling and architectural design aspects.   This should help the project’s security as a whole.

### **Project recommendations**

* The project seems to overly trust different components in its architecture.   It would be helpful to do things like ensure non-repudiation via signing many types of data that are sent.   For instance, the secure hashes about which content to retrieve are only protected with transport layer security.   If something goes wrong and a client has incorrect hash information, it is not possible to tell where the issue occurred without signed metadata from the manager.   (Note that this is an isolated example of a more general problem we hope would be on the project’s roadmap.)  
* Some components could use additional hardening: many individual components were found vulnerable in the security audit. Even beyond fixing those vulnerabilities, this seems like a good area of focus for improving the project security.  
* Certain k8s security best practices could be followed. The rationale for not following it is not clear. For e.g., why would certain hostPaths need to be mounted? Or why does privilege escalation need to be enabled by default?  
* There should be explicit justification for the use of http instead of https. Given the low overhead for TLS, what is the need for supporting http?   When should users use HTTP?   What recommendations do you make around this?   For example, if you use HTTP, should you still use basic access authentication?  
* Resistance / impact of network attacks like SMURF attacks, DoS, pollution attacks, etc. aren’t well described in the system.   I would think this should be a major focus so adopters can understand how this changes their risk profile.  
* Failure modes around filling the disk, slow retrieval, etc. need to be much better described as well so users can know what to expect.   This can crash clients in unexpected ways or cause them to hang.   How do you ensure that your adopters are aware of this risk and are mitigating the impact?  
  * Addressed in [https://github.com/dragonflyoss/client/pull/953](https://github.com/dragonflyoss/client/pull/953)  
* From a codebase standpoint, what sort of risks do different components have?   You’re using a lot of libraries to do different crypto / network operations that are fairly complex.   Is this likely to cause issues when zero days emerge in these libraries?   What are you doing to harden this?   (This is difficult and lower priority to fix, but should be a consideration when considering adding features.)  
* It would be helpful for the project to utilize OpenSSF Scorecard as that does objective assessment of the security best practices of the project in a continuous/periodic way.  
  * Addressed in [https://github.com/dragonflyoss/dragonfly/pull/3788](https://github.com/dragonflyoss/dragonfly/pull/3788)  
* From a codebase licensing standpoint, the project may address license issues flagged by FOSSA scans  
  * Addressed in [https://github.com/dragonflyoss/dragonfly/pull/3789](https://github.com/dragonflyoss/dragonfly/pull/3789)  
* The project may consider implementing audit logging for security-sensitive actions (e.g. creation of PAT tokens or update of permissions for existing tokens) with clear traceability of the logged in user responsible for the activity


Tracking issue: [*https://github.com/cncf/tag-security/issues/1327*](https://github.com/cncf/tag-security/issues/1327)   
