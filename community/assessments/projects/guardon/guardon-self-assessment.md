# Guardon — CNCF TAG-Security Self-Assessment

**Project:** Guardon  
**Type:** Browser-based Kubernetes YAML & Policy Validator  
**Website:** [Guardon](https://chromewebstore.google.com/detail/jhhegdmiakbocegfcfjngkodicpjkgpb?utm_source=item-share-cb)  
**Contact:** sajalnigam@gmail.com 
**Assessment Version:** v1.0  
**Last Updated:** 2025-XX-XX

---

## 1. Project Overview

Guardon is a **fully client-side browser extension** (Chrome/Edge/Brave) that performs:

- Kubernetes YAML validation  
- Misconfiguration detection  
- Kyverno-policy evaluation  
- Inline annotations on GitHub/GitLab

Guardon shifts Kubernetes security **far left**, helping developers identify misconfigurations **before** they reach CI pipelines or clusters.  
All validation happens locally inside the browser using **JavaScript + WebAssembly**.  
No backend, no cloud service, and **no user data ever leaves the machine**.

---

## 2. Security Boundary

Guardon has a strict and minimal security boundary:

- Runs entirely within browser WebExtension APIs  
- No backend infrastructure  
- No telemetry or analytics  
- No transmission of YAML or policies to external systems  
- Kyverno engine executes inside a local WebAssembly sandbox  
- No Kubernetes cluster access, no secrets, no tokens  
- Only interacts with user-selected YAML files or GitHub/GitLab DOM content

**Trusted Computing Base (TCB):**

- Browser (Chrome/Brave/Edge)  
- Guardon WebExtension JS/TS code  
- Embedded Kyverno-WASM engine  
- Local storage for rules and configuration

---

## 3. Goals and Non-Goals

### **Goals**
- Detect Kubernetes misconfigurations early, at authoring time  
- Enforce governance standards using Kyverno rules  
- Provide deterministic and reproducible validation results  
- Work entirely offline and locally  
- Improve developer productivity by embedding checks inside workflow  
- Offer zero-trust handling of user data (no outbound calls)

### **Non-Goals**
- Not a runtime security tool  
- Not a replacement for PSP, PSA, Gatekeeper, or Kyverno in-cluster  
- Not a network or API security solution  
- Does not detect runtime attacks, malware, or CVEs  
- Does not handle supply-chain validation outside YAML/policies  
- Does not attest image provenance or signatures

---

## 4. System Architecture

Guardon is composed of four main modules:

1. **Content Script**  
   - Injected into GitHub/GitLab UI  
   - Extracts YAML sections from PR diffs or files  
   - Renders inline annotations

2. **Worker Engine**  
   - Runs the Kyverno WASM policy evaluator  
   - Performs Kubernetes schema validation  
   - Executes custom rules from user-defined collections

3. **Background Service Worker**  
   - Handles cross-tab messaging  
   - Optional background fetch of referenced YAMLs  
   - Manages rule bundles

4. **Extension UI**  
   - Popup for validation  
   - Options page for rule configuration  
   - Rule editor and custom bundles

---

## 5. Actors and Data Flow

### **Actors**
- **Developer**: Uses Guardon while browsing YAML on GitHub/GitLab  
- **Browser**: Provides sandboxed execution environment  
- **Local Guardon Engine**: Performs validation  
- **Kyverno-WASM**: Evaluates policies locally  
- **Rule Sources**: User-imported Kyverno rules stored locally  

### **Data Flow Summary**

1. User views Kubernetes YAML on GitHub/GitLab  
2. Guardon content script extracts YAML into memory  
3. Data is sent to the Worker Engine (local only)  
4. Worker evaluates schema + policies  
5. Results returned to content script  
6. Inline annotations displayed  
7. No data is logged, stored externally, or transmitted

---

## 6. Critical Security Functions

### **Critical (Non-Configurable)**  
- Kubernetes schema validation  
- Local Kyverno-WASM policy execution  
- Secure sandboxing of rule engine  
- YAML isolation and strict parsing  
- Immutable validation results  
- No-network guarantee  
- No access to browser cookies, tokens, or secrets  
- Extension CSP preventing inline script execution

### **Security-Relevant (Configurable)**  
- Custom rule bundle imports  
- Background fetch helper for related YAMLs  
- Organization-specific governance packs  
- Optional CIS/NIST best-practice packages  

---

## 7. Threat Model (High-Level)

### Guardon mitigates:
- Misconfigured workloads (privileged pods, hostPath, missing limits, etc.)  
- RBAC over-permission  
- Pod Security violations  
- YAML structural errors  
- Drift from organizational governance standards  
- Incorrect multi-document YAML compositions  
- Unsafe defaults (no resource limits, insecure capabilities)

### Guardon does NOT mitigate:
- Runtime container escape  
- Host/kernel compromise  
- Image-level supply-chain attacks  
- Network-level exploits  
- Malicious browser extensions  
- Insider threat or malicious developer intent  
- Attacks on GitHub/GitLab itself  

Full threat model available in `guardon-threat-model.md`.

---

## 8. Secure Development Practices

- Public source code on GitHub  
- MIT License  
- CI pipeline with:
  - Static code analysis (ESLint)
  - npm audit
  - WASM linting  
- Automated dependency scanning  
- Reproducible build plan  
- Release bundles signed with GitHub provenance  
- Mandatory code review for PRs  
- Vulnerability reporting: security@guardon.dev  
- SECURITY.md published in repository

---

## 9. Vulnerability Reporting & Incident Response

**Contact:** sajalnigam@gmail.com  
**Policy:** SECURITY.md follows TAG-Security template

Incident handling workflow:

1. Triage and reproduce issue  
2. Assign CVSS score  
3. Apply patch in a protected branch  
4. Issue temporary private release for reporters if needed  
5. Public security advisory via GitHub Security Advisories  
6. Patch release with clear changelog  
7. Update community channels  

Guardon follows a **90-day disclosure window** or faster if required.

---

## 10. Known Limitations

- Depends on browser WASM performance  
- Limited by GitHub/GitLab DOM stability  
- Multi-GB YAML files not supported  
- Will not detect runtime or CVE-level vulnerabilities  
- No distributed policy cache (local only)  
- Not compatible with Firefox yet (pending MV3 support)

---

## 11. Roadmap (Security-Focused)

- Signed rule packs  
- Rule provenance verification  
- In-extension SBOM viewer  
- WASM sandbox hardening  
- AI-assisted policy recommendations  
- Support for JetBrains/VScode extensions  
- Organization-managed rule registries  
- Policy drift detection across repos  

---

## Appendix

### Example Use Cases
- Detect privileged pod before code review  
- Validate RBAC roles from GitHub UI  
- Local evaluation of Kyverno policies before commits  
- Quick governance compliance checks for microservices teams

### Example Policies
- “Disallow hostPath”  
- “Require resource limits/requests”  
- “Block privileged containers”  
- “Prevent hostNetwork usage”

---

**End of Document**
