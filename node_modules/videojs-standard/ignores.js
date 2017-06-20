const findRoot = require('find-root');
const path = require('path');

/**
 * Get ignored file patterns for a directory, if any.
 *
 * @param  {String} dir
 * @return {Array|undefined}
 */
module.exports = function ignores(dir) {
  var root;

  try {
    root = findRoot(dir);
  } catch (x) {
    return;
  }

  const pkg = require(path.join(root, 'package.json'));

  if (pkg.vjsstandard && pkg.vjsstandard.hasOwnProperty('ignore')) {
    return pkg.vjsstandard.ignore;
  }
};
