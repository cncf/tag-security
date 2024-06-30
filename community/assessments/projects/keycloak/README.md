# Keycloak Joint Security Assessment

Completed: October 2020

Security Reviewers: Ash Narkar, Emily Fox, Matt Hamilton, Krishna Sharma

Project Security Lead: Boleslaw Dawidowicz

Project Team: Stian Thorgersen, Vinod

Source code: https://github.com/keycloak/keycloak

Website: https://www.keycloak.org/

Project version reviewed: v10.0.2


## Background

Keycloak is an open source Identity and Access Management solution aimed at modern applications and services.
It makes it easy to secure applications and services with little to no code.

_Maturity_

The project is being used in production by a number of companies including Accenture, HPE, Bosch, Zalando.
Other companies using Keycloak are documented in [ADOPTERS.md](https://github.com/keycloak/keycloak/blob/master/ADOPTERS.md).


## Summary

### Design

Keycloak follows a modular and layered approach and is built on top of components such as Java Virtual Machine as a
trusted runtime environment. It leverages the WildFly application server for REST API implementation, SSL, Data Sources,
Transaction handling, etc.

Keycloak is intended to be a highly available, scalable and extensible solution providing an implementation for
modern security standards specifically OAuth2 and OIDC.

### Analysis

In today’s microservice-oriented environments which are diverse and ephemeral in nature, there is a need for an
open source solution like Keycloak to provide identity and access management features so that applications can deal
with core functionality instead of dealing with login forms, authenticating users etc.

Keycloak is a critical piece of the infrastructure and depends on large components like JVM,
WildFly Application Server etc. It's built on top of JVM and uses the WildFly Application Server as a runtime. Although
these are widely adopted solutions, it does increase Keycloak's attack surface which could potentially be compromised by attackers.
Keycloak is a highly customizable solution which is very convenient and powerful for the user, however care should be
taken to properly understand the consequences of different server configuration options and how administrators define
fine-grained access to users in different realms to manage the server.


## Recommendations

### Recommendations for the project team

* Given Keycloak comprises so many moving parts, it would be helpful to perform threat modelling. [KEYCLOAK-15945](https://issues.redhat.com/browse/KEYCLOAK-15945)

* Keycloak documentation contains great information. However, it could be better organized and consolidated so that
users can quickly find the right information. The server installation docs in particular could be more concise to help
users from making any configuration mistakes. It may also be useful to highlight specific terms in the document that
have security impacting configurations. For example, default configuration is not secure but making change X is
recommended from a security perspective. In fact, you could even dedicate a section to “Security” in the docs to helps
users deploy Keycloak in a more secure manner. [KEYCLOAK-15946](https://issues.redhat.com/browse/KEYCLOAK-15946)

* Keycloak provides the ability for an admin to impersonate a user. This can be useful for multiple purposes but
is also a security risk. Documentation should be updated to include the security considerations of this particular
setting so that Keycloak adopters can use this powerful capability without increasing exposure
of their systems to attacks. [KEYCLOAK-15947](https://issues.redhat.com/browse/KEYCLOAK-15947)

* Encouraging maintainership from different organizations. [KEYCLOAK-15949](https://issues.redhat.com/browse/KEYCLOAK-15949)

* Work towards CII Silver Badge. [KEYCLOAK-15948](https://issues.redhat.com/browse/KEYCLOAK-15948)

### Recommendations to the CNCF

The following recommendations are where help from the CNCF would assist Keycloak to increase its effectiveness
in cloud native security.

* Encourage projects looking for an authentication system to integrate with Keycloak. 

* Help Keycloak in identifying common configuration “gotchas” which could then be used to improve the documentation
and overall usability of the project.
