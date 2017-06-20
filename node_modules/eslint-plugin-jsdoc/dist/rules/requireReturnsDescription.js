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

  var targetTagName = utils.getPreferredTagName('returns');

  var jsdocTags = _lodash2.default.filter(jsdoc.tags, {
    tag: targetTagName
  });

  _lodash2.default.forEach(jsdocTags, function (jsdocTag) {
    if (!jsdocTag.description) {
      report('Missing JSDoc @' + targetTagName + ' description.');
    }
  });
});
module.exports = exports['default'];
//# sourceMappingURL=requireReturnsDescription.js.map