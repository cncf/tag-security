<!-- cSpell:ignore klow klown Sonatype okhsa cryptominer -->
# The klow / klown / okhsa incident

On October 20, 2021, Sonatype reported that their automated malware detection
systems detected multiple malicious packages on NPM. They were klow, klown, and
okhsa which introduced a dependency on klown. The incident was reported to NPM
on October 15, and the packages were taken down the same day.

## Impact

Sonatype discovered that klown was published to NPM a few hours after klow was
taken down by the administrators, and that klown pretended to be another
legitimate package, ua-parser-js. The malicious packages downloaded an
executable cryptominer binary during the pre-install phase, and executed it.
Luckily, the packages weren't downloaded a significant number of times.

Interestingly, a few days after this incident, the ua-parser-js package was
hijacked, and malicious versions with similar cryptomining functions were
released on NPM. This incident is written up in greater detail
[here](ua-parser-js.md).

## Type of Compromise

As these seem to have been new packages that were relatively unused, this can be
categorized as Negligence since the packages pretended to be another legitimate
package. However, this incident is relevant because of its connection to the
ua-parser-js incident.

## References

- [Sonatype article about klow / klown / okhsa](https://blog.sonatype.com/newly-found-npm-malware-mines-cryptocurrency-on-windows-linux-macos-devices)