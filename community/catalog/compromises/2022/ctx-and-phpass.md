<!-- cspell:ignore ctx -->
<!-- cspell:ignore phpass -->
<!-- cspell:ignore Packagist -->
# PyPI Library `ctx` and PHP's `PHPass` compromised due to account takeover

The authors of these libraries had their associated GitHub account expired,
or their custom email domain expired, which allowed 3rd-party to perform an
account takeover.

## Impact

This incident affected tens of thousands of installs of `ctx` through-out
the 3 weeks time window between May 1st and May 21st, as well as impacting
roughly 2.5 million downloads of `PHPass`, according to Packagist.org.

## Type of Compromise

This incident fits the [Dev Tooling](../compromise-definitions.md#dev-tooling) definition.

## References

<!-- markdown-link-check-disable -->
- [How I hacked CTX and PHPass Modules](https://sockpuppets.medium.com/how-i-hacked-ctx-and-phpass-modules-656638c6ec5e)
- [Twitter thread on the topic](https://twitter.com/s0md3v/status/1529005758540808192)
- [Reddit's I think the CTX package on PyPI has been hacked!](https://www.reddit.com/r/Python/comments/uwhzkj/i_think_the_ctx_package_on_pypi_has_been_hacked/)
<!-- markdown-link-check-disable -->
