# Securing the Source Code

{{% blocks/lead color="white" align="left" %}}
Here are the list of requirements for securing the source code, which is a subcategory of the overall requirements for supply chain security. For each requirement is a list of tools used to meet that requirement.
{{% /blocks/lead %}}

## 1. Require signed commits

Tool capability: sign commits, verify signed commits

### Tools

- Sigstore (gitsign)
- gittuf
- GUAC

## 2. Enforce full attestation and verification for protected branches

Tool capability: monitor protected branches

### Tools

- gittuf

## 3. Prevent committing secrets to the source code repository

## 4. Define individuals/teams that are responsible for code in a repository and associated coding conventions

## 5. Automate software security scanning and testing

## 6. Establish and adhere to contribution policies

## 7. Define roles aligned to functional responsibilities

## 8. Enforce an independent four-eyes principle

## 9. Use branch protection rules

## 10. Enforce MFA for accessing source code repositories

## 11. Use SSH keys to provide developers access to source code repositories

## 12. Have a Key Rotation Policy

## 13. Use short-lived/ephemeral credentials for machine/service access
