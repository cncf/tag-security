# Electron native notify

the npm, Inc. security team, in collaboration with Komodo, helped protect over
$13 million USD in cryptocurrency assets as we found and responded to a malware
threat targeting the users of a cryptocurrency wallet called Agama.

This attack focused on getting a malicious package into the build chain for
Agama and stealing the wallet seeds and other login passphrases used within the
application.

## Impact

Users of the cryptocurrency wallet called Agama lost their funds. The total
losses are not known yet, although they could have reached $13 million USD had
npm/Komodo not identified the compromise earlier.

## Type of compromise

It appears the attackers compromised the credentials of a developer publishing
a popular package. It is also possible that the developer of the package went
rogue (or intended to make this package a "useful package" to then slip the
payload). Read more about the "useful package attack" [here](https://blog.npmjs.org/post/185397814280/plot-to-steal-cryptocurrency-foiled-by-the-npm)
