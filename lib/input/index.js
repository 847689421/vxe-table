"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Input = void 0;

var _input = _interopRequireDefault(require("./src/input"));

var _textarea = _interopRequireDefault(require("./src/textarea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_input.default.install = function (Vue) {
  Vue.component(_input.default.name, _input.default);
  Vue.component(_textarea.default.name, _textarea.default);
};

var Input = _input.default;
exports.Input = Input;
var _default = _input.default;
exports.default = _default;