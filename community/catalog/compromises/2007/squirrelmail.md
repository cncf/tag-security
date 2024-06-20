# Backdoor in SquirrelMail as a result of account takeover

A release maintainer account was compromised and malicious code was introduced
in a release.

## Impact

Most distributions didn't pick up the tainted release, a superseding release was
issued later.

## Type of compromise

Source Code / Publishing Infrastructure - SquirrelMail is written in PHP and the
distribution is the source itself. The modification appears to have been in a
tarball which no longer matched the MD5 checksum.

## References

- https://lwn.net/Articles/262688/