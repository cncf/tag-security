# CoreDNS Self-assessment

This assessment was created by community members as part of the [Security Pals](https://github.com/cncf/tag-security/issues/1102) process and is currently pending changes from the maintainer team.

This document evaluates the design goals for the CoreDNS CNCF project and provides a security assessment of its software. The authors of this document are Tom Zhang, Rohit Chaudhari, Maryam Mohagheghi,  and Vamshi Madineni.

## Table of contents

* [Metadata](#metadata)
  * [Documentation](#documentation)
  * [Security links](#security-links)
* [Overview](#overview)
  * [Actors](#actors)
  * [Actions](#actions)
  * [Background](#background)
  * [Goals](#goals)
  * [Non-goals](#non-goals)
* [Self-assessment use](#self-assessment-use)
* [Security functions and features](#security-functions-and-features)
* [Project compliance](#project-compliance)
* [Secure development practices](#secure-development-practices)
* [Security issue resolution](#security-issue-resolution)
* [Appendix](#appendix)

## Metadata

| Category | Data |
| -- | -- |
| Assessment Stage | Incomplete |
| Software | [CoreDNS](https://github.com/coredns/coredns) |
| Security Provider | No |
| Languages | Golang |
| SBOM | CoreDS does not generate an SBOM at build time |

### Documentation

| Document | UR |
| -- | -- |
| CoreDNS Manual | [Manual](https://coredns.io/manual/toc/) |
| CoreDNS Plugin Documentation | [Documentation](https://coredns.io/plugins/) |

### Security links

| Document | URL |
| -- | -- |
| CoreDNS Security Policy | [SECURITY.md](https://github.com/coredns/coredns/security) |
| Core53 Audit | [Report](https://coredns.io/assets/DNS-01-report.pdf) |
| Trail of Bits Audit | [Report](https://github.com/trailofbits/publications/blob/master/reviews/CoreDNS.pdf) |

## Overview

CoreDNS is a fast and flexible DNS server/forwarder, written in Go, that chains plugins to manage your DNS data and provide out-of-box functionality.

### Background

CoreDNS is a powerful and efficient DNS server/forwarder, written in Go, specifically designed for modern, dynamic, and containerized environments. Its plugin-based architecture provides flexibility and extensibility, enabling it to accommodate various communication protocols, including TCP, UDP, TLS, HTTP/2, QUIC, and gRPC.

CoreDNS was developed to address the limitations of traditional DNS solutions in cloud-native architectures, with a focus on simplicity, efficiency, and maintainability. The choice of the Go programming language reflects a commitment to balancing performance and readability. CoreDNS is firmly rooted in open-source principles, fostering an active and collaborative community dedicated to its continuous improvement.

CoreDNS's plugin-driven architecture empowers users to customize their DNS infrastructure to meet specific requirements, making it adaptable for a wide range of use cases, such as serving as a DNS server, forwarding DNS requests, or implementing advanced features. This adaptability positions CoreDNS as a critical component in cloud-native environments where dynamic service discovery and communication are essential.

### Actors

1. **CoreDNS Server** - Servers are run on startup, each defined by the zones and ports it serves. Each server contains a list of plugins and manages its own plugin chain that defines how a query is processed.
2. **CoreDNS Plugins** - Each plugin performs a DNS function, executing isolated custom behavior.

### Actions
1. Creates DNS servers to handle DNS queries and tasks for other services running in a network.
2. Integrates [plugins](https://coredns.io/plugins/) mainted by CoreDNS and [external plugins](https://coredns.io/explugins/) to provide additional functionality for DNS servers, e.g. 
    * The _health_ plugin can requested by a client to provide the health status of the server
    * The _dnssec_ plugin enables on-the-fly DNSSEC signing of zone data
    * The _loadbalance_ plugin adds a round-robin DNS load balancer by randomizing the order of A, AAAA, and MX records.
    * The _log_ plugin implements query logging to the standard output.
    * The _prometheus_ plugin enables collection and exports of operational metrics from the [Prometheus Go client](https://prometheus.io/docs/guides/go-application/).
3. Processes DNS queries sent by clients such as web browsers, terminal utilities, etc.
    * These queries can be sent over UDP, TCP, or gRPC.
    * DNS over HTTPS (DoH) or DNS over TLS (DoT) can also be used.
4. After a plugin chain processes a DNS query, CoreDNS sends an appropriate DNS reply back to the client.
5. Handles and process secrets such as private keys and credentials for the cloud services.

### Goals
* Primary Functionality
    * To serve as a flexible and efficient DNS server, especially in containerized environments like Kubernetes.
    * Provide robust service discovery functions in distributed systems.
* Security Guarantees
    * Ensure a high level of security, leveraging Go's memory-safe properties to prevent common vulnerabilities such as buffer overflows.
    * Implement secure DNS query options like DoT, DoH, and DoQ to protect against eavesdropping and tampering.
* Performance and Flexibility
    * Deliver high performance with a plugin-based architecture, allowing for custom extensions and optimizations.
    * Support a variety of backends (e.g., etcd, Kubernetes) for diverse deployment scenarios.
* Integration with Cloud and Container Environments
    * Seamless integration with cloud-native technologies, particularly Kubernetes, for effective service discovery in dynamic environments.
* User-Friendly Configuration
    * Offer a simple and intuitive configuration system (Corefile), making it accessible for users with varying levels of expertise.

### Non-goals
* Full Recursive DNS Capabilities
    * CoreDNS does not aim to support full recursion like traditional DNS servers (e.g., BIND), relying instead on forwarders for comprehensive domain resolution.
* Handling Non-Standard Protocols and Functions
    * CoreDNS is not designed to support non-standard or deprecated DNS protocols and functions that fall outside the common use cases in modern distributed systems.
* Unlimited Resource Utilization
    * The software does not aim to manage unlimited resource utilization, such as handling an arbitrary number of DNS requests without considering the underlying system's capacity.
* Automated Management of Security Vulnerabilities
    * While CoreDNS prioritizes security, it does not automatically manage all aspects of security vulnerabilities, requiring administrator intervention for updates and configuration changes.

## Self-assessment use

This self-assessment is created by the Security Pals effort from CNCF TAG-Security to perform an internal analysis of CoreDNS's security.  It is not intended to provide a security audit of CoreDNS, or function as an independent assessment or attestation of CoreDNS's security health.

This document serves to provide CoreDNS users with an initial understanding of CoreDNS's security, where to find existing security documentation, CoreDNS plans for security, and general overview of CoreDNS security practices, both for development of CoreDNS as well as security of CoreDNS.

This document provides the CNCF TAG-Security with an initial understanding of CoreDNS to assist in a joint-assessment, necessary for projects under incubation. Taken together, this document and the joint-assessment serve as a cornerstone for if and when CoreDNS is preparing for a security audit.

## Security functions and features

CoreDNS supports extensions and plug-ins to easily set up security mechanisms and enforce security policies. However, these mechanims must be manually configured by the server administrators to be effective.

**Security Components**
* Signing zone data files
    * If CoreDNS is run as a primary DNS server, mechanisms for signing zone data files must be manually configured using open source packages such as BIND 9 and OpenDNSSEC. By validating signed records with public key cryptography, CoreDNS is protected against threats that perform recursive cache poisoning.
* On-the-fly DNSSEC Signing
    * CoreDNS facilitates signing zone data "on-the-fly" through its `dnssec` plug-in. Zone data is signed with ZSK and KSK pairs, and the generated signatures are stored in the `dnssec` plug-in cache. The plug-in's cache capacity can be adjusted to limit the number of stored signatures.
* TLS Forwarding
    * With the `forward` plug-in, CoreDNS can encrypt sensitive, personal data (MAC address, IP address, organization identity, login credentials) using DNS over TLS to encrypt communication.
* Enforcing custom policies
    * CoreDNS enables policy enforcement via the `policy` plug-in. By adding custom rules, administrators can build a custom reference monitor that forwards valid requests for recursion and handles invalid requests with redirects or error responses.
   
## Project compliance

CoreDNS is not explicitly documented to meet the criteria of any security standards. While CoreDNS is designed with a security mindset - providing features such as policy enforcement, TLS encryption, and DNSSEC zone signing - it does not claim to comply with any known security standards such as PCI-DSS, COBIT, ISO, or GDPR.

## Secure development practices

**Development Pipeline**
* Commit Signing and Review Process: CoreDNS maintains a rigorous code review process to ensure the highest quality and security of the codebase. All contributors are required to sign their commits, establishing a verifiable chain of custody. Before merging, each pull request undergoes a thorough review by at least two CoreDNS maintainers, ensuring a double-check on the code's integrity and security.
* Automated Vulnerability Checks: CoreDNS integrates automated vulnerability scanning tools within its continuous integration pipeline. Tools such as GoSec are used to perform static code analysis, identifying common security issues in the Go codebase. These checks are performed on every commit to the master branch, ensuring immediate detection of potential security risks.
* Container Image Management: For CoreDNS deployments using containerization, all container images are treated as immutable and are digitally signed to prevent tampering. This ensures that the deployed CoreDNS instances are based on the verified and trusted codebase, enhancing overall security.
* Quality Assurance and Testing: CoreDNS employs a comprehensive testing strategy that includes unit tests, integration tests, and end-to-end tests. These tests are automated and are run on various environments to ensure robustness and compatibility. The testing process is an integral part of the development cycle, ensuring that each release meets the highest standards of quality and security.

**Communication Channels**
* Internal Team Communication: The CoreDNS team utilizes secure and encrypted communication channels for internal discussions, including email and messaging platforms with end-to-end encryption. This ensures that sensitive information, such as security vulnerabilities and patches, remains confidential within the team.
* Inbound Communication: Users and prospective users can reach the CoreDNS team primarily through the GitHub issue tracker. This platform facilitates transparent and efficient communication regarding bugs, feature requests, and security concerns. For more direct communication, a dedicated email address (security@coredns.io) is provided for reporting security vulnerabilities.
* Outbound Communication: CoreDNS communicates updates, announcements, and security advisories through multiple channels, including the [CoreDNS blog](https://coredns.io/blog/), Twitter (@corednsio), and a dedicated mailing list (coredns-distributors-announce@lists.cncf.io). These channels ensure timely and broad dissemination of important information to the user community.

**Ecosystem Integration**
* Cloud Native Ecosystem Role: As a CNCF graduated project, CoreDNS plays a critical role in the cloud-native ecosystem, particularly in environments managed by Kubernetes. It seamlessly integrates with Kubernetes, providing DNS-based service discovery which is crucial for microservices architecture.
* Impact of CoreDNS in Cloud Environments: In cloud environments, CoreDNS enhances service discovery and network configuration, thereby underpinning many cloud-based applications' functionality. Its lightweight, modular architecture makes it a preferred choice in containerized environments, thus amplifying its impact across the cloud-native ecosystem.

**Compliance and Standards**
* Adherence to Security Standards: CoreDNS adheres to industry-standard security practices and coding guidelines. This includes following the recommendations for secure coding in Go and regularly updating dependencies to mitigate vulnerabilities.
* Third-Party Audits and Assessments: CoreDNS has undergone security audits by reputable third parties like Cure53 and Trail of Bits. These audits have significantly contributed to the project's security posture by identifying and addressing potential vulnerabilities.
Conclusion
* Ongoing Improvements: CoreDNS is committed to continuously improving its security practices. The team actively seeks feedback from the community and collaborates with security experts to stay ahead of emerging threats.
*Feedback Mechanism: The CoreDNS team (security@coredns.io) welcomes feedback on its security practices and this self-assessment document. Community members are encouraged to contribute their insights via GitHub discussions or the project's mailing list.

## Security issue resolution
The Product Security Team (PST) is responsible for organizing the entire response including internal communication and external disclosure.

### Disclosures:
* Private Disclosure: The discovery of security vulnerabilities or any security related issues should **NOT** be mentioned in a public issue. Instead, it should be reported privately to [security@coredns.io](security@coredns.io). The report should contain:
  * Description of the location and potential impact of the vulnerability
  * A detailed description of the steps required to reproduce the vulnerability (POC scripts, screenshots, compressed packet captures, etc)
  * Any other information that can help to identify the source of this vulnerability.
* Public Disclosure: For a publicly disclosed security vulnerability **IMMEDIATELY** email [security@coredns.io](security@coredns.io) to inform the Product Security Team (PST) about the vulnerability. PST might ask the issue to be handled via a private disclosure process (for example if the full exploit details have not yet been published). If the reporter denies the request for private disclosure, the PST will move swiftly with the fix and release process.

### Patch, Release, and Public Communication:
For each vulnerability, a member of the PST will volunteer to lead coordination with the "Fix Team" and is responsible for sending disclosure emails to the rest of the community. This lead is referred to as the "Fix Lead."

All of the timelines below are estimates and assume a Private Disclosure. If the Team is dealing with a Public Disclosure, all timelines become ASAP. If the fix relies on another upstream project's disclosure timeline, that will adjust the process as well. The team will work with the upstream project to fit their timeline.
* Fix Team Organization (within the first 24 hours of disclosure):
  * The Fix Lead will work quickly to identify relevant engineers from the affected projects and packages and CC those engineers into the disclosure thread. These selected developers are the Fix Team.
  * The Fix Lead will get the Fix Team access to private security repos to develop the fix.
* Fix Development Process (within the 1-7 days of Disclosure):
  * The Fix Lead and the Fix Team will create a [CVSS](https://www.first.org/cvss/specification-document) using the [CVSS Calculator](https://www.first.org/cvss/calculator/3.0). The Fix Lead makes the final call on the calculated CVSS. 
  * The Fix Team will notify the Fix Lead that work on the fix branch is complete once there are LGTMs on all commits in the private repo from one or more maintainers.
  * If the CVSS score is under 4.0 ([a low severity score](https://www.first.org/cvss/specification-document#i5)) the Fix Team can decide to slow the release process down in the face of holidays, developer bandwidth, etc.
* Disclosure of Forthcoming Fix to Users (within 1-7 days of Disclosure):
  * The Fix Lead will create a Github issue in the CoreDNS project to inform users that a security vulnerability has been disclosed and that a fix will be made available, with an estimation of the Release Date. 
  * It will include any mitigating steps users can take until a fix is available.
* Optional Fix Disclosure to Private Distributors List (within 1-14 days of Disclosure):
  * The Fix Lead will make a determination with the help of the Fix Team if an issue is critical enough to require early disclosure to distributors.
  * The Fix Lead will email the patches to [coredns-distributors-announce@lists.cncf.io](coredns-distributors-announce@lists.cncf.io) so distributors can prepare their own release to be available to users on the day of the issue's announcement.
*  Fix Release Day (within 1-21 days of Disclosure):
   *  The Fix Team will selectively choose all needed commits from the Master branch in order to create a new release on top of the current/last version released.
   *  The release process will be as usual.
   *  The Fix Lead will request a CVE from [DWF](https://github.com/distributedweaknessfiling/cvelist) and include the CVSS and release details.
   *  The Fix Lead will inform all users, devs, and integrators, about the new releases, the CVE number, and the relevant merged PRs to get wide distribution and user action.

## Appendix

### Past Vulnerabilities

#### CVE-2023-20014
- [NVD Link](https://nvd.nist.gov/vuln/detail/CVE-2023-20014)
  - **Description:** A vulnerability in the DNS functionality of Cisco Nexus Dashboard Software could allow an unauthenticated, remote attacker to cause a denial of service (DoS) condition.
  - **Published Date:** March 01, 2023; 3:15:11 AM -0500
  - **Impact:** Remote attackers could exploit this vulnerability to disrupt DNS functionality, causing a denial of service for legitimate users.

#### CVE-2022-2837
- [NVD Link](https://nvd.nist.gov/vuln/detail/CVE-2022-2837)
  - **Description:** A flaw in CoreDNS allows a malicious user to redirect traffic intended for external top-level domains (TLD) to a pod they control by creating projects and namespaces that match the TLD.
  - **Published Date:** March 03, 2023; 11:15:09 AM -0500
  - **Impact:** Malicious actors could manipulate DNS responses, redirecting traffic to unauthorized destinations.

#### CVE-2022-2835
- [NVD Link](https://nvd.nist.gov/vuln/detail/CVE-2022-2835)
  - **Description:** Another flaw in CoreDNS allows a malicious user to reroute internal calls to some internal services that were accessed by the FQDN in a format of `<service>.<namespace>.svc`.
  - **Published Date:** March 03, 2023; 11:15:09 AM -0500
  - **Impact:** This vulnerability enables attackers to manipulate internal service calls, potentially leading to unauthorized access or information disclosure.

#### CVE-2019-19794
- [NVD Link](https://nvd.nist.gov/vuln/detail/CVE-2019-19794)
  - **Description:** The miekg Go DNS package, as used in CoreDNS, improperly generates random numbers, leading to predictable transaction IDs (TXID) and response forgeries.
  - **Published Date:** December 13, 2019; 5:15:11 PM -0500
  - **Impact:** Predictable TXIDs allow attackers to forge DNS responses, leading to potential DNS cache poisoning or man-in-the-middle attacks.

### CII Best Practices

[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/1250/badge)](https://www.bestpractices.dev/projects/1250)

Coredns currently holds a [passing level badge](https://www.bestpractices.dev/en/projects/1250) for its adherence to CII best practices. However, to achieve the silver badge, several key areas need attention:

- Enhanced documentation encompassing comprehensive guidelines for contributors and detailed reference documentation outlining the external interface of the software.
- Release notes for each release summarizing major changes and addressing any publicly known vulnerabilities.
- Clear articulation of the process for reporting vulnerabilities, emphasizing confidentiality.

Moreover, Coredns should work on:

- Expanding its automated test suite to cover a broader range of code branches, input fields, and functionalities.
- Implementing stricter code quality checks, involving the use of more compiler warning flags, safer language modes, or dedicated linter tools.
- Securing development expertise, requiring at least one primary developer with a strong understanding of secure software design principles.
- Strict adherence to cryptographic best practices, including the use of publicly reviewed cryptographic algorithms and avoiding custom cryptography.

By addressing these areas, Coredns can demonstrate a heightened commitment to security best practices and ultimately attain the silver badge level.

### Real-World Use Cases

1. **Infoblox’s BloxOne Threat Defense:**
   - CoreDNS is used in both the client and cloud components of BloxOne Threat Defense.
   - CoreDNS's plug-in architecture allows Infoblox to extend the functionality of CoreDNS to meet their specific needs.
   - CoreDNS in the BloxOne Threat Defense cloud serves as both the main component of the client and an integral part of the cloud solution.

2. **Kubernetes Service Discovery:**
   - CoreDNS functions as the default DNS server in Kubernetes clusters, enabling smooth service discovery within the cluster.
   - It dynamically translates service names into corresponding pod IP addresses, facilitating communication between containers.

3. **Edge DNS Resolution:**
   - CoreDNS has the capability to serve as an edge DNS resolver, delivering authoritative responses for domain names within its jurisdiction.
   - Additionally, it can forward queries to upstream DNS servers for domains outside its management.

4. **Content Delivery Networks (CDNs):**
   - Integration with CDNs allows CoreDNS to optimize DNS-based traffic routing and load balancing for content delivery.
   - It can intelligently redirect queries to specific CDN nodes based on factors such as user location, enhancing overall performance.

### Comparisons

- **CoreDNS vs. BIND:**
  - CoreDNS is a lightweight, modular, and highly configurable option suitable for contemporary infrastructure and containerized environments.
  - BIND is a traditional and robust DNS server widely employed for both authoritative and recursive DNS resolution.

- **CoreDNS vs. Unbound:**
  - CoreDNS stands out for its flexibility and extensibility, supporting a broader range of plugins and configurations.
  - Unbound emphasizes privacy and security, offering features like DNSSEC validation and support for DNS over TLS (DoT) and DNS over HTTPS (DoH).

- **CoreDNS vs. dnsmasq:**
  - CoreDNS is purpose-built for high-performance and scalability, making it an excellent choice for large-scale deployments.
  - Dnsmasq is a lightweight and easily configurable option, best suited for small networks or embedded devices.
  - Each DNS server serves distinct purposes, catering to varying requirements in terms of performance, scalability, and security.


