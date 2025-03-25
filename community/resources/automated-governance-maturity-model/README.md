# Automated Governance Maturity Model

<!-- cSpell:ignore Ignácio -->
Contributors: Matt Flannery, Pedro Ignácio, Brandt Keller, Eddie Knight, Jon Zeolla

## Introduction

Automated governance involves leveraging technology, automation, and data-driven systems to ensure that an organization operates efficiently, complies with
regulations, and achieves strategic objectives. The maturity of an organization in this area is often assessed across several key dimensions, reflecting its
readiness and capability to implement and sustain automated governance practices effectively.

Readers familiar with papers such as the CNCF Secure Software Factory Reference Architecture and similar may be asking: "How do I get from a foundational DevOps
or DevSecOps capability to Secure Software Factory or Automated Governance?".

While frameworks such as SLSA are useful for assessing specific technology implementations, this document provides a scale that can assist an organization in
determining the maturity of controls and processes needed for an enterprise automated governance program.

### Assumptions

We assume the reader understands the following concepts:

- **Automation** - the process of replacing manual and repetitive work with automatic workflows.
- **Governance** - management of a team, tool or anything that needs to have guardrails in place.

We do not assume that an organization is a top-level legal entity, instead it may be a business unit or team within a larger organization.

We do not assume that your organization faces specific regulatory compliance, but we do assume that you or your organization has a strong motivation to manage
risk and provide assurances across specified boundaries.

### What problem are we addressing?

Humans operate well when they have tight feedback loops, meaning that the time between asking a question and getting an answer is minimal. This means that we
need to reduce the communication overhead of scheduled meetings and conversations, and augment these discussions with data to inform decisions. Additionally, we
need to ensure that the evidence we gather in order to answer our questions is of sufficient quality, availability, and integrity to be trusted during assurance
activities, such as audits and security questionnaires.

However, the act of gathering data can be difficult, and ensuring that the right data is being gathered is critical. It’s easy to implement a technical control
or gather data points which are not relevant to a situation, but feel like progress. Similarly, when decisions need to be made, reducing the cycle time from
deciding to make a change, gathering evidence to support that change, informing stakeholders and getting their buy-in, finalizing that change, and rolling it
out organization-wide (both technically and administratively through training / context) is critical.

Automated governance in cloud-native security ensures consistent enforcement of security and compliance policies at scale, reducing human error and improving
efficiency. By leveraging Policy-as-Code (PaC), security teams can automate policy enforcement in CI/CD pipelines, Kubernetes clusters, and cloud environments,
ensuring continuous compliance with frameworks like NIST, PCI-DSS, and SOC 2. It enhances risk mitigation, auditability, and incident response by providing
real-time drift detection and security posture management. With tools like OPA, Kyverno, CSPM, and CIEM, organizations can secure cloud-native workloads without
slowing down development, making automated governance a critical component of DevSecOps and cloud security strategies.

This model provides a structured framework to assess the maturity of an organization’s governance, identify opportunities to improve how governance is managed,
and how to better align with modern, cloud native practices. Our goal is to assist organizations with performing repeatable, higher quality, and more frequent
changes to Governance, allowing faster alignment or realignment with a changing landscape.

Currently, organizations may be unclear which specific changes to make to their Governance in order to reduce waste and improve their organizational efficiency
while staying within their established risk tolerance thresholds. In addition, we expect to inform readers of valuable practices that mature organizations have
implemented to increase the speed at which they can make decisions and stay compliant with regulations, contracts, and stakeholder expectations.

This highlights the importance of gathering data in order to inform decisions and enable organizational leadership to pick the right risks to take, at the right
time, given the information they have available. Data can be enriched to highlight trends and perform exploratory data analysis using a variety of
visualizations and metrics. Then, decisions can be made using additional context, and that context can be stored beside the decision record for posterity and
future decision-making (including re-evaluating or modifying the decision based on new data).

### Target Audience

This Maturity Model is intended to broadly apply to the Security department of Organizations which undergo Audits, and need to comply with regulatory or
stakeholder requirements. It is meant to be an introductory starting point for Automated Governance at an Organization, outlining how to identify positive
patterns and how to identify what to do next. As such, lightweight mentions of more specific personas like Auditors, Control or Product Owners, or Control
Implementers (Platform teams, SREs, DevOps, Developers) are expected.

**What positions do they hold?**

- Security Architect
- Security Engineer
- Security Operations (SOC, SecOps)
- Internal Audit
- Compliance
- Risk Management
- Governance
- C-Level

### How to use this document

The Automated Governance Maturity Model provides a structured way to assess and improve organizational governance practices by measuring their current
capabilities across four activity categories: **Policy**, **Evaluation**, **Enforcement**, and **Audit**. To use this model effectively, review each item under
these categories and check off the practices they have already implemented. The percentage of checks in each section represents a maturity score for that
section, and your overall maturity score is your percentage of boxes you check mapped to the below grade bands. The goal of our grading system is to be simple
and easy to follow; we weigh all items equally to make it quick to use while reducing the likelihood of user error.

This self-assessment is meant to guide organizations on how to prioritize enhancements to their governance and audit/compliance activities. Categories with the
lowest grade may indicate an area with the highest return on investment. Additionally, this model can serve as a roadmap for continuous improvement, allowing
teams to set measurable goals, track progress over time, and align governance automation efforts with business and security objectives.

| Grade | Percentage Range |
|-------|------------------|
| A     | ≥ 80%            |
| B     | 65–79%           |
| C     | 50–64%           |
| D     | 35–49%           |
| F     | < 35%            |

## Categories

### Policy

Policy ensures that governance programs are aligned with business needs by defining clear, enforceable rules that guide decision-making, risk management, and
compliance. This alignment helps organizations reduce compliance risks and enhance security while supporting business agility and innovation.

Formation of policy is a nearly universal sticking-point for enterprises, as growth begets complexity. The following metrics serve as milestones to develop an
organization that is robust, efficient, and well-positioned to mitigate risks across the organization.

- [ ] Decision making feedback-loops operate in cycles of less than two business-days
- [ ] A standard process is used to determine which standards, frameworks, regulations, and control catalogs are applicable for different business activities.
- [ ] Continuous improvement and proactive innovation is driven by a culture of experimentation and feedback
- [ ] Decision making is organized and accessible
- [ ] Decision making is data-driven; data points are understandable and usable to answer real-world questions
- [ ] Policies are consistently created and maintained using internal and external sources
- [ ] Policies are understandable, and do not contain superfluous information
- [ ] Policies are informed by previous work (external or internal)
- [ ] Policies are automatically distributed to relevant tooling across the organization, such as policy engines or assessment tools.
- [ ] Policies are created based on rules or regulations applicable to the business unit’s activities
- [ ] Policies are created based on risks defined by the business unit
- [ ] Policies include threat-informed controls for technology used by the business unit
- [ ] Policies are updated based on changes in the technical landscape
- [ ] Policies are updated based on changes in the threat landscape
- [ ] Policies are updated based on changes in the business unit’s risk appetite
- [ ] Policies are extensible or reusable for activities that have similar technology and risk profiles
- [ ] Policies can be automatically ingested by evaluation tooling to inform enforcement and audit activities
- [ ] Policies have scopes which are clearly defined and able to be automatically identified, given an asset
- [ ] Policies generate data which is evaluated and monitored against SLA and SLO thresholds
- [ ] Each Policy has exactly one owner, regardless of the number of responsible parties are involved with managing the Policy
- [ ] Roles are able to quickly identify their responsibilities for any and all Policies which fall into an individual’s scope of work

### Evaluation

Evaluation focuses on gaining information about whether your systems are successfully applying a control or meeting compliance requirements according to the
applicable policies. Automated evaluation tooling should continuously validate adherence and provide feedback loops to refine governance strategies.

An **evaluation** should target a specific application or service, and be composed of multiple **assessments**. Each assessment may have multiple **steps**
corresponding to an assessment requirement in a control that is deemed applicable according to organizational policy. A **finding** is any result that fails or
requires manual review.

- [ ] Clear assessment requirements are defined based on technology-specific controls
- [ ] Assessment requirements contain both configuration and behavioral elements
- [ ] Services are automatically evaluated based on policy-driven assessment requirements prior to deployment approval
- [ ] Policy conflicts are automatically detected and resolved within a reasonable time period
- [ ] Evaluation results are versioned and accessible for historical analysis
- [ ] Evaluations include context regarding known threats and risks to prioritize policy violations
- [ ] Running services are automatically evaluated based on policy-driven assessment requirements no less frequently than daily
- [ ] Evaluation tooling integrates with pipelines
- [ ] Evaluation tooling integrates with IDEs
- [ ] Evaluation tooling integrates with ticketing systems
- [ ] Evaluation tooling integrates with meeting transcripts to provide feedback while ideas are still being discussed
- [ ] Evaluations are distinguished between short-term, temporary deviations and long-term deviations
- [ ] It is always possible to identify whether the Evaluation of Policies is expected to be, or was manual vs automated
- [ ] Automated evaluation tools automatically ingest policies to determine applicability of assessment requirements
- [ ] Policy exceptions are tracked, reviewed, and risk-assessed on a periodic basis
- [ ] Policy evaluation is performed within their defined SLAs and SLOs (i.e. the evaluation itself occurs within a given period/cadence)
- [ ] Evaluations are improved over time using the scientific method, and not solely based on opinions

### Enforcement

Enforcement uses details from Evaluation to take action, ensuring that governance policies are applied consistently across the organization using automation,
policy-as-code, and integration with cloud-native security controls. Effective enforcement minimizes manual intervention and ensures real-time policy adherence
without slowing down innovation.

- [ ] Policy Enforcement Points are distributed and appropriately placed to augment their respective workloads
- [ ] Controls are regularly evaluated for their ROI and reduced/removed if they add unnecessary complexity or overhead
- [ ] Administrative and Technical controls work in harmony with each other
- [ ] Systems or components are automatically taken out of commission if they are non-compliant for a period exceeding their compliance SLA
- [ ] Policy enforcement supports the use of SLAs and SLOs for the recipients of any discrepancies as a part of automated response and notification policies
- [ ] Policy enforcement is applied consistency across all environments (development, staging, production)
- [ ] Enforcement responses are differentiated based on the type and severity of a violation
- [ ] Policy Enforcement Points support self-healing or automated remediation/deploying compensating controls automatically
- [ ] Policy Enforcement logs are captured in an immutable log
- [ ] Policy Enforcement metrics are gathered and available for trending and analysis
- [ ] Exceptions to Enforcement activities can be overridden only via a structured and codified exception process with a time-based expiration or renewal
      process enforced in code, appropriate sign-off, and organizational notification/awareness

### Audit

Audits provide accountability by tracking governance adherence over time and identifying drift or misalignment. Governance activities should generate actionable
data, support periodic and automated reviews, and align with SLAs/SLOs to maintain a strong security and compliance posture.

- [ ] Evidence is able to be queried and accessed quickly
- [ ] Evidence is accessible to and usable by non-technical audiences
- [ ] Artifacts can be easily identified as in- or out- of scope for a given Audit
- [ ] Decisions and decision-making approaches are well documented and easy to understand
- [ ] Changes to documentation are properly approved, versioned, released, and trained with limited overhead
- [ ] Governance changes can be easily traced to the author(s) and approver(s) of a given statement
- [ ] The company can demonstration cohesion between legal decisions (such as contracts) or technical decisions (such as adopting a given technology) and
      business decisions
- [ ] Company turnover does not substantially affect the outcomes of Audits
- [ ] Audit Artifacts are gathered automatically during CI/CD
- [ ] Audit Artifacts are gathered automatically during Runtime / Operational activities
- [ ] Audit Artifacts can be enriched with supplementary or supporting information as it becomes available
- [ ] Audit participants quickly and easily understand their role in an audit, and have access to and ownership of the corresponding data points for their scope
      of responsibilities
- [ ] Preparation for Audits is continuous and standard
- [ ] New assets are automatically identified as in-scope for audits
- [ ] When questions are asked, if the data required to answer them is not available, gathering the new details is easy and standard practice
- [ ] Risk decisions are able to be explicitly connected to Business Decisions such that an Auditor can be confident that the decision was not made in isolation

## Conclusion

Automated governance is crucial for enhancing security, ensuring compliance, and optimizing operational efficiency in software development and deployment. This
approach provides a methodology for assessing and refining organizational policies, review processes, policy implementation, and audit procedures. Through
automation, adherence to regulations is maintained, risk exposure is minimized, and continuous process improvement is facilitated to adapt to evolving business
and security requirements.

This framework serves as a progressive improvement plan and a diagnostic tool for evaluating current status, identifying areas requiring remediation,
prioritizing critical tasks, and establishing actionable objectives. High-performing teams integrate real-time decision-making, automated policy enforcement,
and continuous audit readiness into their development and security protocols, demonstrating a robust commitment to governance.

Achieving advanced automated governance necessitates enterprise-wide engagement, strategic technology investment, and a culture of ongoing optimization. By
leveraging automation and data analytics to proactively address governance challenges, organizations can significantly bolster regulatory compliance, enhance
system resilience, and accelerate the delivery of secure, scalable software.

## References & Citations

- <https://github.com/cncf/tag-security/blob/577bf59772694938a66e5fd3c5815cfebb38943b/community/assessments/Open_and_Secure.pdf>
- <https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/>
- <https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf>
- <https://www.cisa.gov/secure-software-attestation-form>
- <https://dodcio.defense.gov/Portals/0/Documents/Library/cATO-EvaluationCriteria.pdf>
- <https://dodcio.defense.gov/Portals/0/Documents/DoD%20Enterprise%20DevSecOps%20Reference%20Design%20v1.0_Public%20Release.pdf>
