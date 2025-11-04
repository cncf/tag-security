# Gentoo Incident

Attackers used a remote exploit to compromise an rsync.gentoo.org machine
holding a copy of the emerge repository and implant a rootkit.

## Impact

N/A

## Type of compromise

Publishing Infrastructure - the attackers were able to compromise filesystem of
the source code repository and thus possibly (but highly unlikely) serve
malicious packages to users. The compromise was of an rsync server that was
responsible for serving package sources to users.

## References

- [Gentoo Linux server compromised](https://www.zdnet.com/article/gentoo-linux-server-compromised/)
