"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocale = useLocale;
var React = _interopRequireWildcard(require("react"));
var _LocaleDirContext = require("./LocaleDirContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Hook to access the text direction specified in the `NavigationContainer`.
 */
function useLocale() {
  const direction = React.useContext(_LocaleDirContext.LocaleDirContext);
  if (direction === undefined) {
    throw new Error("Couldn't determine the text direction. Is your component inside NavigationContainer?");
  }
  return {
    direction
  };
}
//# sourceMappingURL=useLocale.js.map