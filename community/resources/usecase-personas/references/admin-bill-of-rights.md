# THE Administrator Bill of Rights

Authors: cyrush@google.com, rayc@google.com	10 May 2017

Shortlink: [https://goo.gl/yQCxE8](https://goo.gl/yQCxE8)

As a platform, service, or software provider, we:

*Empower the world’s administrators to manage their organizations’ cloud resources at scale.*

Therefore, we hold the following truths to be self-evident.

Administrators have the right to:

1. [Centrally administer](#centrally_admin) their organizations’ cloud resources.

2. [Audit](#audit) all accesses and understand all policy grants for their organizations’ cloud resources

3. [Delete](#heading=delete) their organizations’ cloud resources.

4. [Compartmentalize](#compartmentalize) their organizations’ cloud resources.

5. [Delegate administration](#delegate_admin) of a compartment of an organization’s cloud resources to another administrator.

6. [Act autonomously](#act_auto) within the organization or a compartment within an organization that they administer.

7. [Constrain](#constrain) the behavior of users and resources within their organization.

8. [Make exceptions](#make_exceptions) to rules governing an organization’s cloud resources.

9. [Evolve their organization structure](#evolve_org_struct) through growth, mergers and divestitures.

10. [Exercise the above rights in hybrid and mutli-cloud deployments](#hybrid_multi) without compromising their ability to manage their organizations’ cloud resources.

11. Accountability of administrators actions. - TBD(ckemper,rayc): fill out.

## Central Administration <a id="centrally_admin"></a>

Above all, administrators must have the ability to view and manage their resources in a central location. This becomes the choke point for organization-wide policies and auditing of an organization's use of cloud.

Key technologies: ...

## Auditability <a id="audit"></a>

Administrators need to be able to audit their system to ensure that their organization's resources are in compliance with the security policies they have put in place.   Specifically, administrators need to know who accessed what, who has access to what, what policies apply to resources, and what policies apply to users.  They need to be able to understand how their policies and know what effects a change might have.

Key technologies: …

## Deletion <a id="delete"></a>

Administrators should be able to delete all of the resources within their organization with a single operation, if so desired. Resources can be marked as sensitive to warn against deletion, but this should not prevent an administrator from deleting a resource.

## Compartmentalization <a id="compartmentalize"></a>

As the number of resources under their administration increases, administrators need the ability to compartmentalize resources for the purpose of providing common administration for a group of resources.

A *compartment* is a collection of resources within an organization or another compartment that have common policies and lifecycle. In Google Cloud Platform, there are three different compartments -- Projects, Folders and Organizations -- which form a hierarchy. This is a key feature to enable administrators to cope with the scale of cloud.

Key technologies: ...

## Delegated Administration <a id="delegate_admin"></a>

As the number and complexity of compartments increases, administrators need the ability to delegate the administration of one or more compartments to another administrator.  They also need the ability to delegate a subset of administrative functions to another administrator. This is another key feature for coping with the scale of cloud.

Key technologies: …

## Autonomy <a id="act_auto"></a>

In the spirit of compartmentalization and delegated administration, each administrator needs the ability to act autonomously within their compartment without engaging administrators at higher levels of the organization. This implies making features available for both organizations and compartments.

Key technologies: ...

## Constraints <a id="constrain"></a>

To prevent misuse, administrators need to be able to control access to cloud resources and constrain how those resources can be configured. For organizations with managed identity, this includes the ability to constrain how those identities can be used.

Key technologies: …

## Exceptions <a id="make_exceptions"></a>

Organizations are diverse and, therefore, have diverse requirements. In order to meet the needs of as many customers as possible, cloud features should be built to be flexible and offered with constraints that can be used to limit that flexibility if administrators so desire.

Key technologies: ...

## Evolution <a id="evolve_org_struct"></a>

Organizations are not static. They grow and shrink, both organically and inorganically. They morph and shift as the organization evolves. As such, resources must be designed to move and change along with our customers.

Key technologies: ...

## Hybrid and Multi-Cloud <a id="hybrid_multi"></a>

Organizations have the right to choose the cloud provider(s) with which to work and should be free to leverage private clouds as well. Regardless of the choice, the rights stated herein should extend across all those clouds, leveraging open standards and APIs to maintain a consistent experience.

Key technologies: ...

