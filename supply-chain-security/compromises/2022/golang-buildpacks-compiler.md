# GCP Golang Buildpacks Old Compiler Injection
<!-- cSpell:ignore Buildpacks buildpacks -->
Previously, GCP Build Pipelines defaulted to pulling the `go` compiler supplied in `go.mod`, which could point to insecure versions.

## Impact

According to the researchers: "before the fix, GCP Buildpacks originally pulled in older compilers based upon the level of compatibility rather than the latest stable version", and "using an older compiler to build resulted in insecure binaries with known vulnerabilities originating from the old compiler and golang stdlib".

This behavior has since been adjusted, but the researchers also point out to the value of attestations and SBOM to proactively inform users.

## Type of Compromise

Given this default overrides the experience a developer might be having building and testing locally or in a non-production environment, we categorize this as Dev Tooling.

## References

- [GCP Buildpacks Old Compiler Injection Write-Up [Fixed]](https://zt.dev/posts/gcp-buildpacks-old-compiler/)
- [Don't use go.mod to detect go version · GoogleCloudPlatform/buildpacks@9b81ec3](https://github.com/GoogleCloudPlatform/buildpacks/commit/9b81ec3cca918acae5c1f82ba3d1dcf92c649986)