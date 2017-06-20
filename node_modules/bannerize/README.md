# Bannerize [![Build Status](https://travis-ci.org/misteroneill/bannerize.svg?branch=master)](https://travis-ci.org/misteroneill/bannerize)

Add dynamic banner/license comments to files in a build process.

```sh
$ npm install -g bannerize
```

## Banner Templates

Banner templates use the [EJS](https://www.npmjs.com/package/ejs) templating language. Templates are passed the following properties:

- `pkg`: A representation of the nearest `package.json` file.
- `date`: A JavaScript Date object.

A simple banner might look something like:

```
/*! <%= pkg.name %> | <%= pkg.version %>
 *  (c) <%= date.getFullYear() %> <%= pkg.license %>
 */
```

And render to:

```
/*! bannerize | 1.0.0
 *  (c) 2015 MIT
 */
```

## CLI

`bannerize` ships with a CLI command. Its options vary from the programmatic API. To see all its options, use:

```sh
$ bannerize --help
```

An example usage might look like:

```sh
$ bannerize *.js *.css --banner=foo/bar.ejs
```

## API

The `bannerize` module can be used in your programs. It exports a single function, `bannerize`, which takes two arguments:

### `bannerize(patterns, [options])`

- `pattern` `{String|Array}`: A string or array of glob pattern(s) to which to apply the banner.
- `[options]` `{Object}`: An object containing optional values.

### Options

- `banner` A banner file location. Defaults to `banner.ejs` in the `cwd`.
- `cwd` Override the `cwd` for all paths passed to `bannerize`. Relative paths will be relative to `process.cwd()`. Defaults to `process.cwd()`.
- `lineBreak` Sets the linebreak (`'CRLF'`, `'LF'`). Defaults to `'LF'`.
