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

![Assessment Lifecycle](assessment-lifecycle.png "Assessment Lifecycle")

## Initial Assessment
All projects should go through the same initial assessment so we have a consistent baseline.  If 3rd party code audits or pen tests or vulnerability scans have been performed previously, these should be used as inputs into a complete security assessment.

## Levels

In considering how frequently to reassess, 3 levels of risk should be defined:

- Basic Risk Level: The project will be deployed as a relatively isolated component, adding features that do not directly implement security controls, and/or do not directly expose or access sensitive data (e.g. user identity data, security policies, financial data).  These projects don't need to be reviewed frequently, and CVEs can be tolerated so long as they have isolated impact.

- Moderate Risk Level: The project is either a core part of operating a cloud native stack and is relied upon for services by many other projects, but perhaps isn't directly security related; or the project is somewhat isolated but does directly access sensitive data.  There should be consensus among the assessors and the project team as to whether this project should be reviewed more or less frequently. CVEs should be reviewed more frequently, with greater scrutiny, but can still be tolerated if not severe.

- High Risk Level: The project is a core part of the stack and directly impacts security.  These should be reviewed most frequently and have a low tolerance for CVEs.

## Periodic Reviews

Given the demands on assessor resources and project teams it seems reasonable to schedule periodic review for most projects, ie the Basic Risk Level, every two years.  For Moderate Risk Level projects, it can be left to the judgment of the assessors and the project team to reach a decision as to a biennial or annual schedule.  High Risk Level projects should be reviewed annually. 

## Discrete Event Reviews (e.g. CVE)

CVEs (or other discrete security alerts or incidents) should be reviewed and inform the regularly scheduled assessments.  Similar to the reassessment schedule, the frequency of these CVE reviews can be adjusted to the risk level of the project.  Lower risk projects can batch up CVEs annually, and do a cursory inspection and quickly update the current assessment with any suggestions or warnings.  However, High Risk projects should perform CVE reviews semi-annually, ideally quarterly.

## WIP

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
