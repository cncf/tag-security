# Incident response

This serves to define how potential security issues should be triaged, how
confirmation occurs, providing the notification, and issuing a security advisory
as well as patch/release.

## Triage

### Identify the issue

Triaging issues allows maintainers to focus resources on the most critically
impacting problems. Potential security issues should be evaluated against the
following information:

* Which component(s) of the project is impacted?
* What kind of issue is this?
  * privilege escalation
  * credential access
  * code execution
  * exfiltration
  * lateral movement
* How complex is the issue?
* Is user interaction required?
* What privileges are required for this issue to occur?
  * admin
  * general
* What is the potential impact or consequence of the issue?
* Does an exploit exist?

Any potential issue that has an exploit, permits privilege escalation, is
simple, and does not require user interaction should be evaluated immediately.
[CVSS Version 3.1](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator) can be
a helpful tool in evaluating the criticality of reported issues.

### Acknowledge receipt of the issue

Respond to the reporter and notify them you have received the issue and have
begun reviewing it. Remind them of the embargo policy, and provide them
information on who to contact/follow-up with if they have questions. Estimate a
time frame that they can expect to receive an update on the issue. Create a
calendar reminder to contact them again by that date to provide an update.

### Replicate the issue

Follow the instructions relayed in the issue. If the instructions are
insufficient, contact the reporter and ask for more information.

If the issue cannot be replicated, re-engage the reporter, let them know it
cannot be replicated, and work them to find a remediation.

If the issue can be replicated, re-evaluate the criticality of the issue, and
begin working on a remediation. Begin a draft security advisory.

Notify the reporter you were able to replicate the issue and have begun working
on a fix. Reminder them of the embargo policy. If necessary, notify them of an
extension (only for very complex issues where remediation cannot be issued
within the project's specified window).

#### Request a CVE number

If a CVE has already been provided, be sure to include it on the advisory. If
one has not yet been created, [GitHub functions as a
CNA](https://docs.github.com/en/code-security/security-advisories/about-github-security-advisories#cve-identification-numbers)
and allows you to request one as part of the security advisory process. Provide
all required information and as much optional information as we can. The CVE
number is shown as reserved with no further details until notified it has been
published.

## Notification

Once the issue has been replicated and a remediation is in place, notify
subscribed parties with a security bulletin and the expected publishing date.

## Publish and release

Once a CVE number has been assigned, publish and release the updated
version/patch. Be sure to notify the CVE group when published so the CVE details
are searchable. Be sure to give credit to the reporter by *[editing the security
advisory](https://docs.github.com/en/github/managing-security-vulnerabilities/editing-a-security-advisory#about-credits-for-security-advisories)*
they took the time to notify and work with you on the issue!

### Issue a security advisory

Follow the instructions from [GitHub to publish the security advisory previously
drafted](https://docs.github.com/en/github/managing-security-vulnerabilities/publishing-a-security-advisory).

For more information on security advisories, please refer to the [GitHub
Article](https://docs.github.com/en/code-security/security-advisories/about-github-security-advisories).
