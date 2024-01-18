# OpenKruise Threat Model

Threat Modeling with STRIDE

## Spoofing

- Threat-01-S: Impersonating an Administrator
- An attacker could impersonate an OpenKruise admin, maintainer, or somebody
  with elevated privilege in order to access data within the containers, code
  repositories, or contributions from other developers.

## Tampering

- Threat-03-T: Altering Critical Components
- OpenKruise components could be tampered with during build, installation, or
  runtime, potentially allowing an attacker to download malware into the host
  system, OpenKruise itself, or Kubernetes.

## Repudiation

- Threat-04-R: Denial of Administrator Actions
- OpenKruise admins of Kubernetes applications may deny or misrepresent actions
  they have performed, particularly if they include any changes made to
  configuration updates or scaling within the Kubernetes clusters managed by
  OpenKruise.

## Information Disclosure

- Threat-05-I: Vulnerability Exploitation Through User Reports
- OpenKruise relies on user-reporting of vulnerabilities through Gmail or
  GitHub. If a user discovers a bug and reports it, an attacker may find a way
  to view such reports and exploit the bug before it can be fixed.

## Denial of Service

- Threat-06-D: Resource Exhaustion in Controllers
- OpenKruise controllers, daemons, or the applications being managed may
  consume more resources than allocated and affect the availability of the
  Kubernetes cluster.

## Elevation of Privilege

- Threat-07-E: Unauthorized Access to Kubernetes Resources
- If an attacker compromises a part of OpenKruise, particularly one that has
  permissions to modify Kubernetes resources, they could potentially escalate
  their privileges within the Kubernetes cluster.
