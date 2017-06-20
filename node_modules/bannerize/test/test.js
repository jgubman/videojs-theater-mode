var assert = require('assert');
var cpr = require('cpr');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var bannerize = require('../index');

var YEAR = String(new Date().getFullYear());

function read(f) {
  return fs.readFileSync(f, {encoding: 'utf8'}).trim();
}

function contents(c, linebreak) {
    linebreak = linebreak || '\n';

  return Array.isArray(c) ? c.join(linebreak) : c;
}

describe('bannerize', function () {

  beforeEach(function (done) {

    // Need to run tests within a copy of the fixtures directory.
    cpr('test/fixtures', 'test/tmp', {confirm: true}, function (err, files) {
      process.chdir('test/tmp');
      done();
    });
  });

  afterEach(function (done) {
    process.chdir('../..');
    rimraf('test/tmp', done);
  });

  it('can bannerize a single file in the cwd', function () {
    return bannerize('*.js').then(function () {

      assert.equal(read('main.js'), contents([
        '// Project is: bannerize',
        '(function(){}());'
      ]));
    });
  });

  it('strips BOM characters from output', function () {
    return bannerize('bom.css').then(function () {

      assert.equal(read('bom.css'), contents([
        '// Project is: bannerize',
        'there is a bom here!'
      ]));
    });
  });

  it('can bannerize multiple files in the cwd', function () {
    return bannerize(['*.css', '*.js']).then(function () {

      assert.equal(read('main.js'), contents([
        '// Project is: bannerize',
        '(function(){}());'
      ]));

      assert.equal(read('main.css'), contents([
        '// Project is: bannerize',
        'body{font-family:Times;}'
      ]));
    });
  });

  it('supports a custom `banner` option', function () {
    return bannerize('*.js', {banner: 'subdir/banner.ejs'}).then(function () {

      assert.equal(read('main.js'), contents([
        '// It is the year ' + YEAR,
        '(function(){}());'
      ]));
    });
  });

  it('supports a `cwd` option', function () {
    return bannerize(['*.css', '*.js'], {cwd: 'subdir'}).then(function () {

      assert.equal(read('subdir/app.js'), contents([
        '// It is the year ' + YEAR,
        'console.log(\'app.js\');'
      ]));

      assert.equal(read('subdir/app.css'), contents([
        '// It is the year ' + YEAR,
        'body{font-family:sans-serif;}'
      ]));
    });
  });

  it('supports a `lineBreaks` option LF', function() {
      return bannerize(['*.css', '*.js'], {cwd: 'subdir', lineBreaks: 'LF'}).then(function () {

        assert.equal(read('subdir/app.js'), contents([
          '// It is the year ' + YEAR,
          'console.log(\'app.js\');'
        ]));

        assert.equal(read('subdir/app.css'), contents([
          '// It is the year ' + YEAR,
          'body{font-family:sans-serif;}'
        ]));
      });
  });

  it('supports a `lineBreaks` option CRLF', function() {
      return bannerize(['*.css', '*.js'], {cwd: 'subdir', lineBreaks: 'CRLF'}).then(function () {

        assert.equal(read('subdir/app.js'), contents([
          '// It is the year ' + YEAR,
          'console.log(\'app.js\');'
        ], '\r\n'));

        assert.equal(read('subdir/app.css'), contents([
          '// It is the year ' + YEAR,
          'body{font-family:sans-serif;}'
        ], '\r\n'));
      });
  });

  it('throws on a missing banner', function () {
    return bannerize('*.js', {banner: 'banner-missing.ejs'}).catch(function (e) {
      assert(e instanceof Error);
      assert.equal(e.message.substr(0, 6).toLowerCase(), 'enoent');
    });
  });

  it('throws on an invalid/unparseable banner', function () {
    return bannerize('*.js', {banner: 'banner-invalid.ejs'}).catch(function (e) {
      assert(e instanceof Error);
      assert.equal(e.message.substr(0, 3).toLowerCase(), 'ejs');
    });
  });

  it('throws on an empty banner', function () {
    return bannerize('*.js', {banner: 'banner-empty.ejs'}).catch(function (e) {
      assert(e instanceof Error);
      assert.equal(e.message.substr(0, 5).toLowerCase(), 'empty');
    });
  });
});
