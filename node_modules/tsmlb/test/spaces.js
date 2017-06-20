var assert = require('assert');
var tsmlb = require('../');

function atos(a) {
  return a.join('\n');
}

assert.equal(
  tsmlb`I am a one line string!`,
  'I am a one line string!'
);

assert.equal(
  tsmlb`
    I am a multi-
    line
    string!
  `,
  atos([
    'I am a multi-',
    'line',
    'string!'
  ])
);

assert.equal(
  tsmlb` The next two lines
    should be indented
    to three spaces.`,
  atos([
    'The next two lines',
    '   should be indented',
    '   to three spaces.',
  ])
);

assert.equal(
  tsmlb`
    Better make sure
    ${'  expressions'} work!
      ^ that one should have been
        indented by two spaces.
  `,
  atos([
    'Better make sure',
    '  expressions work!',
    '  ^ that one should have been',
    '    indented by two spaces.'
  ])
);

assert.equal(
  tsmlb`
    It also preserves

    empty

    lines.
  `,
  atos([
    'It also preserves',
    '',
    'empty',
    '',
    'lines.',
  ])
);
