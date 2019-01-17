## Goal

The [SAFE roadmap](../roadmap.md) includes describing the landscape of
cloud-native security. We evaluated categories in the
[CNCF Landscape](https://landscape.cncf.io/) and
determined the need for a [modified approach](cncf.md).

We propose major categories that are similar to those in the
CNCF Landscape, but with sub-categories that
highlight the main security considerations in each category.

We propose [categories](categories.md) as a draft structure for a “Cloud Native
Security Landscape”. We drafted this document after reviewing the current list
of projects in the CNCF Landscape and recommendations by SANS and Gartner for
good security practices, as well as drawing on the experience of the SAFE WG.

## Landscape Process

- [X] Draft [categories](categories.md)
- [ ] Determine [approach to category mapping](#mapping)
- [ ] Map cloud-native tools into categories (adjusting categories as needed)
- [ ] Validate categories and landscape with review by makers and users of
    cloud-native security solutions, as well as partner working groups

<a name="mapping"></a>## Mapping Projects into the Landscape

We do not yet have plans for precisely how projects will be mapped into the
Security Landscape. If we were to follow the model of the current CNCF landscape
we would require each project to be placed in exactly one security landscape
sub-category, but this forces tools with multiple common uses to artificially
choose a “most common” use case as its sub-category. A possible alternative
will be to define a list of key features, map the key features into the
landscape sub-categories, and then list the key features of each tool.
In this flow, individual tools may appear in multiple sub-categories.
Deciding precisely how to map tools into the security landscape sub-categories
is future work and will occur after gathering feedback from the community on the
preferred solution.

