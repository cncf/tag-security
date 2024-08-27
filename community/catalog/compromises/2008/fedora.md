# Fedora and Red Hat OpenSSH package signing compromise

In the case of Fedora, an audit determined that "nobody made use of the key
while the intruder was present". In (Red Hat's) case, the attacker was able to
sign "...a small number of OpenSSH packages relating only to Red Hat Enterprise
Linux 4 (i386 and x86_64 architectures only) and Red Hat Enterprise Linux 5
(x86_64 architecture only)."

## Impact

Several OpenSSH packages relating to RHEL 4 & 5 were signed by an unauthorized
entity and available for use.  New keys were rolled out.

## Type of compromise

Trust and Signing - Package signing infrastructure.
