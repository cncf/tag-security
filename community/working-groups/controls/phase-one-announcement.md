# Intro the Cloud Native Security Controls Catalog

The CNCF Security Technical Advisory Group ("Security TAG") has provided a
wealth of information to assist organizations in the planning and design of
secure cloud native systems, including the [Cloud Native Security
Whitepaper](https://github.com/cncf/tag-security/blob/main/security-whitepaper/v2/CNCF_cloud-native-security-whitepaper-May2022-v2.pdf)
(CNSWP) and the [Software Supply Chain Best Practices
Paper](https://github.com/cncf/tag-security/blob/88c2b68b740cf89684cfdd70dafeff8130b1b681/supply-chain-security/supply-chain-security-paper/CNCF_SSCP_v1.pdf)
(SSCP). Organizations would like to self-assess their company’s alignment with
these materials in a clear, concrete way, such as via checklists or automation.

In response, we’ve developed the [Cloud Native Security Controls
Catalog](https://docs.google.com/spreadsheets/d/1GUohOTlLw9FKUQ3O23X7ypvJLXN-B3veJGe6YE6JYfU/edit?usp=sharing)
("Controls Catalog"), and today we are announcing completion of the first phase
of this project, which provides a discrete list of the recommendations
referenced in those whitepapers, with additional implementation information and
a best-effort mapping of these controls to NIST SP800-53r5. This effort is
designed to complement and leverage, but not replace, existing industry accepted
frameworks and assessment language.

The anticipated audience for this catalog are members of DevSecOps, Site
Reliability Engineering (SRE), and Platform teams, as well as Auditors,
Regulators, and Governance, Risk, and Compliance (GRC) team members.

## How to use the Cloud Native Security Controls Catalog

We understand that systems are engineered by understanding the context of an
initiative and considering what requirements are known at the time, and then
those systems are continuously improved over time. Often, the definition of a
secure cloud native system is unclear, and engineers seek out specific
acceptance criteria which can be applied to the components of their systems. By
developing the Controls Catalog, we hope to be able to add clarity to these
conversations, allowing any decisions to include or exclude certain controls to
be intentional and explicit.

Similarly, Auditors, Regulators, and GRC team members may be interested in
assessing an environment against the Controls Catalog to identify adherence, or
as a proxy for identifying the overall security controls maturity of an
environment. This is not expected to be a complete solution to identifying
whether an environment’s security posture is sufficient, and requires that users
of the catalog continue to consider broader requirements based on their company
policy, contractual obligations, and applicable regulations.

The Controls Catalog has a unique identifier for each control in the form of a
monotonically increasing ID number. As the project matures this ID is subject to
change, but in the interim it provides an efficient method to identify a unique
control. That control originated in an upstream document, which is documented in
the "Originating Document" column as either the CNSWP v1.0 or the SSCP v1.0, and
we have also attempted to identify which section of that document the control
can be found in, via the "Section" column. Next, we have the "Control Title" and
"Control Implementation" columns, which provide a brief summary of the control,
and some best-effort implementation guidance. The final three columns provide
some other context, such as references to related NIST SP800-53r5 controls, or
the Assurance Level and Risk Categories as identified in the upstream documents
(where applicable).

We acknowledge that manually performing audits or reviewing checklists is
non-optimal in a fast-moving environment. That is why we are also kicking off
the next phase of this initiative, where the Controls Catalog will be converted
to a machine-readable format that aligns with NIST Open Security Controls
Assessment Language (OSCAL). We also plan to perform additional mappings to
existing frameworks, such as NIST's Secure Software Development Framework (SSDF)
NIST 800-218, with future goals to map to additional such as the Cloud Security
Alliance's Cloud Controls Matrix (CCM), contractual obligations or security
frameworks such as ISO® 27001, SOC 2®, PCI DSS, FedRAMP℠, HITRUST®, and CMMC, or
even regulations such as GDPR, HIPAA, and Sarbanes-Oxley (SOX).

If you’re interested in this work and would like to provide feedback on what
we’ve done so far, or would like to get interested, please reach out to the team
on [GitHub](https://github.com/cncf/tag-security/issues/845), or join the
\#tag-security-controls channel in the [CNCF slack](https://slack.cncf.io/)!
