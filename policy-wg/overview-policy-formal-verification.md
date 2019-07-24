# Formal Verification for Policy Configurations

## Overview
To borrow from an AWS paper <sup>[[0]]</sup>, the reason for this discussion is:

> The security challenge for many ... is becoming one of reasoning about static policies for their dynamic systems. Cloud [users] want a tool that allows them to check policy configurations based on their security requirements. 

Let's first define what I mean by "verification". In simplest terms it is a means to tell that a program was built as intended, but it does not say if the _correct_ program was built to solve a particular problem. For example, I might build a perfectly secure coffee maker, when the customer wanted a car! To tell if the right program was built for the job, that requires _validation_ ... though formal verification and validation are very complimentary.

OVERVIEW DIAGRAM <sup>[[2]]</sup> ![OVERVIEW DIAGRAM](overview-formal-verification.png "CONCETPTUAL OVERVIEW")

The "formal" part means I have something symbolic, as close to mathematical formulae as possible. Otherwise, just using human prose, or diagrams, or pictures, I can do both verification and validation of a sort, but machines cannot assist in the process (not yet), and it is generally assumed that machine proofs are more reliable than manual processes, especially if such manual processes are ad hoc. In any case, even if some AI existed where diagrams go in and verification comes out it would probably convert diagrams to intermediate symbolic formulae. I speak of formal verification in the context of security policy here, but formal verification could also be used to verify other types of securiy requirements.  

First we need requirements for a secuirty policy. I would define the security policy requirements as the high-level human intent for a cloud native system that constrains:

* who can use it (human or machine users)
* what operations are allowed by those users
* what resources can be accessed or modified by those operations (leaving resources undefined, could be services, VMs, data)
* and possibly  which capabilities are required by those operations. 

As such, security policy requirements are simply a collection of constraints/properties on the above that can be expressed in  human language and possibly diagrams and other notation (not requiring any particular format or framework).  

Next we need a specification that refines this intent (security policy requirements) into something machine readable, but not yet as specific as a logic language.  I like specification here instead of model, since I think model is overloaded and has particular meaning to practitioners. Let's say a model can be an "instantiation" of a particular specification in a particular language or notation. I've seen "contract" also used. In all discussions we are verifying something against the specification. 

The specification encodes the desired constraints/properties to be evaluated to achieve the security policy requirements of the cloud native system.  Note, the specification can be distinct and separate from the policy expression itself, thought some like AWS Zelkova seem to use the policy language itself AS the specification language: "The property to be verified is specified in the policy language itself, eliminating the need for a different specification or formalism for properties." <sup>[[0]]</sup> 

Let's also define a "parameter" as a variable in the specification, and "context" or inputs to the policy used by the policy evaluation software; context binds specification parameters to a policy with particular values.  For example AWS considers the Context to be "the principal making the request, the resource being requested, and the specific action being requested." <sup>[[0]]</sup> A _policy configuration_ is a combination of a static policy (e.g. a particular set of expressions to be validated) and the context/inputs fulfilling the parameters the specification allows. 

Once we define the specification/parameters, policy itself, and context/inputs, we ultimately desire a tool that queries the policy configurations (policy+context) with respect to a parameterized specification of security requirements (intent expressed as properties) so we can verify whether the policy configurations meet the specified security requirements for a particular dynamic system state.

To quote<sup>[[2]]</sup>:
> "With the translations from ideal concepts and from the physical world into formal logic, that we can use the tool of formal proof. In an ideal setting, at this point we are able to make formal correctness guarantees with an absolute degree of assurance. Even in the less than perfect real world, with machine-checked proof we can achieve a level of assurance about our formal statements that surpasses our confidence in mathematical theorems which we base all of physics and engineering on."

As others have observed, there exist several formal methods to prove the connections between constraints/properties, specification, and model. The trade-off is between the expressiveness of the logic and the degree of automation. For example SAT solvers make it hard to write down the required logical artefacts and hard to understand the resulting formalisations, but provide a high degree of automation. Zermelo-Fraenkel Set Theory (e.g. Z language) or Higher-Order Logic (e.g. Haskell) make it easier to express properties and specifications precisely and in a readable way, but they require human effort and expertise in performing the proof. Others include model checking and automated first-order theorem proving as intermediate examples. 

Let's consider a common use case: a user has a policy and wants to easily verify it against some specification that is available (and parameterized).  Somehow someone should produce and package up the specification, and provide automation to the operator user to easily verify her policy.

## Use Cases/Stories

Ignoring all the hypothetical discussion above, speaking in terms of what human operators want...these are some example ideas I've heard in various calls and threads that the tool and specifications should improve if not completely automate:

* Human operator wants to ask questions about users and resources under a policy or set of policies:
  * Is resource X accessible by a particular user Alice?
  * Can any user deploy to this namespace? 
  * is one policy less-or-equally permissive than another? put another way, check whether a policy is over or under-constrained with respect to another one.
  *  Did I deny access to authorized users unintentionally? If so which ones? Which policy did that?
* Operator wants to ask questions about the network:
  * Is access to a resource allowed from a certain set (or all, or empty set) of IP addresses? If so which? If not which policy is granting access to which IPs? Which are blocking access?
  * Are there any NetworkPolicies, Endpoints, or Pods in namespace ‘Web’ that are labeled as ‘Bastion’?
* Human needs to show a reviewer/auditor that there are no missing or superfluous policies.
* Human gets a particular response from the combined set of policies (or one very large policy) under test (ACCEPT/DENY) and wants to see the particular policies or policy rules responsible for the response.
* Human wants to understand the impact of changing policy P to P'. Enumerate the users or resources that will be affected and how.
* CI/CD or daemon running software wants to continuously monitor a stream of configuration changes and validate the updated configurations against their respective specifications,
  * report and alert on the validation
  * Alerts raised should contains detailed difference info that can be used to deduce the changes needed to correct the policy configuration
* "return to the user a concrete request context using the model generated by the SMT solver when performing the check. The concrete request context will provide information to the user on why a certain check passed or failed." <sup>[[0]]</sup>
* "support for recommending policy repairs in cases when the policy fails a certain check." <sup>[[0]]</sup>

Considering the above "policy" examples:
* it might be a policy to grant or deny user access to a resource in a multi-tenant cluster,
* or it might be a policy that requires certain syscall activity to be monitored on some pods with certain labels,
* or it might be a policy that says network traffic that is regulated by PCI or HIPAA should be read-only to some microservices but writeable by others,
* or it might be a policy that specifies some alert action to be triggered when a given audit event occurs;
* deny microservices granting unrestricted access to data stores
* deny write requests to data stores that do not have encryption configured
* deny deployments of load balancers that do not use https traffic
* check compliance whenever a new resource is created or the policy attached to it is changed. 

An ongoing task in this effort is to catalog the fuller set of interesting use cases/stories and map the enumeration of those to specific features of the verification tool.

## What Can I Do Today?

As a devops person responsible for answering the question "are we secure?" today, there are some things one can do today given  time, money, people, and focus. These have been built in some form or another already, so I could modify or improve existing examples:

* look for patterns in policies, e.g., the use of a wildcard that makes resources publicly accessible. 
* attempt to explicitly enumerate all possible requests to a policy (test generator, record/playback)
* use commercial tools or cloud-specific tools provided by my public cloud host (Zelkova, SecGuru) and don't worry about it
* define a mapping/translation from a given policy to a logic notation and then convert that to boolean (SAT) or more complex formulas (SMT) and then check if the formulas are satisfiable.
  * eg encode policies as bit vectors and use Z3 solver <sup>[[1]]</sup>
  * eg use FormuLog as the specification and use Z3 solver <sup>[[6]]</sup>
  * eg use Souffle to evaluate a Datalog specification as discussed in <sup>[[5]]</sup>
* pick a particular solver or model checker or prover and just play around with it in one particular use case and learn more about it
* write up GHIs on Formal Verification and hope smarter people jump in and magically make the world a better place :) 

## Possible Action Items
* We could collect real world policy examples and/or generate test policies to reverse engineer the requirements for policy configuration.
* We could create de novo the security policy requirements by reviewing existing code and design notes and extracting a more thorough requirements document that can be translated into some form of a machine readable specification.
* Once we have a solid requirements document, we can create a formal specification for various facets of kubernetes and other CNCF projects and encode the security specification in some symbolic language.
  * admission control policy 
  * RBAC policy
  * network policy eg Tiros <sup>[[3]]</sup>
* We can use Z, TLA+, Alloy, Souffle <sup>[[4]]</sup>, Rego or _add your favorite one here__ as the specification language
* The human operator can then write a new policy and run a tool that uses the specifications for various parameterized operations to verify the policy
* Human operator or a tool would somehow need to collect, enumerate, generate, or in some way bind inputs to the parameters of a specification:
  * eg. LDAP data, namespace list, IP addresses, buckets, keys, CIDRs, etc

## Challenges
* bounded or unbounded analysis? unbounded is NP-complete or maybe NP-hard. Using wildcards is PSPACE-complete but practical <sup>[[0]]</sup>. 
* ordering constraints on statements in a policy, eg. firewall rules
* policy language constructs such as loops or dynamically allocated arrays
* per AWS: solvers seem very sensitive to small changes in the input encoding, where a quickly solved problem in our domain becomes non-terminating. Yet, the theory of regular expressions is decidable. how current is this observation? Zelkova "solves regular expression problems using the
standard translation to deterministic finite automata (DFAs) via non-deterministic finite automata (NFAs). It uses Hopcroft’s algorithm for DFA minimization...treats each regular expression match as an atom...how to integrate this into the traditional Nelson-Oppen framework?"

## Thanks To Feedback From:

* [@copumpkin](https://github.com/copumpkin)
* [@ericavonb](https://github.com/ericavonb)
* [@hannibalhuang](https://github.com/hannibalhuang)
* [@justincormack](https://github.com/justincormack)
* [@timothyhinrichs](https://github.com/timothyhinrichs)
* [@tsandall](https://github.com/tsandall)

[0]: https://d1.awsstatic.com/Security/pdfs/Semantic_Based_Automated_Reasoning_for_AWS_Access_Policies_Using_SMT.pdf
[1]: https://sites.cs.ucsb.edu/~bultan/publications/sttt08.pdf
[2]: http://ts.data61.csiro.au/publications/nicta_full_text/955.pdf
[3]: https://d1.awsstatic.com/whitepapers/Security/Reachability_Analysis_for_AWS-based_Networks.pdf
[4]: https://souffle-lang.github.io/docs.html
[5]: http://discovery.ucl.ac.uk/10067190/1/Subotic_10067190_thesis.pdf
[6]: https://github.com/HarvardPL/formulog

### Historical Note

This started with a Policy-WG call on 6/5/2019 where we discussed how/if policies might be formally verified, and then subsequent comment and discussion on https://github.com/cncf/sig-security/issues/196 .
Of course formal methods can include many other ideas...and I hope we expand on this topic over time; this is not meant to be the only formal technique discussion...but we can encapsulate those into separate GHIs. To get started on something concrete I arbitrarily chose this topic.
