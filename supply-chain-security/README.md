# Software Supply Chain

Supply chain compromises are a powerful attack vector. In cloud native
deployments everything is software-defined, so there is increased risk when
there are vulnerabilities in this area. If an attacker controls the supply
chain, they can potentially reconfigure anything in an insecure way.

## What are supply chain vulnerabilities and their implications?

The [Catalog of Supply Chain Compromises](./compromises) provides real-world
examples that help raise awareness and provide detailed information that
let's us understand attack vectors and consider how to mitigate potential
risk.

## On mitigating vulnerabilities

There is on-going work to establish best practices in this area. The list of
[types of supply chain compromises](./compromises/compromise-definitions.md)
in the [catalog of supply chain compromises](./compromises) suggests some
mitigation techniques for the more well understood categories.

## Supply chain security paper

STAG (Security Technical Advisory Group) has put work into a comprehensive
software supply chain paper highlighting best practices for high and medium risk
environments. Please check out
[the paper](./supply-chain-security-paper/sscsp.md)
and corollary
[secure supply chain assessment document](./supply-chain-security-paper/secure-supply-chain-assessment.md)
to learn more.

For information about contributing to the document or providing feedback, please
refer to the [README](./supply-chain-security-paper/README.md).
