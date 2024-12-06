 

# Solana Web3.js: Malicious Code Injection to Compromise private and secret cryptography keys

Malicious versions 1.95.6 and 1.95.7 were published on December 2, 2024, containing backdoor code designed to exfiltrate private keys and wallet addresses. A publish-access account was compromised by the malicious actors, giving them access to private keys and possibly enabling them to drain funds from crypto bots and other decentralized apps (dapps) that manage private keys directly during transactions. 

## Impact

- The npm package @solana/web3.js is a Javascript API for use with the Solana blockchain platform. It ranks among the top 10,000 projects in the npm community with more than 3,000 dependent projects generating 400,000 weekly downloads and 51 million total recorded downloads.
-  The biggest impact was on individuals or organizations running backend JavaScript bots with private keys on their servers who updated to the compromised library versions within the short timeframe (a few hours) before the patch was released.
- Financial damage was roughly around 130K according to Mert Mumtaz, CEO of Helius Labs (when the malicious code was undetected just for around 6 hours).
   

## Type of compromise

- Unauthorized access to a publish-access account(social engineering/ phishing attack)

  
## References  

- [mert | helius.dev's Tweet](https://x.com/0xMert_/status/1864069157257613719)
- [ReversingLabs Blog](https://www.reversinglabs.com/blog/malware-found-in-solana-npm-library-with-50m-downloads)
- [HackerNews](https://thehackernews.com/2024/12/researchers-uncover-backdoor-in-solanas.html)
