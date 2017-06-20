var ejs = require('ejs');
var findRoot = require('find-root');
var flatten = require('flatten');
var fs = require('fs');
var globby = require('globby');
var path = require('path');
var stripBom = require('strip-bom');

/**
 * Whether or not the path is absolute.
 *
 * @private
 * @param  {String}  p
 * @return {Boolean}
 */
function isAbsolute(p) {
  return path.isAbsolute ? path.isAbsolute(p) : path.resolve(p) === p;
}

/**
 * Normalize an array of patterns.
 *
 * @private
 * @param   {String|Array} patterns
 * @return  {Array}
 */
function normalize(patterns) {
  if (!Array.isArray(patterns)) patterns = [patterns];
  return patterns.filter(function (value) {
    return typeof value === 'string' && /\S/.test(value);
  }).map(function (pattern) {
    return pattern.trim();
  });
}

/**
 * Attempts to render a banner template file.
 *
 * @private
 * @param   {String} filename
 * @param   {Object} context
 * @throws  {Error} If banner is missing or empty.
 * @return  {String}
 */
function render(filename, context) {
  var banner = ejs.render(
    fs.readFileSync(filename, {encoding: 'utf8'}),
    context
  ).trim();

  if (!banner) {
    throw new Error('Empty banner: ' + filename);
  }

  return banner;
}

/**
 * Gets a full path for a filename, respecting absolute paths.
 *
 * If given an absolute path, will return that filename directly. Otherwise,
 * it will prepend the cwd.
 *
 * @private
 * @param   {String} fn
 * @param   {String} [cwd=process.cwd()]
 * @return  {String}
 */
function getPath(fn, cwd) {
  cwd = cwd || process.cwd();
  return isAbsolute(fn) ? fn : path.join(cwd, fn);
}

/**
 * Gets linebreak.
 *
 * @private
 * @param   {String} lineBreaks
 * @return  {String}
 */
function getLinebreak(lineBreaks) {
    if (lineBreaks && lineBreaks.toLowerCase() === 'crlf') {
        return '\r\n';
    } else {
        return '\n';
    }
}

/**
 * Prepend a banner/license comment to a file.
 *
 * @function bannerize
 * @param    {String|Array} patterns
 *           A string or array of glob pattern(s) to which to apply the banner.
 * @param    {Object} [options]
 *           An object containing optional values.
 * @param    {String} [options.banner="banner.ejs"]
 *           A path to a custom banner template file.
 * @param    {String} [options.cwd=process.cwd()]
 *           Customize where relative patterns should match from.
 * @param    {String} [options.lineBreaks="LF"]
 *           Set linebreaks (LF, CRLF)
 * @return   {Promise}
 *           A promise which resolves with an array of all the files that were
 *           modified.
 */
module.exports = function bannerize(patterns, options) {
  options = options || {};

  var date = new Date();
  var cwd = getPath(options.cwd || process.cwd());
  var pkg = require(getPath('package.json', findRoot(cwd)));
  var banner = getPath(options.banner || 'banner.ejs', cwd);

  return globby(normalize(patterns), {cwd: cwd}).then(function (files) {
    banner = render(banner, {pkg: pkg, date: date});
    return flatten(files).map(function (file) {
      file = getPath(file, cwd);
      fs.writeFileSync(
        file,
        [banner, stripBom(fs.readFileSync(file, {encoding: 'utf8'}))].
          join(getLinebreak(options.lineBreaks)));
      return file;
    });
  });
};
