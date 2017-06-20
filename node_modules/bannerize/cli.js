#!/usr/bin/env node

var bannerize = require('./index');
var cli = require('cli');
var util = require('util');

cli.enable('help', 'status', 'version')

cli.parse({
  banner: ['b', 'An EJS banner file. Relative to `process.cwd`', 'file', 'banner.ejs']
});

cli.main(function(args, options) {
  bannerize(args, options).then(function (files) {
    var sep = '\n  ';
    if (files.length) {
      this.debug(util.format(
        'Bannerized %s files:%s\n',
        files.length,
        sep + files.join(sep)
      ));
    } else {
      this.debug('No files to bannerize!');
    }
  }.bind(this)).catch(function (err) {
    this.error(err.message);
  }.bind(this));
});
