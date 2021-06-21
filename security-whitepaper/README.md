# Cloud Native Security Whitepaper

## About

The Cloud Native Security Whitepaper (CNSWP) is a TAG-Security effort to ensure
the cloud native community has access to information about building,
distributing, deploying, and running secure cloud native capabilities.

## Updates to the paper

The Cloud Native Security Whitepaper (CNSWP) is intended to be a living document
created and maintained for the community, by its members.

Updates to the whitepaper, suggestions for updates, or discussion for updates
should initiate with an [issue](https://github.com/cncf/tag-security/issues)
submitted to the repo and labeled with "suggestion" and "whitepaper".

### Markdown

The living CNSWP is maintained in [markdown][whitepaper-md] and all updates will
be made in markdown.

### Contributing updates

All members of the community are welcome to contribute updates to the CNSWP. We
ask potential contributors to refer to the original design decisions, listed
below, as guidance when determining the content of their updates.

It is highly recommended that you seek peer review for your updates beyond that
of the Technical Leads and Co-Chairs of the TAG.

Once the PR is submitted, please place the link in the CNCF TAG-Security Channel
for the CNSWP:
[#tag-security-whitepaper](https://cloud-native.slack.com/archives/C017K5AN70T)
to request a review.

### Versioning and publishing

It is expected that many minor updates will occur, corrections to grammar,
spelling, clarification in language, translations, etc.  When these occur they
are considered minor changes to the overall content and will not warrant the
regeneration of the PDF.

When significant changes to the intent, content, or numerous minor changes
occur, the CNSWP working group will assess and determine if a new major version
of the PDF needs published.  When this decision is made, the markdown content
will be converted to text document and sent to the CNCF technical writers to
create the PDF.  The PDF will then be published back into the repository
annotating the new version, updating the links in the README.md accordingly.

Minor updates to the markdown shall receive a minor version bump indicated in
the Metadata table of the document and recorded as WIP.  When enough significant
changes have been recorded, the markdown will be placed "In Review" (via PR) and
solicited to the CNCF TAG-Security and TOC mailing list for review, at a
minimum.

Upon completion of review, the TAG-Security TOC Liaison shall provide final
approval on the PR.  At which point the markdown state will be changed to
"Approved" and merged.

## Original design decisions

The CNSWP's creation occurred using the below general design decisions which
should be considered when updating the content.

* Avoid identifying specific projects and products.  Use general terms
  identifying the capabilities of the projects that meet the content under
  discussion.  Examples include, but are not limited to:
  * Orchestrator instead of Kubernetes
  * Secrets store instead of Vault
  * Policy-based control instead of OPA
* Consider if the content already exists elsewhere.  Provide references to
  comprehensive information on a topic rather than re-writing the content.  This
  not only allows us to provide summarization of complex topics, but also
  exposes the audience to other avenues of information for which they may be
  unaware.
* Determine if the content is better suited as it's own document, such as a
  how-to, blog, or whitepaper of itself.  The CNSWP is intended to be an initial
  starting point for the community in understanding the intricacies of a secure
  cloud native workload and architecture.  Detailed information should be
  referenced elsewhere and maintained distinctly so the reader may choose to
  research further if it suits their needs.
* Identify if the proposed update will require an update to the executive
  summary.  This is not likely to be the case for most updates, however should
  still be considered.  The executive summary is intended to be kept at no more
  than 3 printable pages.  The executive summary should be a brief, high level
  overview of the paper's contents for those without the immediate time to read
  the length of the document.

Links:

* [Managed version in markdown][whitepaper-md]
* [Posted PDF first version][whitepaper-pdf-v1]
* [CNCF blog post][v1-blog-post]
* [Original Issue](https://github.com/cncf/tag-security/issues/138)

[whitepaper-md]:
https://github.com/cncf/tag-security/blob/main/security-whitepaper/cloud-native-security-whitepaper.md
[whitepaper-pdf-v1]:
https://github.com/cncf/tag-security/blob/main/security-whitepaper/CNCF_cloud-native-security-whitepaper-Nov2020.pdf
[v1-blog-post]:
https://www.cncf.io/blog/2020/11/18/announcing-the-cloud-native-security-white-paper/
