import type { NavigationState, ParamListBase } from '@react-navigation/routers';
import type * as React from 'react';
import type { StaticConfig } from './StaticNavigation';
import type { EventMapBase, TypedNavigator } from './types';
/**
 * Higher order component to create a `Navigator` and `Screen` pair.
 * Custom navigators should wrap the navigator component in `createNavigator` before exporting.
 *
 * @param Navigator The navigator component to wrap.
 * @returns Factory method to create a `Navigator` and `Screen` pair.
 */
export declare function createNavigatorFactory<State extends NavigationState, ScreenOptions extends {}, EventMap extends EventMapBase, NavigatorComponent extends React.ComponentType<any>>(Navigator: NavigatorComponent): {
    <ParamList extends ParamListBase>(): TypedNavigator<ParamList, State, ScreenOptions, EventMap, NavigatorComponent>;
    <ParamList_1 extends ParamListBase, Config extends StaticConfig<ParamList_1, State, ScreenOptions, EventMap, NavigatorComponent>>(config: Config): TypedNavigator<ParamList_1, State, ScreenOptions, EventMap, NavigatorComponent> & {
        config: Config;
    };
};
//# sourceMappingURL=createNavigatorFactory.d.ts.map