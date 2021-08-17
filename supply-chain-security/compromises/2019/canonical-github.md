# Canonical GitHub org compromise

On 2019-07-06 there was a Canonical owned account on GitHub whose credentials
were compromised and used to create repositories and issues among other
activities. Some new repos were created. The attacker compromised an improperly
configured Jenkins instance and used it to deface 7 Github projects.

## Impact

* "We immediately shut down the Jenkins instance, revoked access and performed
  an audit of our infrastructure."
* No attack spillover to Launchpad
* "At this time we see no other indicators of compromise that would suggest
  access beyond our original disclosure"

## Type of compromise

Dev Tooling & Source Code - Build farm compromise with credentials access to
GitHub
