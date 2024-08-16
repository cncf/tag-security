<!-- cSpell:ignore warbeast -->

# GitGot: using GitHub repositories as exfiltration store

ReversingLabs identified two npm packages, "warbeast2000" and "kodiak2k" which
were designed to steal SSH keys from developers by exploiting GitHub
repositories _as storage_.

## Impact

> Fortunately, the reach of this campaign was limited. ReversingLabs observed
> different accounts publishing warbeast2000 and kodiak2k on npm. The
> warbeast2000 package was downloaded a little less than 400 times, whereas the
> kodiak2k was downloaded around 950 times.

## Type of compromise

- **Trust and Signing**: This means that in addition to leveraging implicit
trust on `github.com` for pulls, attackers were using Personal Access Tokens
(PATs) to leverage that implicit trust for exfiltration.

## References  

- [ReversingLabs Blog](https://www.reversinglabs.com/blog/gitgot-cybercriminals-using-github-to-store-stolen-data)
