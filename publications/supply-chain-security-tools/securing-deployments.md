# Securing Deployments

{{% blocks/lead color="white" align="left" %}}
Here are the list of requirements for securing deployments. Each one has a list of tools used to achieve it.
{{% /blocks/lead %}}

## 1. Ensure clients can perform Verification of Artefacts and associated metadata

### Tool capability

- perform client verification

### Tools

- Sigstore (cosign)
- in-toto (in-toto implementations support verification of metadata against layouts)
- TUF
- Tekton (chains with sigstore)
- Kyverno (Kyverno policies validate artifacts and metadata)


## 2. Ensure clients can verify the "freshness" of files

### Tool capability

- verify freshness of files

### Tools

- Sigstore (Rekor)
- TUF

## 3. Use The Update Framework

### Tool capability

- support TUF metadata creation
- support TUF metadata verification

### Tools

- TUF
