---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: Semantic Versioning Explained
date: "2020-01-13"
description: "An explanation of what semantic versioning is and why it is important."
tags: ['Technical Discussion']
---

Chances are at some point in your programming career you have downloaded a library to use within your code. When you download an external library it will come with a version number which makes upgrading and finding documentation for your exact version of the library easy. While the version number may just seem like an arbitrary combination of numbers and decimals, there is actually a ton of information that can be determined from the version number alone. This is what semantic versioning is all about.

## What Is Semantic Versioning?

Semantic versioning is a set of rules that many libraries adhere to when determining how to increment their version numbers. A semantic version will always consist of three numbers separated by decimals which indicates the major, minor, and patch version of the library. The format of semantic versioning is as follows. `MAJOR_VERSION.MINOR_VERSION.PATCH_VERSION`. This means that the following semantic version `1.14.2` indicates a library that is in major version 1, minor version 14, and patch version 2.

Now this is great, but what exactly do the different versions mean? Here is a direct quote from the documentation for semantic versioning which can be found [here](https://semver.org/).

> Given a version number `MAJOR.MINOR.PATCH`, increment the:  
> &nbsp;  
> `MAJOR` version when you make incompatible API changes,  
> `MINOR` version when you add functionality in a backwards compatible manner, and  
> `PATCH` version when you make backwards compatible bug fixes.

Let's go over the reason for upgrading each version in a little more depth.

### Patch Version

As the documentation says a patch version should only be updated when backwards compatible bug fixes are introduced. Patch versions are commonly incremented when bugs are discovered in between minor releases that need to be fixed quickly. One important thing about incrementing patch versions is that the public API of the library cannot change in anyway. The only thing that can change is the fixing of broken functionality.

### Minor Version

The minor version is a bit more involved since this will be incremented anytime new functionality is added to the library that is backward compatible. For example, if there was a math library that added the ability to calculate sine and cosine then the minor version of that library would need to be incremented when those new features are released. It is also important to reset the patch version whenever a new minor version is released. For example, if a library is at version `2.3.6` and a new minor version is released, the new version number would be `2.4.0`. Another reason to increment the minor version number would be if a method in the library is deprecated. When a function is going to be removed in a major version it is usually ideal to deprecate it in a minor version before the release so users know that this method will be removed in the next major version upgrade.

### Major Version

The last version number, the major version, is only to be incremented when breaking changes are introduced to the public API of the library. This could be major breaking changes like rewriting the entire library, or minor breaking changes like reworking a single component of the library. The important thing is that anytime a breaking change is introduced the major version of the application must be incremented. The minor version and patch version also need to be reset as soon as the major version is incremented. For example, if a library is doing a major version upgrade from `1.12.6` the new version would be `2.0.0`.

## How To Start Using Semantic Versioning?

Semantic versioning is great for making it incredibly clear what changes are occurring in a library, but what if your library is just starting out? Having to increment the major version every single time the public API breaks is a ton of work since things will be rapidly changing as a public API is decided upon. Because of this, semantic versioning has a special condition for handling new rapidly changing libraries. If a library is in rapid early development stages then a major version number of 0 can be used. For example, the starting version for a brand new library would be `0.1.0`. While in this initial development version the minor version can be used to indicate any new feature or breaking API change since most work in early development will result in breaking API changes. Once the public API is stable, then a release to version `1.0.0` is ideal so breaking changes can be easily tracked. This also lets potential users know that the library is stable and not likely to introduce breaking changes.

## How To Handle Pre Release Versions?

Many larger libraries with a large user base like to release beta versions of the library for early adopters to test and discover bugs in. This idea is called pre releases, and is supported by semantic versioning. If a library was in version `2.3.4` and the maintainers wanted to create a beta version of their `3.0.0` release for early adopters to test then they could create a version called `3.0.0-beta.1`. The key to creating pre release versions like this is that they must come after the patch version and start with a hyphen. The pre release version can consist of any combination of letters, numbers, or hyphens and each part of the pre release version is separated by a decimal. For example `3.0.0-0.1.0` is another valid pre release version.

## Conclusion

In conclusion semantic versioning makes it much easier to deal with upgrading and finding documentation as a user of libraries. It also makes it easier for the library maintainer to have a strict guideline to follow when creating new versions of their library. Without semantic versioning handling library dependencies would be nearly impossible, so next time you decide to create a package be sure to use semantic versioning.