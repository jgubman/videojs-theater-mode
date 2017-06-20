
/**
 * Filters a set of ESLint results down to either errors or warnings (or both).
 *
 * @param  {Object} report
 * @param  {Boolean} errors
 * @param  {Boolean} warnings
 * @return {Object}
 */
module.exports = function filterer(report, errors, warnings) {
  var results = report.results;
  var key;
  var opposite;
  var severity;

  // --errors always takes precedence over --warnings.
  if (errors) {
    key = 'errorCount';
    opposite = 'warningCount';
    severity = 2;
  } else if (warnings) {
    key = 'warningCount';
    opposite = 'errorCount';
    severity = 1;

  // If neither are true, no filtering happens.
  } else {
    return report;
  }

  // Set the total count for the opposite count to zero.
  report[opposite] = 0;

  // Handle both --errors and --warnings in the same way.
  report.results = report.results.

    // Filter down to only those results which have a count of the appopriate type.
    filter(r => r[key] > 0).

    // Filter out opposite-type messages and set the opposite-type count to zero.
    map(r => {
      r.messages = r.messages.filter(message => message.severity === severity);
      r[opposite] = 0;
      return r;
    });

  return report;
};
