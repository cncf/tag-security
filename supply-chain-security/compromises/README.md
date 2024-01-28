<!-- cSpell:ignore markdownlint -->
<!-- markdownlint-disable MD033 -->

# Catalog of Supply Chain Compromises

This repository contains links to articles of software supply chain compromises.
The goal is not to catalog every known supply chain attack, but rather to capture
many examples of different kinds of attack, so that we can better understand the
patterns and develop best practices and tools.

For definitions of each compromise type, please check out our [compromise
definitions page](/supply-chain-security/compromises/compromise-definitions.md)

We welcome additions to this catalog by [filing an
issue](https://github.com/cncf/tag-security/issues/new/choose) or [github pull
request](https://github.com/cncf/tag-security)

Contents of this repo and proposed additions are not a statement or opinion on
the security stance and/or practices of a given project, of open source, or the
community. These articles and stories annotate the communities dedication to
rapid response, evolving security practices, transparent disclosure, and
enforcement of one of open sources founding principles, "[Linus's
Law](https://en.wikipedia.org/wiki/Linus%27s_law)".

When submitting an addition, please review the
[definitions](https://github.com/cncf/sig-security/blob/master/supply-chain-security/compromises/compromise-definitions.md)
page to ensure the Type of Compromise on the details of the incidents as well as
the Catalog itself are consistent. If a definition doesn't exist or a new type
of compromise needs added, please include that as well.
<!-- cSpell:disable -->
| Name              | Year               | Type of compromise    | Link        |
| ----------------- | ------------------ | ------------------    | ----------- |
| [RubyGems Package Overwrite Flaw](2022/rubygems-override.md) | 2022 | Publishing Infrastructure | [1](https://www.bleepingcomputer.com/news/security/check-your-gems-rubygems-fixes-unauthorized-package-takeover-bug/)
| [Legitimate software update mechanism abused to deliver wiper malware](2022/fantasy.md) | 2022 | Publishing Infrastructure | [1](https://www.welivesecurity.com/2022/12/07/fantasy-new-agrius-wiper-supply-chain-attack/)|
| [Docker Hub malicious containers](2022/docker-hub-malicious-containers.md) | 2022 | Publishing Infrastructure | [1](https://www.bleepingcomputer.com/news/security/docker-hub-repositories-hide-over-1-650-malicious-containers/)
| [Chat100 live chat trojan](2022/Comm100-live-chat-trojan.md) | 2022 | Publishing Infrastructure | [1](https://www.securityweek.com/supply-chain-attack-targets-customer-engagement-firm-comm100)
| [Dropbox GitHub compromise](2022/dropbox-github-account-breach.md) | 2022 | Attack Chaining | [1](https://www.bleepingcomputer.com/news/security/dropbox-discloses-breach-after-hacker-stole-130-github-repositories/)
| [Intel Alder Lake BIOS leak](2022/intel-alder-lake-BIOS-leak.md) | 2022 | Source Code | [1](https://www.tomshardware.com/news/intel-confirms-6gb-alder-lake-bios-source-code-leak-new-details-emerge)
| [PEAR PHP Package Manager compromise](2022/php-pear-compromise.md) | 2022 | Dev Tooling | [1](https://blog.sonarsource.com/php-supply-chain-attack-on-pear/)
| [npm Library ‘node-ipc’ Sabotaged with npm Library ‘peacenotwar’ in Protest by their Maintainer](2022/node-ipc-peacenotwar.md) | 2022 | Malicious Maintainer | [1](https://snyk.io/blog/peacenotwar-malicious-npm-node-ipc-package-vulnerability/)|
| [npm Libraries ‘colors’ and ‘faker’ Sabotaged in Protest by their Maintainer](2022/js-faker-colors.md) | 2022 | Malicious Maintainer | [1](https://www.revenera.com/blog/software-composition-analysis/the-story-behind-colors-js-and-faker-js/)|
| [GCP Golang Buildpacks Old Compiler Injection](2022/golang-buildpacks-compiler.md) | 2022 | Source Code | [1](https://zt.dev/posts/gcp-buildpacks-old-compiler/)|
| [WordPress theme publisher compromised](2022/wp-apthemes.md) | 2022 | Source Code <br> Publishing Infrastructure | [1](https://jetpack.com/2022/01/18/backdoor-found-in-themes-and-plugins-from-accesspress-themes/), [2](https://blog.sucuri.net/2022/01/accesspress-themes-hit-with-targeted-supply-chain-attack.html)|
| [Remote code injection in Log4j](2021/log4j.md) | 2021 | Source code | [1](https://security.googleblog.com/2021/12/understanding-impact-of-apache-log4j.html) |
| [Compromise of npm packages coa and rc](2021/coa-rc.md) | 2021 | Malicious Maintainer | [1](https://blog.sonatype.com/npm-hijackers-at-it-again-popular-coa-and-rc-open-source-libraries-taken-over-to-spread-malware) |
| [Compromise of ua-parser-js](2021/ua-parser-js.md) | 2021 | Malicious Maintainer | [1](https://github.com/faisalman/ua-parser-js/issues/536) |
| [The klow / klown / okhsa incident](2021/klow-klown-okhsa.md) | 2021 | Negligence | [1](https://blog.sonatype.com/newly-found-npm-malware-mines-cryptocurrency-on-windows-linux-macos-devices) |
| [PHP self-hosted git server](2021/php.md) | 2021 | Dev Tooling | [1](https://news-web.php.net/php.internals/113838) |
| [Homebrew](2021/homebrew.md) | 2021 | Dev Tooling | [1](https://brew.sh/2021/04/21/security-incident-disclosure/), [2](https://hackerone.com/reports/1167608) |  |
| [Codecov](2021/codecov.md) | 2021 | Source Code | [1](https://about.codecov.io/security-update/) |  |
| [Repojacking exposed private repositories through supply-chain compromise](2021/repojacking.md) | 2021 | Negligence | [1](https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610) |
| [VSCode GitHub](2021/vscode.md) | 2021 | Dev Tooling | [1](https://www.bleepingcomputer.com/news/security/heres-how-a-researcher-broke-into-microsoft-vs-codes-github/) |  |
| [SUNBURST/SUNSPOT/Solarigate](2020/solarwinds.md) | 2020 | Publishing Infrastructure | [1](https://www.fireeye.com/blog/threat-research/2020/12/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor.html), [2](https://msrc-blog.microsoft.com/2020/12/13/customer-guidance-on-recent-nation-state-cyber-attacks/), [3](https://www.crowdstrike.com/blog/sunspot-malware-technical-analysis/) |  |
| [The Great Suspender](2020/thegreatsuspender.md) | 2020 | Malicious Maintainer | [1](https://github.com/greatsuspender/thegreatsuspender/issues/1263),[2](https://lifehacker.com/ditch-the-great-suspender-before-it-becomes-a-security-1845989664) |
| [Abusing misconfigured SonarQube applications](2020/sonarqube.md) | 2020 | Dev Tooling | [1](https://www.zdnet.com/article/fbi-hackers-stole-source-code-from-us-government-agencies-and-private-companies/), [2](https://www.ic3.gov/Media/News/2020/201103-3.pdf) |
| [Octopus Scanner](2020/octopus_scanner.md) | 2020 | Dev Tooling | [1](https://securitylab.github.com/research/octopus-scanner-malware-open-source-supply-chain),[2](https://threatpost.com/octopus-scanner-tentacles-github-repositories/156204/) |
| [NPM reverse shells and data mining](2020/nodejs.md) | 2020 | Dev Tooling | [1](https://www.bleepingcomputer.com/news/security/npm-nukes-nodejs-malware-opening-windows-linux-reverse-shells/) |
| [Binaries of the CLI for `monero` compromised](2019/monero.md) | 2019 | Publishing Infrastructure | [1](https://web.getmonero.org/2019/11/19/warning-compromised-binaries.html), [2](https://github.com/monero-project/monero/issues/6151), [3](https://old.reddit.com/r/Monero/comments/dyfozs/security_warning_cli_binaries_available_on/) |
| [Webmin backdoor](2019/webmin-backdoor.md) | 2019 | Dev Tooling | [1](https://www.zdnet.com/article/backdoor-found-in-webmin-a-popular-web-based-utility-for-managing-unix-servers/), [2](http://www.webmin.com/exploit.html) |
| [purescript-npm](2019/purescript-npm.md) | 2019 | Source Code | [1](https://www.npmjs.com/advisories/1082) and [2](https://www.npmjs.com/advisories/1082) |
| [electron-native-notify](2019/electron-native-notify.md) | 2019 | Source Code | [1](https://blog.npmjs.org/post/185397814280/plot-to-steal-cryptocurrency-foiled-by-the-npm), [2](https://komodoplatform.com/update-agama-vulnerability/)|
| [PyPI typosquatting](2019/pypi.md) | 2019 | Negligence | [1](https://blog.reversinglabs.com/blog/suppy-chain-malware-detecting-malware-in-package-manager-repositories) |
| [ROS build farm compromise](2019/ros.md) | 2019 | Trust and Signing <br>Publishing Infrastructure</br> | [1](https://discourse.ros.org/t/security-issue-on-ros-build-farm/9342/8), [2](https://discourse.ros.org/t/new-gpg-keys-deployed-for-packages-ros-org/9454) |
| [ShadowHammer](2019/shadowhammer.md) | 2019 | Attack Chaining | [1](https://www.csoonline.com/article/3384259/asus-users-fall-victim-to-supply-chain-attack-through-backdoored-update.html), [2](https://securelist.com/operation-shadowhammer/89992/) |
| [PEAR Breach](2019/pear.md) | 2019 | Publishing Infrastructure | [1](https://blog.cpanel.com/when-php-went-pear-shaped-the-php-pear-compromise/), [2](https://thehackernews.com/2019/01/php-pear-hacked.html) |
| [Canonical's GitHub org compromised](2019/canonical-github.md) | 2019 | Dev Tooling <br> Source Code <br> Publishing infrastructure </br> | [1](https://www.zdnet.com/article/canonical-github-account-hacked-ubuntu-source-code-safe/) |
| [The event-stream vulnerability](2018/event_stream.md) | 2018 | Malicious Maintainer | [1](https://medium.com/intrinsic/compromised-npm-package-event-stream-d47d08605502),[2](https://github.com/dominictarr/event-stream/issues/116) |
| [Dofoil](2018/dofoil.md) | 2018 | Publishing Infrastructure | [1](https://www.zdnet.com/article/windows-attack-poisoned-bittorrent-client-set-off-huge-dofoil-outbreak-says-microsoft/) |
| [Operation Red](2018/operation-red.md) | 2018 | Publishing Infrastructure | [1](https://blog.trendmicro.com/trendlabs-security-intelligence/supply-chain-attack-operation-red-signature-targets-south-korean-organizations/) |
| [RCE in go get -u](2018/gogetu.md) | 2018 | Dev Tooling | [1](https://github.com/golang/go/issues/29230), [2](https://staaldraad.github.io/post/2019-03-28-go-get-vuln/) |
| [acroread compromised in AUR](2018/aur.md) | 2018 | Malicious Maintainer | [1](https://lists.archlinux.org/pipermail/aur-general/2018-July/034152.html), [2](https://www.bleepingcomputer.com/news/security/malware-found-in-arch-linux-aur-package-repository/) |
| [Gentoo Incident](2018/gentoo.md) | 2018    | Source Code | [1](https://wiki.gentoo.org/wiki/Project:Infrastructure/Incident_Reports/2018-06-28_Github)
| [Unnamed Maker](2018/unnamed-maker.md) | 2018 | Publishing Infrastructure | [1](https://www.bleepingcomputer.com/news/security/microsoft-discovers-supply-chain-attack-at-unnamed-maker-of-pdf-software/) |
| [Colourama](2018/colourama.md) | 2018 | Negligence | [1](https://medium.com/@bertusk/cryptocurrency-clipboard-hijacker-discovered-in-pypi-repository-b66b8a534a8), [2](https://arstechnica.com/information-technology/2018/10/two-new-supply-chain-attacks-come-to-light-in-less-than-a-week/) |
| [Foxif/CCleaner](2017/ccleaner.md) | 2017 | Publishing Infrastructure | [1](https://blog.talosintelligence.com/2017/09/avast-distributes-malware.html) |
| [HandBrake](2017/handbrake.md) | 2017 | Publishing Infrastructure | [1](https://blog.malwarebytes.com/threat-analysis/mac-threat-analysis/2017/05/handbrake-hacked-to-drop-new-variant-of-proton-malware/) |
| [Kingslayer](2017/kingslayer.md) | 2017 | Publishing Infrastructure | [1](https://comsecglobal.com/kingslayer-a-supply-chain-attack/) |
| [HackTask](2017/hacktask.md) | 2017 | Negligence | [1](https://securityintelligence.com/news/typosquatting-attack-puts-developers-at-risk-from-infected-javascript-packages/) |
| [NotPetya](2017/notpetya.md) | 2017 | Attack Chaining | [1](https://www.welivesecurity.com/2017/07/04/analysis-of-telebots-cunning-backdoor/) |
| [Bitcoin Gold](2017/bitcoingold.md) | 2017 | Source Code | [1](https://bitcoingold.org/critical-warning-nov-26/) |
| [ExpensiveWall](2017/expensivewall.md) | 2017 | Dev Tooling | [1](https://blog.checkpoint.com/2017/09/14/expensivewall-dangerous-packed-malware-google-play-will-hit-wallet/), [2](https://research.checkpoint.com/expensivewall-dangerous-packed-malware-google-play-will-hit-wallet/)
| [OSX Elmedia player](2017/elmedia.md) | 2017 | Publishing infrastructure | [1](https://www.hackread.com/hackers-infect-mac-users-proton-malware-using-elmedia-player/) |
| [GitHub password recovery issues](2016/gh-unicode.md) | 2016 | Dev Tool <br> Source Code </br> | [1](https://bounty.github.com/researchers/jagracey.html), [2](https://dev.to/jagracey/hacking-github-s-auth-with-unicode-s-turkish-dotless-i-460n) |
| [keydnap](2016/keydnap.md) | 2016 | Publishing infrastructure | [1](https://blog.malwarebytes.com/threat-analysis/2016/09/transmission-hijacked-again-to-spread-malware), [2](https://www.welivesecurity.com/2016/08/30/osxkeydnap-spreads-via-signed-transmission-application/) |
| [Fosshub Breach](2016/fosshub.md) | 2016 | Publishing infrastructure | [1](https://www.ghacks.net/2016/08/03/attention-fosshub-downloads-compromised/), [2](https://www.theregister.co.uk/2016/08/04/classicshell_audicity_infection/) |
| [Linux Mint](2016/mint.md) | 2016 | Publishing infrastructure | [1](https://www.zdnet.com/article/linux-mint-website-hacked-malicious-backdoor-version/) |
| [Juniper Incident](2015/juniper.md) | 2015    | Source Code | [1](https://eprint.iacr.org/2016/376.pdf)
| [XCodeGhost](2015/xcodeghost.md) | 2015 | Fake toolchain | [1](https://www.theregister.co.uk/2015/09/21/xcodeghost_apple_ios_store_malware_zapped/) |
| [Ceph and Inktank](2015/ceph-and-inktank.md) | 2015 | Source Code <br> Publishing infrastructure </br> | [1](https://www.zdnet.com/article/red-hats-ceph-and-inktank-code-repositories-were-cracked/) |
| [Code Spaces](2014/code-spaces.md) | 2014    | Source Code | [1](https://threatpost.com/hacker-puts-hosting-service-code-spaces-out-of-business/106761/)
| [Monju Incident](2014/monju.md) | 2014    | Publishing infrastructure| [1](https://www.contextis.com/en/blog/context-threat-intelligence-the-monju-incident)
| [APT lack of validation for source packages](2013/apt.md) | 2013 | Negligence | [1](https://lwn.net/Articles/602461/) |
| [kernel.org compromise](2011/kernelorg.md) | 2011 | Publishing infrastructure | [1](https://lwn.net/Articles/461237/), [2](https://lwn.net/Articles/461552/) |
| [apache.org incident](2010/apache.md) | 2010 | Attack Chaining | [1](https://blogs.apache.org/infra/entry/apache_org_04_09_2010) |
| [Operation Aurora](2010/aurora.md) | 2010 | Watering-hole attack | [1](https://www.wired.com/2010/03/source-code-hacks/) |
| [ProFTPD](2010/proftpd.md) | 2010 | Publishing Infrastructure | [1](https://www.zdnet.com/article/open-source-proftpd-hacked-backdoor-planted-in-source-code/) |
| [WordPress backdoor](2007/wordpress.md) | 2007 | Source Code <br> Publishing Infrastructure </br> | [1](https://lwn.net/Articles/224997/) |
| [SquirrelMail backdoor](2007/squirrelmail.md) | 2007 | Source Code <br> Publishing Infrastructure | [1](https://lwn.net/Articles/262688/) |
| [gentoo rsync compromise](2003/gentoo-rsync.md) | 2003 | Publishing Infrastructure | [1](https://archives.gentoo.org/gentoo-announce/message/7b0581416ddd91522c14513cb789f17a) |
| [Debian infra compromise](2003/debian.md) | 2003 | Publishing infrastructure | [1](https://www.debian.org/News/2003/20031202) |
| [Unix Support Group login backdoor](1984/login-bell.md) | <1984 | Dev Tooling | [1](https://niconiconi.neocities.org/posts/ken-thompson-really-did-launch-his-trusting-trust-trojan-attack-in-real-life/) |
