# Catalog of Supply Chain Compromises


This repository contains links to articles of software supply chain
compromises. The goal is not to catalog every known supply chain attack, but 
rather to capture many examples of different kinds of attack, so that we 
can better understand the patterns and develop best practices and tools.

We welcome additions to this catalog by 
[filing an issue](https://github.com/cncf/sig-security/issues/new/choose) or
[github pull request](https://github.com/cncf/sig-security)


| Name              | Year               | Type of compromise    | Link        |
| ----------------- | ------------------ | ------------------    | ----------- |
| [electron-native-notify](2019/electron-native-notify.md) | 2019 | Source Code Compromise | [1](https://blog.npmjs.org/post/185397814280/plot-to-steal-cryptocurrency-foiled-by-the-npm), [2](https://komodoplatform.com/update-agama-vulnerability/)|
| [ShadowHammer](2019/shadowhammer.md) | 2019 | Multiple steps | [1](https://www.csoonline.com/article/3384259/asus-users-fall-victim-to-supply-chain-attack-through-backdoored-update.html), [2](https://securelist.com/operation-shadowhammer/89992/) |
| [PEAR Breach](2019/pear.md) | 2019 | Publishing Infrastructure | [1](https://blog.dcso.de/php-pear-software-supply-chain-attack/), [2](https://thehackernews.com/2019/01/php-pear-hacked.html) |
| [Dofoil](2018/dofoil.md) | 2018 | Publishing Infrastructure | [1](https://www.zdnet.com/article/windows-attack-poisoned-bittorrent-client-set-off-huge-dofoil-outbreak-says-microsoft/) |
| [Operation Red](2018/operation-red.md) | 2018 | Publishing Infrastructure | [1](https://blog.trendmicro.com/trendlabs-security-intelligence/supply-chain-attack-operation-red-signature-targets-south-korean-organizations/) |
| [Gentoo Incident](2018/gentoo.md) | 2018    | Source Code Compromise| [1](https://wiki.gentoo.org/wiki/Project:Infrastructure/Incident_Reports/2018-06-28_Github)
| [Unnamed Maker](2018/unnamed-maker.md) | 2018 | Publishing Infrastructure | [1](https://www.bleepingcomputer.com/news/security/microsoft-discovers-supply-chain-attack-at-unnamed-maker-of-pdf-software/) |
| [Colourama](2018/colourama.md) | 2018 | TypoSquat | [1](https://medium.com/@bertusk/cryptocurrency-clipboard-hijacker-discovered-in-pypi-repository-b66b8a534a8), [2](https://arstechnica.com/information-technology/2018/10/two-new-supply-chain-attacks-come-to-light-in-less-than-a-week/) |
| [Foxif/CCleaner](2017/ccleaner.md) | 2017 | Publishing Infrastructure | [1](https://blog.talosintelligence.com/2017/09/avast-distributes-malware.html) |
| [HandBrake](2017/handbrake.md) | 2017 | Publishing Infrastructure | [1](https://blog.malwarebytes.com/threat-analysis/mac-threat-analysis/2017/05/handbrake-hacked-to-drop-new-variant-of-proton-malware/) |
| [Kingslayer](2017/kingslayer.md) | 2017 | Publishing Infrastructure | [1](https://www.rsa.com/content/dam/premium/en/white-paper/kingslayer-a-supply-chain-attack.pdf) |
| [HackTask](2017/hacktask.md) | 2017 | TypoSquat | [1](https://securityintelligence.com/news/typosquatting-attack-puts-developers-at-risk-from-infected-javascript-packages/) |
| [NotPetya](2017/notpetya.md) | 2017 | Multiple steps | [1](https://www.welivesecurity.com/2017/07/04/analysis-of-telebots-cunning-backdoor/) |
| [Bitcoin Gold](2017/bitcoingold.md) | 2017 | Source Code Compromise | [1](https://bitcoingold.org/critical-warning-nov-26/) | 
| [ExpensiveWall](2017/expensivewall.md) | 2017 | Backdooring SDK | [1](https://blog.checkpoint.com/2017/09/14/expensivewall-dangerous-packed-malware-google-play-will-hit-wallet/), [2](https://research.checkpoint.com/expensivewall-dangerous-packed-malware-google-play-will-hit-wallet/)
| [OSX Elmedia player](2017/elmedia.md) | 2017 | Publishing infrastructure | [1](https://www.hackread.com/hackers-infect-mac-users-proton-malware-using-elmedia-player/) |
| [keydnap](2016/keydnap.md) | 2016 | Publishing infrastructure | [1](https://blog.malwarebytes.com/threat-analysis/2016/09/transmission-hijacked-again-to-spread-malware), [2](https://www.welivesecurity.com/2016/08/30/osxkeydnap-spreads-via-signed-transmission-application/) |
| [Fosshub Breach](2016/fosshub.md) | 2016 | Publishing infrastructure | [1](https://www.ghacks.net/2016/08/03/attention-fosshub-downloads-compromised/), [2](https://www.theregister.co.uk/2016/08/04/classicshell_audicity_infection/) |
| [Linux Mint](2016/mint.md) | 2016 | Publishing infrastructure | [1](https://www.zdnet.com/article/linux-mint-website-hacked-malicious-backdoor-version/) |
| [Juniper Incident](2015/juniper.md) | 2015    | Source Code Compromise| [1](https://eprint.iacr.org/2016/376.pdf)
| [XCodeGhost](2015/xcodeghost.md) | 2015 | Fake toolchain | [1](https://www.theregister.co.uk/2015/09/21/xcodeghost_apple_ios_store_malware_zapped/) | 
| [Ceph and Inktank](2015/ceph-and-inktank.md) | 2015 | Build, source and publishing infrastructure | [1](https://www.zdnet.com/article/red-hats-ceph-and-inktank-code-repositories-were-cracked/) |
| [Code Spaces](2014/code-spaces.md) | 2014    | Source Code Compromise| [1](https://threatpost.com/hacker-puts-hosting-service-code-spaces-out-of-business/106761/)
| [Monju Incident](2014/monju.md) | 2014    | Publishing infrastructure| [1](https://www.contextis.com/en/blog/context-threat-intelligence-the-monju-incident)
| [Operation Aurora](2010/aurora.md) | 2010 | Watering-hole attack | [1](https://www.wired.com/2010/03/source-code-hacks/) | 
| [ProFTPD](2010/proftpd.md) | 2010 | Source Code Repository | [1](https://www.zdnet.com/article/open-source-proftpd-hacked-backdoor-planted-in-source-code/) |
| [gentoo rsync compromise](2003/gentoo-rsync.md) | 2003 | Source Code Repository | [1](https://archives.gentoo.org/gentoo-announce/message/7b0581416ddd91522c14513cb789f17a) |
