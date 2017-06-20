# video.js Standard Style

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

This module provides a hands-off wrapper around ESLint and the video.js organization's [shared ESLint config][config]. It checks ("lints") your code to verify that it complies with our organization's agreed-upon standards.

Lead Maintainer: Pat O'Neill [@misteroneill](https://github.com/misteroneill)

Maintenance Status: Stable

## Install

```bash
npm install videojs-standard
```

Or, if you prefer to install it globally:

```bash
npm install -g videojs-standard
```

This will put the `vjsstandard` program on your PATH, meaning you can call it from anywhere and it'll run.

## Usage

> If you are using [our plugin generator][generator], you will already have videojs-standard available within your project! Running `npm run lint` will run your plugin project through videojs-standard!

The simplest use case would be checking the style of all JavaScript files in the current working directory:

```
$ vjsstandard
~/dev/my-code/src/index.js
    527:1  warning  Line 527 exceeds the maximum line length of 90  max-len
```

### Arguments

`vjsstandard` will accept any number of file identifier arguments. These can be [glob][glob] patterns. Some examples: 

```bash
$ vjsstandard foo.js src/**/*.js
```

If _not_ provided, `vjsstandard` will recursively check all JavaScript source files in the current working directory.

### Options

#### `-e`/`--errors`

Produces a report that only includes errors; not warnings.

#### `-w`/`--warnings`

Produces a report that only includes warnings; not errors.

#### `--format`

Instead of producing a report on the errors and warnings found in files, this will attempt to use ESLint's auto-formatting capabilities to overwrite existing files to resolve rules violations.

#### `--help`

Outputs help on using videojs-standard.

#### `--version`

Outputs the version number of videojs-standard.

### Ignoring Files

Sometimes you need to ignore files because they represent preprocessed or minified assets, which are not appropriate for linting.

File [glob][glob] patterns can be ignored by adding them to your project's `package.json` as a part of a `vjsstandard.ignore` array:

```json
{
  "vjsstandard": {
    "ignore": [
      "**/dist/**",
      "Gulpfile.js"
    ]
  }
}
```

## Contributing

This project should almost never change.

A rule should only change if there is a _very_ compelling reason that the video.js core contributors have agreed upon by discussion.

### Versioning Guidelines

Because this project can cause builds to fail, we want to avoid any potentially breaking changes outside of major versions. Because this project is mostly a collection of dependencies, any change to those dependencies will require a version change in this project equal to the highest version change in dependencies.

- A dependency being updated by a major version will be a **major** version of videojs-standard.
- A dependency being updated by a minor version will be a **minor** version of videojs-standard.
- A dependency being updated by a patch version will be a **patch** version of videojs-standard.

Combined with the rules outlined [in eslint-config-videojs][config], this should allow common version ranges (`~` and `^`) to _never_ introduce a change that could break someone's build due to linter errors!

## License

Apache-2.0. Copyright (c) [Brightcove, Inc.][bcov]

[bcov]: https://www.brightcove.com/
[config]: https://github.com/videojs/eslint-config-videojs
[downloads-image]: https://img.shields.io/npm/dm/videojs-standard.svg?style=flat
[downloads-url]: https://npmjs.org/package/videojs-standard
[generator]: https://github.com/videojs/generator-videojs-plugin 
[glob]: https://www.npmjs.com/package/glob
[npm-image]: https://img.shields.io/npm/v/videojs-standard.svg?style=flat
[npm-url]: https://npmjs.org/package/videojs-standard
[travis-image]: https://img.shields.io/travis/videojs/standard.svg?style=flat
[travis-url]: https://travis-ci.org/videojs/standard
