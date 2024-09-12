# Securing Materials

{{% blocks/lead color="white" align="left" %}}
Here are the list of requirements for securing materials. Each one has a list of tools used to achieve it.
{{% /blocks/lead %}}

## 1. Verify third party artefacts and open source libraries

### Tool capability

- attest to review
- verify review attestations

### Tools

- in-toto (can be validated via alpha-omega attestations, review attestations)


## 2. Require SBOM from third party supplier

### Tool capability

- generate accurate SBOM
- verify SBOM existence
- verify SBOM accuracy

### Tools

- _none_

## 3. Track dependencies between open source components

### Tool capability

- create accurate SBOM
- update SBOM

### Tools

- _none_

## 4. Build libraries based upon source code

### Tool capability

- attest to build
- verify attestation of build
- maintain list of trusted sources for built software
- attestation from third-party builder/distributor
- publish hashes for pre-built software

### Tools

- in-toto
- apko

## 5. Define and prioritize trusted package managers and repositories

### Tool capability

- define trusted/prioritized repositories
- enforce the priority

### Tools

- TUF

## 6. Generate an immutable SBOM of the code

### Tool capability

- generate an accurate SBOM (signed)

### Tools

- in-toto (SBOM attestations)
- apko

## 7. Scan software for vulnerabilities

### Tool capability

- scan the software

### Tools

- in-toto

## 8. Scan software for license implications

### Tool capability

- scan the software

### Tools

- _none_

## 9. Run software composition analysis on ingested software

### Tool capability

- run software composition analysis
- ingest an SBOM
- verify an SBOM's claims

### Tools

- _none_
