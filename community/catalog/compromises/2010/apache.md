<!-- cSpell:ignore reimaged -->
# Apache.org incident

Attackers posted a malicious obfuscated URL in JIRA hiding an XSS attack. Once
credentials were obtained, attackers modified the JIRA behavior to capture more
credentials, and with one of those credentials they logged to the server hosting
JIRA, Bugzilla and Confluence for Apache. Most importantly, some of the servers
had cached Subversion credentials.

## Impact

Systems had to be reimaged, passwords rotated, the Confluence and Bugzilla
databases are considered leaked.

## Type of compromise

Attack Chaining - multiple compromises.

## Reference

- <https://www.invicti.com/blog/web-security/apacheorg-and-jira-incident/>
