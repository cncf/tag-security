# Remote code injection in Log4j
<!-- cSpell:ignore composability codeql cldrn hotpatch hotpatching -->
A popular logging tool used by a large number of projects exhibited a vulnerability allowing remote code execution. A second vulnerability came later.

## Impact

The impact, possibly illustrated by the US-specific references cited below, can't be overstated. This is due to the critical nature of the vulnerability, ease of exploitation, pervasiveness and high degree of composability of this component, coupled with the one-two vulnerability disclosures in December followed by another wave for Log4j 1.x in January.

This incident triggered several conversations in the industry including detection, hotpatching techniques and open source sustainability.

## Type of Compromise

While this was a source code compromise, it was compounded by all the factors above.

## References

- [Understanding the Impact of Apache Log4j Vulnerability](https://security.googleblog.com/2021/12/understanding-impact-of-apache-log4j.html)
- [Log4j One Month On](https://www.sentinelone.com/blog/log4j-one-month-on-crimeware-and-exploitation-roundup/)
- [Another Remote Code Execution Vulnerability Patched in Log4j](https://www.securityweek.com/another-remote-code-execution-vulnerability-patched-log4j)
- [New Log4j 1.x CVEs, and critical Chainsaw Vulnerability — What to Do?](https://blog.sonatype.com/new-log4j-1.x-cves-and-critical-chainsaw-vulnerability-what-to-do)
- [FTC warns companies to remediate Log4j security vulnerability](https://www.ftc.gov/news-events/blogs/techftc/2022/01/ftc-warns-companies-remediate-log4j-security-vulnerability)
- Commentary from [The White House](https://www.whitehouse.gov/omb/briefing-room/2022/01/26/office-of-management-and-budget-releases-federal-strategy-to-move-the-u-s-government-towards-a-zero-trust-architecture/)
- [Hotpatch for Apache Log4j](https://aws.amazon.com/blogs/opensource/hotpatch-for-apache-log4j/) from Amazon Web Services
- [codeql-queries/log4j-injection.ql at master · cldrn/codeql-queries](https://github.com/cldrn/codeql-queries/blob/master/log4j-injection.ql)