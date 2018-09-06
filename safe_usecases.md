Authors: stummidi@pivotal.io, rayc@google.com, pragashjj@gmail.com, ckemper@google.com 

Created: 7 March 2017

This is a living document, please feel free to add use cases and personas through a PR. We want this to be a repository of cloud native security related use cases.

Refer:
============

SAFE Cloud Foundry Use Cases: https://goo.gl/4pmdqt

Administrators Bill of Rights: https://goo.gl/yQCxE8


Summary 
============
Within an enterprise, based on the organization structure, we may have one or more of the personas. They could be from Developer, Enterprise Operator, Network Operator, End User, Infrastructure Provider. In this document, we will try to breakdown the use cases by applying bill of rights to each personas. 

Developer
=============
* As a developer, I need to provide logs for any changes to a critical resources, such that they can be made available for auditing

* As a developer, I need to be able to tag my resources so that they can be grouped by an administrator when required

* As a developer I need to be able to perform an access check for a resource

Enterprise Operator
=============
* As an enterprise operator, I need a central way to look at the organizational resources, so that I can administer them in a single view

* As an enterprise operator, I need the ability to see what about the resource changed, who changed it and when it was changed, so that I can report on for compliance 

* As an enterprise operator, I need a way to delegate policy control to lower level admins, including sub enterprise operators, who help me scale.

* As an enterprise operator, I need a way to nominate per-policy-type operators (e.g. network and quota operators) both at the corporate level but also at lower levels.

* As an enterprise operator, I can [evolve my organization structure](https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.58j9tsccjq45)  through growth, mergers and divestitures.

* As an enterprise operator, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.mhh6qgyk76tv" target="_blank">delete</a>  my organizations’ cloud resources.

* As an enterprise operator, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.tb39rmtqjah2" target="_blank">act autonomously</a>  within the organization or a compartment within an organization that I administer.

* As an enterprise operator, I can understand the effect of changes to policy that I am making


Quota Operator
==================

* As an quota operator, I need a central way to look at the organizational resources, so that I can administer them in a single view

* As a quota operator, I need a central way to look at the usage of all my organizations resources.

* As a quota operator, I need a way to constrain how many resources a set of teams is able to use.

* As a quota operator, I need a way to delegate resource quota management to lower level admins including sub quota operators who help me scale

* As a quota operator, I need to understand how and when teams were allocated their resource quotas.

* As a quota operator, I need to be alerted if resource quota allocation exceeds a certain amount.

* As a quota operator, I can understand the effect of changes to quota that I am making


Network Operator
====================

* As a network operator, I need a central way to look at the networks in my organization, so that I can administer them in a single view.

* As a network operator, I need a way to delegate network policy management to lower level admins including sub network operators who help me scale.

* As a network operator, I need a way to configure network firewall policy.

* As a network operator, I need to understand how and when network policies were configured.

* As a network operator, I can understand the effect of changes to network policy that I am making


End User
============

* As an end user, I can understand which resources I can access and how I can request access to a resource

* As an end user, I can delegate or revoke access to downstream applications/resource or other users

* As an end user, I can request access to a resource and operations.

* As an end user, I can understand the effect of changes to policy that I am making


Compliance Officer /Auditor
===============================

* As a compliance officer, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.norkt12d88ma" target="_blank">audit</a>  all accesses and understand all policy grants for my organizations’ cloud resources - including all accesses of other administrators.

* As a compliance officer, I can certify access to resources on a periodic basis.

* As a compliance officer, I can identify Policy/SOD (segregation of duties) violations.

* As a compliance officer, I can set audit logging policy that controls what data gets collected for auditing purposes.

* As a compliance officer, I can understand the effect of changes to audit logging policy that I am making.

* As a compliance officer, I can configure my organization's resources to meet the requirements of relevant standards such as [PCI](https://www.pcisecuritystandards.org/), [FedRAMP](https://www.fedramp.gov/) or [HIPAA](https://www.gpo.gov/fdsys/pkg/PLAW-104publ191/html/PLAW-104publ191.htm).


Security Administrator
==========================

* As a security administrator, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.ems5pk2exnlb" target="_blank">centrally administer</a>  my organizations’ cloud resources.

* As a security administrator, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.norkt12d88ma" target="_blank">audit</a> all accesses and understand all policy grants for my organizations’ cloud resources

* As a security administrator, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.v7s39hyjpvjh" target="_blank">compartmentalize</a>  my organizations’ cloud resources.

* As a security administrator, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.cop8leqlt29" target="_blank">delegate administration</a>  of a compartment of my organization’s cloud resources to another administrator.

* As a security administrator, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.tb39rmtqjah2" target="_blank">act autonomously</a>  within the organization or a compartment within an organization that I administer.

* As a security administrator, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.iwrgo3lponp3" target="_blank">constrain</a>  the behavior of users and resources within my organization.

* As a security administrator, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.amocw7z631ri" target="_blank">make exceptions</a>  to rules governing my organization’s cloud resources.

* As a security administrator, I can <a href="https://docs.google.com/document/d/19V_Vx0fdz2HOa31FpPswT9CsUphizfJcwvDJv05aWFs/edit#heading=h.7wavwjkp2pz2" target="_blank">exercise the above rights in hybrid and mutli-cloud deployments</a>  without compromising my ability to manage my organizations’ cloud resources.


Third Party Security Product/System
==========================

* A third party system should be able to affect security policy based on assets being tagged as quarantined.

    * To put it more generically, I should be able to associate resources with dynamic labels/tags which can be used to trigger certain policies


    


