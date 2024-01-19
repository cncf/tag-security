# Security Self-Assessment


## Flatcar Container Linux

June 21, 2023

Authors: Danielle Tal and Thilo Fromm 

(For reviewers: if you have elaborate questions, general feedback, or other items that would not fit a simple document comment please feel free to use 


[the Appendix](#heading=h.7dxoyq24wwg8))

This self-assessment thoroughly reflects on Flatcar Container Linux’ security mechanisms and processes, and lists and assesses security documentation. The document aims to provide a foundation for a [joint security review](https://github.com/cncf/tag-security/blob/main/assessments/guide/joint-assessment.md) of the Flatcar project; target audience is [joint assessment reviewers](https://github.com/cncf/tag-security/blob/main/assessments/guide/security-reviewer.md).


# Metadata


<table>
  <tr>
   <td>Software
   </td>
   <td>Distro: <a href="https://github.com/flatcar/scripts">https://github.com/flatcar/scripts</a>  \
Project: <a href="https://github.com/flatcar/Flatcar">https://github.com/flatcar/Flatcar</a> 
   </td>
  </tr>
  <tr>
   <td>Relevant links
   </td>
   <td><a href="https://github.com/cncf/tag-security/issues/1066">Tag security Assessment Issue</a> \
<a href="https://github.com/cncf/toc/pull/991">TOC incubation PR</a> \
<a href="https://docs.google.com/presentation/d/1boTxP_e09A-pwMw0Vq7-UEGvpzhkjyPxKZuhBS8Pe-s/edit#slide=id.p5">TAG-Security Slides</a> \
<a href="https://www.youtube.com/watch?v=wBMiBFp7oOo&ab_channel=CNCFTAGSecurity">TAG-Security Presentation 1</a>
   </td>
  </tr>
  <tr>
   <td>Security Provider
   </td>
   <td>Flatcar has a secure development and release process, and ships a security-first OS. \
It also ships foundational tools users can apply to secure their workloads.
   </td>
  </tr>
  <tr>
   <td>Languages
   </td>
   <td>Various. Flatcar distro automation is mainly in Bash and Python, as is Gentoo’s portage system we use for building images and the SDK. \
Upstream packages use many different languages. \
The update server is written in Go and in Typescript.
   </td>
  </tr>
  <tr>
   <td>SBOM
   </td>
   <td>Release dependent; a signed SBOM in SPDX 2.2 format is published for every release. \
Current stable release’s SBOM: <a href="https://stable.release.flatcar-linux.net/amd64-usr/current/flatcar_production_image_sbom.json">https://stable.release.flatcar-linux.net/amd64-usr/current/flatcar_production_image_sbom.json</a> 
   </td>
  </tr>
</table>



## Security Links


<table>
  <tr>
   <td>Security file
   </td>
   <td><a href="https://github.com/flatcar/Flatcar/blob/main/SECURITY.md">https://github.com/flatcar/Flatcar/blob/main/SECURITY.md</a> 
   </td>
  </tr>
  <tr>
   <td>Default and optional configs
   </td>
   <td><a href="https://github.com/flatcar/scripts">https://github.com/flatcar/scripts</a>  \
Note: The repository contains the full build and package configurations of SDK, OS image, and related artifacts for any given version (tag).
   </td>
  </tr>
</table>



# Overview

_Flatcar Container Linux is a fully open source, minimal-footprint, secure by default and always up-to-date Linux distribution for running containers at scale._


## Background

Flatcar is a small Linux distribution with a strongly opinionated focus on securely running containers and enabling infrastructure automation. Contrary to general purpose distributions which often include a rich set of applications and tools, Flatcar only ships the bare minimum required to run container workloads.

The OS is both shipped and updated as a full, digitally signed image. The OS partition, where all OS binaries reside, mounted at /usr at runtime, is immutable after provisioning and [dm-verity](https://docs.kernel.org/admin-guide/device-mapper/verity.html#theory-of-operation) protected. SLSA build provenance of all software shipped is included in the image; a signed SBOM is published for each release.

The base OS image contains less than 300 software packages; the SDK adds another ~180, resulting in less than 500 upstream dependencies in the project overall. This eases software freshness and hence security, and it lowers the development maintenance overhead.

Flatcar makes a very clear distinction between the operating system and applications running on the OS. Security and freshness of the OS and the limited toolset required to securely run containers are at the center of the project’s scope. Applications and workloads that users run on Flatcar are out of scope.

Flatcar focuses on full automation of all basic OS customisations; it is configured using declarative statements. Configuration / customisation of the OS is applied at provisioning time and does not drift at runtime / reboots, making deployments reproducible.

For a general overview of Flatcar please refer to our TAG Security presentation ([recording](https://youtu.be/wBMiBFp7oOo?t=725), [slides](https://docs.google.com/presentation/d/1boTxP_e09A-pwMw0Vq7-UEGvpzhkjyPxKZuhBS8Pe-s/edit)).


## Actors and Actions

To clearly define actors and actions, we consider three separate environments / components:



1. Flatcar development, build, and release / publishing.
2. Flatcar provisioning, operations, and OS updates.
3. The Flatcar Update Server (Nebraska)

While sharing some overlap, these environments have their very own specific characteristics and challenges. Addressing these requires different tools and processes.


### 


### Development, Build, and Release
![1](https://github.com/cncf/tag-security/assets/24940804/96da15f9-3b81-40b1-a177-24c6d73be463)


#### Artifacts



1. The Flatcar SDK: A self-contained development environment. Used to build new OS images as well as new SDK containers (i.e. to build a new version of itself). Compromise would lead to compromised OS images. Integrity is protected by docker / container registry’s built-in SHA checksums; we currently do not employ additional validation other than docker’s performed by “docker pull”.
2. The release image: a full disk image of the new build / release, used to provision new instances. \
Compromise would lead to newly provisioned instances being compromised. \
Integrity is protected via a digital signature produced by an image signing key the build infrastructure has access to during release builds. The public key for users to verify release images is available for download from the [Flatcar website](https://www.flatcar.org/security/image-signing-key/) backed by a github repository with access limited to the maintainers circle (a GitHub team w/ 2FA enforced) - see “Provisioning, Operations, and OS updates” / Parties / 3. below for a description of that party (including adding and removing access) and “Provisioning, Operations, and OS updates” / Process / 2. for the validation process.
3. The update payload: a binary blob containing kernel, initrd, and OS partition of the new release, used for atomic updates to live instances. \
Compromise would spread to all currently active user instances that use Flatcar’s public update server. Integrity is protected by an update signing key stored on a HSM only few trusted core maintainers have access to, used only in an air-gapped signing process. Access to the update signing key is granted by Maintainer vote. New HSM keys are created by 3 or more maintainers with access to a key, and the HSM is handed off in an in-person meeting. The public key is baked into update_engine at build time - this component is part of the OS and responsible for downloading and validating updates. See “Provisioning, Operations, and OS updates” / Process / Update for a description of the update process.


#### Parties & Expectations



1. Upstream sources. Though usually cached on our build infrastructure, these may also be fetched at build time. Integrity is secured by SHA512 and Blake2B checksums stored in Flatcar’s distro repo (see 2.). \
Appropriate care is taken by maintainers when ingesting new packages or versions (i.e. when recording fingerprints): updating a package to a new version always requires a PR which is built, tested, and reviewed by a maintainer before merge. \
Compromise of upstream sources could, if undetected, spread to our nightly builds and, if it remains undetected, ultimately affect a release image and update payload.
2. Build Automation + Package Configuration. This is Flatcar’s distribution repository[^1] on GitHub, implying a trust relation of the Flatcar project towards GitHub. The Repository contains per-package meta-information (build instructions, source tarball urls and tarball fingerprints, in Gentoo [ebuild](https://wiki.gentoo.org/wiki/Ebuild) files) as well as our build and release automation scripts. Local clones / copies of the repo for build purposes are ephemeral; changes always need to go through a full PR test/review cycle before being included in the distribution repository.  \
Most packages’ meta-information is imported and updated from Gentoo, and we also contribute our own ebuild updates and build fixes back to Gentoo. Importing and updating package meta-information is a manual process via a PR to the distro repository which must be tested and reviewed / approved by a maintainer. A trust relationship exists with upstream Gentoo concerning the validity of source tarballs and fingerprints. \
Compromise would spread undetected to builds and releases, so access is guarded by peer reviews of PRs by maintainers. Peer review is enforced by a respective policy on the GitHub Distro repository. 2FA is enforced for maintainer accounts. \
Proposed changes to this repo (pull requests) are additionally vetted before merge by a build and test on entirely separate and sandboxed infrastructure (not in the picture above) via github actions / self-hosted runners. While these self-hosted github action runners also run on Equimix Metal, these use infrastructure separated from the release infrastructure. \
These PR builds and tests before merge are currently not enforced though as the builds and tests are very complex, hence time consuming (a single build + test cycle can take up to 4 hours), impacting the time to merge for small changes.


3. SDK container. Includes toolchains to build OS image and SDK container packages. Used for both CI / build and release automation as well as for interactive development. Container image is [stored on GHCR](https://github.com/orgs/flatcar/packages?tab=packages&q=flatcar-sdk). \
Compromise of the SDK container e.g. through compromise of the GHCR back-end or the secure build infrastructure or leaked GHCR credentials would lead to compromised builds, release images, and update payloads. \
To reduce opportunities for attack, new SDK containers are published to GHCR only from the build infrastructure. \
Container image checksums are currently not recorded separately; GHCR and docker pull’s integrity checksums are trusted to provide container images with intact integrity.
4. Secure Build Infrastructure consisting of bare metal hosts (on Equinix Metal). Used for running build automation from the distro repository (2) for nightly builds and releases. Nightly builds - which are only used for validating the build process and for automated testing - use a dummy image signing key. The dummy key has no relevance as the public component is not published or used anywhere, and nightly tests do not verify the images built since tests are launched directly from the build infrastructure. Only release builds have access to the real image signing key, build automation has access to the release image signing key. The servers run Flatcar. \
Compromise could lead to compromised release images, update payloads, and SDKs, as well as leak the private release signing key. \
Release builds run largely automated: the only manual step is for a maintainer with access to the CI automation’s web interface (Jenkins) to start a release. While releases are started only when maintainers are in alignment and coordinated via a release tracking issue ([example](https://github.com/flatcar/Flatcar/issues/1113)), this process currently does not generate an audit trail, and the action of starting release builds is not logged and does not cause any notifications. We trust the Jenkins secret store to not expose the image signing key to jobs other than the release build. \
The servers are only accessible via a wireguard VPN, triggering a release via CI automation requires access to the VPN. Additionally, access to CI web interface is password protected. \
SSH access to the servers for operational maintenance requires access to the VPN and is additionally protected by SSH keys (no password authentication).
5. Core maintainer with access to the update signing key. \
Compromise of this party equals compromise of the update payload (see Artifacts / 3.) and would spread to all active Flatcar instances using our update server. \
Update signing is trusted to very few core maintainers (currently 3) with an established track record in the Flatcar project. The private key used for signing the update tarball is stored on an HSM; the payload is signed in an air-gapped environment.
6. Public Image Server (and image caching network). 2 bare metal “origin” servers that host Flatcar release images and 4 caching servers for efficient geo-distribution. \
Caches operate on a basic level and forward requests not satisfiable by the cache server to the origin. The origin’s response is then stored in the cache for subsequent requests of the same URL. \
Compromised Origin servers would allow un-publishing images that e.g. contain security fixes. A compromised cache would have the same impact but only for the geographic region it caches images for. \
Access is limited to few core maintainers and used for server maintenance only, though no audit trails or notifications on login are currently implemented.
    1. Container registry (ghcr.io).  Compromise would allow compromise of the SDK container (see 3.). Authorization to publish packages is limited to the Flatcar infrastructure automation account.
    2. AWS, GCP, and Azure Marketplaces. Flatcar images are published there during each release. Compromise of the marketplace would allow spreading compromised provisioning images. Marketplace access is limited to a few trusted core maintainers; login access to the marketplaces is 2FA protected. Marketplace offers are not reviewed regularly at this time; we rely on our execution of the release process to imply marketplace offers are consistent with releases.
7. Update server for update meta-information. AWS RDS instance. \
Compromise would allow un-publishing selected versions as well as forcing a downgrade to a known vulnerable version that would affect all live user instances using the public update server. \
Access to update management is protected via OAuth and limited to a few trusted core maintainers; 2FA is enforced on accounts of the respective OAuth provider (GitHub). Access to the server is protected by a bastion host (no direct ssh access) with restrictive security groups; AWS accounts with access have 2FA enforced. Access to the AWS account Nebraska runs on is audited in a separate account and secrets are stored in KMS.


#### Process



1. The build process consumes sources of upstream applications and tools that make up the Flatcar OS image and SDK (see Parties / 1.).
2. Builds are executed based on package build instructions in Flatcar’s distribution repository[^2] which include cryptographic checksums of all source tarballs (Parties / 2.). The repository also includes version information and build automation scripts for building OS images and the SDK.


3. The Flatcar SDK container (see Parties / 3.) is used to build an updated SDK container (only for major releases; see Artifacts / 1.), the OS image (see Artifacts / 2), and the update payload (Artifacts / 3.)
    1. The build is performed via a build automation service (Jenkins) on secure bare metal infrastructure (Parties / 4.). Release builds are triggered via the service’s web interface  accessible only via a VPN, with an additional password protection. Access is limited to a subset of Flatcar maintainers, reviewed regularly.
    2. Parameterless build: instructions / configuration are included in the distro repo. \
Release versions are tags on that repo. Builds are reproducible based on repo tags. \
**Note** that build results are not bit-by-bit identical as compilers insert transient information (build timestamps, hostnames, compiler version) into [comment sections](https://wiki.osdev.org/ELF) of binaries during the build process. For comparison of binaries, only sections relevant for a binary’s execution must be taken into account.
    3. During the build process, SLSA provenance for all packages included in the OS image is generated. The provenance includes fingerprinted inputs (sources and source configuration), outputs (binaries, libraries and all auxiliary files shipped with a package), and build instructions. Provenance JSON is included in both release image and update payload.
    4. During build, a per-release [dm-verity](https://lwn.net/Articles/459420/) hash is generated, and the OS partition is secured with that hash to prevent tampering at runtime. The hash is embedded into the release’s initrd. A text file containing the hash is released as a build artifact including digest and signature (see 4. below).
4. Cryptographic signing of the release images
    5. The private release image signing key is stored with the build automation’s (Jenkins) Secrets store on secure infrastructure. Build automation only accesses the secrets during a release build. The release image signing key is rotated annually; the public key is available to users for validation of release images from the [Flatcar website](https://www.flatcar.org/security/image-signing-key/) (see ”Provisioning, Operations, and OS updates” below for details).
    6. Updates  - which are considered more sensitive since these could compromise all live instances using the public update server - are signed separately with a different key in an air-gapped environment (to prevent key leakage). Update signing uses a HSM; only few trusted maintainers (Parties / 5.) can sign. \
The maintainer downloads the update payload from the build infrastructure, verifies its signature (release image key) and transfers it manually to the air-gapped environment. \
There, the HSM holding the update signing key is used to sign the payload. \
After signing, the signed payload is transferred back to a network connected system, e.g. via USB stick.
5. Release images and signatures are published directly from the secure build infrastructure (parties / 4.) to the public release image servers (Parties / 6.) by the build automation service. The SDK Container is similarly published to GHCR (Parties / 6.a). Release images are uploaded to AWS, GCP, and Azure marketplaces (Parties / 6.b.) by a release engineer with access. \
Update images are uploaded manually by the maintainer who signed; the update signature is included in the update payload. Note: Currently, only one update signing key is supported, impacting key rotation on compromise. We’re looking into options to improve this in the future.
6. Nebraska (Parties / 7.) Release meta-data is updated with the new version manually by a maintainer, making the update visible to user instances. The information provided by the maintainer includes the release version and an URL to the update payload on the release image server (see 5. above and Parties / 6.. above) \
Marketplace offers (not in the picture above) are uploaded manually by trusted release maintainers as automating Marketplace publishing has proven challenging for all of AWS, GCP, and Azure.


### Provisioning, Operations, and OS Updates
![2](https://github.com/cncf/tag-security/assets/24940804/e3c3bfab-c155-4f7b-bf5c-47a08c4deb32)


#### Artifacts (inputs)



1. The release image: See Build / Artifacts 2. above. Signed by the build infrastructure’s release job with the image signing key at build time (see “Development, Build, and Release” Parties / 4. and Process /4. above). Expected to be authentic if the signature matches (see Parties / 3. and Process / Initial Provisioning below for validation). Used for new provisionings. We ship separate images for specific vendors, all with their own respective signature.  The image contains a [dm-verity](https://docs.kernel.org/admin-guide/device-mapper/verity.html#theory-of-operation) hash baked into the initrd which is used to [validate the OS partition](https://lwn.net/Articles/459420/). The OS partition’s update service (update_engine) residing on the dm-verity protected partition contains the public component of the update signing key.
2. The update payload: See Build / Artifacts 3. binary blob containing kernel, initrd, and OS partition of the new release, used for updating live instances. The initrd has baked in the respective dm-verity hash of the OS partition included with the update. Expected to be authentic if signature matches.


#### Parties & Expectations



1. Public image server: See Build / Parties 6 above. Expected to offer the latest releases.
2. AWS, GCP, and Azure Marketplaces (not in the chart). The latest Flatcar images are published there on each release. Expected to ship original images not tampered with. Compromise would allow an attacker to distribute compromised images as no separate validation is performed during provisioning.
3. Flatcar Website with the [image signing public key](https://www.flatcar.org/security/image-signing-key/). The key is a subkey to a master key and rotated annually. The master key (a single GPG key) is not used for anything else and is stored offline, though it’s not hardware protected. The website is backed by a GitHub repo; access to the website is restricted to Flatcar Maintainers (a 2FA-protected GitHub Team). [New maintainers](https://github.com/flatcar/Flatcar/blob/main/governance.md#becoming-a-maintainer) gain access by being proposed to and elected by the existing maintainers circle; access is removed if a maintainer leaves the project. \
Compromise would allow an attacker to distribute their own public keys and (alongside with compromising 1. above) to distribute compromised images as valid ones. \
Website (including key) are backed by a github repository with access limited to 4 core maintainers. Peer reviews of all PRs are enforced. The website is built and deployed automatically using GitHub Actions.
4. Flatcar user / operator provisioning a new instance. \
The user is expected to verify the images’ signature to ensure integrity.
5. The flatcar node which is provisioned, and later updated (second column in the chart). \
The node is expected to be tamper-proof as Flatcar is not yet able to run in untrusted environments (though a [roadmap issue exists](https://github.com/flatcar/Flatcar/issues/630) to add this feature).
6. The update server: see Build / Parties 7 above. Expected to serve correct meta-information on the latest updates.


#### Process

Initial provisioning uses a [release image](https://www.flatcar.org/releases) - a full disk image containing all partitions. Separate images exist for all supported vendors / private clouds. For each image, a digest file is provided with a SHA512 hash of the image, as well as a signature file containing the public signature of the digest file (generated with the private image signing key). Additionally, meta information like the list and sizes of all files in the OS partition (text format) as well as all packages and their respective versions shipped (both text and SBOM 2.2 JSON) are provided for each release. For these meta-information files digest files and signatures (signed digests, created with the image signing key) are provided, too.

Flatcar can be installed in various ways: use one of the marketplace offers, download a release image manually or via custom automation, or install it from an existing Linux distro on the target node.

If the user chooses to manually download and install Flatcar, the user must also take care of image validation themselves. This is called out in our documentation and is part of our code snippets / examples, e.g. [here](https://www.flatcar.org/docs/latest/installing/vms/qemu/#choosing-a-channel) for the “qemu” image.

We also provide a [script to install Flatcar](https://github.com/flatcar/init/blob/flatcar-master/bin/flatcar-install) from an existing Linux distro. This script has the latest public image signing key baked in and validates downloaded Flatcar images before installation. GitHub is trusted to ensure the integrity of this script.


##### Initial Provisioning



1. The user (Parties / 4.) provisions Flatcar from an official Flatcar Marketplace offer (Parties / 2.).
2. Alternatively, the user may download a disk image from the public image server (Parties / 1.) or use the [flatcar-install](https://github.com/flatcar/init/blob/flatcar-master/bin/flatcar-install) script to install Flatcar on an existing Linux distro. \
For manual installations the user / operator must validate the disk image’s integrity themselves prior to provisioning it. The process for verifying a release image’s integrity is described in our installation documentation (e.g. [here](https://www.flatcar.org/docs/latest/installing/vms/vagrant/#install-flatcar-container-linux) for Vagrant). \
Manual validation includes
    1. creating the digest of the release image to verify
    2. comparing the digest with the digest file shipped with the release
    3. verifying the signature of the digest file using the public image signing key .The public key for validation is available from the Flatcar website (Parties / 3.).
3. The OS is configured using declarative provisioning created before deployment and passed to the instance during provisioning. OS configuration is rendered and applied exactly once - at initial provisioning - and never changed after this. While this concept is not enforced - the user is free to modify their configuration after deployment - the philosophy behind it and the provisioning tools included with Flatcar free our users of the requirement to interact with nodes after provisioning.  \
See our[ introduction to Ignition](https://www.flatcar.org/docs/latest/provisioning/ignition/) for an elaborate discussion of this philosophy. \
The method of passing the configuration is vendor specific - user data for clouds, config files for local qemu, URLs passed as boot parameters for bare metal PXE deployments, etc. Flatcar does not add an additional layer of security around the provisioning configuration and trusts the cloud provider / private cloud / PXE environment to not tamper with the user-provided configuration. \
The configuration is written in [Butane](https://www.flatcar.org/docs/latest/provisioning/config-transpiler/configuration/) / [Ignition](https://www.flatcar.org/docs/latest/provisioning/ignition/specification/) and covers all basic OS customisation like devices, filesystems, users, ssh keys, files / directories, and systemd units.


##### Booting



1. The boot loader starts Kernel+initrd (a single binary).
2. The initrd early userspace is responsible for preparing the root filesystem: populating the filesystem at first boot, and mounting the read-only OS partition to /usr.
3. Baked into the initrd is the dm-verity signature required to mount the r/o OS partition. This ensures the OS partition’s integrity.
    4. The OS partition is marked read-only in the partition table to prevent it from being changed by accident. The filesystem it contains is mounted read-only.
    5. Forced changes to the raw partition will invalidate the dm-verity signature tree and will cause subsequent access to the respective block to fail. Since [dm-verity is a read-only target](https://lwn.net/Articles/459420/) and has no concept of updating, the hash tree cannot be modified to account for individual changes; instead, the whole tree would need to be regenerated . \
An attacker with node-level access capable of modifying dm-verity would have much easier means at their disposal to compromise the node.
4. After /usr is mounted, regular boot continues and user defined services are started.


##### Update



1. The update client shipped with the OS image and started by default via a vendor-supplied systemd unit. The client as well as the unit file reside in /usr. \
An attacker with root access to the node, or with write access to instance metadata before first provisioning could override the unit file by placing a respective drop-in in /etc.
2. The client regularly queries the update server for available updates (Parties / 6.). The update server’s authenticity is validated by its DNS name and matching HTTPS certificate. \
A man-in-the-middle attack could prevent update checks and e.g. block the node from installing a security update. \
By default, the polling frequency is 1 hour, but this can be changed by the user / operator. \
The update server responds with either a negative message (when no update is available) or with exactly one new version if an update is available. In that case the response also contains an URL for the update payload.
3. If an update becomes available (see Development, Build, and Release / Process 6.), the update client will download, validate the update’s signature, and stage the update. Validation is performed with a built-in public key (the public component of the HSM update signing key). Only after successful validation the update is greenlit. \
The public update server (Parties / 6. above) only returns a single version, which is the latest version available.
4. A reboot is required to activate the update. \
While a variety of [reboot strategies](https://www.flatcar.org/docs/latest/setup/releases/update-strategies/) can be implemented by the user, the default is to download and reboot immediately to install new versions as soon as possible and to keep the OS up to date.


### Nebraska

Nebraska is a web application written in Go (backend) and React / TypeScript (Frontend). Except for regular security updates, no major feature work is currently happening in the Nebraska repository.
![3](https://github.com/cncf/tag-security/assets/24940804/4cf8cdd3-3c4e-45f3-a622-b077e43ce3db)


#### Artifacts



1. The update payload: See Build / Artifacts 3. binary blob containing kernel, initrd, and OS partition of the new release, used for updating live instances. Signed with the update signing key (stored on a HSM only few trusted core maintainers have access to, used only in an air-gapped signing process). \
The public key is baked into update_engine at build time - this component is part of the OS and responsible for downloading and validating updates. See “Provisioning, Operations, and OS updates” / Process / Update for a description of the update process. Signed Expected to be authentic if signature matches.
2. Update Metadata. An XML description of an update generated by Nebraska as response to clients requesting update information. Contains version information of the update as well as an URL pointer to the update payload. While this information is only protected via DNS / HTTPS certificates (see Parties / 1. below) the update payload itself is signed and protected by the update payload signing key.


#### Parties & Expectations



1. The update server: see Build / Parties 7 above. Serves meta-data on available updates to querying (polling) Flatcar instances via HTTPS. Trusted to serve correct meta-information. Hosted on AWS as RDS instance. Access to web management is protected by OAuth and backed by a GitHub team. Only a subset of core maintainers have access.The update server is behind an AWS load balancer for basic (D)DoS protection. \
Flatcar clients accessing the HTTPS endpoint are not authenticated; all instances can connect. \
Access to the actual instance is protected by a bastion host and secured by restrictive access rules. Only 3 core maintainers have access and only use it for service maintenance. Access via the bastion host is logged in AWS separately from the bastion and the RDS node, though individual commands executed on the RDS instance are not. Individual commands executed are not recorded outside the  AWS accounts with access have 2FA enforced. Access to the AWS account Nebraska runs on is audited in a separate account and secrets are stored in KMS. \
Compromise of the instance would allow an attacker to un-publish releases that contain important security fixes, and to re-publish known vulnerable versions as new releases. \
Exploiting the unauthenticated client access would allow attackers to pose as clients and to report fake version data to Nebraska (the current client version is part of the update information request).
2. Flatcar maintainer: Has access to Nebraska’s management web interface via OAuth / GitHub Team membership. Can publish new versions and remove old releases. \
Compromise would allow an attacker to un-publish releases that contain important security fixes, and to re-publish known vulnerable versions as new releases.
3. Flatcar instance(s) querying for updates. Expected to report valid version information. The instances connect via HTTPS; the server is qualified by its DNS entry and matching HTTPS certificate. Compromising the HTTPS connection via e.g. a man-in-the-middle attack would equal maintainer access to Nebraska (see 2. above). \



#### Process

Nebraska serves update metadata - release version and pointer to payloads - not actual update payloads. \
Update payload integrity is not protected by Nebraska but by the signature  embedded in the payload (see Build / Artifacts 3.).

A web GUI is used to configure and to greenlight new updates to the live fleet. Update information is requested by all user instances using Flatcar’s public update service - which is the default setting for Flatcar installations. The GUI also serves version spread overview and fleet upgrade status (w/ errors encountered by nodes during upgrades). Maintainer access to the GUI is protected via OAuth; only a subset of maintainers trusted with publishing images have access.

Live instances connect to Nebraska unauthenticated when checking for updates. The connection is performed with HTTPS; DNS name and a respective HTTPS certificate are used to verify the connection. Nebraska offers an option to authenticate remote clients via a shared secret; restricting which clients can access the HTTPS endpoint - though this option is not used in our public update server. It is meant for users operating their own Nebraska server as a means to limit access to the server.

The Flatcar Project’s Nebraska instance runs on AWS RDS, and uses ELB for basic DoS protection. Access to the AWS instance is protected by a bastion node with restrictive security groups. Access to the AWS account is audited in a separate account and secrets are stored in KMS. Both DNS as well as the HTTPS certificate are managed directly in AWS by the AWS Certificate Manager.



1. A Flatcar Client (a deployed instance) sends a query to the Nebraska HTTPS endpoint. This query includes the node’s UUID (generated at provisioning time), the release channel the client is subscribed to, and the currently active OS version of the instance.
    1. The server for the query is taken from the instance’s configuration. By default, our public update server is used, but users may [customise this](https://www.flatcar.org/docs/latest/setup/releases/update-conf/#location) and e.g. use their own update server.
    2. When operating their own update server, users may choose to authenticate clients with a shared secret. The secret is configured in the clients’ update configuration. The public server does not require authentication.
2. The server consults its database to check if the client runs the latest release of the channel it is subscribed to. If it doesn’t, then information on the new release is sent to the client in the HTTPS response.
3. The client reads the response and if applicable, initiates the update procedure described in Provisioning, Operations, and OS Updates / Process / Update.


## Goals and Non-Goals

Flatcar employs isolation features to separate concerns of the operating system from application workloads. Goal of the project is to ship a secure, fully automatable, self-updating and always up-to-date OS for securely running container workloads.


### Flatcar Scope / Goals



* A secure, fully automatable, self-updating Linux operating system.
* A secure development, build, and release process producing signed, attestable artifacts.
    * Changes are peer reviewed and tested before merge.
    * The build validates inputs and fingerprints outputs.
    * Build artifact version information is provided in machine and human readable format.
    * Release artifacts are cryptographically signed and validated before use. (For the runtime process please rever to “Provisioning, Operations, and OS Updates” / Process / Booting above).
    * The OS cannot be changed at runtime, preventing package version drifts seen with general purpose operating systems. A flatcar release version always corresponds to a single version set of all applications and libraries shipped with the OS.
    * The OS image contains SLSA information on all packages shipped.
* The system’s sole _Rai­son d'Être_ is to securely run container workloads at scale.
* Declarative configuration and reproducible deployments.
    * Flatcar nodes are configured declaratively using [Butane](https://www.flatcar.org/docs/latest/provisioning/config-transpiler/configuration/) / [Ignition](https://www.flatcar.org/docs/latest/provisioning/ignition/specification/) syntax.
    * This configuration defines all base properties of a node. It is passed to the node at provisioning time, e.g. via user data / custom data.
    * The configuration is applied exactly once, at first boot, from the initrd before the root fs is populated.
    * No changes are made to the node configuration after this; there is no configuration drift.
    * Future deployments using the same configuration will produce the same node set-up.


### Non-Goals / Out of Scope



* Application / container / Kubernetes operational security. Flatcar ships tools and mechanisms that enable users to implement container security (e.g. eBPF enabled kernel, iptables / netfilter, SELinux, PAM, polkit). Leveraging these tools to secure workloads is left to the user.
* Application / Kubernetes provisioning. Flatcar ships generic bootstrap mechanisms (Ignition / Afterburn) to fully automate application deployment at provisioning time, e.g. via file download and/or custom systemd units. Leveraging these mechanisms to provision specific applications or to bootstrap a Kubernetes cluster is left to the user.
* Reboot orchestration configuration. Flatcar provides tools and processes to coordinate reboots on single nodes, clusters without control plane, and Kubernetes. However, default behaviour of a node is to always download an update and reboot as soon as a new version becomes available.
* Application-aware roll-backs. Flatcar’s update_engine will mark an update “successful” a short time (~2 minutes) after booting into the new version succeeded. While the user may define custom systemd units that validate application health after an update and before the new release is marked healthy, none are shipped by default. 


# Security Functions and Features



1. Small footprint, minimal attack surface. \
The Flatcar OS image ships with the bare necessities to securely run containers at scale, containing just [~300 packages](https://stable.release.flatcar-linux.net/amd64-usr/current/flatcar_production_image_packages.txt). These packages are either required to run containers, are Flatcar or vendor tools required for provisioning, configuration, and operation, or dependencies (libraries) of these. \
Meta-information for most packages (source tarball fingerprints and build instructions) is imported from Gentoo; a trust relationship exists with upstream Gentoo concerning the validity of source tarballs and fingerprints.
2. The sole purpose of Flatcar is to run container workloads. \
Therefore, very few system processes are active at run-time: \
   `systemd+dbus, containerd, update_engine, locksmith `(reboot coordinator). \
   `sshd` and `docker` are socket-activated and run on demand.
3. Cryptographically secured builds, releases, and updates. For details please refer to the “Process” section in “Development, Build, and Release” above.
    1. All input sources are validated against SHA512/BLAKE2B checksums recorded in the distro repos ebuild files before being built.
    2. Input sources and build configuration as well as outputs are fingerprinted and included in per-package SLSA provenance information in OS image and update payload
    3. The OS partition is made read-only via a GPT flag (preventing accidental writes) and protected through [dm-verity](https://lwn.net/Articles/459420/) (against forced tampering). The dm-verity root hash is baked into the initrd.
4. Security focused development process with dedicated security team (see Secure Development Practices below).
5. Secure deployments and secure updates, validated OS partition at boot. \
Deployment images are signed and validated by the respective operator before provisioning. \
Updates are manually signed with a separate HSM key in an air-gapped environment and are automatically validated against a compiled-in public key. \
The boot process uses dm-verity to ensure kernel and initrd match the OS partition. \
The OS partition is immutable (enforced by dm-verify) and dm-verity protected.[^3]

# Project Compliance

n/a


# Secure Development Practices


## Approach and Security Task Force

Flatcar maintainers have a security first approach to development. Important security fixes are always prioritised over features.

The maintainers team entertains a sub-team, the Flatcar Security Task Force, focusing solely on security issues. The team has fortnightly private sync meetings to coordinate its work. Team members have insights into embargoed security issues.


### Active Security Duty

Each week, two maintainers from the security team volunteer as security primary / secondary in roles that rotate through the whole security team on a weekly cadence. The primary / secondary are expected to spend a few hours per week to document and classify emerging issues (and pull in the maintainers team if necessary) and to work on currently active security issues.


## Communication

The security team can be reached via [security@flatcar-linux.org](mailto:security@flatcar-linux.org). This is a private, Google groups - backed mailing list also used by the security task force to coordinate their work. \
The Security team maintains a public [project board tab](https://github.com/orgs/flatcar/projects/7/views/17) for users to track security issues the project is aware of.


## Issue Resolution and Responsible Disclosure

New items are created in Flatcar’s security tracking regularly by the security team, most often by primary or secondary (see Active Security Duty above). If an issue is under embargo it is tracked in a private GitHub repo, otherwise it is tracked publicly (and will show up on the [project board](https://github.com/orgs/flatcar/projects/7/views/17)). Resolving security issues is a priority for the maintainers team; resolutions to critical issues can trigger an out-of-band release to make fixes available to users.

Flatcar releases contain a summary of CVEs fixed as well as thorough information on fixed security issues in a separate “Detailed security report” section (see [example](https://groups.google.com/g/flatcar-linux-user/c/xIh6kIybWvc)). These notes are published to our flatcar-linux-user mailing list and are also available via the list’s web interface.

Each PR that addresses a security issue contains a changelog snippet that references its respective github tracking issue as well as the CVE it fixes (if applicable). PR reviews ensure this changelog to be present and well-formatted. Release automation will pick up that snippet and merge it into the overall release notes.

While we did not as of yet pre-announce upcoming security releases, we would use our established announcement channels - our mailing list and social media accounts - to do so if the need arises in the future.


## Incident Response

After an emerging issue has been identified by the security task force and, if necessary, the maintainers team has been made aware, research on a fix begins. This entails:



* Creation of a respective tracking issue: in our private tracker if embargoed, publicly otherwise.
* Communicating with the respective upstream project if the issue was introduced by one of the packages distributed with Flatcar.
    * Close tracking of upstream’s work and collaboration with upstream e..g. for testing the fix.
* Ingestion of the fix and, if the issue is critical, commencement of a new emergency security release for all affected channels. 


## Secure Build Pipeline

Flatcar nightlies and releases are built on a secure build infrastructure (hosted on Equinix Metal) which is only accessible via a VPN (see “Development, Build, and Release Process” in the “Overview” section). Access to the infrastructure is limited to a subset of the maintainers team and is regularly reviewed. \
Equinix Metal is trusted to not tamper with these servers. \
For an elaborate risk analysis please refer to the “Parties” section in “Development, Build, and Release” above.

Release signing uses two different keys: one is used to sign disk / cloud images (used for new provisionings); it resides on the build infrastructure and is only accessible if a release build is conducted. The other is used to sign updates: it resides on HSM keys distributed to trusted maintainers who perform offline signing in an air-gapped environment. For more details please refer to the “Development, Build, and Release” section above.

Release images are distributed to the release servers (also on Equinix Metal infrastructure) directly from the build infrastructure; update payloads are manually uploaded by the engineer who performed the air-gapped signing. For an elaborate discussion of the release process please refer to the “Development, Build, and Release” section above.


# Threat model

This section includes a brief overview of Flatcar’s threat models and respective mitigations. The scenarios listed below result from the project’s specifics lined out above - please see the respective section for a detailed discussion of measures and processes.

We’ve reviewed the project against the requirements of SLSA v0.1 (we have yet to update our review to cover SLSA 1.0) and documented our conformance to [SLSA v0.1 Level 3](https://www.flatcar.org/docs/latest/reference/supply-chain/#table-of-slsa-requirements-and-conformance-levels-and-flatcars-compliance) (which roughly translates to SLSA 1.0 L2).


## Flatcar sources compromise



1. **_An attacker compromises Flatcar sources and/or build automation._** \
This would enable an attacker to update package build instructions (ebuilds) to point to malicious payloads, resulting in this payload being shipped with an upcoming release. \
**_Mitigations_**
    1. All changes to the distro repository must be code reviewed and approved by at least one Flatcar maintainer other than the author of the change.
    2. Merge access to the distro repository is limited to Flatcar maintainers. The list of maintainers is reviewed regularly and new maintainers are only added after prolonged commitment to the project. Potential new maintainers are thoroughly reviewed before being added and [require a vote by the existing maintainer](https://github.com/flatcar/Flatcar/blob/main/MAINTAINERS.md) team. Flatcar maintainer accounts as well as the account for infrastructure automation are 2FA protected.
    3. Access to the repository’s settings, including branch protection, is limited to Flatcar maintainers.
    4. Access to build infrastructure is limited to a subset of the maintainers team. Nightly / release build infrastructure is on a private network and can only be accessed via a VPN. \
CI (for PR test builds) and nightly/release builds run on separate infrastructure.
    5. The update payloads are signed manually with an HSM and both the images and the update payloads are copied to the release server manually (only individual SSH access) - the build server does not have direct access to the release hosts.
2. **_An attacker compromises one or more upstream projects, or poses as a man in the middle and compromises the sources of an upstream release shipped with Flatcar._** \
Shipping maliciously modified upstream sources would enable an attacker to spread an undisclosed vulnerability or outright malicious code to all distributions shipping these sources. \
**_Mitigations_**
    6. The respective upstream’s security mechanisms.
    7. Upstream release tarballs are fingerprinted (sha512 and Blake2b) and the fingerprints are stored with the upstream’s build instructions (ebuilds) in Flatcar’s distro repo. \
After download, each source tarball’s checksums are validated against the ones stored in the build instructions. Post-release modifications in upstream source tarballs or modifications introduced by a man-in-the-middle attack would fail the build. \
Attackers would need to update the fingerprint, too. Mitigation is discussed at 1. Above.
    8. Though significant package updates in Flatcar are reviewed by a maintainer to ensure unwanted upstream modifications are not ingested, a level of trust exists to both Gentoo upstream from which we import most package information. \
Significant OS Image filesystem changes (after building OS images; e.g. new files in unusual places) are recorded and reviewed for each release by comparing the list of files with previous releases. Outliers are researched by the maintainers team.
3. **_An attacker compromises Flatcar’s build infrastructure._** \
This would allow an attacker to modify Flatcar at build time (akin to 1.) and to obtain the image signing key as well as build infrastructure access to AWS, GCP, and Azure. \
Risks equal the risks discussed in scenario 1. above. \
**_Mitigations_**
    9. CI infrastructure (for PR builds) and release infrastructure are physically separated. This allows us to build and test PRs (on CI infrastructure) without the risk of compromising our release infrastructure. CI uses throw-away infrastructure which is discarded after a single build / test run.
    10. Build infrastructure is secured, on a private network only accessible via a VPN.
    11. Access to build infrastructure is limited to a subset of the Maintainers team. The list of maintainers with build infrastructure access is reviewed regularly. We currently do not trigger alarms or notifications if build infrastructure is accessed. \
The build infrastructure is maintained as infrastructure-as-code in terraform, tough changes are run manually by a maintainer. The infrastructure runs on Flatcar. 
    12. While attackers would be able to obtain the image signing key (for new provisionings) they would not be able to obtain the update signing key, which is stored on a HSM and only accessible to 3 trusted core maintainers, nor would they be able to copy the images to the release server.
4. **_An attacker gains access to / compromises Flatcar’s signing keys. \
_**The attacker can now sign their own images to ship attacker-controlled content / malware. \
To leverage, the attacker is also required to gain access to Flatcar’s image distribution infrastructure and / or update server (depending on which key was compromised) - discussed below - or pose as a man in the middle between the attacker’s targets and the release server / update server. \
**_Mitigations_**
    13. The image signing key is stored in an encrypted repository; access is limited to a trusted subset of maintainers. The list of maintainers with access is reviewed regularly.
    14. The image signing key is rotated regularly (annually). It is actually a subkey and the full private key is stored offline.
    15. The update signing key is stored on a HSM - only 3 HSMs exist and reside with 3 trusted core maintainers. Access is reviewed regularly. The HSMs are passphrase protected and only the respective maintainer can access it. The HSMs are only used in an air-gapped environment.
        1. New HSM devices can only be added by using the “device key encryption key”. Access to this key is secured with a split key using [Shamir’s Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing); secrets are spread across 5 maintainers. It requires at least 3 maintainers’ key fragments to access the DKEK.
5. **_An attacker gains access to the release image servers and / or the caches. \
_**The attacker can now prevent new versions from being shipped, e.g. to make a security fix unavailable to users. \
**_Mitigations:_**
    16. Release servers are only accessible by a subset of Flatcar maintainers; access lists are reviewed regularly.
    17. Release images are signed on secure build infrastructure; in order to successfully spread maliciously modified Flatcar images or update payloads, the attacker would also need access to the respective private keys (see 4. above).
6. **_An attacker gains access to the update server._** \
The attacker can un-publish an update or force a downgrade to a known vulnerable version. \
**_Mitigations_**
    18. Access to Nebraska is protected by a bastion node (no direct ssh access) with restrictive security groups. Access to the AWS account Nebraska runs on is audited in a separate account and secrets are stored in KMS.
    19. The update payload is signed manually in an air-gapped environment with a key stored on a HSM. The attacker would need access to the key (see 4.c.) to spread compromised images.
7. **_Compromise of a live system exploiting a security issue, e.g. through an RCE._** \
An attacker exploits an RCE vulnerability in a Flatcar component to compromise a live system. \
**_Mitigations_**
    20. Flatcar’s auto-update feature will remove the vulnerability as soon as a fix is released.
    21. Flatcar’s OS partition is read-only and dm-verity protected; OS binaries therefore cannot be modified without breaking the system.


## Runtime security considerations

Flatcar is meant to be configured declaratively, before provisioning - for details see “initial provisioning” in the “Provisioning, Operations, and OS Updates” section and “Flatcar scope / goals” above. This can be driven to a point where no interaction at the OS level (ssh etc.) with live instances is required at all. Instead, a control plane (Kubernetes) handles application management (“ssh’ing into the instance to perform OS configuration is like kubectl-exec’ing into an application pod to configure that application”).

Our declarative configuration concept implies  customising OS configuration before provisioning and disabling / not using interactive SSH entirely. Alternatively, the authorized SSH key should be stored at a safe place and only used in emergencies (e.g. to interactively analyse node faults).

In cloud environments, fundamental settings like initial users and ssh keys are created based on information provided by the respective cloud at provisioning time (“user data” / “custom data”). For backwards compatibility to legacy configuration automation and to integrate well into users’ existing automation (ansible, chef, etc) we do ship a default user which is set up based on the cloud environment data. This user has password-less “sudo” privileges by default to aid automation (which is its sole use case). The ssh key of that user should never be used for anything other than automation / orchestration and always be stored securely. If this key is lost / compromised it equals root access to the node. When following Flatcar’s philosophy of “declarative configuration before provisioning”, this user is not necessary and can be deactivated / not configured at all using means provided by the respective target cloud environment.


# Appendix A: Section for TAG Security Feedback and questions

[Please use this space for elaborate questions and feedback]


<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:

     [https://github.com/flatcar/scripts](https://github.com/flatcar/scripts) - the name “scripts” is used for historic reasons

[^2]:

     [https://github.com/flatcar/scripts](https://github.com/flatcar/scripts) - the name “scripts” is used for historic reasons

[^3]:

     The EFI and OEM partitions are currently trusted (while /usr is not). We plan to address this with a signed kernel and signed PCR policies (covering kernel, initrd, and cmdline) using in-progress systemd tooling.
