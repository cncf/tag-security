# The Great Suspender

The Great Suspender is a popular Chrome extension with more than 2 million users
on Google's platform alone. The extension is designed to improve the RAM usesage
of the Chrome browser by suspending tabs manually or automatically.

The original developer [@deanoemcke](https://github.com/deanoemcke) chose to
step back from the extension in June 2020 and sell the extension
[Upcoming changes to the management of The Great Suspender](https://github.com/greatsuspender/thegreatsuspender/issues/1175).
As a replacement maintainer, he chose an unknown entity, who controls the
single-purpose [@greatsuspender](https://github.com/greatsuspender) Github
account. There was suspicion about this change because of the complete lack of
information on the new maintainers' identity.

For a couple of months, the new maintainers did nothing.
In October 2020, the maintainer updated the chrome store package to version
7.1.8. The update raised red flags for some users because the changelog was not
modified and there was no tag created in GitHub. The web store extension has
diverged from its Github source. A minor change in the manifest was now being
shipped on the chrome web store, which was not included in Github. This is a
major concern.

<!-- markdown-link-check-disable -->
As a final red flag, no part of the web-store posting has been updated to account
for this. [@greatsuspender](https://github.com/greatsuspender) remains listed as
the maintainer, and a privacy policy makes no mention of the new tracking or
maintainer [greatsuspender privacy policy](https://greatsuspender.github.io/privacy).
<!-- markdown-link-check-disable -->

On November 6th, [@lucasdf](https://github.com/lucasdf) discovered a smoking gun
that the new maintainer is malicious. Although OpenWebAnalytics is legitimate
software, it does not provide the files executed by the extension. Those are
hosted on the unrelated site owebanalytics.com, which turns out to be immensely
suspicious. That site was created **at the same time as the update** (see this
comment [thegreatsuspender/issue/1175#issuecomment-717656189](https://github.com/greatsuspender/thegreatsuspender/issues/1175#issuecomment-717656189)).
The site contains no real information other than the tracking scripts, appears
to have been purchased with BitCoin and is only found in the context of this
extension. Most importantly, **the minified javascript differs significantly**
from that distributed by the OWA project.

[@thibaudcolas](https://github.com/thibaudcolas) has done a more detailed
analysis. He quickly located additional hardcoded values related to other,
confirmed malicious extensions, implying that the new maintainer is responsible
for them. He also found incredibly suspicious additional information, that makes
it clear that the extension **was not loading a modified version of OWA, but a
trojan disguised as it**. OWA has a PHP based backend, but the fakes are using
NodeJS. The trojan sets cookies, which OWA doesn't use.  The response to certain
requests is a completely different type than legitimate OWA.

Furthermore, [@joepie91](https://github.com/joepie91) has attempted to deconstruct
the minified JS and believes that the code intercepts all requests, meaning it
can track you perfectly, and manipulates those requests, and makes
additional advertising requests.
The fact that disabling tracking still works is irrelevant given the fact that
most of the 2 million users of this extension have no idea that that option even
exists.

The new maintainer has never posted on any of the GitHub threads where users
share their concerns, or interacting in any way with the repository.

## Impact

The Chrome web store says that there are 2 million downloads of the extension.
It's unclear how many of them are active users.

By default, all chrome extensions are automatically updated, so when the
malicious version 7.1.8 has been released most of the active users automatically
updated to it.

Windows Central released an article from November 23 2020 claiming that
[The Great Suspender' extension is now flagged as malware](https://www.windowscentral.com/great-suspender-extension-now-flagged-malware-edge-has-built-replacement)
on Microsoft Edge.

Soon after that, the unknown developer release a new update 7.1.9.
According to [@ossilator](https://github.com/ossilator)
*"The new web store release 7.1.9 does not contain the presumably malicious code
anymore, but note that the permissions in the manifest have not been revoked."*
[greatsuspender/thegreatsuspender/issues/1263](https://github.com/greatsuspender/thegreatsuspender/issues/1263#issuecomment-735409569)

The fact that a new version has since been pushed that disables this behavior
isn't useful because future update could reintroduce the malicious
code **without users noticing**.

The project can no longer be considered as **open source**, since the owner
refuses to make the source open and available for review.

At the time of writing (February 5-th, 2021), ["The Great Suspender" was taken
down on the Chrome Webstore](https://9to5google.com/2021/02/04/the-great-suspender-extension-has-been-removed-from-chrome-web-store-for-containing-malware/)
and Google is actively disabling it for active users, but on the Microsoft Edge
addons store it's still available to download and it's possible that this saga
will continue.


## Type of compromise

As the attack has been performed by an owner of `thegreatsuspender` deliberately
injecting a vulnerability into the source code, this attack can be categorized
as a `malicious maintainer` exploit.

## References:

- [URGENT: SECURITY: New maintainer is probably malicious](https://github.com/greatsuspender/thegreatsuspender/issues/1263)
- [Ditch 'The Great Suspender' Before It Becomes a Security Risk](https://lifehacker.com/ditch-the-great-suspender-before-it-becomes-a-security-1845989664)
