# Malicious code in purescript npm installer dependencies
Malicious code was inserted in dependencies of the purescript npm installer. 
The code was inserted in the packages load-from-cwd-or-npm and rate-map.


## Impact
The first version with a the backdoor was published on 05.07.2019, 21:00 UTC. On 09.07.2019, 01:00 UTC an updated version, which did no contain the backdoor, was published. The official NPM download
statistics claim that the packages have ~ 1400 downloads weekly.


## Type of compromise
It appears that the attacker gained access to the npm account of the package maintainer.
