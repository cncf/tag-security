# Misconfigured Dev and QA tool compromised

From the original article [1]:

> This month a researcher has disclosed how he broke into the official GitHub repository of Microsoft Visual Studio Code.

> A vulnerability in VS Code's issue management function and a lack of authentication checks enabled the researcher to obtain push access, and write to the repository.

## Impact

From the original article [1]:

> By injecting his basic PoC exploit into the VS Code's CI script which ran around midnight, the researcher obtained a reverse shell.

> Further, the researcher obtained the GitHub authorization token for VS Code repository that would give him write access to the repository.

> Eventually, after obtaining the token, the researcher posted a PoC commit to the repository


## Type of compromise

Dev tooling: "obtain push access, and write to the repository."  Source code repositories are considered part of the developer tooling.


## References.

1. "Here's how a researcher broke into Microsoft VS Code's GitHub",  Ax Sharma, `<https://www.bleepingcomputer.com/news/security/heres-how-a-researcher-broke-into-microsoft-vs-codes-github/>`, last accessed 2021-02-02.
