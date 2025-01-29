# Project's Implementation of Supply Chain Security

The official recommendation of TAG Security is that projects provide documentation of their supply chain security decisions in a manner that streamlines end user engagement.

Specifically, there is a need for end users to be supplied with clear direction regarding how a project's provenance may be validated.

For provenance ingestion documentation to be useful, it cannot be distributed from the same place that provenance artifacts are generated. By distributing them from the same location, a compromise of the package distribution could also result in a compromise of the instructions users are following to validate that the packages have not been compromised.

## Independent Distribution

In this directory, TAG Security serves as an intermediary to ensure that end users have a consistent location to retrieve provenance documentation for any participating CNCF project.

All CNCF projects are encouraged to automate generation of provenance artifacts to be included with every release, then create a directory here for your users to reference. You may help point users to this location by adding a link to your file in your README.md and/or SECURITY-INSIGHTS.yml.

TAG Security will make efforts to ensure that first-time contributions to these docs are only made by project maintainers. To streamline subsequent changes, new file contributions must also contain an entry to this repo's CODEOWNERS.

## Documentation Format

There is not currently a proven best practice for documenting the intended end user consumption of provenance artifacts, but some elements can be expected. For the sake of your readers, it is recommended that you only _cautiously_ add content beyond these elements.

1. Intent
    - What artifacts are supplied by your project?
    - If you have a large number of provenance artifacts or unusual approach, why?
    - Is there anything else that will be helpful for your end users to know about your provenance work?
2. Prerequisites
    - What tools do you recommend to simplify the process for your users?
3. Process
    - Are there different types of artifacts that need to be validated in different ways?
    - Is there a way to manually validate provenance with less knowledge or fewer prerequisites?
    - How do you recommend users automatically validate each type of provenance artifact?

When possible, it is recommended that you refer to the style and approach used by previous projects to simplify the presentation for end users who are implementing provenance validation checks for multiple projects.
