import { Group } from './Group';
import { Screen } from './Screen';
/**
 * Higher order component to create a `Navigator` and `Screen` pair.
 * Custom navigators should wrap the navigator component in `createNavigator` before exporting.
 *
 * @param Navigator The navigator component to wrap.
 * @returns Factory method to create a `Navigator` and `Screen` pair.
 */
export function createNavigatorFactory(Navigator) {
  // eslint-disable-next-line no-redeclare

  // eslint-disable-next-line no-redeclare
  function createNavigator(config) {
    if (config != null) {
      return {
        Navigator,
        Screen,
        Group,
        config
      };
    }
    return {
      Navigator,
      Screen,
      Group
    };
  }
  return createNavigator;
}
//# sourceMappingURL=createNavigatorFactory.js.map