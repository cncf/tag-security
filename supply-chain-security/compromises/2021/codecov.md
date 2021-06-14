# Compromise of Codecov Bash Uploader tool

Codecov is a code coverage tool for developers that integrates with GitHub, BitBucket, and GitLab. On April 15th, 2021, they reported [1] that an unknown attacker gained access to their Bash uploader script because of an error in Codecov's Docker image creation process. This error allowed the attacker to extract the necessary credentials to modify the Bash script.

## Impact

The investigation revealed that starting 31st January, 2021, there were unauthorized alterations of this script. The announcement states that these changes could affect:

* any credentials, tokens, keys that passed through Codecov's CI runner.
* services that these credentials allowed access to.
* information about the git remote, i.e., the origin repository using the uploader script.

## Type of Compromise

Source Code: Codecov's credentials were compromised enabling their source to be modified by the attacker.

This compromise in turn leads to a potential Dev Tooling compromise for Codecov's users due to the role of the tool in build processes.

## References

1. Bash Uploader Security Update, `<https://about.codecov.io/security-update/>`, last accessed 2021-04-17.