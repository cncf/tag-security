# npm Libraries ‘colors’ and ‘faker’ Sabotaged in Protest by their Maintainer

The author of these `npm` libraries intentionally committed corrupt versions containing infinite loops, effectively causing a denial of service.

## Impact

This incident affected a large but unknown number of users and impacting large downstream projects such as aws-cdk, Jest and Node.js Open CLI Framework.

It triggered another wave of conversations around pinning (locking) dependencies for future-proofing.

A few weeks after this incident, it was announced that the [Top-100 npm package maintainers now require 2FA](https://github.blog/2022-02-01-top-100-npm-package-maintainers-require-2fa-additional-security/).

## Type of Compromise

This incident fits the [malicious maintainer](compromise-definitions.md#malicious-maintainer) definition.

## References

- [The story behind colors.js and faker.js](https://www.revenera.com/blog/software-composition-analysis/the-story-behind-colors-js-and-faker-js/)
- [npm Libraries ‘colors’ and ‘faker’ Sabotaged in Protest by their Maintainer—What to do Now?](https://blog.sonatype.com/npm-libraries-colors-and-faker-sabotaged-in-protest-by-their-maintainer-what-to-do-now)
- [Open Source Developer Sabotages npm Packages ‘Colors,’ ‘Faker’](https://fossa.com/blog/npm-packages-colors-faker-corrupted/)