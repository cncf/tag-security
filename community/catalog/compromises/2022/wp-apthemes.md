# WordPress theme publisher compromised, backdoor introduced in several products
<!-- cSpell:ignore webshell -->
A popular plugin and theme publisher for WordPress was reportedly compromised during the second half of 2021. While the WordPress codebase itself appears unaffected, a webshell was injected, published and distributed in dozens of themes and plugins.

## Impact

According to the researchers:

> This suggests to us that the files from the AccessPress Themes’ website were modified intentionally, and as a coordinated action after they were originally released. The compromise seems to have been performed in two stages, one for the plugins and a later one for the themes. Each of them with some earlier attempts, possibly to fine tune the process.

The response timeline suggests early discovery, and additional reporting indicates that the payloads have been in the wild for several years.

## Type of Compromise

Given not much is known about the original compromise, this is categorized as a
source code compromise. It's also possible this was a compromise of publishing
infrastructure, where only release artifacts were affected.

## References

- [Backdoor Found in Themes and Plugins from AccessPress Themes](https://jetpack.com/2022/01/18/backdoor-found-in-themes-and-plugins-from-accesspress-themes/)
- [AccessPress Themes Hit With Targeted Supply Chain Attack](https://blog.sucuri.net/2022/01/accesspress-themes-hit-with-targeted-supply-chain-attack.html)
