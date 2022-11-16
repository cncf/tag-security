<!-- cspell:ignore UEFI -->
<!-- cspell:ignore Ermolov -->

# Intel's Alder Lake BIOS leaked

Intel's Alder Lake BIOS source code had been leaked on 4chan and Github, with the 6GB file containing the code and supporting tools for building and optimizing BIOS/UEFI images.

Statement from Intel:

"Our proprietary UEFI code appears to have been leaked by a third party. We do not believe this exposes any new security vulnerabilities as we do not rely on obfuscation of information as a security measure. This code is covered under our bug bounty program within the Project Circuit Breaker campaign, and we encourage any researchers who may identify potential vulnerabilities to bring them our attention through this program. We are reaching out to both customers and the security research community to keep them informed of this situation." 

## Impact

"Now that the BIOS/UEFI code is in the wild and Intel has confirmed it as legitimate, both nefarious actors and security researchers alike will undoubtedly probe it to search for potential backdoors and security vulnerabilities."

"...Security researcher Mark Ermolov has already been hard at work analyzing the code. His early reports indicate that he has found secret MSRs (Model Specific Registers) that are typically reserved for privileged code and thus can present a security problem, along with the private signing key used for Intel's Boot Guard, thus potentially invalidating the feature. In addition, there are also signs of ACMs (Authenticated Code Modules) for BootGuard and TXT (Trusted Execution Technology), portending potential future issues with the root of trust."

## Type of Compromise

This incident fits the [Source Code](../compromise-definitions.md#source-code) definition.

## References

- [Intel Confirms Alder Lake BIOS Source Code Leak](https://www.tomshardware.com/news/intel-confirms-6gb-alder-lake-bios-source-code-leak-new-details-emerge)
