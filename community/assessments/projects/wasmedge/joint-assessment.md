# WasmEdge TAG-Security Security Assessment
<!-- cSpell:ignore Ying Shen Hsieh ibmibmibm hydai wasmedge Constanze Röedig entlein Camila Vilarinho camilaavilarinho victorjunlu Meng WASI crun userbase Uptane wasi-->

Completed: 01 07 2025

Security reviewers: Justin Cappos @JustinCappos, Marina Moore @mnm678, Constanze Röedig @entlein, Camila Vilarinho @camilaavilarinho, and Victor Lu @victorjunlu

Project security lead: Hung-Ying Tai @hydai

Project team: Hung-Ying Tai @hydai, Meng-Han Lee @dm4

* Source code: <https://github.com/WasmEdge/WasmEdge>
* Web site: <https://wasmedge.org/>

## Summary

The project has built a reasonably secure system with appropriate security controls. However, the security limitations, testing requirements, and benefits could be better communicated to users. Additional focus on going above common recommendations would strengthen the project's security posture. The assessment team appreciates WasmEdge's cooperation in answering questions and clarifying the self-assessment document.

## Recommendations

### CNCF recommendations

* Improve documentation translation across languages, especially into English
* Consider adopting CNCF security best practices for software supply chain attestations (in-toto/SLSA)
* Explore integration with CNCF security projects like SPIFFE/SPIRE for workload identity

### Project recommendations

1. The document needs to clearly say about whether you add a formal verifier for your runtime.   What do other runtimes provide to validate they are correctly implementing the WASM spec?
2. Have you done validation of how you’re using WASI, what interfaces you are providing, their security, etc.?  For example, as an illustrative example, can you explain how you’ve validated that your \--dir interface doesn’t have path traversal vulnerabilities?  What is the guidance you give to users who want to use this interface to make sure they do so securely?   Are they free to add symlinks / mount file systems, etc. into that part of the directory namespace, etc.?  
3. Does the fact that WASI isn’t portable and has a lot of undefined behavior give users any security concerns?  
4. How are you doing updates of your core functionality on the device?  [https://uptane.org/](https://uptane.org/)
   or [https://theupdateframework.com/](https://theupdateframework.com/)
5. Do you (or should you) be attesting to the software running on the edge device?   Are you doing software supply chain attestations (in-toto / SLSA, etc.)?   Would this be helpful / useful?  Would users expect this functionality?  Consider:   [https://github.com/in-toto/in-toto](https://github.com/in-toto/in-toto)  [https://datatracker.ietf.org/group/scitt/about/](https://datatracker.ietf.org/group/scitt/about/)  [https://slsa.dev/](https://slsa.dev/)
6. Please explain clearly about how one would use things like non-human identities, monitoring, security filtering, etc. Is everything completely compatible with SPIFFE/SPIRE?  Are there any differences in use in comparison to e.g.:    [https://wasmcloud.com/blog/2025-03-04-why-were-adopting-spiffe-for-webassembly-workload-identity/](https://wasmcloud.com/blog/2025-03-04-why-were-adopting-spiffe-for-webassembly-workload-identity/)
7. What should users be thinking about with respect to data residency and jurisdictional constraints when processing sensitive data in WasmEdge?  How does being at the edge change this equation?  
8. Please, add to the main body of the document (and on github)  
   \- how you ensure continuous verification/testing of the WASM specification of all components (the Verifier, the Loader, the Engine \- every main component in scope of WASM-Edge).  
   Example:
   Where Side Channel Attacks are tested against and how the code verifiably written in  “side-channel resistant” way.  [https://github.com/WebAssembly/constant-time/blob/main/proposals/constant-time/Overview.md](https://github.com/WebAssembly/constant-time/blob/main/proposals/constant-time/Overview.md)
   Can you add to the document for each major attack-class: how is it being tested/fuzzed and can you show in your repo/artifacts, and comment how you’d resolve any failures.  
9. Ensure that it is clear why you are having failures on tests when building the code.   Your code is being pushed to production regardless.   Why is this appropriate?  
10. The project could benefit from more effort to explain the security aspects of their design to their userbase.
11. The project would benefit from putting a link (and also a github-badge) in the main-README that goes directly to the security testing/definitions.  Fixed by [https://github.com/WasmEdge/WasmEdge/pull/4216](https://github.com/WasmEdge/WasmEdge/pull/4216)

### Additional recommendations

* Consider implementing Uptane or TUF for secure updates of core functionality on edge devices
* Evaluate implementing software attestation for edge device workloads
* Provide clearer guidance on data residency and jurisdictional constraints for sensitive data processing

Tracking issue: <https://github.com/WasmEdge/WasmEdge/issues/4237>
Tracking project board: <https://github.com/orgs/WasmEdge/projects/14>
