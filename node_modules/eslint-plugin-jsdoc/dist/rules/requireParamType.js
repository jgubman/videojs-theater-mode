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

  var targetTagName = utils.getPreferredTagName('param');

  var jsdocParameters = _lodash2.default.filter(jsdoc.tags, {
    tag: targetTagName
  });

  _lodash2.default.forEach(jsdocParameters, function (jsdocParameter) {
    if (!jsdocParameter.type) {
      report('Missing JSDoc @' + targetTagName + ' "' + jsdocParameter.name + '" type.');
    }
  });
});
module.exports = exports['default'];
//# sourceMappingURL=requireParamType.js.map