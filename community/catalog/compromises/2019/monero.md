<!-- cspell:ignore monero -->
<!-- cspell:ignore getmonero -->
# Binaries of the CLI for `monero` compromised

The binaries of the CLI wallet had been compromised and a malicious version
was being served. The attacker introduced two new functions. Anyone who
created or opened a wallet with the compromised binary had their seed stolen.

## Impact

The impact of this incident is unknown however at least one Reddit user claimed
to have lost funds worth $7000.

## Type of Compromise

This incident fits the [Publishing Infrastructure](../compromise-definitions.md#publishing-infrastructure) definition.

## References

- [Warning: The binaries of the CLI wallet were compromised for a short time](https://web.getmonero.org/2019/11/19/warning-compromised-binaries.html)
- [Wrong hashes (from getmonero.org)](https://github.com/monero-project/monero/issues/6151)
- [Security Warning: CLI binaries available on getmonero.org may have been compromised at some point during the last 24h.](https://www.reddit.com/r/Monero/comments/dyfozs/security_warning_cli_binaries_available_on/)