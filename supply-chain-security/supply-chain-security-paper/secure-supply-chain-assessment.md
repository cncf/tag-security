# Evaluating your supply chain security

## A framework for supply chain evaluation

So how does your supply chain stack up? Here are some questions to ask
yourself:

### Verify source code

-   Do you require signed commits?

-   Do you use git hooks or automated scans to prevent committing secrets to source control?

-   Have you defined an unacceptable risk level for vulnerabilities? For example: no code may be committed that includes Critical or High
    vulnerabilities

-   Do you use automated scanning to detect and prevent security issues, vulnerable dependencies, etc. from being committed to the repo that are not in compliance with your defined risk threshold?

-   Have you defined clear contributors roles? Are they documented and discoverable?

-   Do you enforce review and approval of contributions prior to merging?

-   Are branch protection rules in place?

-   Do you enforce MFA and SSH keys for human-entities? Do you have a plan in place for rotating SSH keys at regular intervals or following a key leak?

-   Do you limit the access of automation agents (like CI/CD pipelines) following the principles of least privilege and just-in-time?

### Verify materials

-   Do you verify that dependencies meet your minimum thresholds for quality and reliability?

-   Do you automatically scan dependencies for security issues and license compliance?

-   Do you automatically perform Software Composition Analysis on dependencies when they are downloaded/installed?

-   Do you monitor dependencies for updates and security issues?

-   Do you build dependencies yourself instead of relying on public package managers?

-   Do you create an SBOM of your own artefacts?

### Protecting build pipelines

-   Do you use hardened, minimal containers as the foundation for your build workers?

-   Do you maintain your build and test pipelines as Infrastructure-as-Code?

-   Do you automate every step in your build pipeline outside of code reviews and final sign-offs?

-   Do you sign the output of every step in your build pipeline to provide a verifiable guarantee?

-   Do you validate the signatures and checksums of all dependencies before ingesting them in a build stage?

-   Do you use separate build workers/containers for each step in your build pipeline?

-   Do your pipeline orchestrator pass in the environments, tools, and commands allowed on each build worker?

-   Do you network isolate your build workers and pipeline as much as possible?

-   Do you produce verifiable, reproducible builds?

### Protecting artefacts and deployments

-   Is every artefact you produce (including metadata and intermediate artefacts) signed?

-   Do you distribute metadata in a way that can be verified by downstream consumers of your products?

-   Can your downstream consumers verify/validate any artefact they ingest from you before they use/deploy it?
