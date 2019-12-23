# Malicious code in purescript npm installer dependencies
Malicious code was inserted in dependencies of the purescript npm installer. 
The code was inserted in the packages load-from-cwd-or-npm and rate-map.


## Impact
Both packages have ~ 1400 downloads weekly.


## Type of compromise
The maintainer at that time claims that the malicious code was published by an attacker 
who gained access to his npm account.