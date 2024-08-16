<!-- cspell:ignore pyg-modules -->
<!-- cspell:ignore pygrata -->
<!-- cspell:ignore pygrata-utils -->
<!-- cspell:ignore loglib -->
<!-- cspell:ignore loglib-modules -->
<!-- cspell:ignore hkg-sol-utils -->
<!-- cspell:ignore hxxp -->
<!-- cspell:ignore Backdoored -->

# PyPI python packages caught sending stolen AWS keys to unsecured sites

PyPI is the open registry for open source packages for the Python
developer ecosystem.

On June 24th it was reported that malicious typosquatted
Python packages available on the PyPI repository were caught stealing
sensitive information such as AWS credentials and making them available
on a publicly exposed endpoints.

Packages known to be part of this incident:

- loglib-modules
- pyg-modules
- pygrata
- pygrata-utils
- hkg-sol-utils

## Impact

The malicious code in said packages allowed them to harvest AWS
related credentials, network configuration, and environment variables
and upload them to a remote endpoint identified as:
`hxxp://graph.pygrata[.]com:8000/upload`.

This incident was played out as a proof-of-concept by an individual,
however, it ended up exposing the data it gathered via insecure
storage.

The packages as well as the aforementioned endpoint have now been
taken down.

## Type of Compromise

This incident fits the [Dev Tooling](../compromise-definitions.md#dev-tooling)
definition.

## References

- [Multiple Backdoored Python Libraries Caught Stealing AWS Secrets and Keys](https://thehackernews.com/2022/06/multiple-backdoored-python-libraries.html)
