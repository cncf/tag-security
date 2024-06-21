# Linux Kernel CVS Repository Hack

An attacker attempted to backdoor the Linux kernel by submitting changes to a
CVS repository mirror of the main repository.

## Impact

The impact of this incident was low because the CVS repository was only a mirror
of the main BitKeeper repository. As new changes were typically not submitted to
the CVS repository directly, the attack was quickly noticed.

## Type of Compromise

Source Code and Dev Tooling

## References

- [An attempt to backdoor the kernel](https://lwn.net/Articles/57135/)
