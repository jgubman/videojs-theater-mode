'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _iterateJsdoc = require('../iterateJsdoc');

var _iterateJsdoc2 = _interopRequireDefault(_iterateJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _iterateJsdoc2.default)(function (_ref) {
  var jsdoc = _ref.jsdoc,
      report = _ref.report,
      utils = _ref.utils;

  _lodash2.default.forEach(jsdoc.tags, function (jsdocTag) {
    if (utils.isValidTag(jsdocTag.tag)) {
      var preferredTagName = utils.getPreferredTagName(jsdocTag.tag);

      if (preferredTagName !== jsdocTag.tag) {
        report('Invalid JSDoc tag (preference). Replace "' + jsdocTag.tag + '" JSDoc tag with "' + preferredTagName + '".');
      }
    } else {
      report('Invalid JSDoc tag name "' + jsdocTag.tag + '".');
    }
  });
});
module.exports = exports['default'];
//# sourceMappingURL=checkTagNames.js.map