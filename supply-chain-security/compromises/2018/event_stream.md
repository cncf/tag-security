# The event-stream vulnerability

The package `event-stream` is a popular npm package used by numerous other npm
packages which became even more famous after the exploit found in it in 2018-th.

A new contributor named "right9ctrl" made series of meaningful contributions to
the `event-stream` package and eventually gained the trust of the
original author of the package and the ownership of `event-stream` was transferred
to "right9ctrl".

Later, on September 4th, 2018 "right9ctrl" released a new version of the package
containing a new npm dependency called `flatmap-stream`.
`flat-map` was an npm package specifically crafted for the purposes of this
attack. It contained a fairly simple `index.js` file, as well as a minified
`index.min.js` file. The two files on GitHub appear innocent enough.
**However, in the published npm package, the minified version of the file has
additional code injected into it.**
At the time of the attack, there was no requirement that code being uploaded in
an npm module should be equivalent to the code stored publicly in a git repository.

The additional code contained a highly targeted attack against users of a crypto
wallet app called [bitpay/copay](https://github.com/bitpay/copay).
The code did the following:
1. Decrypt and execute a hidden AES-encrypted payload using the `package.json`
description as a key.
2. Search the victim device for "hot wallet" cryptocurrency profile (this could
have been running in mobile apps as well as your regular browser,
regardless of the device).
3. Iterate over all crypto wallet IDs and mapping all public keys.
4. For wallets with significant Bitcoin or Bitcoin Cash balances, send the
private keys and account data to a server in Kuala Lumpur and most likely
controlled by the attacker.

## Impact
The vulnerable version of the event-stream was out for almost 2 months until
the attacker made a small mistake by using a deprecated function which raised
a suspicious depreciation warning in another library that consumes
`event-stream`: (Deprecation warning at start)[https://github.com/remy/nodemon/issues/1442].
According to Thomus Hunter medium post (linked below), as of November 27-th 2018
the package have been receiving over 1.5 million weekly downloads and more
than 1600 other packages depended on it.
Roughly estimated this means that over 12 million downloads contained the
vulnerability and the number of infected users through packages
depended on `event-stream` is hard to trace.

## Type of compromise
As the attack has been performed by an owner of `event-stream` deliberately
injecting a vulnerability into the source code, this attack can be
categorized as a `malicious maintainer` exploit.

## References:
- [Compromised npm Package: event-stream](https://medium.com/intrinsic/compromised-npm-package-event-stream-d47d08605502)
- [Original GitHub thread for the vulnerability](https://github.com/dominictarr/event-stream/issues/116)
- [The Malicious code in the package explained](https://github.com/dominictarr/event-stream/issues/116#issuecomment-441759047)
