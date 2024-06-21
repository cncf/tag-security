<!-- cspell:ignore Comm100 -->
<!-- cspell:ignore main.js -->

# Compromised Comm100 Live Chat Application Infects Customers

Comm100 is a customer engagement software provider with at least 15,000 customers across 51 countries. The company’s website distributed a Trojanized "Live Chat" installer, signed with a valid Comm100 Network Corporation certificate, from at least September 27 until September 29, 2022. 

## Impact

According to CrowdStrike "the trojanized file was identified at organizations in the industrial, healthcare, technology, manufacturing, insurance and telecommunications sectors in North America and Europe".

"The Comm100 installer is an Electron application in which the attackers injected a JavaScript backdoor, within the main.js file of the embedded archive. When executed, the backdoor fetches and runs a second-stage script from an external resource" that "provides the attackers with remote shell functionality."

An updated Comm100 installer has been released.

## Type of Compromise

This incident fits the [Publishing Infrastructure](../compromise-definitions.md#publishing-infrastructure) definition.

## References

- [Supply Chain Attack Targets Customer Engagement Firm Comm100](https://www.securityweek.com/supply-chain-attack-targets-customer-engagement-firm-comm100)
