import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import type { NativeStackNavigationEventMap, NativeStackNavigationOptions, NativeStackNavigatorProps } from '../types';
declare function NativeStackNavigator({ id, initialRouteName, children, screenListeners, screenOptions, ...rest }: NativeStackNavigatorProps): JSX.Element;
export declare const createNativeStackNavigator: {
    <ParamList extends ParamListBase>(): import("@react-navigation/native").TypedNavigator<ParamList, StackNavigationState<ParamListBase>, NativeStackNavigationOptions, NativeStackNavigationEventMap, typeof NativeStackNavigator>;
    <ParamList_1 extends ParamListBase, Config extends import("@react-navigation/core/lib/typescript/src/StaticNavigation").StaticConfig<ParamList_1, StackNavigationState<ParamListBase>, NativeStackNavigationOptions, NativeStackNavigationEventMap, typeof NativeStackNavigator>>(config: Config): import("@react-navigation/native").TypedNavigator<ParamList_1, StackNavigationState<ParamListBase>, NativeStackNavigationOptions, NativeStackNavigationEventMap, typeof NativeStackNavigator> & {
        config: Config;
    };
};
export {};
//# sourceMappingURL=createNativeStackNavigator.d.ts.map