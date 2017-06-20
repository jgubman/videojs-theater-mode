var newlines = /\r\n|\r|\n/;

// This _will_ match mixed tabs and spaces, but if you're doing that... you
// deserve weird results anyway!
var indent = /^[ \t]*\S/;

module.exports = function (ts) {
  var out = '';
  var i = 0;
  var smallest = Infinity;
  var lines, match;

  // Match normal template string behavior to get the full, formatted string.
  for (; i < arguments.length; i++) {
    out += ts[i] + (arguments[i + 1] || '');
  }

  lines = out.split(newlines);

  // Skip over the rest of the steps if it's a single-line string.
  if (lines.length < 2) {
    return out;
  }

  // Calculate the smallest indent on any non-blank line.
  for (i = 0; i < lines.length; i++) {
    match = lines[i].match(indent);

    // Subtract 1 here because the indent matches spaces, tabs, and _the
    // first non-space character_!
    if (match && match[0].length - 1 < smallest) {
      smallest = match[0].length - 1;
      if (!smallest) {
        break;
      }
    }
  }

  // If the smallest indent is zero or there are no appropriate lines, we
  // can skip the outdenting step. Otherwise, we remove the `smallest`
  // number of whitespace characters from each line.
  if (smallest && smallest < Infinity) {
    for (i = 0; i < lines.length; i++) {
      lines[i] = lines[i].substr(smallest);
    }
  }

  return lines.join('\n').trim();
};
