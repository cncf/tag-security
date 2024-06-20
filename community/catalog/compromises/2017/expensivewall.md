# ExpensiveWall

A malware injected in a free Android app (wallpaper) would secretly register
victims for paid services. The malicious code in the app  came from a
compromised software development kit (SDK) that Android developers used.
Notbaly, Expensive Wall used obfuscation methods to hide malicious code which
could bypass anti-virus protections.

## Impact

At least 5,904,511 devices were affected, and up to a maximum of 21,101,567, as
reported on [this technical
report](https://research.checkpoint.com/expensivewall-dangerous-packed-malware-google-play-will-hit-wallet/)

## Type of compromise

The attackers were able to compromise the toolchains of the developer machines
and introduce a backdoor in the resulting apps. As such, developer keys can be
assumed to be compromised.
