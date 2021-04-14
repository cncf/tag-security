---
title: "Functions"
date: "2020-10-01"
category: "runtime"
---


## Projects

<!---
## Commercial Projects
- [Aqua Security](https://www.aquasec.com/products/serverless-container-functions/www.aquasec.com)
- [Prisma Cloud](https://www.paloaltonetworks.com/prisma/) 
- [Trend Micro Application Security](https://www.trendmicro.com/en_ca/business/products/hybrid-cloud/cloud-one-application-security.html)
- [Trend Micro Conformity](https://www.trendmicro.com/en_ca/business/products/hybrid-cloud/cloud-one-conformity.html)
- [Check Point (FKA Protego)](https://www.checkpoint.com/products/cloudguard-serverless-security/)

## Misc Projects
-->

## Examples
- Runtime security scanning is critical to maintaining a good serverless security posture. Whilst SCA assists in scanning the modules and components (i.e. third party open source software that may be in use) by software for vulnerabilities, only runtime security will detect if a software runtime such as NodeJS is actually exploited and used in a malicious manner. 
- Additional security features provided by products may relate to compliance. For example, providing assurance that an AWS Lambda function does not have an IAM Role policy granting administrative access, but instead has a policy attached that follows the Principle of Least Privilege. One common example is restricting access to a DynamoDB table, rather than providing access to the entire DynamoDB API from an AWS Lambda function.
- FaaS that operates within ones own infrastructure, i.e. kubeless presents further security considerations relating to network and system security hardening. One simple example, is that Functions should not be allowed to make changes to critical file system mount points. 

