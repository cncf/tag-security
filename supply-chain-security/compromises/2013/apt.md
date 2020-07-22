# APT didn't enforce signature validation for source packages

It was discovered that APT's crypto-based routines to verify binary package authenticity wasn't being used for source packages.

## Impact

* A CVE was assigned
* APT was fixed via a patch
* Discussion followed around further supply chain concerns

## Type of compromise

Negligence - Insufficient client-side package authenticity verification
