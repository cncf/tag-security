# How does this release to the CNCF Landscape?

The [CNCF Landscape](https://landscape.cncf.io/) is a valuable resource for
companies building cloud-native software. It’s a single place with a fairly
comprehensive resource map of cloud-native technologies to enable organizations
to build, test, deploy and scale cloud native applications.

The CNCF Landscape is primarily broken into categories that are meant to
highlight key phases of the cloud-native software development life cycle (SDLC).
In particular, it contains the following categories:

- App Definition & Development
- Orchestration & Management
- Runtime
- Provisioning
- Observability & Analysis

In addition to the categories above, there is a separate “Serverless” category.

Among these categories there are few sub-categories with a security focus. Notably there are:

- Provisioning - Security and Compliance
- Provisioning - Key Management
- Serverless  - Security

Companies building real-world applications have security considerations at each
phase of the SDLC, which requires a different approach. In evaluating needs for
cloud-native security, we believe it would be beneficial to have a resource with
clearer suggestions on security considerations at each stage of the SDLC as well
as recommendations for cloud-native tools that an organization could use to help
them practice better security.

Additionally the CNCF Landscape focuses on tools that solve a particular area of
concern (e.g. “source code management” or “container registries”). Security is a
cross-cutting concern, requiring a different approach. For example, there are
many tunables that are exposed at various layers that allow organizations to
secure their cloud native platform. A good example are Linux Security Modules
(LSMs) such as seccomp, SELinux, and apparmor that can be used to further secure
the container runtime environment. These tunables are often abstracted away from
the end user by the container runtime or orchestration layers to hide this layer
of complexity from developers. However, these low level tunables are an important
consideration for providing an effective layered approach to security. In
creating a separate security-focused landscape, we are aiming to more
effectively highlight the various layers of security considerations, as well as
tools that can help companies with fine-tuning their approach at each layer.

