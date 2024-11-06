
## Summary
Flatcar is a Linux environment which contains a minimal set of packages needed to run containers.  The goal is to provide an environment with much greater security than you would typically get otherwise.
<br/><br/>A Joint Security Assessment was performed by Justin Cappos, Marina Moore, Ragashree Shekar, and Andrew Martin.  We appreciate the Flatcar team being so responsive when answering questions and clarifying the self assessment document!

## Additional Clarifications



1. What is the embargo policy and how is vulnerability disclosure/PSIRT process followed? \
_Response (Thilo):_
    <br/>a. Ongoing _public_ vulnerabilities known to the maintainers team are published at and tracked on our security issues board: [https://github.com/orgs/flatcar/projects/7/views/17](https://github.com/orgs/flatcar/projects/7/views/17) . The board is kept up to date; disclosure happens implicitly, and immediately, as soon as an issue becomes known. There currently is no notification mechanism for users to subscribe to.
    <br/>b. Ongoing _embargoed_ issues are tracked in a private github repo all maintainers have access to. These issues are moved to the public board (see above) as soon as the embargo lifts.
    <br/>c. Fixed security vulnerabilities are listed in the “security” section of the release notes of the release fixing the respective issue. A separate Security Report, published for each release on our mailing list, details on each of the issues fixed.
3. “Appropriate care is taken by maintainers when ingesting new packages or versions (i.e. when recording fingerprints): updating a package to a new version always requires a PR which is built, tested, and reviewed by a maintainer before merge." (What does this mean?) \
_Response (Thilo):_
    <br/>a. Package updates we import from Gentoo are not automatically merged. A PR is filed, the changes must be reviewed, and are merged manually. Obvious manipulation like e.g. changing the URL of the upstream source tarball to a malicious site will be detected; covert changes will not.
    <br/>b. The changes are built before merge and must pass a full test run. Obvious malicious activity interfering with the OSes general operation will be detected; covert changes will not.
4. Release builds run largely automated: the only manual step is for a maintainer with access to the CI automation’s web interface (Jenkins) to start a release. While releases are started only when maintainers are in alignment and coordinated via a release tracking issue (example), this process currently does not generate an audit trail, and the action of starting release builds is not logged and does not cause any notifications.
   <br/> a. Is this build server completely isolated from the internet, e.g. does it have outbound internet access or are builds hermetic?
        <br/>1. _Response (Thilo): _The servers have outbound internet connection in order to fetch source tarballs that are not cached on our sources caching server. A tracking issue (feature request) exists to implement completely hermetic builds: [https://github.com/flatcar/Flatcar/issues/833](https://github.com/flatcar/Flatcar/issues/833) 
    <br/>b. How is Jenkins patched and maintained, and has there been an audit of high-risk or vulnerable plugins?
        <br/>2. _Response (Thilo): _Jenkins is maintained manually and updated regularly by maintainers with access to the build servers. We rely on Jenkins’ self-checks / automated audits to detect security issues and have not performed manual audits.
5. “The public update server (Parties / 6. above) only returns a single version, which is the latest version available.”  Why is this the latest?  What if the server is compromised?
    <br/>a. _Response (Thilo):_ Nebraska works this way. For any given channel (Alpha, Beta, Stable, LTS) there is only one “current” version. Instances checking for an update that have a lower version (semver, i.e. MAJOR.MINOR.PATCH) receive an “update available” response pointing to the newer version. \
Compromising the update server would allow an attacker to “un-publish” a newer release by removing the respective metadata. This would lead to instances that have not yet received the newest version to remain on an older version which possibly contains known vulnerabilities the attacker would then be able to exploit for longer.


## Suggestions to the project team



1. Reducing manual intervention which could be error-prone and migrating toward an automated tracking and alerting for changes to HSM (new HSMs, removal of HSMs, access, artifact modifications etc) is recommended as the integrity of the signing key is crucial to security of all the running instances with auto-update feature
2. The 4 eyes principle for code reviews could be useful for a robust review process. 
3. Reiterating what Jon suggested previously, a mock drill for this process would be useful if they haven't done/plan to conduct one.
4. Consider if there are ways to improve the process and security of ingested code from your upstream sources.  This may need to be revisited and audited periodically as techniques and threats change.
5. “Compromise of the SDK container e.g. through compromise of the GHCR back-end or the secure build infrastructure or leaked GHCR credentials would lead to compromised builds, release images, and update payloads.”  -- Is this an area where you can de-risk / harden the process?  Are you using git signed tags with git’s tag signing verification options correctly enabled? Can the container image be signed?
6. “Update signing is trusted to very few core maintainers (currently 3) with an established track record in the Flatcar project. The private key used for signing the update tarball is stored on an HSM; the payload is signed in an air-gapped environment.” --- examine how the core maintainers are authenticated, how usage of the HSM is logged, etc.
7. “If the user chooses to manually download and install Flatcar, the user must also take care of image validation themselves. This is called out in our documentation and is part of our code snippets / examples, e.g. here for the “qemu” image.”  -- Almost certainly users fail to do this validation themselves.  Can you measure the rate of validation (e.g., downloads of the detached signature) or quantify the extent to which these are used to show it is largely irrelevant, etc.?
8. “Initial provisioning uses a release image - a full disk image containing all partitions. Separate images exist for all supported vendors / private clouds. For each image, a digest file is provided with a SHA512 hash of the image, as well as a signature file containing the public signature of the digest file (generated with the private image signing key). Additionally, meta information like the list and sizes of all files in the OS partition (text format) as well as all packages and their respective versions shipped (both text and SBOM 2.2 JSON) are provided for each release. For these meta-information files digest files and signatures (signed digests, created with the image signing key) are provided, too.  “  Could a malicious party with access mix and match versions of files to get a result that has more easily exploitable vulnerabilities?
9. Could be worth a quick discussion of mapping to SLSA levels for build security? Everything appears covered [https://slsa.dev/spec/v1.0/threats](https://slsa.dev/spec/v1.0/threats)
    <br/>1. Maintainers: That's a good point - I indeed based parts of this document on our SLSA review of the project. We've only reviewed Flatcar against SLSA v0.1 and have yet to update our docs to 1.0, but I'll add a reference here nonetheless.
10. Branch protection configuration for core repos? The control might want to cover that instead, as it sounds like compromised local source isn't an issue with the project's PR review process
    <br/>2. Maintainers: That's a good catch, I've added 1.c. to discuss repository settings.
11. SSH credential password enforcement
12. 2FA for code repositories, build infrastructure, and VPN access
13. Usage of soft/hard tokens as opposed to SMS 2FA as per [CNCF_SSCP_v1.pdf](https://github.com/cncf/tag-security/blob/main/community/working-groups/supply-chain-security/supply-chain-security-paper/CNCF_SSCP_v1.pdf)
14. Consider preventing any outbound internet access to the build infrastructure, to avoid command and control for hostile actors


## Suggestions to CNCF / TOC



1. The project is doing well, but the documentation would benefit from a threat matrix which ties the different actors to the outcomes of compromise.  Given the security-focused nature of the project, this is a project where added scrutiny / effort on this front is exceedingly important.
