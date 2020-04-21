"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _Test = _interopRequireDefault(require("../../universal/components/Test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', async (req, res) => {
  const body = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_Test.default, null));
  res.render('main', {
    body,
    layout: false
  });
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=index.js.map