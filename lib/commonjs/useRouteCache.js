"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CHILD_STATE = void 0;
exports.useRouteCache = useRouteCache;
var React = _interopRequireWildcard(require("react"));
var _isRecordEqual = require("./isRecordEqual");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Utilites such as `getFocusedRouteNameFromRoute` need to access state.
 * So we need a way to suppress the warning for those use cases.
 * This is fine since they are internal utilities and this is not public API.
 */
const CHILD_STATE = Symbol('CHILD_STATE');

/**
 * Hook to cache route props for each screen in the navigator.
 * This lets add warnings and modifications to the route object but keep references between renders.
 */
exports.CHILD_STATE = CHILD_STATE;
function useRouteCache(routes) {
  // Cache object which holds route objects for each screen
  const cache = React.useMemo(() => ({
    current: new Map()
  }), []);
  if (process.env.NODE_ENV === 'production') {
    // We don't want the overhead of creating extra maps every render in prod
    return routes;
  }
  cache.current = routes.reduce((acc, route) => {
    const previous = cache.current.get(route.key);
    const {
      state,
      ...routeWithoutState
    } = route;
    let proxy;
    if (previous && (0, _isRecordEqual.isRecordEqual)(previous, routeWithoutState)) {
      // If a cached route object already exists, reuse it
      proxy = previous;
    } else {
      proxy = routeWithoutState;
    }
    Object.defineProperty(proxy, CHILD_STATE, {
      enumerable: false,
      configurable: true,
      value: state
    });
    acc.set(route.key, proxy);
    return acc;
  }, new Map());
  return Array.from(cache.current.values());
}
//# sourceMappingURL=useRouteCache.js.map