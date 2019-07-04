# Introduction
A security assessment is a review of a project at a specific point in time. 
The robustness of the code and operational recommendations assessed is necessarily protean as the code evolves over time and bugs are identified. 
Issues and concerns identified in a review may be subsequently mitigated, remediated or further researched; new concerns may surface over time.
As such, any review should be consumed by the community with attention to the date of the last assessment and after reviewing all subsequent issues and commits that may be relevant.

From the perspective of the project team, it is beneficial to minimize the burden of performing ongoing reviews.  
It should be possible to refresh the assessment incrementally unless the underlying project design or architecture changes radically.
The scope of periodic updates should be limited in cases where there are low risk changes, or greatly expanded when security problems are identified by the community (e.g. a high impact CVE).

From the perspective of the (volunteer) assessment team, performing a complete reassessment would likely be onerous - especially with if there is a queue of new project assessments and limited assessor bandwidth.

In summary, considering the limited time and resources available to the assessors, the project teams, and operators, updates must be timely, concise, and targeted. 
This document is an attempt to define the lifecycle events of an assessment and ongoing updates.

# Lifecycle Outline

* Initial Assessment
* Levels?
* Periodic Reviews
* Discrete Event Reviews (e.g. CVE)
* Review Scope
* Update Process
* Notifications (e.g. invalidating an assessment due to new attack type or critical supply chain vulns)
* Knowledge Transfers (Assessor KT; project team KT; community KT)

# References

* [ HITRUST ](http://hitrustalliance.net/frequently-asked/1/en/topic/how-often-do-i-need-to-get-a-hitrust-csf-assessment-report-to-support-my-third-party-assurance-requirements)
* [ SOC2 ](https://www.aicpa.org/InterestAreas/FRC/AssuranceAdvisoryServices/DownloadableDocuments/SOC2_CSA_CCM_Report.pdf)
* [ Cloud Security Alliance ](https://cloudsecurityalliance.org/star/levels/)
* [ NIST ](https://nvd.nist.gov/800-53/Rev4/control/CA-2) / [ FISMA ](https://www.dhs.gov/cisa/federal-information-security-modernization-act)
* [ ISO ](https://en.wikipedia.org/wiki/ISO/IEC_27001#Certification)
* [ PCI ](https://storekit.com/payments/pci-dss/) NOTE: not primary source but convenient summary
