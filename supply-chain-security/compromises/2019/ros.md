<!-- cSpell:ignore vuln distros Dockerfiles -->
# Security issue on ROS build farm

The machine hosting the ROS 1 build farm was compromised (possibly via a vuln in
the Jenkins Groovy plugin), with sufficient privilege escalation to access the
GPG keys for signing packages in the ROS repository. Keys were rotated and a
full rebuild was triggered.

## Impact

* "we are unlikely to ever be able to completely rule out malicious interference
  in the ROS binary packaging pipeline"
* Unsupported ROS distros that previously had binary packages were moved to a
  different repo with unique keys
* Users needed to rotate public keys manually on the client side
* Downstream users needed to update their Dockerfiles and Travis/GitLab CI files

## Type of compromise

Attack Chaining via Trust & Signing, Publishing Infrastructure and Dev Tooling -
Build farm compromise with access to private keys used for repo
