# nullifAI

Two malicious pickles were discovered by ReversingLab in February, 2025.
Pickle is a commonly and popularly used to serialize and deserialize ML model data, supported in platforms such as Hugging Face.
The malware contained a reverse shell that connected to a hardcoded IP address.
Note, that even broken Pickle files could execute malicious code on a developer system.

## Impact

* HuggingFace removed the malicious models within 24 hours of disclosure.
* The Picklescan tool was improved to identify threats in “broken” Pickle files.

## Type of Compromise

The attack leveraged the trust of models available in Hugging face. Hence, is a leveraged **Trust and Signing**.

## References

* [ReversingLabs](https://www.reversinglabs.com/blog/rl-identifies-malware-ml-model-hosted-on-hugging-face)
