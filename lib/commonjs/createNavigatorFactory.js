"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNavigatorFactory = createNavigatorFactory;
var _Group = require("./Group");
var _Screen = require("./Screen");
/**
 * Higher order component to create a `Navigator` and `Screen` pair.
 * Custom navigators should wrap the navigator component in `createNavigator` before exporting.
 *
 * @param Navigator The navigator component to wrap.
 * @returns Factory method to create a `Navigator` and `Screen` pair.
 */
function createNavigatorFactory(Navigator) {
  // eslint-disable-next-line no-redeclare

  // eslint-disable-next-line no-redeclare
  function createNavigator(config) {
    if (config != null) {
      return {
        Navigator,
        Screen: _Screen.Screen,
        Group: _Group.Group,
        config
      };
    }
    return {
      Navigator,
      Screen: _Screen.Screen,
      Group: _Group.Group
    };
  }
  return createNavigator;
}
//# sourceMappingURL=createNavigatorFactory.js.map