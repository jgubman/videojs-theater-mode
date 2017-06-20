var assert = require('assert');
var tsmlb = require('../');

assert.equal(
	tsmlb`
		Look, tabs
		work too!
	`,
	'Look, tabs\nwork too!'
);
