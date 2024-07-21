# PEAR Breach

The PHP Extension and Application Repository (PEAR) server, 
a distribution system for PHP libraries, was hacked 
and the original PHP PEAR package manager (go-pear.phar)
was replaced with a modified version.


## Impact

Users who have installed PEAR installation files from pear.php.net 
in a window of 6 months could have been infected.
Since many web hosting services allow their users to install and run PEAR, 
this attack might also have impacted a large number of websites and their visitors.

## Type of compromise

It appears the attackers compromised the publishing infrastructure. Since no
code-signing was involved, the attacker didn't require to compromise any key,
but rather just the infrastructure.
