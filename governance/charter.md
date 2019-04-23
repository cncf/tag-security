# SIG-Security Charter (draft)

**Mission:** to reduce risk that cloud native
applications expose end user data or allow other unintended access.

## Motivation
Security has been an area in which open source can flourish and sometimes has done so; however, with cloud native platforms and applications security has received less attention than other areas of the cloud native landscape.

This means that there is less visibility about the internals of security projects, and fewer projects being deeply integrated into cloud native tooling. While there are many open source security projects, there are fewer security experts focused on the cloud native ecosystem. This has contributed to a culture where people feel they cannot understand how to securely set up and operate cloud native systems, due to obscurity and uncertainty. Yet the cloud native principles, although they mean change, have encouraged the development of tools that help manage fast changing environments, and which have the promise of both simplifying and improving security.

Making security more open and understandable is an essential part of this change. Talking to customers, security is the most important and least understood part of the cloud native transition. Security is not an easy field, and it is difficult to measure and value the inputs precisely, which can also cause issues with evaluation of security software and designs.

Distributed deployments across heterogeneous infrastructure are increasingly
common for cloud native applications. The working group sees common need
patterns in cloud-native application architecture to improve the security of
the systems. Without common ways to programatically ensure consistent policy,
it is increasingly difficult to evaluate system architecture security at scale.

## Focus

Three keys areas:
* protection of heterogeneous, distributed and fast changing systems, while providing access that is needed,
* a common understanding and common tooling to help developers meet security requirements, and
* common tooling for audit and reasoning about system properties.

