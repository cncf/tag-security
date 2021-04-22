---
title: "Least Privilege"
date: "2020-10-01"
category: "Security Assurance"
---

Least privilege is just as important, or perhaps the most important aspect of cloud native architectures, and must be considered at all parts of the stack where an authentication or authorization decision is made. Traditionally Least Privilege has been thought of at the account layer whether that account is a human or a service.

In cloud native, least privilege must be applied at every layer of the stack. It should also be considered when evaluating the specific tooling responsible for fulfilling each layer's execution. Organizations may find, as they explore various products and capabilities, that many containers have privileged-by-default deployments or required root privileges to operate. As a result, additional measures may need to be taken to isolate those elevated privileges from the rest of the workload. Organizations should consider all areas to employ isolation and least privilege in their workloads and deployments; from cgroups and system calls in the runtime environment to artifact management and rootless builds.

To consistently reduce the potential attack surface and corresponding blast radius, organizations need to implement the principle of least privilege at every level of their architecture. This not only applies to the individuals performing various functions within their roles but also to the services and workloads executing in a given environment. Rootless services and containers are vital to ensuring that if an attacker does get into an organization's environment, they cannot easily traverse between the container they gain access to and the underlying host or containers on other hosts.

Mandatory Access Control (MAC) implementations (e.g. SELinux and AppArmor) can limit the privileges beyond those set to the container or namespace and provide additional container isolation at the host level to prevent container breakout or pivoting from one container to another to escalate privileges beyond those permitted by the access control in place.

## Projects
- [OPA](https://github.com/open-policy-agent/opa)
- [Kyverno](https://github.com/kyverno/kyverno)
- [Keycloak](https://github.com/keycloak/keycloak)


<!--
Commercial Projects (optional)
Styra DAS (styra.com)
Nirmata (nirmata.com)
Build Security (build.security)

-->

## Examples
- Only on-call engineers should be allowed access to servers
- Users with a particular role (and other attributes) should be allowed to perform certain actions on a certain resource
- Individual users can be granted temporary elevated permissions (e.g. API gateway plus multi-factor authentication solution, such as Keycloak) so that elevated permissions are not only time (and scope) limited, but additional MFA requirements (such as a human being manually approving the request under specific conditions) help to minimize attacks, and avoid the individual having un-needed permissions/privileges around-the-clock.
- Individual applications can adopt this principle via the use of capabilities on Linux-based systems (kernel v2.2 and onward) to voluntarily relinquish the ability to execute certain operations when the application has no further need for said operations.
- In Kubernetes, RBAC “Role” objects can be used to restrict “apiGroups”, “resources”, and “verbs”, so that applications can be configured at the pod level to have limited capabilities with respect to interacting with the Kubernetes API, API server, and other resources within the cluster.
- Individual containers can be denied access to privileged operations (i.e. “docker run … --privileged) to limit capabilities and reduce the attack surface with respect to privilege escalation.
- Inherent Kubernetes features such as SubjectAccessReview can be utilized to generate unit tests to verify if a pod has the necessary authorization to execute specific operations. The tests can then be used by QA teams to prune roles/abilities to the minimum required for normal operation.

## Other Links/Materials:
- [capabilities(7) - Linux Manual Page](https://man7.org/linux/man-pages/man7/capabilities.7.html)
- [“Using RBAC Authentication”](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [“Authorization Overview”](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)

