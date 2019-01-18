# Approach to the landscape

## Goal
Our goal is the help organizations practice better security by providing a
map to cloud-native tools that require security considerations at each stage
of the software development lifecycle (SDLC), as well as tools that are focused
on specific cross-cutting security concerns.

## How does this relate to the CNCF landscape?

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
phase of the SDLC, in addition to general security concerns, such as identity
and access, which requires a different approach.

Additionally the CNCF Landscape focuses on tools that solve a particular area of
concern (e.g. “source code management” or “container registries”). Security is a
cross-cutting concern, requiring a different approach. For example, there are
many tunables that are exposed at various layers that allow organizations to
secure their cloud native platform. A good example are Linux Security Modules
(LSMs) such as seccomp, SELinux, and apparmor that can be used to further secure
the container runtime environment. These tunables are often abstracted away from
the end user by the container runtime or orchestration layers to hide this layer
of complexity from developers. However, these low level tunables are an
important consideration for providing an effective layered approach to security.
In creating a separate security-focused landscape, we are aiming to more
effectively highlight the various layers of security considerations, as well as
tools that can help companies with fine-tuning their approach at each layer.

## <a name="mapping"></a>Mapping projects into the landscape

We do not yet have plans for precisely how projects will be mapped into the
Security Landscape. If we were to follow the model of the current CNCF landscape
we would require each project to be placed in exactly one security landscape
sub-category, but this forces tools with multiple common uses to artificially
choose a “most common” use case as its sub-category. A possible alternative
will be to define a list of key features, map the key features into the
landscape sub-categories, and then list the key features of each tool.
In this flow, individual tools may appear in multiple sub-categories.
Deciding precisely how to map tools into the security landscape sub-categories
is future work and will occur after gathering feedback from the community on the
preferred solution.
