# GitHub delivered password resets to wrong addresses

GitHub's validation logic for password resets didn't account for a Unicode normalization feature that could have allowed impersonation for the purpose of account takeover.

## Impact

This was addressed by GitHub and neither GitHub or the original reporter mention any known attacks.

## Type of compromise

Account takeover in build/SCM infrastructure