# STRIDE Threat Model

### 1. Spoofing:

- **Threat:** Unauthorized access to Cortex components or data.
- **Application to Cortex:** Previously considered out of scope. Kubernetes network policies can restrict component access.
- **Mitigation:** Implementation and fine-tuning of Kubernetes network policies to ensure restricted access.

### Tampering:
- **Threat:** Unauthorized modification of data or configuration settings.
- **Application to Cortex:** Not applicable as Kubernetes containers can’t change their configuration files.
- **Mitigation:** Rely on the inherent security features of Kubernetes to prevent tampering.

### Repudiation:
- **Threat:** Denying the occurrence of certain actions or events within Cortex.
- **Application to Cortex:** Considered out of scope. Secure log gathering and preservation methods are available in Kubernetes.
- **Mitigation:** Utilize Kubernetes logging mechanisms to ensure traceability and log integrity.

### Information Disclosure:
- **Threat:** Unauthorized access to sensitive information within Cortex.
- **Application to Cortex:** Not a concern due to network policies in Kubernetes that prevent unauthorized access.
- **Mitigation:** Proper configuration of Kubernetes network policies to protect sensitive data.

### Denial of Service (DoS):
- **Threat:** Disrupting or degrading the availability of Cortex services.
- **Application to Cortex:** A well-configured Cortex system is resilient to DoS attacks.
- **Mitigation:** Implement rate limiting and series per tenant limits to prevent DoS attacks.

### Elevation of Privilege:
- **Threat:** Unauthorized escalation of user privileges within Cortex.
- **Application to Cortex:** Not applicable in Cortex as there is no concept of a superuser or admin user.
- **Mitigation:** Ensure adherence to Kubernetes access controls.

### Additional Considerations:
- **Alertmanager Security:** Address security threats around Alertmanager, which have already been mitigated. Focus on ensuring these mitigations remain effective.
