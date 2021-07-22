<!--- 
Copyright 2021 CNCF TAG-Security
Licensed under the Creative Common Attribution 4.0 International License
SPDX-License-Identifier: CC-BY-4.0
--->

Shared with CNCF Community

# **Cloud Native Security Lexicon**

| **Originating Content and Review** |                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Contributors**                   | <!-- cspell:disable -->[Adam Morris](mailto:adam.morris@couchbase.com), <!-- cspell:disable -->[Alex Floyd Marshall](mailto:alex@soren.tech), <!-- cspell:disable -->Andreas, <!-- cspell:disable -->[Aradhna Chetal](mailto:aradhna.chetal@gmail.com), <!-- cspell:disable -->[Brad McCoy](mailto:bradmccoydev@gmail.com), <!-- cspell:disable -->[Emily Fox](mailto:themoxiefoxatwork@gmail.com), <!-- cspell:disable -->[Martin Vrachev](mailto:martin.vrachev@gmail.com), <!-- cspell:disable -->Matthew Flannery, <!-- cspell:disable -->[Pushkar Joglekar](mailto:pushkarj.at.work@gmail.com), <!-- cspell:disable -->[Ragashree M C](mailto:ragashreemc@gmail.com), <!-- cspell:disable -->Roger Klorese |
| **Reviewers**                      | <!-- cspell:disable -->[Aradhna Chetal](mailto:aradhna.chetal@gmail.com), <!-- cspell:disable -->[Emily Fox](mailto:themoxiefoxatwork@gmail.com), <!-- cspell:disable -->[Ragashree M C](mailto:ragashreeshekar@gmail.com)                                                                                                                                                                                                                                                                                          |
| **Approvers**                      | Justin Cormack, Liz Rice                                                                                                                                                                                                                                                                                                                                                                    |

## Index

<ul>
    <li>
        <a href="#cloud-native-security-lexicon-1">Cloud Native Security Lexicon</a>
    </li>
    <li>
        <a href="#executive-summary">Executive Summary</a>
    </li>
    <li>
        <a href="#purpose">Purpose</a>
    </li>
    <li>
        <a href="#lexicon">Lexicon</a>
        <ul>
            <li><a href="#identity">Identity</a></li>
            <li><a href="#user-identity">User Identity</a></li>
            <li><a href="#service-identity">Service Identity</a></li>
            <li><a href="#secrets">Secrets</a></li>
            <li><a href="#keys">Keys</a></li>
            <li><a href="#api-key">API Key</a></li>
            <li><a href="#credentials">Credentials</a></li>
            <li><a href="#claim">Claim</a></li>
            <li><a href="#token">Token </a></li>
            <li><a href="#root-of-trust">Root of Trust</a></li>                
            <li><a href="#certificates">Certificates</a></li>
            <li><a href="#certificate-authority">Certificate authority</a></li>
            <li><a href="#certificate-root-of-trust">Certificate root of trust</a></li>                
            <li><a href="#attack-surface">Attack Surface</a></li>
            <li><a href="#attack-vector">Attack vector</a></li>
            <li><a href="#threat-vulnerability-exploit">Threat, vs vulnerability vs exploit</a></li>
            <li><a href="#security-requirements">Security Requirements</a></li>
            <li><a href="#configuration-management-orchestrator">Configuration management vs orchestrator</a></li>
            <li><a href="#vulnerability-scanning">Vulnerability Scanning</a></li>
            <li><a href="#container-image-scanning">Container/Image Scanning </a></li>
            <li><a href="#infrastructure-as-code-security">Infrastructure-as-Code Security</a></li>
            <li><a href="#software-composition-analysis">Software Composition Analysis</a></li>
            <!-- cspell:disable --> <li><a href="#sast">Static Analysis Security Testing (SAST)</a></li>
            <!-- cspell:disable --> <li><a href="#dast">Dynamic Analysis Security Testing (DAST)</a></li>
            <!-- cspell:disable --> <li><a href="#iast">Interactive Analysis Security Testing (IAST) </a></li>
            <li><a href="#authentication-authorization-access-control">Authentication vs. Authorization vs. Access control</a></li>
            <li><a href="#cryptographic-signing-encrypting-verifying-validating">Cryptographic signing vs. Encrypting vs. Verifying/Validating</a></li>
            <li><a href="#hardware-root-of-trust">Hardware Root of Trust</a></li>
            <li><a href="#tpm">Trusted Platform Module (TPM/vTPM)</a></li>
            <li><a href="#hsm">Hardware Security Module </a></li>
            <li><a href="#hsm-tpm">HSM vs TPM</a></li>
            <li><a href="#key-management-store">Key Management Store</a></li>
            <li><a href="#mutual-authentication">Mutual Authentication</a></li>
            <!-- cspell:disable --> <li><a href="#abac-rbac-mac">ABAC, RBAC, and MAC</a></li>
            <li><a href="#least-privilege">Least Privilege</a></li>
            <li><a href="#immutability">Immutability</a></li>
            <li><a href="#audit-logging-security-logging-monitoring">Audit logging vs security logging vs monitoring</a></li>
            <li><a href="#compliance-security">Compliance and Security</a></li>
            <li><a href="#non-repudiation">Non-Repudiation</a></li>
            <li><a href="#runtime-compliance-rasp">Runtime compliance or Runtime Application self-protection (RASP)</a></li>
            <li><a href="#shift-security-left">Shift Security Left</a></li>
            <li><a href="#security-policy-code">Security Policy as Code</a></li>
        </ul>
    </li>
    <li>
        <a href="#acknowledgements">Acknowledgements</a>
    </li>
</ul>

# Cloud Native Security Lexicon

# Executive Summary

Cloud Native Ecosystem is growing, the number of cloud native projects is huge. Many of the cloud native projects perform multiple functions. Many Security terminologies are rather overused, used as Catch-all umbrella terms, or incorrectly presented. This paper aims to ensure all community members have the same terms & definitions as well as an understanding of where they fit in their software development lifecycle and beyond.

# Purpose

Standardization of terminologies specific to Cloud Native Security to bring about clarity to Cloud native security practitioners, Developers, and Operators regarding the right set of security terminologies to be used in the right context throughout the <!-- cspell:disable -->SDLC as well as their operational environments

# Lexicon

<table style="width:100%">
<tr>
	<th colspan="2" id="identity">Identity</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Any document, file, or string that serves to establish what the holder or bearer is. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> User identity, service identity, device Identity,  identity document, identity management, access management </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://csrc.nist.gov/glossary/term/identity  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="user-identity">User Identity</th>
</tr>
<tr>
        <th >Definition</th>
        <td>  A user identity is an identity that represents a person to establish who the bearer or holder is.  A person may have multiple identities depending on the trust domains and systems they may access or may have a single identity and attributes associated with the identity that allow it to be federated across domains and systems.<br/><br/> User identity is fundamental to organizational access management by allowing association of roles, attributes, entitlements, and privileges of individual network and system human users and the circumstances in which human users are granted (or denied) those privileges. Those users might be customers (customer identity management) or employees (employee identity management). The core objective of Identity and Access Management (IAM) systems is to stop impersonation attacks by using strong authentication. Once a digital identity has been established and attested, it must be maintained, modified, and monitored throughout each user’s “access lifecycle.” </td>
</tr>
<tr>
        <th >Terms</th>
        <td></td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> The overarching goal of identity management is to establish and verify the identity granted to intended persons, hosts, and services in order to successfully facilitate authentication and authorization of those identities to protected assets. </td>
</tr>
<tr>
        <th >References</th>
        <td> https://csrc.nist.gov/glossary/term/user_id  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="service-identity">Service Identity</th>
</tr>
<tr>
        <th >Definition</th>
        <td> A service identity is used to distinguish a non-person entity for a variety of purposes. The identity document presented used to verify the identity of the bearer or holder.  A non-person entity must have a fully attested unique identity within zero trust architectures that can be linked with additional attributes for making policy-based authorization decisions. <br/> Service identities and their corresponding identifiers* should not be overloaded with authorization value data that can become obsolete over the lifespan of the identity.  Attributes and entitlements used for making authorization determinations for permissions or access should be stored outside of the service identifier and made on-demand in real time.<br/>* Identifiers may be a unique string contained within an identity document which serves as the “name” of the identity </td>
</tr>
<tr>
        <th >Terms</th>
        <td> identity document </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> The overarching goal of identity management is to establish and verify the identity granted to intended persons, hosts, and services in order to successfully facilitate authentication and authorization of those identities to protected assets. </td>
</tr>
<tr>
        <th >References</th>
        <td> https://iam.harvard.edu/glossary  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="secrets">Secrets</th>
</tr>
<tr>
        <th >Definition</th>
        <td> A Secret is an object that contains sensitive data such as a password, token, or private key. Users can create Secrets and the system also creates some Secrets. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> Secret, secrets manager, secret rotation, secrets management, secret revocation </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> A secret manager is used for storing configuration information such as database passwords, API keys, or TLS certificates needed by an application at runtime. </td>
</tr>
<tr>
        <th >References</th>
        <td> https://kubernetes.io/docs/concepts/configuration/secret/ </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="keys">Keys</th>
</tr>
<tr>
        <th >Definition</th>
        <td> A key in cryptography is a string of random bits used in conjunction with a cryptographic algorithm to control operations such as encryption, decryption, signature generation, or signature verification. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> key, ssh key, gpg key, key manager, key management, key rotation, key revocation </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> A key management system allows you to manage cryptographic keys and to use them to encrypt or decrypt data. </td>
</tr>
<tr>
        <th >References</th>
        <td> https://csrc.nist.gov/glossary/term/cryptographic_key  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="api-key">API Key</th>
</tr>
<tr>
        <th >Definition</th>
        <td> An API key or application programming interface key is a code that gets passed in by computer applications. The program or application then calls the API or application programming interface to identify its user, developer or calling program to a website. <br/><br/>Application programming keys are normally used to assist in tracking and controlling how the interface is being utilized. Often, it does this to prevent abuse or malicious use of the API in question. <br/><br/> An API key is a unique identifier; however, it can act as a secret authentication token (not recommended). Typically, the key contains signed data for the server so it cannot be forged. It may come with a set of access rights for the API that it is associated with. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> API keys are used to authenticate and potentially authorize people, hosts, or services to APIs. </td>
</tr>
<tr>
        <th >References</th>
        <td>
        <ul>
    <li> https://rapidapi.com/blog/api-glossary/api-key/</li>
    <li>https://www.fortinet.com/resources/cyberglossary/authentication-token </li>
</ul></td>
</table>

<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="credentials">Credentials </th>
</tr>
<tr>
        <th >Definition</th>
        <td> A credential is a piece of any document that details a qualification, attribute, authority, or entitlement issued to an entity (human or non-human) by a third party to achieve access or provide proof.  Credentials may be tokens, identities, keys, secrets, attributes, or entitlements. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> Access credential, service credential, user credential </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> Information systems commonly use credentials to control access to information or other resources. An increasing number of information systems use other forms of documentation of credentials, such as biometrics (fingerprints, voice recognition, retinal scans), X.509, public key certificates, and so on. </td>
</tr>
<tr>
        <th >References</th>
        <td> https://en.wikipedia.org/wiki/Credential  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="claim">Claim</th>
</tr>
<tr>
        <th >Definition</th>
        <td> A statement a subject asserts about itself or another subject. Commonly appearing as a name/value pair, claims must be validated during authentication and authorization. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> Reserved Claims, Custom Claims, claims-based identity
        </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> Claims can be used for a variety of checks that may further scope access or define the valid time span an identity is valid. </td>
</tr>
<tr>
        <th >References</th>
        <td> https://docs.microsoft.com/en-us/sharepoint/dev/general-development/claims-based-identity-term-definitions   </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="token">Token</th>
</tr>
<tr>
        <th >Definition</th>
        <td> A token is a string generated to grant access, provide proof of identity, or request access. Tokens can also be used as a means of representing claims to be transferred between two parties. Identity Token is a signed artifact and possibly encrypted, which provides Identity & security assertion issued by the authoritative trusted identity & credential management service, consumed by a service provider to authenticate, and then provide access subsequently. Tokens can be of different formats viz. SAML, OAuth2.0, JWT, <!-- cspell:disable -->XACML tokens etc. etc. <br/> <br/> These Identity Tokens must be signed and encrypted hereby providing authenticity, Integrity & non-repudiation assurance and confidentiality as well. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> 
        <ul>
            <li>
            Access tokens carry the information required  to access a resource. When a client passes an access token to a server managing a resource, that server uses the information contained in the access token to decide whether the client is authorized to access the resource. Access tokens usually have an expiration date and are short-lived.
            </li>
            <li>
            Refresh tokens contain attributes and information needed to get a new access token, whenever an access token is required to access a specific resource, a client service may use a refresh token to get a new access token issued by the authentication server. Main use case is getting new access tokens after the old one has expired or getting access to a new resource for the first time. Refresh tokens can also expire but are relatively  long-lived. Refresh tokens improve security and allow for reduced latency and better access method to authorization servers
            </li>
            <li>
            API Tokens- Token-based authentication is important for securing APIs. These tokens are validated for Identity of the service or application trying to access another service, also can be validated at API Gateways. Tokens allow detailed claims, credentials, and context to be embedded in them and thus more fine-grained access control than just service name/Passwd. These API tokens can be Time based(limited) tokens.
            </li>
            <li>
            Bearer Token
            </li>
            <li>
            Web Token
            </li>
        </ul>
        </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> Tokens are used to make security decisions and to store tamper-proof information about some system entity. </td>
</tr>
<tr>
        <th >References</th>
        <td>https://tools.ietf.org/html/rfc7519 </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="root-of-trust">Root of Trust</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Root of Trust (RoT) is a set of functions in the trusted computing module that is always trusted by the computer’s operating system (OS). The RoT serves as a separate compute engine controlling the trusted computing platform cryptographic processor on the PC or mobile device it is embedded in.
            <br/><br/>
            Roots of trust are highly reliable hardware, firmware, and software components that perform specific, critical security functions. Because roots of trust are inherently trusted, they must be secure by design. As such, many roots of trust are implemented in hardware so that malware cannot tamper with the functions they provide.  (Reference- NIST). Roots of trust provide a firm foundation from which to build security and trust. Ideally Hardware based RoT is most desirable but vTPM’s and their use is also accepted. (Ref NIST SP 800-190 )
            <br/><br/>
            The RoT provides the functionality behind trusted computing features including
            <br/>
            <ul>
                <li>On the fly drive encryption.</li>
                <li>Detection and reporting of unauthorized changes to the operating system or programs.</li>
                <li>Detection of rootkits.</li>
                <li>Memory curtaining to prevent programs from inappropriately reading from or writing to another program's memory.</li>
                <li>Hardware-based digital rights management (DRM) support.</li>
            </ul>
            </td>
</tr>
<tr>
        <th >Terms</th>
        <td> Hardware root of trust, certificate root of trust </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://whatis.techtarget.com/definition/Roots-of-Trust-RoT   </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="certificates">Certificates</th>
</tr>
<tr>
        <th >Definition</th>
        <td> An electronic credential (file, object, data blob and so on) containing data used to encrypt or decrypt data, provide proof of identity, provide non-repudiation, digital signature (verify authenticity of digital documents), and/or bind a set of keys to an identity. It should be noted that certificates may also contain identity information. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> SSL Certificate, TLS Certificate, Client Certificate, Server Certificate, SSH Certificate </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://csrc.nist.gov/glossary/term/certificate  </td>
</table>
<br />
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="certificate-authority">Certificate authority </th>
</tr>
<tr>
        <th >Definition</th>
        <td> In cryptography, a certificate authority or certification authority (CA) is an entity that issues digital certificates. A digital certificate certifies the ownership of a public key by the named subject of the certificate. This allows others (relying parties) to rely upon signatures or on assertions made about the private key that corresponds to the certified public key. A CA acts as a trusted third party—trusted both by the subject (owner) of the certificate and by the party relying upon the certificate. The format of these certificates is specified by the X.509 or EMV standard.
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> CA </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> One particularly common use for certificate authorities is to sign certificates used in HTTPS, the secure browsing protocol for the World Wide Web. Another common use is in issuing identity cards by national governments for use in electronically signing documents. </td>
</tr>
<tr>
        <th >References</th>
        <td> https://en.wikipedia.org/wiki/Certificate_authority   </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="certificate-root-of-trust">Certificate root of trust</th>
</tr>
<tr>
        <th >Definition</th>
        <td> 
        The SSL/TLS internet security standard is based on a trust relationship model, also called "certificate chain of trust." x.509 digital certificates validate the identity of a website, organization, or server and provide a trusty platform for the user to connect and share information securely.
            <br/><br/>
            SSL/TLS Internet-based Public Key Infrastructure (PKI) allows users to exchange data using public and private key pairs, obtained, and exchanged by a trusted certificate authority (CA). This reputable entity is responsible for issuing, retaining, and revoking public key certificates over insecure networks.
            <br/><br/>
            When you visit a website via a secure connection, the site sends a digital certificate to your browser. Your Internet browser compares the issuer with a list of trusted Certificate Authorities (Root CA). If a match can’t be found, the client browser checks to see whether a trusted Root CA signs the issuing CA certificate. The browser's chaining engine continues verifying the issuer of each certificate until it finds a trusted root or upon reaching the end of the trust chain.
             </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://blog.keyfactor.com/certificate-chain-of-trust  </td>
</table>
<br/>
<br />
<table style="width:100%">
    <tr>
        <th colspan="2" id="attack-surface">Attack Surface</th>
    </tr>
    <tr>
        <th >Definition</th>
        <td> The collection of all exposed points in a software system which may be targeted by a malicious actor. In
            general, this means any point of data transference (e.g. APIs) throughout the system, which provides either
            <ol>
                <li>an ingress through which malicious data may be inserted to manipulate system processes or </li>
                <li>an egress through which data may be extracted without authorization. The attack surface can include
                    both public/externally exposed points of transference (for example, a public API) and internal or
                    private ones (which may be available to an actor who has gained a foothold in the system).</li>
            </ol>
            System architecture should seek to make the attack surface as secure as possible through least privilege,
            defense-in-depth/security layering, and zero trust design so that there are fewer elements of the system
            available for malicious actors to try to exploit.
            <br /> <br /> NOTE: Ingress is the path for incoming communication and Egress is the outgoing path for
            communication.
        </td>
    </tr>
    <tr>
        <th >Terms</th>
        <td> null </td>
    </tr>
    <tr>
        <th >Organizational Use</th>
        <td> null </td>
    </tr>
    <tr>
        <th >References</th>
        <td> https://csrc.nist.gov/glossary/term/attack_surface </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="attack-vector">Attack vector</th>
</tr>
<tr>
        <th >Definition</th>
        <td> In cyber security, an attack vector is a method or pathway used by a hacker to access or penetrate the target system. Hackers steal information, data and money from people and organizations by investigating known attack vectors and attempting to exploit vulnerabilities to gain access to the desired system. Once a hacker gains access to an organization's IT infrastructure, they can install a malicious code that allows them to remotely control IT infrastructure, spy on the organization or steal data or other resources.        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> An attack vector is the path that a hacker takes to exploit cybersecurity vulnerabilities. Whereas an attack surface is all of the public and privately exposed nexus points of your company's data and human or software interaction.
        </td>
</tr>
<tr>
        <th >References</th>
        <td> https://www.sumologic.com/glossary/attack-vector/  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="threat-vulnerability-exploit">Threat, vs vulnerability vs exploit</th>
</tr>
<tr>
        <th >Definition</th>
        <td> <ul>
            <li>
                Vulnerability - A Vulnerability is a weakness, flaw, or error found within a system, network, or application that has the potential to be leveraged by a threat agent in order to compromise an individual or an organization.
            </li>
            <li>
                Threat - In computer security, a threat is a potential negative action or event facilitated by a vulnerability that results in an unwanted impact to a computer system or application.<br/><br/> A threat can be either a negative "intentional" event (i.e. hacking: an individual cracker or a criminal organization) or an "accidental" negative event (e.g. the possibility of a computer malfunctioning, or the possibility of a natural disaster event such as an earthquake, a fire, or a tornado) or otherwise a circumstance, capability, action, or event. <br/><br/>A threat agent is an entity that may act out a threat.
            </li>
            <li>
                An exploit is code that takes advantage of a vulnerability or security flaw. It is written either by security researchers as a proof-of-concept threat or by malicious actors for use in their operations. When used, exploits allow an intruder to access the target (network, hardware devices and so on) and gain elevated privileges, or move deeper into the target environment.<br/><br/>In some cases, an exploit can be used as part of a multi-component attack. Instead of using a malicious file, the exploit may instead drop another malware, which can include backdoor Trojans and spyware that can steal user information from the infected systems.
            </li>
        </ul> </td>
</tr>
<tr>
        <th >Terms</th>
        <td> 
            <ul>
                <li>Vulnerability scanning, Vulnerability analysis, Zero-day vulnerability, vulnerability database</li>
                <li>Threat vectors, Threat landscape, Threat actor</li>
                <li>Known exploits, Zero-day exploits, Exploit Kits</li>
            </ul> 
        </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> Vulnerabilities and threats are used to assist organizations in defining their risk tolerance. It enables them to apply mitigating and compensating mechanisms to reduce, transfer, or accept the risk presented by a threat or vulnerability. </td>
</tr>
<tr>
        <th >References</th>
        <td> 
            <ul>
                <li>https://www.rapid7.com/fundamentals/vulnerabilities-exploits-threats</li>
                <li>https://en.wikipedia.org/wiki/Threat_(computer)</li>
                <li>https://www.trendmicro.com/vinfo/us/security/definition/exploit</li>
            </ul>
        </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="security-requirements">Security Requirements</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Statements describing the expectations for a software system pertains to the core security concerns of confidentiality, integrity, and availability. Security requirements may be determined by compliance regimes (for example, HIPAA or GDPR) and are generally established early in the development process alongside the general “functional” requirements for the software system.
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://www.bmc.com/blogs/cia-security-triad/  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="configuration-management-orchestrator">Configuration management vs orchestrator     </th>
</tr>
<tr>
        <th >Definition</th>
        <td> <ul>
            <li>Configuration Management: Configuration management is a process for maintaining computer systems, servers, and software in a desired, consistent state. It’s a way to make sure that a system performs as expected when changes are made over time.</li>
            <li>Orchestration: An automated series of processes to configure, coordinate, or manage computer systems, data, or software:</li>
        </ul> </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> <ul>
            <li>Configuration Management: Configuration management keeps you from making small or large changes that go undocumented. These misconfigurations can lead to poor performance, inconsistencies, or noncompliance and negatively impact business operations and security. When undocumented changes are made across many systems and applications, it adds to instability and downtime.
</li>
            <li>
                Orchestration: A successful cloud strategy requires orchestration of on-demand provisioning processes and coordination of cloud resources.
                </li>
        </ul> </td>
</tr>
<tr>
        <th >References</th>
        <td> <ul>
            <li>https://www.redhat.com/en/topics/automation/what-is-configuration-management </li>
            <li>https://www.dictionary.com/browse/orchestration </li>
        </ul>  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="vulnerability-scanning">Vulnerability Scanning</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Vulnerability scanning is a security technique used to identify known security weaknesses. Vulnerability scanning can be used by individuals, teams, or administrators for security purposes, or it can be used by hackers attempting to gain unauthorized access to computer systems. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> vulnerability scanner
        </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> Types of vulnerability scanners include:
            <ul>
                <li>Port Scanner: Probes a server or host for open ports</li>
                <li>Network Enumerator: A computer program used to retrieve information about users and groups on networked computers</li>
                <li>Network Vulnerability Scanner: A system that proactively scans for network vulnerabilities</li>
                <li>Web Application Security Scanner: A program that communicates with a Web application to find potential vulnerabilities within the application or its architecture</li>
                <li>Dependency Scanner: a source code integration that scans dependencies for known vulnerabilities</li>
            </ul>
             </td>
</tr>
<tr>
        <th >References</th>
        <td> https://www.techopedia.com/definition/4160/vulnerability-scanning   </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="container-image-scanning">Container/Image Scanning    </th>
</tr>
<tr>
        <th >Definition</th>
        <td> Container/Image Scanning is the process of analyzing the container or image components and the build process in order to detect security vulnerabilities or bad practices. This usually involves tools utilizing vulnerability databases containing known vulnerabilities (CVE-s) to give information about the security posture of the container/image.
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> Container image analysis </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> <ul>
            <li>https://csrc.nist.gov/glossary/term/container </li>
            <li>https://csrc.nist.gov/glossary/term/scanning </li>
        </ul> </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="infrastructure-as-code-security">Infrastructure-as-Code Security</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Infrastructure as Code (IaC) security is the discipline of ensuring that security controls, policies and best practices are built into the IaC declarative scripts. These policies could be as granular as possible including access controls, network isolation/communication policies, data security viz encryption of data, access to keys, detective controls as well as auto-remediation. The Goal of IaC is to achieve an immutable infrastructure (no interactive logins and so on), so no manual changes are allowed as all controls are programmatically enforced. This reduces the risk of manual misconfigurations/human error and also reduces the risk of accidental exposure to malware from an end user’s device. There should also be detection in place along the build and deployment pipeline such that if any of these policies in code are violated or changed appropriate actions are taken to analyse and remediate, in some cases preventing the deployment. All of these security policies can be configured manually as well but that makes manageability in cloud and cloud native infrastructure a huge nightmare.
             </td>
</tr>
<tr>
        <th >Terms</th>
        <td> IaC scanning, IaC hardening </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://snyk.io/learn/infrastructure-as-code-iac/  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="software-composition-analysis">Software Composition Analysis</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Software composition analysis (SCA) is an automated process that identifies the open source software in a codebase. This analysis is performed to evaluate security, license compliance, and code quality </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://www.synopsys.com/glossary/what-is-software-composition-analysis.html  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="<!-- cspell:disable -->sast">Static Analysis Security Testing (<!-- cspell:disable -->SAST)</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Static application security testing (<!-- cspell:disable -->SAST), or static analysis, is a testing methodology that analyses source code to find security vulnerabilities that make your organization’s applications susceptible to attack. SAST scans an application before the code is compiled and doesn’t require a working application. It’s also known as white box testing.
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td>  secure coding, static analysis, source code analysis
        </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://www.synopsys.com/glossary/what-is-sast.html   </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="<!-- cspell:disable -->dast">Dynamic Analysis Security Testing (<!-- cspell:disable -->DAST)</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Dynamic application security testing (<!-- cspell:disable -->DAST) is a type of security testing in which tests are performed by attacking an application from the outside. It looks for security vulnerabilities by simulating external attacks on an application while the application is running. Unlike static application security testing tools, DAST tools do not have access or need access to the source code. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> Runtime application scanning, Black box testing </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://csrc.nist.gov/glossary/term/dynamic_analysis  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="<!-- cspell:disable -->iast">Interactive Analysis Security Testing (<!-- cspell:disable -->IAST)
    </th>
</tr>
<tr>
        <th >Definition</th>
        <td> <!-- cspell:disable -->IAST (interactive application security testing) analyses code for security vulnerabilities while the app is run by an automated test, human tester, or any activity “interacting” with the application functionality. This technology reports vulnerabilities in real-time.
            <br/><br/> <!-- cspell:disable -->IAST works inside the application, which makes it different from both static analysis (<!-- cspell:disable -->SAST) and dynamic analysis (<!-- cspell:disable -->DAST). This type of testing also doesn’t test the entire application or codebase, but only whatever is exercised by the functional test
             </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://www.veracode.com/security/interactive-application-security-testing-iast  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="authentication-authorization-access-control">Authentication vs. Authorization vs. Access control</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Authentication is the first step of the process. Its aim is simple – to make sure the identity is who they say they are. 
            <br/><br/>Access control is the addition of environment constraints (such as originating IP address, namespace and so on) which can also include extra authentication steps to further protect important segments. Once the identity proves they are who they say they are, access is granted. 
            <br/><br/>Authorization defines the set of actions that the identity can perform after gaining access to a specific part of the infrastructure, protecting from threats that access controls alone are ineffective against.
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://csrc.nist.gov/glossary/term/aaa  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="cryptographic-signing-encrypting-verifying-validating">Cryptographic signing vs. Encrypting vs. Verifying/Validating    </th>
</tr>
<tr>
        <th >Definition</th>
        <td> Cryptographic Signing is the process of adding a “signature” to the metadata of an artefact (which may be a piece of software, a text file, an email message, a git commit, etc) to attach that artefact to a known identity (the developer who coded it, the sender, etc). A signature provides assurance that the artefact has not been tampered with by including a hash of the artefact. A sender will sign the artefact with their private key, and the signature can be decoded using their public key. This allows recipients to regenerate the hash of the artefact and compare it to the one included in the signature. Since the signature cannot be reproduced without the sender’s private signing key, an attacker should not be able to modify the hash included in the signature. Therefore, any modifications to the artefact itself will be detected because of a hash mismatch.
        <br/><br/>
        Verification/Validation is the process of decoding a signed artefact and comparing the signed hash against an independently generated hash to ensure that the artefact has not been modified. It is the inverse process to “signing” - a sender signs the artefact, the recipient verifies/validates it.
        <br/><br/>
        Encryption is the process of encoding an artefact using the combination of an algorithm and secret encryption key(s). An example of a simple algorithm is a “character replacement” in which each letter of the alphabet is “swapped” with its inverse (so that A becomes Z, B becomes Y, etc). A much more complex algorithm (for example, AES) combined with secret encryption key(s) providing the “seed” for character transformation can be used to make it extremely difficult to recover the original plaintext from an encrypted message. Encryption may be done “symmetrically,” in which both sender and receiver use the same key to encode and decode the message, or “asymmetrically,” in which two different, complimentary keys are used (one for encoding and the other for decoding). Asymmetric encryption is generally more resource intensive than symmetric encryption. Its most common use is actually providing a mechanism for the exchange of symmetric keys between two systems. For example, in an HTTPS request to a website, asymmetric encryption is used to protect the “handshake” by which the server and client exchange a private symmetric key which is then used to encrypt traffic for the remainder of the session.
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td><ul>
            <li>https://csrc.nist.gov/glossary/term/signature_verification </li>
            <li>https://csrc.nist.gov/glossary/term/verification </li>
            <li>https://csrc.nist.gov/glossary/term/encryption</li>
        </ul>   </td>
</table>
<br/>

<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="hardware-root-of-trust">Hardware Root of Trust</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Roots of trust are highly reliable hardware, firmware, and software components that perform specific, critical security functions. Because roots of trust are inherently trusted, they must be secure by design. As such, many roots of trust are implemented in hardware so that malware cannot tamper with the functions they provide.  (Reference- NIST). Roots of trust provide a firm foundation from which to build security and trust.
            <br/><br/>
            A hardware Root of Trust can be defined by the four basic building blocks:
            <br/>
            <ol>
                <li>The protective hardware provides a trusted execution environment (TEE) for the privileged software to run.</li>
                <li>At a minimum, it must perform one or more proven cryptographic functions like AES based.</li>
                <li>A form of tamper protection must be present and available for the entire runtime.</li>
                <li>A flexible, yet simple user interface that the host can interact with, through either the host CPU and/or a host controller toggling GPIOs.</li>
            </ol>
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://csrc.nist.gov/glossary/term/roots_of_trust  </td>
</table>
<br />
<br />
<table style="width:100%">
    <tr>
        <th colspan="2" id="tpm">Trusted Platform Module (TPM/vTPM)</th>
    </tr>
    <tr>
        <th >Definition</th>
        <td>
            TPM: Trusted Platform Module (TPM, also known as ISO/IEC 11889) is an international standard for a secure
            <!-- cspell:disable -->cryptoprocessor, a dedicated <!-- cspell:disable -->microcontroller designed to secure hardware through integrated cryptographic
            keys.
            <br /><br />
            Trusted Platform Module provides <br />
            <ol>
                <li>A hardware random number generator[5][6]</li>
                <li>Facilities for the secure generation of cryptographic keys for limited uses.</li>
                <li>Remote attestation: Creates a nearly <!-- cspell:disable -->unforgeable hash key summary of the hardware and software
                    configuration. The software in charge of hashing the configuration data determines the extent of the
                    summary. This allows a third party to verify that the software has not been changed.</li>
                <li>Binding: Encrypts data using the TPM bind key, a unique RSA key descended from a storage
                    key[clarification needed].[7]</li>
                <li>Sealing: Similar to binding, but in addition, specifies the TPM state[8] for the data to be
                    decrypted (unsealed).[9]</li>
                <li>Other Trusted Computing functions for the data to be decrypted (unsealed).[10]</li>
            </ol>
            vTPM: A vTPM, or “virtual Trusted Platform Module 2.0”, performs the same functions as a physical TPM 2.0
            device, but it performs cryptographic coprocessor capabilities in software.
        </td>
    </tr>
    <tr>
        <th >Terms</th>
        <td> null </td>
    </tr>
    <tr>
        <th >Organizational Use</th>
        <td> null </td>
    </tr>
    <tr>
        <th >References</th>
        <td>
            <ul>
                <li>https://en.wikipedia.org/wiki/Trusted_Platform_Module
                </li>
                <li>https://csrc.nist.gov/glossary/term/trusted_platform_module</li>
                <li>
                    https://blogs.vmware.com/vsphere/2018/05/vsphere-6-7-virtual-trusted-platform-modules.html
                </li>
            </ul>
        </td>
</table>

<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="hsm">Hardware Security Module    </th>
</tr>
<tr>
        <th >Definition</th>
        <td> A hardware security module (HSM) is a physical computing device that safeguards and manages digital keys, performs encryption and decryption functions for digital signatures, strong authentication, and other cryptographic functions. These modules traditionally come in the form of a plug-in card or an external device that attaches directly to a computer or network server. A hardware security module contains one or more secure cryptoprocessor chips. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> A hardware security module can be employed in any application that uses digital keys. Typically, the keys would be of high value - meaning there would be a significant, negative impact to the owner of the key if it were compromised.
            <br/><br/>The functions of an HSM are:<br/>
            <ol>
                <li>onboard secure cryptographic key generation</li>
                <li>onboard secure cryptographic key storage, at least for the top level and most sensitive keys, which are often called master keys</li>
                <li>key management</li>
                <li>use of cryptographic and sensitive data material, for example, performing encryption or digital signature functions</li>
                <li>offloading application servers for complete asymmetric and symmetric cryptography.</li>
            </ol>
        </td>
</tr>
<tr>
        <th >References</th>
        <td> https://csrc.nist.gov/glossary/term/hardware_security_module_hsm  </td>
</table>
<br />
<br />
<table style="width:100%">
    <tr>
        <th colspan="2" id="hsm-tpm">HSM vs TPM</th>
    </tr>
    <tr>
        <th >Definition</th>
        <td> A Trusted Platform Module (TPM) is a hardware chip on the computer’s motherboard that stores cryptographic
            keys used for encryption. Many laptop computers include a TPM, but if the system doesn’t include it, it is
            not feasible to add one. Once enabled, the Trusted Platform Module provides full disk encryption
            capabilities. It keeps hard drives locked, or sealed, until the system completes a system verification or
            authentication process.
            <br /><br />
            The TPM includes a unique RSA key burned into it, which is used for asymmetric encryption. Additionally, it
            can generate, store, and protect other keys used in the encryption and decryption process.
            <br /><br />
            A hardware security module (HSM) is a security device you can add to a system to manage, generate, and
            securely store cryptographic keys.
            <br /><br />
            High performance HSMs are external devices connected to a network using <!-- cspell:disable -->TCP/IP. Smaller HSMs come as
            expansion cards you install within a server, or as devices you plug into computer ports. Recommendation is
            to use HSM’s which are <!-- cspell:disable -->FIPS 140-2 compliant.
            <br /><br />
            One of the noteworthy differences between the two is that HSMs are removable or external devices. In
            comparison, a TPM is a chip embedded into the motherboard. You can easily add an HSM to a system or a
            network, but if a system didn’t ship with a <!-- cspell:disable -->TPM, it’s not feasible to add one later. Both provide secure
            encryption capabilities by storing and using RSA keys.
        </td>
    </tr>
    <tr>
        <th >Terms</th>
        <td> null </td>
    </tr>
    <tr>
        <th >Organizational Use</th>
        <td> null </td>
    </tr>
    <tr>
        <th >References</th>
        <td> https://blogs.getcertifiedgetahead.com/tpm-hsm-hardware-encryption-devices/ </td>
</table>
<br/>

<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="key-management-store">Key Management Store    </th>
</tr>
<tr>
        <th >Definition</th>
        <td> A key management store is a system or application used to securely store and retrieve cryptographic keys. In some cases, key management stores also provide secrets management services to store both keys and sensitive secrets.
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> A key management store enables organizations to securely store and retrieve keys. It reduces the likelihood of key compromise on hosts.
        </td>
</tr>
<tr>
        <th >References</th>
        <td> https://csrc.nist.gov/glossary/term/key_management_system  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="mutual-authentication">Mutual Authentication</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Mutual authentication, also known as two-way authentication, is a security process in which entities authenticate each other before actual communication occurs. In a network environment, this requires that both the client and the server must provide digital certificates to prove their identities. In a mutual authentication process, a connection can occur only if the client and the server exchange, verify, and trust each other’s certificates. The certificate exchange occurs by means of the Transport Layer Security (TLS) protocol. The core of this process is to make sure that clients communicate with legitimate servers, and servers cooperate only with clients who attempt access for legitimate purposes. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://learn.akamai.com/en-us/webhelp/iot/internet-of-things-over-the-air-user-guide/GUID-21EC6B74-28C8-4CE1-980E-D5EE57AD9653.html   </td>
</table>
<br />
<br />
<table style="width:100%">
    <tr>
        <!-- cspell:disable --><th colspan="2" id="abac-rbac-mac"><!-- cspell:disable -->ABAC, <!-- cspell:disable -->RBAC, and <!-- cspell:disable -->MAC</th>
    </tr>
    <tr>
        <th >Definition</th>
        <td>
            <ul>
                <li><!-- cspell:disable -->RBAC: Role-based access control (<!-- cspell:disable -->RBAC) is a method of regulating access to computer or network
                    resources based on the roles of individual users within your organization. The users are grouped
                    into Roles based on their access needs and after the authentication process the user granted access
                    to services based on the role assigned e.g. a user may be in the role of end user then they may be
                    only be able to access the application and read the data relevant to their access, whereas on the
                    same system a <!-- cspell:disable -->DBA maybe able to go read, write, and update data as well. The roles have to be defined
                    by the application owner that align to the specific needs of the organization.
                </li>
                <li>
                    <!-- cspell:disable -->ABAC: Attribute-based access control (<!-- cspell:disable -->ABAC) defines an access control paradigm whereby access rights
                    are granted to users Access to entities (devices, users, applications) is granted dynamically based
                    on the attributes. Depending on the dynamic attributes a decision engine makes a decision based on
                    predefined policies which are based on the attributes and the decision is then communicated to the
                    policy enforcement point to enforce, grant, or block access or in some cases ask for step up or
                    provide additional attributes to make the access decision.
                    <br /> <br />
                    E.g. If a user is on a corporate laptop and is on a corporate network then those attributes provide
                    them access to certain assets, whereas the same user on the same device logged in from a public Wi-Fi
                    network and a different location could block access depending on the policies established by the
                    enterprise.
                </li>
                <li>
                MAC: In computer security, mandatory access control (MAC) refers to a type of access control by
                    which the operating system or database constrains the ability of a subject or initiator to access or
                    generally, perform some sort of operation on an object or target.
                    <br /> <br />
                    With mandatory access control, security policy is centrally controlled by a security policy
                    administrator: users do not have the ability to override the policy and, for example, grant access
                    to files that would otherwise be restricted. By contrast, discretionary access control (DAC), which
                    also governs the ability of subjects to access objects, allows users the ability to make policy
                    decisions and/or assign security attributes. (The traditional Unix system of users, groups, and
                    read-write-execute permissions is an example of DAC.) MAC-enabled systems allow policy
                    administrators to implement organization-wide security policies. Under MAC (and unlike DAC), users
                    cannot override or modify this policy, either accidentally or intentionally. This allows security
                    administrators to define a central policy that is guaranteed (in principle) to be enforced for all
                    users.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th >Terms</th>
        <td> null </td>
    </tr>
    <tr>
        <th >Organizational Use</th>
        <td> null </td>
    </tr>
    <tr>
        <th >References</th>
        <td>
            <ul>
                <li>
                    https://kubernetes.io/docs/reference/access-authn-authz/rbac/
                </li>
                <li>https://kubernetes.io/docs/reference/access-authn-authz/abac/ </li>
                <li>https://en.wikipedia.org/wiki/Mandatory_access_control</li>
            </ul>
        </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="least-privilege">Least Privilege    </th>
</tr>
<tr>
        <th >Definition</th>
        <td> Least privilege is the concept of only allowing the minimal amount of access necessary to perform a given function for the shortest duration possible, revoking permissions as necessary.  Least privilege may be executed through short-lived credentials, narrowly scoped permissions, RBAC, and several other fine-granularity controls.  Least privilege often requires multiple layers of explicit permissions that may be granted as functions require and only for expected duration of the function execution. It is designed to prevent and reduce the likelihood that an attacker could gain enough privileges to move vertically or laterally through a given host, container, network, or environment. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> Rootless, just-in-time access,  </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> <ul>
            <li>https://us-cert.cisa.gov/bsi/articles/knowledge/principles/least-privilege </li>
            <li>https://rootlesscontaine.rs   </li>
            <li>https://developers.redhat.com/blog/2020/09/25/rootless-containers-with-podman-the-basics#why_rootless_containers_ </li>
        </ul>  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="immutability">Immutability </th>
</tr>
<tr>
        <th >Definition</th>
        <td> Immutable means that a container, infrastructure, image, host, etc. won't be modified during its life: no updates, no patches, no configuration changes. If it must be updated (as is expected to sustain secure posture), then it must be rebuilt and redeployed. Immutability makes deployments predictable, repeatable, and safe. If you need to roll back, you simply redeploy the old image. This approach allows you to deploy the same object to every environment, making them as identical and reducing the potential or likelihood of drift.
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://cloud.google.com/architecture/best-practices-for-operating-containers#ensure_that_your_containers_are_stateless_and_immutable   </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="audit-logging-security-logging-monitoring">Audit logging vs security logging vs monitoring </th>
</tr>
<tr>
        <th >Definition</th>
        <td> 
            <ul>
                <li>
                    Audit logging - An audit log, also called an audit trail, is essentially a record of events and changes. IT devices across your network create logs based on events. Audit logs are records of these event logs, typically regarding a sequence of activities or a specific activity. The process of collection of these logs, processing, storage, and management of these logs is known as Audit logging
                </li>
                <li>
                    Monitoring involves collecting and analysing information (Logs, Metrics and so on) to detect any deviation from the default <!-- cspell:disable -->behaviour and defining which types of <!-- cspell:disable -->behaviour should trigger alerts, and taking action on alerts as needed
                </li>
                <li>
                    A security log is essentially a subset of the audit logs, which records the events and changes important from the security point of view, such as intrusion detection logging, firewall logs, <!-- cspell:disable -->anti-spyware logs, access attempts, privilege escalation, etc. The process of collection of these logs, processing, storage, and management of these logs is known as Security logging. Typically, security logs are forwarded to the Security Incident and Event management for the visibility, tracking and managing security incidents. <!-- cspell:disable -->SIEM provides organizations with next-generation detection, analytics, and response
                </li>
            </ul>
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> Monitoring, Log monitoring, Metrics monitoring, Security monitoring, Security event monitoring, Security information monitoring </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://www.dnsstuff.com/what-is-audit-log</td>
</table>

<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="compliance-security">Compliance and Security</th>
</tr>
<tr>
        <th >Definition</th>
        <td>
        Compliance from the standpoint of IT security means making sure your business meets the regulatory and legal requirements for the data or intended use that are applicable to your industry or vertical. For example, there are differing IT security compliance standards for payment card processors (PCI), healthcare organizations (HIPAA) and firms doing business in the EU (GDPR). By achieving compliance, you can avoid fines and sanctions, as well as avoid the financial and <!-- cspell:disable -->reputational damage associated with data breaches.
            <br/><br/>
            Violations of certain regulatory compliance requirements may result in legal punishment, including federal fines. E.g. PCI compliance, HIPAA, SOX, GDPR etc. Some of these regulations are put in place to protect the consumers, hence service providers are required to demonstrate compliance with the appropriate requirements on a continuous basis and non-compliances can lead to heavy fines. 
            <br/><br/>
            Security is the whole unique system of policies, processes and technical controls that define how your organization stores, processes, consumes and distributes data so that it’s effectively and verifiably protected from cyber threats. This will include protective, detective and response controls, including building security resilience which means if an attack was to manifest, how to thwart it and minimize the effect of the same to the business.
            <br/><br/>
            A compliant system is not always secure.  A secure system is more likely to be compliant.  Security and Compliance complement each other.
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> One way to look at it is that compliance and security are equally important, but for different reasons. Compliance drivers are legal/regulatory, while security drivers relate to business risk (and, increasingly, business competitiveness). Security and compliance have similar goals around securing sensitive data by managing risk. Both security and compliance deal with controls to reduce risk. A team charged with information security responsibilities might not focus on specific compliance requirements (e.g., documentation or policies) that relate to information security, but these are key business requirements that must be met. </td>
</tr>
<tr>
        <th >References</th>
        <td> https://www.pivotpointsecurity.com/blog/compliance-vs-security/   </td>
</table>
<br />
<br />
<table style="width:100%">
    <tr>
        <th colspan="2" id="non-repudiation">Non-Repudiation</th>
    </tr>
    <tr>
        <th >Definition</th>
        <td> Non-Repudiation is the property of agreeing to adhere to an obligation. More specifically, it is the
            inability to refute responsibility. For example, if you take a pen and sign a (legal) contract, your
            signature is a non-repudiation device. You cannot later disagree to the terms of the contract or refute ever
            taking part in the agreement.
        </td>
    </tr>
    <tr>
        <th >Terms</th>
        <td> null </td>
    </tr>
    <tr>
        <th >Organizational Use</th>
        <td> null </td>
    </tr>
    <tr>
        <th >References</th>
        <td>
            <ul>
                <li>
                    https://www.sciencedirect.com/topics/computer-science/nonrepudiation
                </li>
                <li>
                    https://owasp.org/www-community/attacks/Repudiation_Attack
                </li>
            </ul>
        </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="runtime-compliance-rasp">Runtime compliance or Runtime Application self-protection (RASP)    </th>
</tr>
<tr>
        <th >Definition</th>
        <td> 
            RASP is a technology that runs on a server which is designed to detect attacks on an application in real time. RASP incorporates security into a running application wherever it resides on a server.
            <br/><br/>
            When an application begins to run, RASP can protect it from malicious input or <!-- cspell:disable -->behaviour by analysing both the app's <!-- cspell:disable -->behaviour and the context of that <!-- cspell:disable -->behaviour. By using the app to continuously monitor its own <!-- cspell:disable -->behaviour, attacks can be identified and mitigated immediately without human intervention.
        </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> Compliance in runtime environment, dynamic application security
        </td>
</tr>
<tr>
        <th >References</th>
        <td> https://techbeacon.com/security/what-runtime-application-self-protection-rasp   </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="shift-security-left">Shift Security Left    </th>
</tr>
<tr>
        <th >Definition</th>
        <td> Imagine a flow chart showing a software development process, moving from the “requirements” stage on the very far left to the “production deployment” stage on the very far right. Historically, security considerations have often been implemented as part of a “review” stage closer to the right edge of this flow chart. “Shift Security Left” is a shorthand expression for changing this. By expanding security considerations into earlier (more leftward) stages of the flow chart, including establishing “security requirements” in the earliest stages and engaging in security architecture, engineering, and development practices throughout the development process organizations may reduce cost-to-remediate, and time-to-remediate. It also eliminates the challenges of relegating all of “security” to a review stage near project completion or eliminates bolted-on security in favour of integrated security </td>
</tr>
<tr>
        <th >Terms</th>
        <td> DevOps, DevSecOps, Shift Left, secure development        </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> null </td>
</tr>
<tr>
        <th >References</th>
        <td> https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.04232020.pdf  </td>
</table>
<br/>
<br/>
<table style="width:100%">
<tr>
	<th colspan="2" id="security-policy-code">Security Policy as Code</th>
</tr>
<tr>
        <th >Definition</th>
        <td> Security policies are rules and procedures that protect our systems from threats and disruption. For example, access control policies define and enforce who can access which services and resources under what circumstances; or network security policies can dynamically limit the traffic rate to a particular service. The complexity of the technology landscape today demands treating security policy as code: define and keep policies under version control, automatically validate them, automatically deploy them, and monitor their performance. </td>
</tr>
<tr>
        <th >Terms</th>
        <td> null </td>
</tr>
<tr>
        <th >Organizational Use</th>
        <td> Tools such as Open Policy Agent or platforms such as <!-- cspell:disable -->Istio provide flexible policy definition and enforcement mechanisms that support the practice of security policy as code.
        </td>
</tr>
<tr>
        <th >References</th>
        <td> https://www.thoughtworks.com/radar/techniques/security-policy-as-code 
        </td>
</table>

# Acknowledgements
This white paper is a community effort driven by the members of the CNCF TAG-Security. Thank you to everyone for their outstanding contributions. 

Special thanks to Emily Fox and <!-- cspell:disable -->Ragashree M C.

Contributors:

* <!-- cspell:disable -->Adam Morris
* <!-- cspell:disable -->Alex Floyd Marshall - Soren Technology
* <!-- cspell:disable -->Andreas
* <!-- cspell:disable -->Anoop Chandra B N - Hewlett Packard Enterprise
* <!-- cspell:disable -->Aradhna Chetal - TIAA
* <!-- cspell:disable -->Brad McCoy - Moula
* <!-- cspell:disable -->Emily Fox - Apple
* <!-- cspell:disable -->Martin Vrachev - VMware
* <!-- cspell:disable -->Matthew Flannery - Ayenem
* <!-- cspell:disable -->Pushkar Joglekar - VMware Tanzu
* <!-- cspell:disable -->Ragashree M C - Nokia
* <!-- cspell:disable -->Roger Klorese - VMware Tanzu

Reviewers:

* <!-- cspell:disable -->@lizrice
* <!-- cspell:disable -->@justincormack
* <!-- cspell:disable -->@TheFoxAtWork
* <!-- cspell:disable -->@achetal01
* <!-- cspell:disable -->@ragashreeshekar
