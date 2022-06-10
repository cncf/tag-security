# Guidance on Publishing and Delivering Artifacts

As part of regular business of TAG Security, we publish several artifacts as
deliverables coming out of different projects. The following guide is intended
to help future project leads to deliver their artifacts by learning from past
experiences of delivering such artifacts.

This guide is largely based on lessons learned and appreciated best practices in
delivering Cloud Native Security Whitepaper v2. So we will use that as an
example and link to relevant content as needed that relates to the paper.

## Using GitHub Issues to Track Progress

All deliverables need a single place where, anyone can go to:

- Express interest in collaborating on it
- Find the current status of the deliverable
- Find the timelines of publication
- Find the steps remaining before publication
- Find the tasks that are part of the deliverable

All of this can be described well in a GitHub Issue. Also, because the GitHub
issue description can be edited, it allows us to keep adding more information,
updating project status can be done without changing the place everyone can go,
to find out what they want to know.

**Example**: GitHub Issue for
[CNSWP v2](https://github.com/cncf/tag-security/issues/747)

## Identifying External Dependencies

When working on multi-person, multi-month project, it is imperative to recognize
external dependencies for whom this may not be the highest priority task they
will work on. In case of our group's deliverables, these dependencies can be
CNCF Service Desk folks, Design team who generates PDF version of markdown
files, TOC reviewers i.e. Security TAG liaisons.

Acknowledging this prioritization gap, to meet the timelines of the deliverable,
it is important to start earlier than you think is necessary so that there is
enough buffer time for all the unforeseen circumstances that may delay things.
[Paper process guide](paper-process.md#tentative-schedule-milestones) has a
recommended timeline that you can use to get started and adjust as needed.

Working during a pandemic and several global unprecedented events, has also
meant that some unknown events could delay deliverables. In such situations,
instead of pushing for working on the deliverables, it is important to show
grace and recognize that people might be dealing with significantly more
important things than your deliverable. In such situations, reassessing
deadlines, scope and finding temporary replacements who can contribute for folks
who are busy, helps unblock the progress of the deliverable.

## Get Help from CNCF Service Desk

The CNCF has excellent people who can help out on making your deliverable shine
through:

* Professionally designed PDF from your markdown content
* Animation, Graphics, Diagrams that represent important aspects of the
  deliverable
* Blog posts that summarize and introduce your deliverable
* Social media outreach of your deliverable via Twitter, LinkedIn

Additionally, publishing an artifact during or just before KubeCon allows us to
share the publication announcement widely in different forums such as Cloud
Native Security Con Sessions, TAG Security Maintainer session, as well as
serendipitous interactions in the hallways, both virtual and real world.

## Define Stages of Publication

Each Deliverable can go through several stages from inception to publication.
Treating this process like a project with milestones allows folks as well as the
lead to understand if timely progress is being made or not — in addition to
identifying a milestone lead for very large or complex projects.

A tentative schedule for a paper publication process can be found
[here](paper-process.md#tentative-schedule-milestones).

## Write a Blog

The blog post for a TAG Security Deliverable is like a trailer for the movie,
except both are published on the same day!

There are several good examples of blogs about artifacts published by CNCF TAG
Security. Here's one about
[Cloud Native Security Whitepaper v2](https://www.cncf.io/blog/2022/05/18/announcing-the-refreshed-cloud-native-security-whitepaper/)

A typical blog should include:

- A brief summary about the deliverable
- Link to the deliverable
- Quote from one or more main contributors or project lead
- Why should the readers care about the deliverable

## Common Mistakes to Avoid

Every human being is prone to mistakes. So the intent of this section is to help
avoid making the same mistakes as past project leads so that you can make newer
mistakes and update this section with your experiences.

* **Not reviewing the artifact for brevity, correctness and flow**: Project
  leads
  should attempt to review the artifact a minimum of 2-3 times with a different
  goal for each review
* **Missing names of contributors or reviewers of the paper**: Double check if
  the contributors or reviewers are missing in the PDF or markdown and
  cross-check with GitHub issue assignees who worked on the tasks for the
  deliverables.
* **Engaging with CNCF too close to publication date**: CNCF service desk
  probably gets a lot of requests for help close to KubeCon. Engaging them very
  early with a service desk ticket allows you to make progress early and creates
  higher chance of the deliverable being published on time.

## Sharing Far and Wide

Publishing the artifact has little benefit if it does not reach the intended
audiences. So seek help from CNCF, Co-chairs, Tech Leads of TAG Security to
share the artifact through their networks. Encourage contributors and reviewers
to share the artifact to their networks as well. Make use of CNCF mailing lists
during Request for Comment stage and after publication to share useful anecdotes
about the deliverable followed by a
["Call to Action"](communications/call-to-action.md).

Example mailing list announcement for Cloud Native Security Whitepaper:

* [RFC](https://lists.cncf.io/g/cncf-tag-security/message/89)
* [Publication](https://lists.cncf.io/g/cncf-tag-security/message/94)

## Take Ownership and Give Credit

Person leading a project to deliver an artifact is playing this role **in
service of the community**. So taking ownership of delays, feedback, push-back
and mistakes made in the artifact is vital and important for community to feel
heard, valued and contributors to feel safe.

At the same time, it is equally important to give credit to all the contributors
and reviewers for their splendid work especially keeping in mind that most folks
carved time out of their busy schedules to share their valuable input.

The deliverable is a _community driven effort_ without the community it was not
possible, keep this in mind as you continue to lead future projects.

Finally, as a project lead you should plan for a break after publication of the
deliverable for unwinding, self-care and as a gift to yourself and others for
the hard work of pulling this together over several months. Once you are back
though, make sure to give this a read and update as needed based on your
experiences so others may benefit from it :)
