# Securing Artifacts

{{% blocks/lead color="white" align="left" %}}
Here are the list of requirements for securing artifacts. Each one has a list of tools used to achieve it.
{{% /blocks/lead %}}

## 1. Sign Every Step in the Build Process

### Tool capability

- sign attestations for every step in the build process
- define all expected steps in the build process with identities

### Tools

- SLSA (level 1)
- in-toto
- Tekton (chains)

## 2. Validate the Signatures Generated at Each Step

### Tool capability

- verify attestations of every step

### Tools

- in-toto
- Kyverno (signatures of output images are verified before running containers)

## 3. Use TUF/Notary to manage signing of artefacts

### Tool capability

- delegate trust for specific artifacts to specific developers
- enable developer signing of metadata
- prevent rollback attacks on developer signatures

### Tools

- TUF
- Tekton (chains uses Sigstore)
- Kyverno (Kyverno supports Sigstore)

## 4. Use a store to manage metadata from in-toto

### Tool capability

- store in-toto metadata

### Tools

- Sigstore (Rekor?)
- in-toto (integrated with Rekor, Grafeas, Archivist etc.)
- Tekton (chains)


## 5. Limit which artefacts any given party is authorized to certify

### Tool capability

- specify trusted entities for each artifact in policy
- enforce this limitation

### Tools

- in-toto
- TUF
- Kyverno (Kyverno policy on who is trusted for each signature)


## 6. Build in a system for rotating and revoking private keys

### Tool capability

- change policy to revoke a trusted key
- change policy to rotate a trusted key
- communicate these changes to users

### Tools

- Sigstore (Fulcio)
- in-toto (in-toto layouts can rotate and revoke keys for attestations, layout keys are managed separately such as by using TUF)
- TUF
- SPIFFE

## 7. Use a container registry that supports OCI image-spec images

### Tool capability

- follow the OCI spec

### Tools

- Sigstore (cosign)
- Tekton (Pipelines and Chains)
- Kyverno (Kyverno works with OCI registries)

## 8. Encrypt artefacts before distribution & ensure only authorized platforms have decryption capabilities

### Tool capability

- create policy for which platforms have decryption capabilities
- enforce this policy

### Tools

- _none_
