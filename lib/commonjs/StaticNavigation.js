"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComponentForStaticNavigation = createComponentForStaticNavigation;
exports.createPathConfigForStaticNavigation = createPathConfigForStaticNavigation;
var React = _interopRequireWildcard(require("react"));
var _useRoute = require("./useRoute");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const MemoizedScreen = /*#__PURE__*/React.memo(_ref => {
  let {
    component
  } = _ref;
  const route = (0, _useRoute.useRoute)();
  const children = /*#__PURE__*/React.createElement(component, {
    route
  });
  return children;
});
const getItemsFromScreens = (Screen, screens) => {
  return Object.entries(screens).map(_ref2 => {
    let [name, item] = _ref2;
    let component;
    let props = {};
    let useIf;
    let isNavigator = false;
    if ('screen' in item) {
      const {
        screen,
        if: _if,
        ...rest
      } = item;
      useIf = _if;
      props = rest;
      if (typeof screen === 'function') {
        component = screen;
      } else if ('config' in screen) {
        isNavigator = true;
        component = createComponentForStaticNavigation(screen, `${name}Navigator`);
      }
    } else if (typeof item === 'function') {
      component = item;
    } else if ('config' in item) {
      isNavigator = true;
      component = createComponentForStaticNavigation(item, `${name}Navigator`);
    }
    if (component == null) {
      throw new Error(`Couldn't find a 'screen' property for the screen '${name}'. This can happen if you passed 'undefined'. You likely forgot to export your component from the file it's defined in, or mixed up default import and named import when importing.`);
    }
    let element = isNavigator ? /*#__PURE__*/React.createElement(component, {}) : /*#__PURE__*/React.createElement(MemoizedScreen, {
      component: component
    });
    return () => {
      const shouldRender = useIf == null || useIf();
      if (!shouldRender) {
        return null;
      }
      return /*#__PURE__*/React.createElement(Screen, _extends({
        key: name,
        name: name
      }, props), () => element);
    };
  });
};

/**
 * Create a component that renders a navigator based on the static configuration.
 *
 * @param tree Static navigation config.
 * @param displayName Name of the component to be displayed in React DevTools.
 * @returns A component which renders the navigator.
 */
function createComponentForStaticNavigation(tree, displayName) {
  const {
    Navigator,
    Group,
    Screen,
    config
  } = tree;
  const {
    screens,
    groups,
    ...rest
  } = config;
  const items = getItemsFromScreens(Screen, screens);
  if (groups) {
    items.push(...Object.entries(groups).map(_ref3 => {
      let [key, {
        if: useIf,
        ...group
      }] = _ref3;
      const groupItems = getItemsFromScreens(Screen, group.screens);
      return () => {
        // Call unconditionally since screen configs may contain `useIf` hooks
        const children = groupItems.map(item => item());
        const shouldRender = useIf == null || useIf();
        if (!shouldRender) {
          return null;
        }
        return /*#__PURE__*/React.createElement(Group, _extends({
          navigationKey: key
        }, group, {
          key: key
        }), children);
      };
    }));
  }
  const NavigatorComponent = () => {
    const children = items.map(item => item());
    return /*#__PURE__*/React.createElement(Navigator, rest, children);
  };
  NavigatorComponent.displayName = displayName;
  return NavigatorComponent;
}

/**
 * Create a path config object from a static navigation config for deep linking.
 *
 * @param tree Static navigation config.
 * @returns Path config object to use in linking config.
 *
 * @example
 * ```js
 * const config = {
 *   screens: {
 *     Home: {
 *       screens: createPathConfigForStaticNavigation(HomeTabs),
 *     },
 *   },
 * };
 * ```
 */
function createPathConfigForStaticNavigation(tree) {
  return Object.fromEntries(Object.entries(tree.config.screens).map(_ref4 => {
    let [key, item] = _ref4;
    const screenConfig = {};
    if ('linking' in item) {
      if (typeof item.linking === 'string') {
        screenConfig.path = item.linking;
      } else {
        Object.assign(screenConfig, item.linking);
      }
    }
    if ('config' in item) {
      screenConfig.screens = createPathConfigForStaticNavigation(item);
    } else if ('screen' in item && 'config' in item.screen && item.screen.config.screens) {
      screenConfig.screens = createPathConfigForStaticNavigation(item.screen);
    }
    return [key, screenConfig];
  }).filter(_ref5 => {
    let [, screen] = _ref5;
    return Object.keys(screen).length > 0;
  }));
}
//# sourceMappingURL=StaticNavigation.js.map