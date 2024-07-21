<!-- cspell:ignore peacenotwar -->
# npm Library ‘node-ipc’ Sabotaged with npm Library ‘peacenotwar’ in Protest by their Maintainer

The author of these `npm` libraries intentionally committed corrupt versions containing obfuscated code that would dump a file to your desktop and rewrite files based IP address geographical origin.

## Impact

This incident affected a medium but unknown number of users and impacting large downstream projects such as `@vue/cli`.

It triggered some discussion around maintainer reputation and what action to take around the maintainer's other popular libraries with a combined 4 million downloads (excluding `node-ipc`'s 1 million):

- `js-queue`
- `easy-stack`
- `js-message`
- `node-cmd`

## Type of Compromise

This incident fits the [malicious maintainer](../compromise-definitions.md#malicious-maintainer) definition.

## References

- [Alert: peacenotwar module sabotages npm developers in the node-ipc package to protest the invasion of Ukraine](https://snyk.io/blog/peacenotwar-malicious-npm-node-ipc-package-vulnerability/)
- [CVE-2022-23812 | RIAEvangelist/node-ipc is malware / protest-ware](https://gist.github.com/MidSpike/f7ae3457420af78a54b38a31cc0c809c)
