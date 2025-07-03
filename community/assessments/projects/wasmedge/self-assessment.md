# WasmEdge Security Self-assessment
<!-- cSpell:ignore Ying Shen Hsieh ibmibmibm hydai wasmedge WASI wasi unvalidated spectest Segv kwasm crun -->

Authors: dm4(@dm4)

Security reviewers: dm4(@dm4), Yi-Ying He(@q82419), Shen-Ta Hsieh(@ibmibmibm), Hung-Ying Tai(@hydai)

## Table of contents

* [Metadata](#metadata)
  * [Security links](#security-links)
* [Overview](#overview)
  * [Actors](#actors)
  * [Actions](#actions)
  * [Background](#background)
  * [Goals](#goals)
  * [Non-goals](#non-goals)
* [Self-assessment use](#self-assessment-use)
* [Security functions and features](#security-functions-and-features)
* [Project compliance](#project-compliance)
* [Secure development practices](#secure-development-practices)
* [Security issue resolution](#security-issue-resolution)

## Metadata

A table at the top for quick reference information, later used for indexing.

| Title | Detail |
| -- | -- |
| Assessment Stage | Incomplete. |
| Software | <https://github.com/WasmEdge/WasmEdge> |
| Security Provider | No.  |
| Languages | C++ |
| SBOM | The software bill of materials for WasmEdge can be found at [LICENSE.spdx](https://github.com/WasmEdge/WasmEdge/blob/master/LICENSE.spdx) and in [sbom.tar.gz](https://github.com/WasmEdge/WasmEdge/releases/download/0.14.1/sbom.tar.gz) within each release. |

### Security links

| Doc | URL |
| -- | -- |
| Security file | <https://github.com/WasmEdge/WasmEdge/blob/master/SECURITY.md> |
| Embargo policy | <https://github.com/WasmEdge/WasmEdge/blob/master/docs/embargo-policy.md> |
| Security contacts | <https://github.com/WasmEdge/WasmEdge/blob/master/docs/SECURITY_CONTACTS.md> |

## Overview

WasmEdge is a lightweight, high-performance, and extensible WebAssembly runtime.
It is the fastest Wasm VM today. Its use cases include modern web application
architectures (Isomorphic & Jamstack applications), microservices on the edge
cloud, serverless SaaS APIs, embedded functions, smart contracts, and smart
devices.

### Background

The WasmEdge Runtime provides a well-defined execution sandbox for its contained WebAssembly bytecode program. The runtime offers isolation and protection for operating system resources (e.g., file system, sockets, environment variables, processes) and memory space. Because the implementation of WasmEdge follows the WebAssembly spec, each module can execute within a sandboxed environment that is separated from the host runtime. You can refer to [WebAssembly/Security](https://webassembly.org/docs/security/).

Since WebAssembly essentially defines a virtual instruction set architecture (virtual ISA), and WasmEdge is the runtime used to execute this instruction set, when considering the security of WasmEdge, we must understand what instructions WebAssembly defines and whether any instruction can affect the host environment (the environment where WasmEdge is executed) during execution.

According to the WebAssembly specification, any interaction with the environment, such as I/O, access to resources, or operating system calls, can only be performed by invoking functions provided by the runtime and imported into a WebAssembly module (Reference: [WebAssembly - Introduction - Security Considerations](https://webassembly.github.io/spec/core/intro/introduction.html#security-considerations)).

Therefore, we can ascertain that when WasmEdge executes any WebAssembly instruction, as long as it is not calling imported functions, the executed instruction will not affect the host environment (the environment where WasmEdge is executed).

For imported functions that can affect the host environment, WasmEdge implements them through the [WebAssembly System Interface (WASI)](https://github.com/WebAssembly/WASI). WasmEdge runs the [WebAssembly/wasi-testsuite](https://github.com/WebAssembly/wasi-testsuite) during testing to ensure implementation correctness.

For each module, all OS resources are accessed through the WebAssembly System Interface (WASI). Therefore, each module can only see the virtual resources provided by WasmEdge. This approach allows WasmEdge to effectively manage OS resources. On the same host, each executing wasm program sees an independent set of OS resources and memory space, managed by WasmEdge.

The most important use case for WasmEdge is to safely execute user-defined or community-contributed code as plug-ins in a software product (e.g., SaaS, software-defined vehicles, edge nodes, or even blockchain nodes).
It enables third-party developers, vendors, suppliers, and community members to extend and customize the software product. For example, by adding support for WebAssembly functionality in a software product, we can support machine learning interfaces like [WASI-NN](https://github.com/WebAssembly/wasi-nn).
This makes it easier for developers to support machine learning backends such as OpenVINO or PyTorch.

### Actors

* WasmEdge Tool
  * Provides CLI tools for users.
  * The CLI tools offer a user-friendly interface to interact with WasmEdge functionalities.
  * Includes commands for compiling, running, and debugging WebAssembly applications.
  * WasmEdge will verify whether the options passed to the CLI are valid. If a specified option does not exist or is invalid, a warning will be displayed. However, any parameters passed to the wasm program will be passed through and handled by the wasm program itself.
* WasmEdge Loader
  * Loads the WebAssembly bytecode file.
  * Parses the loaded bytecode to an Abstract Syntax Tree (AST).
  * The structure of the AST is defined in the WebAssembly specification. After the Loader reads the bytecode of a wasm program, it will check whether these bytecode conform to the [WebAssembly binary format](https://webassembly.github.io/spec/core/binary/index.html).
  * Ensures that the bytecode is correctly structured for further processing.
  * To ensure the correctness of the WasmEdge Loader, we use the official WebAssembly spec tests ([WebAssembly/spec/test/core](https://github.com/WebAssembly/spec/tree/main/test/core)) in our unit tests. These unit tests are executed with every pull request to ensure the correctness of the Loader.
* WasmEdge Validator
  * Validates the parsed bytecode AST to ensure it complies with WebAssembly specifications.
  * Checks for semantic correctness to ensure that the AST read by the Loader is valid, according to the [WebAssembly validation](https://webassembly.github.io/spec/core/valid/index.html).
  * During this phase, the Validator performs type checking of functions and the instruction sequences in their bodies, ensuring that the operand stack is used consistently, among other checks.
* WasmEdge Engine
  * The actual WebAssembly runtime that executes the bytecode.
  * Interprets the bytecode and performs the corresponding operations.
  * Manages the execution environment, including memory, stack, and system resources.
  * Ensures efficient and secure execution of WebAssembly modules.
  * Each module can only see the virtual resources and virtual memory provided by the WasmEdge Engine. This approach allows the WasmEdge Engine to effectively manage OS resources and memory. On the same host, each executing wasm program sees an independent set of OS resources and memory space, managed by the WasmEdge Engine.

### Actions

To execute WebAssembly code, WasmEdge follows a series of steps involving multiple components, each with specific responsibilities. Here is a detailed description of the process, focusing on data flow and interactions between components:

* Interacting with Users (WasmEdge Tool)

  * Data Input: The WasmEdge Tool provides a Command-Line Interface (CLI) for users to interact with the WasmEdge functionalities.
  * Action: Users can issue commands to compile, run, and debug WebAssembly applications. These commands are processed by the CLI tools, which internally utilize the Loader, Validator, and Engine components to carry out the requested actions. All of these components are packaged into one WasmEdge binary.
  * Output: The CLI tools offer feedback to the users, such as execution results, debug information, and error messages.

* Loading the WebAssembly Bytecode (WasmEdge Loader)

  * Data Input: The process begins with the WasmEdge Loader component, which receives a WebAssembly bytecode file as input.
  * Action: The Loader reads and parses this bytecode file, converting it into an Abstract Syntax Tree (AST).
  * Output: The AST, which represents the structured form of the bytecode, is produced as output for further processing.

* Validating the Bytecode (WasmEdge Validator)

  * Data Input: The AST generated by the Loader is passed to the WasmEdge Validator.
  * Action: The Validator component checks the AST to ensure that it complies with WebAssembly specifications.
    This involves verifying semantic correctness and security constraints, ensuring there are no invalid or malicious instructions. According to the current design, unvalidated modules cannot be executed. After validating a module, we [set the validated flag](https://github.com/WasmEdge/WasmEdge/blob/7a4e4ae/lib/validator/validator.cpp#L130), and when initiating a module,
    we [check the validated flag](https://github.com/WasmEdge/WasmEdge/blob/master/lib/executor/instantiate/module.cpp#L20) to ensure that only validated modules can be executed.
  * Output: If the bytecode is valid, the Validator produces a validated AST. If invalid, it generates error messages indicating the issues found.

* Executing the Bytecode (WasmEdge Engine)

  * Data Input: The validated AST is passed to the WasmEdge Engine, which is the core component responsible for executing the WebAssembly code.
  * Action: The Engine interprets the bytecode and performs the corresponding operations. It manages the execution environment, including memory, stack, and system resources. This ensures efficient and secure execution of the WebAssembly modules.
  * Output: The execution results, which could include changes in memory, generated outputs, or responses from invoked functions.

The interaction between these components ensures a smooth and secure execution flow for WebAssembly programs in WasmEdge. The Loader initiates the process by parsing the bytecode, the Validator ensures its compliance with standards, the Engine executes the validated code, and the Tool provides a user-friendly interface for these operations. This modular approach allows for efficient handling and execution of WebAssembly code, making WasmEdge a robust and high-performance WebAssembly runtime.

### Goals

* Provide a well-defined execution sandbox for contained WebAssembly bytecode programs.
* Offer isolation and protection for operating system resources and memory space.
* Execute user-defined or community-contributed code as plug-ins.

### Non-goals

* Compile code from any language into WebAssembly bytecode.
* Regarding the issue of DoS: if users execute relatively high-load programs on resource-constrained devices leading to DoS, it is not within our focus scope. We believe that if DoS is caused by improper design of the WasmEdge engine or executor, then that is our focus goal.

## Self-assessment use

This self-assessment is created by the WasmEdge team to perform an internal
analysis of the project's security.  It is not intended to provide a security
audit of WasmEdge, or function as an independent assessment or attestation of
WasmEdge's security health.

This document serves to provide WasmEdge users with an initial understanding of
WasmEdge's security, where to find existing security documentation, WasmEdge
plans for security, and general overview of WasmEdge security practices, both
for development of WasmEdge as well as security of WasmEdge.

This document provides the CNCF TAG-Security with an initial understanding of
WasmEdge to assist in a joint-assessment, necessary for projects under
incubation.  Taken together, this document and the joint-assessment serve as a
cornerstone for if and when WasmEdge seeks graduation and is preparing for a
security audit.

## Security functions and features

* WasmEdge is a standalone WebAssembly runtime where all WebAssembly bytecode runs independently within this execution sandbox, rather than being managed by the OS. Access to system resources, whether files, hardware, or internet connections, can only be achieved through the WebAssembly system interfaces (WASI) provided by WasmEdge.
* By following the WebAssembly specification, WasmEdge has the same security properties. Here are some of the main security properties:
  * Modular Isolation: Wasm runs in a sandboxed environment, ensuring that each WebAssembly module is isolated from other modules and the host environment. This isolation prevents direct memory access between modules, enhancing security. Side channel attacks are outside the scope of our focus.
  * Linear Memory Model: Wasm uses a linear memory model, meaning memory is treated as a contiguous byte array. This model prevents common programming errors found in traditional languages, such as buffer overflows.
  * Type Safety: WebAssembly is strongly typed, with type checks performed both at compile-time and runtime. This reduces the risk of security vulnerabilities caused by type errors.
  * No Direct System Calls: Wasm does not allow direct system calls, meaning that even if the code is compromised, it is difficult to directly harm the host system.
* If users want to access the host OS's filesystem within the WasmEdge runtime, they can add the `--dir guest_path:host_path` option in the WasmEdge CLI.
* If users want to prevent host files from being modified, they can add the :readonly flag in the option, like `--dir guest_path:host_path:readonly`. The WasmEdge runtime will manage the filesystem usage to grant only read-only access to the wasm program.
* Currently, only the `--dir` option allows the host's filesystem to be accessed by the wasm program through the WASI, using the virtual filesystem provided by WasmEdge. This part is implemented in accordance with the [WASI-filesystem](https://github.com/WebAssembly/wasi-filesystem) API.

## Project compliance

* Currently, WasmEdge does not meet any security standards or sub-sections.

## Secure development practices

* Development Pipeline
  * WasmEdge requires contributors to sign off on web-based commits.
  * A normal pull request must be approved by one of the WasmEdge maintainers, committers, or reviewers before merging. However, a governance-related pull request must be approved by 75% of the WasmEdge maintainers.
  * For a new contributor, their pull request will not be able to be triggered unless one of the WasmEdge maintainers or committers approves the CI permission to avoid attacks on the workflow.
  * As mentioned in our [GOVERNANCE.md](https://github.com/WasmEdge/WasmEdge/blob/master/docs/GOVERNANCE.md), in extreme cases, maintainers can initiate a vote to remove a specific maintainer from the maintainer list through the voting process.
  * The pull request must pass the CI jobs before merging.
  * In the tests used for WasmEdge, there are many security-related tests from the official WebAssembly spec test, such as out-of-bound memory access, invalid type, malformed binary, and so on.
  * The source of the official WebAssembly spec test is at [WebAssembly/spec/test](https://github.com/WebAssembly/spec/tree/main/test).
    We have converted these tests into a format executable by WasmEdge, available at [WasmEdge/wasmedge-spectest](https://github.com/WasmEdge/wasmedge-spectest).
    The entry for these tests on CI is in [build.yml](https://github.com/WasmEdge/WasmEdge/blob/master/.github/workflows/build.yml), and the test results can be seen in [Test WasmEdge Core](https://github.com/WasmEdge/WasmEdge/actions/workflows/build.yml).
    The logs of the CI tests are publicly available.
  * WasmEdge also participates in OSS-Fuzz
    <https://github.com/google/oss-fuzz/tree/master/projects/wasmedge>. OSS-Fuzz
    aims to make common open-source software more secure and stable by
    combining modern fuzzing techniques with scalable, distributed execution.
    Participating in OSS-Fuzz allows us to better identify potential issues in
    WasmEdge through fuzzing.
* Communication Channels
  * Internal
    * Direct message on [WasmEdge Discord server](https://discord.gg/h4KDyB8XTt).
  * Inbound
    * [WasmEdge Discord server](https://discord.gg/h4KDyB8XTt).
    * **#wasmedge** channel on the [CNCF Slack](https://slack.cncf.io/).
  * Outbound
    * [WasmEdge Discord server](https://discord.gg/h4KDyB8XTt).
    * **#wasmedge** channel on the [CNCF Slack](https://slack.cncf.io/).
    * Mailing list <wasmedge@googlegroups.com>.
    * We host a monthly community meeting to showcase new features, demo new use cases, and a Q&A part.
      * The first Tuesday of each month at 11 PM Hong Kong Time/ 7 AM PST.
* Ecosystem

  WasmEdge is a highly optimized WebAssembly runtime environment that seamlessly integrates into the cloud-native ecosystem, particularly in terms of container runtimes. WasmEdge can serve as a WebAssembly image runtime in Kubernetes, which gives it a unique advantage in cloud-native infrastructure.

  Firstly, WasmEdge offers extremely fast startup times, which is crucial in scenarios requiring rapid response, such as Edge Computing. Secondly, WasmEdge has a smaller memory and disk space footprint, enabling it to run efficiently in resource-constrained environments. This is a significant advantage for applications that need to run multiple microservices on edge devices such as Android, OpenHarmony, Raspberry Pi, and the seL4 RTOS.

  Moreover, the integration of WasmEdge with Kubernetes means it can directly leverage existing cloud-native tools and infrastructure, such as container orchestration, service discovery, and auto-scaling, further enhancing its applicability in the cloud-native ecosystem. These features make WasmEdge a powerful tool capable of meeting the demands of modern applications, particularly in scenarios that require efficient, lightweight, and rapid deployment.

## Security issue resolution

As stated in the [WasmEdge security document](https://github.com/WasmEdge/WasmEdge/blob/master/SECURITY.md), the process for handling security reports is as follows:

Users can use the below process to report a vulnerability to WasmEdge:

Email:

1. Send email to <wasmedge-security@lists.cncf.io>
   * Emails should contain:
     * description of the problem
     * precise and detailed steps (including screenshots) that created the problem
     * the affected version(s)
     * any possible mitigations, if known
   * This mailing list is only visible to the security contacts defined in [WasmEdge/SECURITY_CONTACTS.md](https://github.com/WasmEdge/WasmEdge/blob/master/docs/SECURITY_CONTACTS.md).
2. You will receive a reply from one of the maintainers within 24 hours acknowledging receipt of the email. After that, we will give a detailed response about the subsequent process within 48 hours.
3. Please do not submit security vulnerabilities directly as GitHub Issues.

Web:

1. Please visit the [GitHub Security Advisory of WasmEdge](https://github.com/WasmEdge/WasmEdge/security/advisories/new)
   * You will receive a confirmation email upon submission

WasmEdge follows a **`90 day` disclosure timeline**. For known public security vulnerabilities, we will disclose the vulnerability as soon as possible after receiving the report. Vulnerabilities discovered for the first time will be disclosed in accordance with the following process:

* The received security vulnerability report shall be handed over to the security team for follow-up coordination and repair work.
* After the vulnerability is confirmed, we will create a draft Security Advisory on Github that lists the details of the vulnerability.
* Invite related personnel to discuss how to create the fix.
* Fork the temporary private repository on Github, and collaborate to fix the vulnerability.
* We aim to fix the reported vulnerability within a 90-day disclosure timeline and release a new version for end-users within this period.
* On some occasions, we may need to extend this timeline due to the complexity of the problem, lack of available expertise, or other reasons. Submitters will be notified if an extension occurs.
* After the fix code is merged into [all supported versions](https://github.com/WasmEdge/WasmEdge/blob/master/SECURITY.md#supported-versions), the vulnerability will be publicly posted in the GitHub Advisory Database.
* We have a mailing list at <wasmedge@googlegroups.com>, which you can join or browse through this link: [https://groups.google.com/g/wasmedge/](https://groups.google.com/g/wasmedge/). We plan to send upgrade notifications through this mailing list.

## Appendix

### Known Issues Over Time

* [Off-by-one vulnerability of PC stack](https://github.com/ha1vk/blackhat_wasm), which successfully conducts RCE on the host. This was fixed in commit [f2d1427](https://github.com/WasmEdge/WasmEdge/commit/f2d1427).
* [OSV-2023-1119](https://osv.dev/vulnerability/OSV-2023-1119) Segv on unknown address in FunctionCompiler::compileReturn. This was fixed in commit [9ba5f8f](https://github.com/WasmEdge/WasmEdge/commit/9ba5f8f).
* [OSV-2024-140](https://osv.dev/vulnerability/OSV-2024-140) Container-overflow in WasmEdge::LLVM::Compiler::compile. This was fixed in commit [62ce0ee](https://github.com/WasmEdge/WasmEdge/commit/62ce0ee).

### OpenSSF Best Practices

[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/5059/badge)](https://www.bestpractices.dev/projects/5059)

Currently, WasmEdge has a passing level badge for CII best practices. To achieve the silver level badge, WasmEdge still needs to work on the following aspects:

* Project oversight: For instance, all developers making significant contributions to the project software should declare that they have the legal authority to make such contributions, or clearly define and document the governance model or code of conduct.
* Documentation: This self-assessment document could be used as an architecture document, but we still need some practices for accessibility and internationalization, among others.

These areas are goals that WasmEdge is continuously working towards to comply with OpenSSF Best Practices.

### Case Studies

* Developers can leverage container tools such as Kubernetes, Docker, and CRI-O to deploy, manage, and run lightweight WebAssembly applications. For example, using [KWasm/kwasm-operator](https://github.com/KWasm/kwasm-operator), you can easily specify WasmEdge as the runtime in the YAML file to execute a specified WebAssembly image, such as `wasmedge/example-wasi:latest`.
* Through WasmEdge's WASI-NN support, machine learning-related functions can be implemented via the WASI-NN API. For instance, [LlamaEdge](https://github.com/LlamaEdge/LlamaEdge) utilizes this feature to perform LLM inference using WasmEdge as the runtime.

### Related Projects / Vendors

* [WebAssembly Specification](https://webassembly.github.io/spec/core/): The WebAssembly draft specification, a reference implementation, and the official testsuite.
* [WebAssembly/WASI](https://github.com/WebAssembly/WASI): The WebAssembly System Interface (WASI) is a set of APIs for WASI being developed for eventual standardization by the WASI Subgroup, which is a subgroup of the WebAssembly Community Group.
* [crun](https://github.com/containers/crun): A fast and low-memory footprint OCI Container Runtime fully written in C, which has WasmEdge support.
* [LlamaEdge](https://github.com/LlamaEdge/LlamaEdge): The LlamaEdge project makes it easy for you to run LLM inference apps and create OpenAI-compatible API services for the Llama2 series of LLMs locally.
