# Pixie Joint Security Assessment

## Summary
Pixie is an observability tool that provides a quick and easy way to get information about cloud native applications without requiring manual instrumentation.

Members of the STAG in the CNCF (Justin Cappos, Victor Lu, Jon Zeolla, and Ragashree Shekar) worked with the PIxie team to perform a joint assessment, which was completed in August of 2023.  During the course of the assessment, the Pixie team fixed 8 issues that were observed, showing high velocity in addressing security concerns.  

## Feedback to Pixie Team

- Suggest adding OCSP or CRL revocation where TLS is used (especially between Vizier and the control plane).
    - https://github.com/pixie-io/pixie/issues/1664
- Validate artifact signatures during auto update, and fail closed.
    - https://github.com/pixie-io/pixie/issues/1665 
- Update documentation to include signature validation (example here; it currently has checksum validation but not signature validation; also link to this documentation in places where using the docker image is suggested like this). 
   - Docs have been updated with references to signature validation instructions.
- Pixie currently does not have RBAC support for Kubernetes. Thus whomever has access to Pixie (and also the Pixie application) has admin access, which is a major concern.  In all deployments of Pixie Cloud, all users who join the org will have admin privileges.
    - https://github.com/pixie-io/pixie/issues/1321
- Support least-privilege in Cloud/Control-Plane proxy #1228  Services should run with only the needed level of privilege
    - https://github.com/pixie-io/pixie/issues/1228
- You should consider this as a way to further isolate the parts of Pixie which execute in the cloud. https://kubernetes.io/blog/2017/12/using-ebpf-in-kubernetes/- Limiting syscalls with seccomp-bpf
- Improve detection of homoglyphs/unwanted Vizier deployments; consider a different form of encoding or display. 
    - Filed https://github.com/pixie-io/pixie/issues/1653 and fixed with https://github.com/pixie-io/pixie/pull/1658. 
- Document the security processes such as vulnerability disclosure, embargo notification, remediation etc. Pointers from this guidelines may help document the processes, which could then be implemented - https://contribute.cncf.io/maintainers/security/security-guidelines/
    - Updated https://github.com/pixie-io/pixie/blob/main/SECURITY.md
- Perform a vulnerability disclosure exercise including the initial report, remediation code change/peer review, and disclosure.
- Clarity around the signing for the Linux binaries, script that gets the binary, docker images, etc. should be improved and likely hardened. 
    - Added more documentation around the CLI binary in the self-assessment.

## Feedback to CNCF

- More documentation around how their microservices relate and are architected would help others understand the project better, 
- Document the threat model with default configurations along with a hardening guide to understand and address risks better. 
