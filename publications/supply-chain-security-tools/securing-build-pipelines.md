# Securing Build Pipelines

{{% blocks/lead color="white" align="left" %}}
Here are the list of requirements for securing build pipelines. Each one has a list of tools used to achieve it.
{{% /blocks/lead %}}

## 1. Cryptographically guarantee policy adherence

### Tool capability

- attest to steps
- verify policy adherence
- define the policy

### Tools

- SLSA (level 1)
- in-toto


## 2. Validate environments and dependencies before usage

### Tool capability

- validate dependencies
- validate environments
- verify signatures on build images

### Tools

- in-toto (in-toto can wrap the fetch / bootstrap processes and metadata can be consumed by upper-turtle processes via sublayouts)
- SPIFFE (validates environments)
- Tekton (there is an open TEP to integrate with SPIFFE to validate node/workload)
- Kyverno (If the environment is a container, Kyverno can verify the policy (allowed source, signer))

## 3. Validate runtime security of build workers

### Tool capability

- monitor runtime processes
- attest to runtime operations
- verify runtime attestations
- trusted execution environment

### Tools

- in-toto (runtime trace attestations)

## 4. Validate Build artifacts through verifiably reproducible builds

### Tool capability

- make reproducible build
- re-build images in isolated environments (security enclaves/trust boundaries)
- validate builds from multiple sources

### Tools

- in-toto
- apko

## 5. Lock and Verify External Requirements From The Build Process

### Tool capability

- lock and record external requirements
- verify external requirements

### Tools

- apko

## 6. Find and Eliminate Sources Of Non-Determinism

### Tool capability

- make diffs of builds

### Tools

- apko

## 7. Record The Build Environment

### Tool capability

- record the build environment

### Tools

- SLSA (level 3)
- in-toto (in-toto provides the formats, it's unopinionated about what's recorded)
- apko
- Tekton (Chains)

## 8. Automate Creation Of The Build Environment

### Tool capability

- environment creation automation

### Tools

- apko
- Tekton (Pipelines)

## 9. Distribute Builds Across Different Infrastructure

### Tool capability

- define multiple infrastructure setups
- run builds in multiple environments

### Tools

- Tekton (Pipelines)

## 10. Build and related continuous integration/continuous delivery steps should all be automated through a pipeline defined as code

### Tool capability

- define pipeline in code
- run pipeline as code

### Tools

- SLSA (level 1)
- apko
- Tekton (Pipelines)

## 11. Standardize pipelines across projects

### Tool capability

- _none_

### Tools

- Tekton (Pipelines)

## 12. Provision a secured orchestration platform to host software factory

### Tool capability

- perform secure orchestration

### Tools

- Tekton (Pipelines)

## 13. Build Workers Should be Single Use

### Tool capability

- single-use containerized builders
- verify that builders are single use
- attest to build identity

### Tools

- SLSA (level 3)
- in-toto (can be validated via runtime trace attestations)
- Tekton (Pipelines)

## 14. Ensure Software Factory has minimal network connectivity.

### Tool capability

- check for and monitor network connections

### Tools

- SLSA (level 3)
- in-toto (can be validated via runtime trace attestations)

## 15. Segregate the Duties of Each Build Worker

### Tool capability

- define scope of each build worker
- attest to which build worker performs each action
- verify that build workers follow the policy

### Tools

- in-toto
- Tekton (Pipelines)

## 15. Pass in Build Worker Environment and Commands

### Tool capability

- provision build workers with environment and commands within a hermetic build environment

### Tools

- in-toto (can be validated via runtime trace attestations)
- Tekton (Pipelines)

## 16. Write Output to a Separate Secured Storage Repo

### Tool capability

- secured storage repo

### Tools

- Sigstore (Rekor)
- in-toto (depending on where you put the in-toto metadata)

## 17. Only allow pipeline modifications through "pipeline as code"

### Tool capability

- attest to pipeline state and modifications
- verify that pipeline modifications are made through pipeline as code
- ensure pipeline goes through source control

### Tools

- SLSA (level 3)
- Tekton (Pipelines)

## 18. Define user roles

### Tool capability

- define user roles
- attest to role for each action
- enforce user roles

### Tools

- in-toto

## 19. Follow established practices for establishing a root of trust from an offline source

### Tool capability

- securely distribute root of trust
- chain from existing trusted root

### Tools

- TUF

## 20. Use short-lived Workload Certificates

### Tool capability

- create short-lived certificates
- verify short-lived certificates using their validity period
- verify that workload certificates are short-lived

### Tools

- in-toto (integrates with SPIFFE/SPIRE)
- SPIFFE
- Tekton (TEP to integrate with SPIRE)

## 21. Deploy monitoring tools to software factory to detect malicious behaviour

### Tool capability

- runtime monitoring
- analysis of built artifacts

### Tools

- in-toto (runtime trace attestations generated using tools like tetragon)
- SPIFFE
- Tekton (TEP to integrate with SPIRE)
