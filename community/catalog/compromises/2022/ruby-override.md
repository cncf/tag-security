# RubyGems Package Overwrite Flaw

This security bug has been identified as CVE-2022-29176 and
affects the RubyGems.org website which is the home of
open source libraries for the Ruby developer ecosystem.

## Impact

A security bug allowed anyone to remove legitimate packages
on the RubyGems open source registry for Ruby, and then republish
the same packages as new, with modified code and potentially
malicious contents.

Even though exploiting this vulnerability requires specific conditions
to apply, such as a gem has to be of specific naming convention, its
impact could still be devastating if it were to go unnoticed.

As of yet, the RubyGems.org website maintainers haven't confirmed any
known cases of malicious exploitation they are aware of.

## Type of Compromise

This incident fits the [Dev Tooling](../compromise-definitions.md#dev-tooling)
definition.

## References

- [Check your gems: RubyGems fixes unauthorized package takeover bug
](https://www.bleepingcomputer.com/news/security/check-your-gems-rubygems-fixes-unauthorized-package-takeover-bug/)