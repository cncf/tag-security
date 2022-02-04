# Secrets leak and other sensitive information due to a bug in Travis CI

Travis CI is a popular continuous integration (CI) and build service,
originally forked from the Jenkins project, and later spun-off as a paid
service. On September 23rd, 2021, they reported [1] that users and customers
of their service, who had sensitive information in public repositories, and
of which these were forked, had leaked these secrets in the build
infrastructure logs were the CI service was ran.

## Impact

* All public repositories that observed forks during the period of September 3rd
and September 10th 2021
* Any environment variables that were used as protected secrets in the project's
configuration were leaked and available to CI runs in publicly forked repositories.

## Remediation

* Travis CI notified users and customers to rotate their keys and secrets

## Type of Compromise

Dev Tooling

## References

1. Travis CI Security Bulletin, `<https://travis-ci.community/t/security-bulletin/12081>`.
