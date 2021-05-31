# NotPetya

NotPetya compromised the software infrastructure to tamper the patch code. It
infected the update server of an Ukrainian accounting software called MeDoc. As
a result, the attackers could inject a backdoor into the MeDoc application which
allowed the delivery of a ransomware and stealing credentials. Having control
over the update server, the attackers were able to update the infected machines
with a new malicious version.

Note that it seems unlikely that the attackers could plant such stealthy
backdoor without having access to MeDoc’s source code.

## Impact

N/A

## Type of compromise

The attackers seem to have been able to compromise software publishing
infrastructure, update servers and probably the version control system for
MeDoc, as well as signing keys for updates.
