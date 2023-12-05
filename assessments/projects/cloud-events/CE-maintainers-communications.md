# Communications with CloudEvents Maintainers

## Slack Communications

### Igor Rodrigues (Nov 29th at 4:29:13 PM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701293353624819)

Hello all, I'm a student at NYU involved in the SecurityPal effort from TAG
Security. Our group is conducting a security assessment on CloudEvents, which we
will later submit to the [TAG Security Assessments
Repository](https://github.com/cncf/tag-security/tree/main). We have completed
an [initial
evaluation](https://github.com/Igor8mr/tag-security/blob/main/assessments/projects/cloud-events/self-assessment.md)
of the project and would appreciate your feedback to validate the information we
included. We also want to know if there are additional aspects we should include
in the assessment to correctly represent your project, along with more details
for sections like [security issue
resolution](https://github.com/Igor8mr/tag-security/blob/main/assessments/projects/cloud-events/self-assessment.md#security-issue-resolution)
and [secure development
practices](https://github.com/Igor8mr/tag-security/blob/main/assessments/projects/cloud-events/self-assessment.md#secure-development-practices).
Please, feel free to share your thoughts here on Slack, on GitHub, or on a call.
Thank you!

### Dug (Nov 29th at 8:02:04 PM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701306124114029?thread_ts=1701293353.624819&cid=C9DB5ABAA)

Hi @Igor Rodrigues - will take a look. Just curious though, what made you decide
to analyze CloudEvents?

### Igor Rodrigues (Nov 29th at 8:36:26 PM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701308186825319?thread_ts=1701293353.624819&cid=C9DB5ABAA)

Hi @dug, thank you. The assessment is one of our assignments for a class we are
taking with Professor Justin Cappos. Each group was assigned to a CNCF project,
and ours was CloudEvents. The project is interesting, so we are trying to do a
bit more than expected. I hope the assessment helps in the future.

### Dug (Nov 30th at 10:24:13 AM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701357853677559?thread_ts=1701293353.624819&cid=C9DB5ABAA)

@Igor Rodrigues thanks. Just a few comments from my quick scan:

* Where do you see ANTRL being used? I'm surprised you didn't include markdown
  in the list despite it not being a "programming language", being a "spec"
  markdown is kind of our "language" :slightly_smiling_face:
* `CloudEvents was developed to address the lack of uniformity in event data
  format...` be a bit careful here. While CE does provide a "structured" format,
  that's just there are times when people want the event data and context
  attributes in one doc. In general though CE is NOT trying to define "yet
  another common event format (one format to rule them all)". In particular,
  many people use/prefer "binary" format because it just augments their existing
  events. And even with "structured", the stuff that does into the `data`
  attribute is wide open - and should be defined by the business. I just don't
  want people to think we're making the same mistake as other folks who tried to
  force one format for all events. Rather CE is about standardizing "where to
  find common metadata about the event w/o having to parse/understand the event
  specific format".
* Nit: in "Protocol Binding" section it mentions `structured-mode` but hasn't
  defined that term yet. You may want to define binary vs structured CEs in the
  doc before this section.
* Not sure what the "trust boundary" is meant to represent in the diagram since
  "trust" is kind of orthogonal to the roles.
* Goals: may want to tweak some of those based on my comments above. Plus, some
  of those aren't really goals for CE since CE doesn't control them. For
  example, "generate events before consumers are listening" - a good idea, but
  CE doesn't really talk about those in the spec itself. CE is just about the
  format and how they might appear on the transports. With a few exceptions, it
  doesn't get into the protocols themselves or event
  management/subscriptions.....
* CE is under review for Graduation status right now... hopefully will be
  approved very soon
* CE doesn't really describe any encryption mechanism or deal with integrity -
  the text you wrote kind of implies CE addresses it. Perhaps say something like
  it's an implementation detail/choice??
* Ecosystem - might be good to link to the [cloudevents.io](cloudevents.io) site
  which includes a list of adopters.
* The "Security issue resolution" section reads like an SDK specific section -
  perhaps "SDK" should appear in the title to make it clear that the following
  sections apply to the SDK repos and not the spec repo?
* There's also a new security mailing list people should use to report security
  concerns: https://lists.cncf.io/g/cncf-cloudevents-security/topics
* There is no "CloudEvents Steering Committee" that's mentioned in the Threat
  Modelling section (typo in Modelling)
* It might be good to mention that (I think) all of the security issues found by
  Trail of Bits have been addressed

### Igor Rodrigues (Nov 30th at 11:58:51 AM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701363531073659?thread_ts=1701293353.624819&cid=C9DB5ABAA)

Hi @dug, Thank you for all the comments! For ANTLR, GitHub marked it as 14.1% of
the [CloudEvents spec](https://github.com/cloudevents/spec), so that's why I
added it to the assessment, but I may remove it if it's not very relevant. I'll
also definitely add Markdown, thanks for noticing that. We'll review the doc,
update it with your comments and tell you about the changes. Thank you again!

### Igor Rodrigues (Dec 4th at 11:15:26 AM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701706526314599?thread_ts=1701293353.624819&cid=C9DB5ABAA)

Hi @dug, we fixed the comments you provided on the [security
assessment](https://github.com/Igor8mr/tag-security/blob/main/assessments/projects/cloud-events/self-assessment.md),
along with the comments from the meeting. Here are the [new
changes](https://github.com/cncf/tag-security/commit/e75e0e0a908ffa462c7923fad6e6e201b5feaef0#diff-086780f8339d58b8abcf32f9cf930f8b11ebf1889ee3e36c4eeaede7dc21a7b7)
since then. Please, let me know if there are more parts we could improve. Also,
I wanted to CloudEvents have a public SBOM that we could link, and if you think
there are more aspects we could add to the specification side of the [Security
Issue
resolution](https://github.com/Igor8mr/tag-security/blob/main/assessments/projects/cloud-events/self-assessment.md#cloudevents-specification).
Thank you for all the help!

### Dug (Dec 4th at 11:36:23 AM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701707783421699?thread_ts=1701293353.624819&cid=C9DB5ABAA)

The closest thing we have to a SBOM is:
https://github.com/cloudevents/spec#cloudevents-documents Thanks for the update.
Will look it over in a bit.

### Igor Rodrigues (Dec 4th at 11:44:52 AM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701708292972649?thread_ts=1701293353.624819&cid=C9DB5ABAA)

Great, thanks!

### Dug (Dec 4th at 12:08:22 PM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701709702994029?thread_ts=1701293353.624819&cid=C9DB5ABAA)

I put just a few minor tweaks as comments on the commit.

### Igor Rodrigues (Dec 4th at 12:28:53 PM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701710933601919?thread_ts=1701293353.624819&cid=C9DB5ABAA)

Thanks, I'll fix those soon

### Igor Rodrigues (Dec 5th at 8:05:09 AM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701781509377939?thread_ts=1701293353.624819&cid=C9DB5ABAA)

Hi @dug, I forgot to ask this before, but are there any action items you are
currently working on or plan to work on that would solve the concerns mentioned
in the doc or other security concerns? I think it would be good to include those
in the assessment. I remember you mentioned implementing bots to check the SDKs,
do you have a pull request, issue, or any other link to the implementation of
the bots idea? Also, we are willing to help implement one of those solutions to
the concerns if you have some specific things in mind.

### Dug (Dec 5th at 11:57:30 AM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701795450643219?thread_ts=1701293353.624819&cid=C9DB5ABAA)

@Igor Rodrigues just this one: https://github.com/cloudevents/spec/issues/1235

### Dug (Dec 5th at 11:58:19 AM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701795499076589?thread_ts=1701293353.624819&cid=C9DB5ABAA)

If someone knows how to setup the bots and wants to submit a PR to add them...
that would be great! Or even just a list of instructions for an admin to follow
(if it's more than just a PR) that would be great too.

### Igor Rodrigues (Dec 5th at 12:12:57 PM)

* [Message
  Link](https://cloud-native.slack.com/archives/C9DB5ABAA/p1701796377013619?thread_ts=1701293353.624819&cid=C9DB5ABAA)

Great, thanks! We are taking a look here

## CloudEvents Team Meeting

Igor Rodrigues also joined the CloudEvents [public team meeting on November
30th, 2023](https://www.youtube.com/watch?v=2OZPTQOqFEw&t=191s).
