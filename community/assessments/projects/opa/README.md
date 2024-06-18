# OPA Joint Security Assessment

Completed: September 2019

Security reviewers: Justin Cappos, Justin Cormack, Brandon Lum, Sarah Allen

Project security lead: Ash Narkar

* Source code: [github.com/open-policy-agent/opa](https://github.com/open-policy-agent/opa)
* Web site: [openpolicyagent.org](https://www.openpolicyagent.org/)

## Background

Deployed cloud native applications have policies that must be correctly enforced
for security reasons.  The desired overall policy may span many different pieces
of software and configurations.  Open Policy Agent (OPA) seeks to consolidate
and control policy configuration in a consistent manner across the different
components of a cloud native deployment.

_Maturity_

The core technology is in production with a broad set of companies, including
Netflix, Cloudflare, Chef, and others ([ADOPTERS.md](https://github.com/open-policy-agent/opa/blob/master/ADOPTERS.md)).
Code contributions are primarily from Styra, yet there has been community participation
from a wide range of adopters ([77 contributors](https://github.com/open-policy-agent/opa/graphs/contributors),
with Chef engineer in top 4 and Google engineer co-authoring RegoV2 specification).

## Summary

**Design**: The goal of OPA is to centralize and abstract out policy
functionality to make it easier to manage policy holistically.
Policies are written in a custom declarative language (“Rego”) which is read by
OPA agents that are queried by the software performing checks.  The OPA agent
may return rich information about the status of a policy check.

**Analysis**: There is a clear benefit for adopters who have heterogeneous
infrastructure or high rate of change where lack of policy enforcement would
present significant business risk. The added complexity of OPA is not trivial.
OPA enables “policy as code” and Rego policy expressions require the same care
to develop as any security critical code. OPA reduces risk by isolating policy
from business logic. Concise declarative policy has the potential to support
efficient review; however, that relies upon a reviewer who fully understands the
syntax and tools for effective validation. Hence usability and security around
Rego and interaction between aspects of OPA becomes more critical.

All questions from reviewers were addressed in [self-assessment](self-assessment.md)
with non-critical issues captured as issues and noted below.

## Recommendations

Rego has a non-trivial learning curve and even in demos shows there is potential
for confusion. Examining the language’s potential for confusion and mitigating
situations where these problems arise would help to improve user security.

### Recommendations to the project team

1. ([OPA-1699](https://github.com/open-policy-agent/opa/issues/1699)) System
design and deployment guidance to include “gotchas” laying out potential issues
in a way that is more understandable to users.
   
    a. Common scenarios or design challenges, such as policy loading to handled
	   race/error conditions, initialization, and queries that require state

    b. Deployment Checklist: these so that one can check more holistically that
	   they are using OPA correctly before using it in prod.

2. ([OPA-1700](https://github.com/open-policy-agent/opa/issues/1700)) Rego usability

    a. Make it more difficult for users to make policy-related errors by improving
	   OPA toolchain usability (testing, playground). Related Issues: [OPA-1697](https://github.com/open-policy-agent/opa/issues/1697)
	   and [OPA-1698](https://github.com/open-policy-agent/opa/issues/1698)

    b. Make it easier for integrators to understand the security ramifications of
	   different OPA deployment models, including models where the RESTful API
	   is used to manipulate policies

3. Expand security response team to include participants outside of Styra

4. Work toward better security by improving OPA tooling and Rego language

    a. OPA decision logs may contain sensitive information by default e.g.
	when used as Kubernetes Admission Controller depending on the configuration
	also secrets could be part of the decision logs.  While [OPA configuration](https://www.openpolicyagent.org/docs/latest/management/#masking-sensitive-data)
	allows specific data to be omitted, we recommend that OPA create mechanisms
	to make it harder for users to accidentally leak secrets using OPA.
	Related Issues: [OPA-1781](https://github.com/open-policy-agent/opa/issues/1781)


### Recommendations to CNCF

The following recommendation are where help from the CNCF would assist OPA to
increase its effectiveness in cloud native security.

* Conduct a study of user practices with OPA policies and improve tooling,
scan policies, and/or work with users to address common patterns of insecurity

    a. Are failure cases in deployment (e.g., loading policy from an
	   external system over HTTP) handled in practice?
	   Is the current guidance about setting up an external OPA service adequate?

    b. Is the method to load / add / change OPA policies appropriately secured
	   in prod deployments?  Does this need to be automated better for users?

    c. Is the Rego language understandable enough that users can correctly specify
	   policies in a way that an attacker cannot find ways to subvert them?
	   Should errors most commonly caught with testing now be forced earlier
	   in the process?

* Collect information from CNCF End User companies that integrate OPA into
software and recommend integrations where OPA would have the largest security
benefit for the cost.
