---
title:  "Securing the Cloud: Insights from CloudNativeSecurityCon 2024"
date:  2024-07-15T9:00:00-04:00
author: Shlomo Zalman Heigh
---

I recently had the pleasure of attending and speaking at the CNCF's
[CloudNativeSecurityCon 2024](https://events.linuxfoundation.org/cloudnativesecuritycon-north-america/)
in Seattle, WA. The conference brought together security professionals,
developers, and industry experts to discuss the latest trends and advancements
in cloud native security. The keynotes, breakout sessions, and networking
opportunities provided valuable insights into the evolving landscape of security
practices. Here are some key takeaways I gathered from the event:

## Industry Progress in Supply Chain Security

At the conference, we witnessed significant advancements in supply chain
security. Three notable projects stood out to me: SLSA, GUAC, and VEX.

- **SLSA and GUAC**: Both SLSA and GUAC aim to improve transparency and trust in
software supply chains. By defining different maturity levels of supply chain
security (SLSA), and providing a graph to visualize and reason about it (GUAC),
they helps organizations make informed decisions about the components they use.
It was clear to me that both SLSA and GUAC are gaining tremendous traction in
the industry, and their adoption will surely enhance visibility into security
posture across the software supply chain.

- **VEX (Vulnerability Exploitability eXchange)**: VEX addresses the
overwhelming number of vulnerabilities detected during container scans. It aims
to allow teams to prioritize and handle vulnerabilities more effectively by
knowing which ones are more likely to be exploited and which should be treated
as false positives. There are a few implementations of the VEX standard, and
there were several talks at the conference discussing how to integrate VEX into
existing security workflows. We'll cover this more a bit later in this post.

## Trends in Identity and Workload Security

The industry is shifting away from long-lived credentials toward workload
identity. SPIFFE (Secure Production Identity Framework For Everyone) has gained
prominence as a standard for workload identity. This approach enhances security
by ensuring that services can only access resources they are explicitly
authorized to use, without the need for long-lived credentials which are
prone to leakage.

[Session link](https://sched.co/1dCWN)

## Lighter Systems: Operators Over Sidecars

Traditionally, sidecars have been used to enhance container functionality, and
provide authentication between services. However, the trend is moving toward
lighter systems like operators, which don't require additional resources for
each pod and therefore scale more efficiently. In particular, we saw Istio's new
Ambient Mode demoed in the keynote by Lin Sun. This feature is still in beta,
and you can learn more on the
[Istio blog](https://istio.io/latest/blog/2024/ambient-reaches-beta/).

[Keynote link](https://sched.co/1dCVF)

## University Open Source Centers and Student Involvement

One of my favorite breakout sessions was given by two students from Rensselaer
Polytechnic Institute, Ben Smith-Foley and Sam Begin. They discussed how
University Open Source Centers, such as RCOS (Rensselaer Center for Open
Source), provide students with valuable opportunities to learn and gain
real-world experience. These centers bridge the gap between classroom learning
and practical skills. Students can contribute to open-source projects, document
their processes, and tackle "good-first-issue" tasks. I always enjoy hearing
about initiatives that encourage student involvement in open source, and I was
inspired by the work these students are doing and hope to see more universities
adopt similar programs which are beneficial for both students and the
open-source community.

[Session link](https://sched.co/1dCUW)

## VEX: Automated Vulnerability Prioritization

As mentioned earlier, VEX has been gaining traction as a way to prioritize
vulnerabilities detected during container scans. I had the privilege of
delivering a presentation on automated generation of VEX documents using
Kubescape along with Ben Hirschberg, CTO of [Armo](https://www.armosec.io/). We
discussed how [Kubescape](https://kubescape.io/) can be used to generate VEX
documents through runtime analysis of containers in Kubernetes, and how we
developed a new
[GitHub Action](https://github.com/kubescape/generate-vex-action) to automate
this process.

[Session link](https://sched.co/1dCWE)

## Conclusion

There were many more valuable insights and takeaways from
CloudNativeSecurityCon, and I encourage you to explore the conference schedule
and watch the recorded sessions once they are available on the
[CNCF YouTube channel](https://www.youtube.com/@cncf). I'm excited to see
the continued progress in cloud native security and look forward to attending
future events to learn more about the latest trends and advancements in the
industry.

## About the Author

Shlomo Heigh is a Senior Software Engineer at CyberArk, where he maintains the
[Conjur](https://www.conjur.org/) open source secrets manager. He is a
contributor to the CNCF's TAG Security and an OWASP chapter leader. You can find
him on [LinkedIn](https://www.linkedin.com/in/szheigh) and
[GitHub](https://github.com/szh).
