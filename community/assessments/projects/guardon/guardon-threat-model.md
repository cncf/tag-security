# Guardon — Threat Model (STRIDE-Based)

**Methodology:** STRIDE  
**Scope:** Browser extension + WASM policy engine + YAML parsing  
**Version:** v1.0

---

## 1. Assets

- Kubernetes YAML documents  
- User-defined policy bundles  
- Validation results  
- Local rule storage  
- Browser’s trust environment  
- WASM engine integrity  
- Guardon extension code

---

## 2. Actors

### **Primary**
- Developer (authorized)  
- Guardon Extension  
- Kyverno-WASM engine  
- Browser sandbox  

### **Secondary**
- GitHub/GitLab interface (untrusted but expected)  
- External rule sources (trusted only through user import)

### **Adversaries**
- Malicious developer  
- Compromised browser extension ecosystem  
- Supply-chain attacker  
- Browser exploit attacker  
- User with malicious intent  
- Malicious JavaScript in GitHub/GitLab DOM  

---

## 3. STRIDE Analysis

### **S — Spoofing**
**Risks:**
- Impersonation of rule sources  
- Malicious WASM module tampering  
- Fake extension versions

**Mitigations:**
- Signed releases  
- No remote rule fetching  
- CSP restricting script injection  
- User-controlled rule import only  

---

### **T — Tampering**
**Risks:**
- Modification of rules in local storage  
- DOM-based manipulation of annotations  
- Altering validation logic via supply-chain JS

**Mitigations:**
- Local storage schema validation  
- Immutable rule parsing  
- Deterministic WASM behavior  
- Content-Security-Policy enforcement  

---

### **R — Repudiation**
**Risks:**
- No server logs (intentional design)  
- Hard to prove who changed rule bundles  

**Mitigations:**
- User confirmation flows for rule changes  
- Optional local audit log (planned)  
- Clearly documented local-only behavior  

---

### **I — Information Disclosure**
**Risks:**
- YAML content exposure if extension leaks  
- Cross-tab data leakage  
- Extension accessing unrelated browser data

**Mitigations:**
- Strict MV3 permissions  
- Zero telemetry design  
- No cookie/storage access  
- No external endpoints  
- Runtime isolation via WASM  

---

### **D — Denial of Service**
**Risks:**
- Large YAML files freeze extension  
- Malicious rule packs causing infinite evaluation  
- DOM mutation overload from CI diffs

**Mitigations:**
- Worker timeouts  
- Rule execution limits  
- Graceful fallback mode  

---

### **E — Elevation of Privilege**
**Risks:**
- Extension gaining access to tokens  
- WASM escaping sandbox  
- DOM injection attacks escalating permissions

**Mitigations:**
- No access to cookies, tokens, or storage  
- Browser sandbox isolation  
- Restricted extensions permissions (read-only)  
- Strict WASM runtime boundaries  

---

## 4. Out-of-Scope Threats

- Kubernetes runtime attacks  
- Host/kernel exploitation  
- Network/TLS attacks  
- GitHub/GitLab authentication flows  
- Supply-chain attacks unrelated to Guardon code  
- Cross-extension interference  

---

## 5. Attack Surfaces

- Browser DOM  
- Local rule storage  
- WebAssembly engine  
- YAML parser  
- Extension update mechanism  

---

## 6. High-Level Data Flow Diagram (DFD)

