<!-- cspell:ignore pkgsrc -->

# Malicious maintainer introduces sophisticated backdoor in xz

A backdoor was introduced in `xz`, a compression tool integral to various
Linux distributions. Over the course of several years, a malicious actor
or actors attained maintainer status and implanted a sophisticated,
multi-stage backdoor that relied on the specific build processes of `xz`
to activate, resulting in a modified `liblzma` library that can be used
by any software linked against this library.

## Impact

The backdoor was discovered on March 28, 2024, specifically in versions
5.6.0 and 5.6.1 of the XZ Utils package, and was assigned CVE-2024-3094.

The compromised package was distributed across several Linux distributions
including Fedora, Debian, Kali Linux, openSUSE, Arch Linux, and various
package managers like Homebrew and pkgsrc.

The apparent goal of this backdoor was to enable remote code execution
via `sshd` on affected systems by intercepting the `RSA_public_decrypt()`
function, looking for an attacker controlled key, and executing the payload
via `system()` function.

This incident achieved mainstream media coverage, driving further recognition
of the threats involved in exploiting trust and lack of visibility into
maintainer activities.

The initial response guidance involved rolling back the version of `xz`,
but this proved difficult in some ecosystems which had to intervene to
create epochs. Also, for a number of days after the disclosure, the `xz`
repository on GitHub was disabled which made it more cumbersome for the
public to research what had happened.

## Type of compromise

While rooted on a malicious maintainer that attained this status by a
long-term effort by an actor or actors to subvert the project, this incident
also exhibits some attack chaining characteristics including the exploitation
of trusted build and distribution mechanisms to deploy the backdoor. From
the [Cloud Security Alliance](https://cloudsecurityalliance.org/blog/2024/04/25/navigating-the-xz-utils-vulnerability-cve-2024-3094-a-comprehensive-guide)
report:

> The backdoor was deliberately concealed by the developer. It gets incorporated
into the binary during the RPM or DEB packaging process for x86-64 architecture,
using gcc and gnu linker, under the guise of a "test" step.

## References

- <https://myrror.security/the-xz-attack-a-software-supply-chain-earthquake/>
- <https://securitylabs.datadoghq.com/articles/xz-backdoor-cve-2024-3094/>
- <https://securelist.com/xz-backdoor-story-part-1/112354/>
- <https://medium.com/checkmarx-security/backdoor-in-xz-impacting-multiple-linux-distros-074e86989725>
- <https://cloudsecurityalliance.org/blog/2024/04/25/navigating-the-xz-utils-vulnerability-cve-2024-3094-a-comprehensive-guide>
