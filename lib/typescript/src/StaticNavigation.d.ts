import type { NavigationState, ParamListBase } from '@react-navigation/routers';
import * as React from 'react';
import type { DefaultNavigatorOptions, EventMapBase, NavigatorScreenParams, PathConfig, RouteConfig, RouteGroupConfig } from './types';
/**
 * Flatten a type to remove all type alias names, unions etc.
 * This will show a plain object when hovering over the type.
 */
type FlatType<T> = {
    [K in keyof T]: T[K];
} & {};
/**
 * keyof T doesn't work for union types. We can use distributive conditional types instead.
 * https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
 */
type KeysOf<T> = T extends {} ? keyof T : never;
/**
 * We get a union type when using keyof, but we want an intersection instead.
 * https://stackoverflow.com/a/50375286/1665026
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type UnknownToUndefined<T> = unknown extends T ? undefined : T;
type ParamsForScreenComponent<T> = T extends {
    screen: React.ComponentType<{
        route: {
            params: infer P;
        };
    }>;
} ? P : T extends React.ComponentType<{
    route: {
        params: infer P;
    };
}> ? P : undefined;
type ParamsForScreen<T> = T extends {
    screen: StaticNavigation<any, any, any>;
} ? NavigatorScreenParams<StaticParamList<T['screen']>> | undefined : T extends StaticNavigation<any, any, any> ? NavigatorScreenParams<StaticParamList<T>> | undefined : UnknownToUndefined<ParamsForScreenComponent<T>>;
type ParamListForScreens<Screens extends unknown> = {
    [Key in KeysOf<Screens>]: ParamsForScreen<Screens[Key]>;
};
type ParamListForGroups<Groups extends Readonly<{
    [key: string]: {
        screens: StaticConfigScreens<ParamListBase, NavigationState, {}, EventMapBase>;
    };
}> | undefined> = Groups extends {
    [key: string]: {
        screens: StaticConfigScreens<ParamListBase, NavigationState, {}, EventMapBase>;
    };
} ? ParamListForScreens<UnionToIntersection<Groups[keyof Groups]['screens']>> : {};
type StaticConfigScreens<ParamList extends ParamListBase, State extends NavigationState, ScreenOptions extends {}, EventMap extends EventMapBase> = {
    [key in keyof ParamList]: React.ComponentType<any> | StaticNavigation<any, any, any> | (Omit<RouteConfig<ParamList, keyof ParamList, State, ScreenOptions, EventMap>, 'name' | 'component' | 'getComponent' | 'children'> & {
        /**
         * Callback to determine whether the screen should be rendered or not.
         * This can be useful for conditional rendering of screens,
         * e.g. - if you want to render a different screen for logged in users.
         *
         * You can use a custom hook to use custom logic to determine the return value.
         *
         * @example
         * ```js
         * if: useIsLoggedIn
         * ```
         */
        if?: () => boolean;
        /**
         * Linking config for the screen.
         * This can be a string to specify the path, or an object with more options.
         *
         * @example
         * ```js
         * linking: {
         *   path: 'profile/:id',
         *   exact: true,
         * },
         * ```
         */
        linking?: PathConfig<ParamList> | string;
        /**
         * Static navigation config or Component to render for the screen.
         */
        screen: StaticNavigation<any, any, any> | React.ComponentType<any>;
    });
};
type GroupConfig<ParamList extends ParamListBase, State extends NavigationState, ScreenOptions extends {}, EventMap extends EventMapBase> = Omit<RouteGroupConfig<ParamList, ScreenOptions>, 'screens' | 'children'> & {
    /**
     * Callback to determine whether the screens in the group should be rendered or not.
     * This can be useful for conditional rendering of group of screens.
     */
    if?: () => boolean;
    /**
     * Static navigation config or Component to render for the screen.
     */
    screens: StaticConfigScreens<ParamList, State, ScreenOptions, EventMap>;
};
export type StaticConfig<ParamList extends ParamListBase, State extends NavigationState, ScreenOptions extends {}, EventMap extends EventMapBase, Navigator extends React.ComponentType<{}>> = Omit<Omit<React.ComponentProps<Navigator>, keyof DefaultNavigatorOptions<ParamListBase, NavigationState, {}, EventMapBase>> & DefaultNavigatorOptions<ParamList, State, ScreenOptions, EventMap>, 'screens' | 'children'> & {
    /**
     * Screens to render in the navigator and their configuration.
     */
    screens: StaticConfigScreens<ParamList, State, ScreenOptions, EventMap>;
    /**
     * Groups of screens to render in the navigator and their configuration.
     */
    groups?: {
        [key: string]: GroupConfig<ParamList, State, ScreenOptions, EventMap>;
    };
};
/**
 * Props for a screen component which is rendered by a static navigator.
 * Takes the route params as a generic argument.
 */
export type StaticScreenProps<T extends Record<string, unknown> | undefined> = {
    route: {
        params: T;
    };
};
/**
 * Infer the param list from the static navigation config.
 */
export type StaticParamList<T extends {
    readonly config: {
        readonly screens: Record<string, any>;
        readonly groups?: {
            [key: string]: {
                screens: Record<string, any>;
            };
        };
    };
}> = FlatType<ParamListForScreens<T['config']['screens']> & ParamListForGroups<T['config']['groups']>>;
export type StaticNavigation<NavigatorProps, GroupProps, ScreenProps> = {
    Navigator: React.ComponentType<NavigatorProps>;
    Group: React.ComponentType<GroupProps>;
    Screen: React.ComponentType<ScreenProps>;
    config: StaticConfig<ParamListBase, NavigationState, {}, EventMapBase, React.ComponentType<any>>;
};
/**
 * Create a component that renders a navigator based on the static configuration.
 *
 * @param tree Static navigation config.
 * @param displayName Name of the component to be displayed in React DevTools.
 * @returns A component which renders the navigator.
 */
export declare function createComponentForStaticNavigation(tree: StaticNavigation<any, any, any>, displayName: string): React.ComponentType<{}>;
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
export declare function createPathConfigForStaticNavigation(tree: {
    config: {
        screens: StaticConfigScreens<ParamListBase, NavigationState, {}, EventMapBase>;
    };
}): {
    [k: string]: PathConfig<ParamListBase>;
};
export {};
//# sourceMappingURL=StaticNavigation.d.ts.map