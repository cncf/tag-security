# Foxif/CCleaner

An affected version of CCleaner installs a malware before installing CCleaner.
This malicious version is signed using a valid certificate and has been
delivered to the users by the legitimate CCleaner download servers.

As the affected version of CCleaner was signed by a valid signature, there are
some possibilities. The signing process of the development, build or packaging
step might have being compromised. Also it could be a malicious insertion in
any step right before the product of that step was signed.

## Effect

The impact could've been severe as CCleaner had 2 billion downloads as of
November 2016 with almost 5 million new users per week.

## Type of compromise

It appears the attackers could've accomplished by either compromising the
version control system, the packaging or the publishing infrastructure. For the
last step, they would've have to been able to compromise the signing key that
signs for official CCLeaner releases.
