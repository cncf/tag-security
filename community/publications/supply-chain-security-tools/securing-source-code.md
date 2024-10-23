# Securing the Source Code

{{% blocks/lead color="white" align="left" %}}
Here are the list of requirements for securing the source code, which is a subcategory of the overall requirements for supply chain security. For each requirement is a list of tools used to meet that requirement.
{{% /blocks/lead %}}

## 1. Require signed commits

### Tool capability

- sign commits
- verify signed commits

### Tools

- Sigstore (gitsign)
- gittuf
- GUAC

## 2. Enforce full attestation and verification for protected branches

### Tool capability

- monitor protected branches

### Tools

- gittuf

## 3. Prevent committing secrets to the source code repository

### Tool capability

- check commits
- verify that no secrets are in the repository

### Tools

- _none_

## 4. Define individuals/teams that are responsible for code in a repository and associated coding conventions

### Tool capability

- verifying coding conventions

### Tools

- GitHub
- gittuf
- GUAC

## 5. Automate software security scanning and testing

### Tool capability

- scan software
- perform tests
- automation at build time
- automation at production time
- determine what to do with scan results

### Tools

- in-toto (test result attestations)

## 6. Establish and adhere to contribution policies

### Tool capability

- check for contribution guidelines
- DCO

### Tools

- GitHub

## 7. Define roles aligned to functional responsibilities

### Tool capability

- none

### Tools

- GitHub
- gittuf

## 8. Enforce an independent four-eyes principle

### Tool capability

- require review before merge
- attest to a review
- verify attestation of review

### Tools

- SLSA (level 4)
- in-toto (threshold of human review attestations)
- GitHub


## 9. Use branch protection rules

### Tool capability

- verify branch protection is turned on over time

### Tools

- GitHub
- gittuf

## 10. Enforce MFA for accessing source code repositories

### Tool capability

- enable MFA
- verify MFA is enabled for all contributors

### Tools

- GitHub

## 11. Use SSH keys to provide developers access to source code repositories

### Tool capability

- enforce that ssh keys are used (and disable https)

### Tools

- GitHub

## 12. Have a Key Rotation Policy

### Tool capability

- key expiration
- key distribution/PKI for ssh

### Tools

- gittuf

## 13. Use short-lived/ephemeral credentials for machine/service access

### Tool capability

- require short-lived credentials

### Tools

- SPIFFE (maybe, spiffe does short-lived credentials, but not sure if anyone is using this for source code repos)

