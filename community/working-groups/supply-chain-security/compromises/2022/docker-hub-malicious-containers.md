<!-- cspell:ignore Sysdig -->

# Researchers at Sysdig find over 1650 malicious containers in public Docker Hub

Docker Hub is the largest library and community for container images.

## Impact

There are hundreds of thousands of publicly available container images at the freely available Docker Hub library.  Researchers at Sysdig scanned over 250,000 unverified Linux images and identified 1,652 that were malicious.  Crypto-miners represented the largest category, though significant numbers of embedded secrets and proxy avoidance tools were also found.

"Unfortunately, the size of the Docker Hub public library does not allow its operators to scrutinize all uploads daily; hence many malicious images go unreported.

"Sysdig also noticed that most threat actors only upload a couple of malicious images, so even if a risky image is removed and the uploader is banned, it doesn’t significantly impact the platform’s threat landscape."

## Type of Compromise

This incident fits the [Publishing Infrastructure](../compromise-definitions.md#publishing-infrastructure) definition.

## References

- [Docker Hub repositories hide over 1,650 malicious containers](https://www.bleepingcomputer.com/news/security/docker-hub-repositories-hide-over-1-650-malicious-containers/)
