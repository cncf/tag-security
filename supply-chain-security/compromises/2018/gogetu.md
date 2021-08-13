# Remote command execution with go get -u

A combination of custom domains and Git configuration can be arranged to trick
`go get -u` into running arbitrary commands included in the remote repo.

## Impact

Fixed in Go.

## Type of compromise

Dev tooling - Unbounded clients, which could lead to leaked secrets in the build
pipeline and other malicious supply chain interference.
