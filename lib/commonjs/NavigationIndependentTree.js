"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationIndependentTree = NavigationIndependentTree;
var React = _interopRequireWildcard(require("react"));
var _NavigationContext = require("./NavigationContext");
var _NavigationIndependentTreeContext = require("./NavigationIndependentTreeContext");
var _NavigationRouteContext = require("./NavigationRouteContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Component to make the child navigation container independent of parent containers.
 */
function NavigationIndependentTree(_ref) {
  let {
    children
  } = _ref;
  return (
    /*#__PURE__*/
    // We need to clear any existing contexts for nested independent container to work correctly
    React.createElement(_NavigationRouteContext.NavigationRouteContext.Provider, {
      value: undefined
    }, /*#__PURE__*/React.createElement(_NavigationContext.NavigationContext.Provider, {
      value: undefined
    }, /*#__PURE__*/React.createElement(_NavigationIndependentTreeContext.NavigationIndependentTreeContext.Provider, {
      value: true
    }, children)))
  );
}
//# sourceMappingURL=NavigationIndependentTree.js.map