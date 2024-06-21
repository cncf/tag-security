# Compromise of code review and merge process

From the incident disclosure [1]:

> On 18th April 2021, a security researcher identified a vulnerability in our review-cask-pr GitHub Action used on the homebrew-cask and all homebrew-cask-\* taps (non-default repositories) in the Homebrew organization and reported it on our HackerOne.

## Impact

From the incident disclosure [1]:

> The discovered vulnerability would allow an attacker to inject arbitrary code into a cask and have it be merged automatically.

> This is due to a flaw in the git_diff dependency of the review-cask-pr GitHub Action, which is used to parse a pull request’s diff for inspection.

> Due to this flaw, the parser can be spoofed into completely ignoring the offending lines, resulting in successfully approving a malicious pull request.

## Type of compromise

Dev tooling: Leveraging the GitHub Actions CI configuration to allow code injection, enabling any number of attacks against Homebrew users.

## References.

1. "Security Incident Disclosure", Homebrew, `<https://brew.sh/2021/04/21/security-incident-disclosure/>`, last accessed 2021-04-28.
