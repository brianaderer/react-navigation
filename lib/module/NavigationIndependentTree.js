import * as React from 'react';
import { NavigationContext } from './NavigationContext';
import { NavigationIndependentTreeContext } from './NavigationIndependentTreeContext';
import { NavigationRouteContext } from './NavigationRouteContext';

/**
 * Component to make the child navigation container independent of parent containers.
 */
export function NavigationIndependentTree(_ref) {
  let {
    children
  } = _ref;
  return (
    /*#__PURE__*/
    // We need to clear any existing contexts for nested independent container to work correctly
    React.createElement(NavigationRouteContext.Provider, {
      value: undefined
    }, /*#__PURE__*/React.createElement(NavigationContext.Provider, {
      value: undefined
    }, /*#__PURE__*/React.createElement(NavigationIndependentTreeContext.Provider, {
      value: true
    }, children)))
  );
}
//# sourceMappingURL=NavigationIndependentTree.js.map