#!/usr/bin/env node

const commander = require('commander');
const CLIEngine = require('eslint').CLIEngine;
const path = require('path');
const os = require('os');
const tsmlb = require('tsmlb');
const filterer = require('./filterer');
const ignores = require('./ignores');
const pkg = require(path.join(__dirname, 'package.json'));

commander.
  version(pkg.version).
  option('-e, --errors', 'Produces a report that only includes errors; not warnings.').
  option('-w, --warnings', 'Produces a report that only includes warnings; not errors.').
  option('--format', 'Formats files where possible to comply with videojs-standard.').
  arguments('[targets...]').
  action(targets => {
    commander.targets = targets;
  }).
  parse(process.argv);

// If no targets were specified, default to this directory.
if (!commander.targets) {
  commander.targets = ['.'];
}

const cli = new CLIEngine({
  cwd: process.cwd(),
  configFile: path.join(__dirname, 'eslintrc.json'),
  fix: Boolean(commander.format),
  ignorePattern: ignores(process.cwd())
});

const report = filterer(cli.executeOnFiles(commander.targets),
                        commander.errors,
                        commander.warnings);

if (commander.format) {
  CLIEngine.outputFixes(report);

  const applied = report.results.
    map(result => result.output ? result.filePath : '').
    filter(Boolean);

  if (applied.length) {
    console.log(tsmlb`
      Applied fixes to ${applied.length} files:
        ${applied.join(os.EOL + '        ')}
    `);
  }

  if (applied.length < report.results.length) {
    console.log(tsmlb`
      Could not apply fixes to ${applied.length ? report.results.length - applied.length : 'any'} files!
    `);
  }
} else {
  const formatter = cli.getFormatter();

  console.log(formatter(report.results));
}

// Exit with a correct code.
process.exit(report.errorCount ? 1 : 0);
