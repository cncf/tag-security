# GitHub delivered password resets to wrong addresses

GitHub's validation logic for password resets didn't account for a Unicode
normalization feature that could have allowed impersonation for the purpose of
account takeover.

## Impact

Unknown.  This was addressed by GitHub and neither GitHub or the original
reporter mention any known attacks.

## Type of compromise

Source Code & Dev Tooling - Account takeover in build/SCM infrastructure
