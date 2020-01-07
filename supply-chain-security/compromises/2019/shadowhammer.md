# ShadowHammer

The update servers of ASUS company were compromised and
a signed backdoored version of an application called 
ASUS Live Update Utility was distributed to the ASUS users. 
The application comes preinstalled on many Windows computers
made by ASUS and is used to deliver updates for BIOS/UEFI firmware,
hardware drivers and other ASUS tools.


## Impact

Over a million users might have downloaded and installed a 
backdoored version of the application. For example, a report by
Kaspersky shows over 57,000 Kaspersky users have installed
the backdoored version of ASUS Live Update Utility.
Interestingly, a second stage of the attack was deployed
on at least 600 specific systems whose mac addresses were
hardcoded to receive a secondary payload.


## Type of compromise

It appears at the very least, the attackers had access to
the update infrastructure and the code signing key.
