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
  var report = _ref.report,
      utils = _ref.utils;

  var functionParameterNames = utils.getFunctionParameterNames();
  var jsdocParameterNames = utils.getJsdocParameterNames();

  // inheritdoc implies that all documentation is inherited; see http://usejsdoc.org/tags-inheritdoc.html
  if (utils.hasTag('inheritdoc')) {
    return;
  }

  _lodash2.default.some(functionParameterNames, function (functionParameterName, index) {
    var jsdocParameterName = jsdocParameterNames[index];

    if (!jsdocParameterName) {
      report('Missing JSDoc @' + utils.getPreferredTagName('param') + ' "' + functionParameterName + '" declaration.');

      return true;
    }

    return false;
  });
});
module.exports = exports['default'];
//# sourceMappingURL=requireParam.js.map