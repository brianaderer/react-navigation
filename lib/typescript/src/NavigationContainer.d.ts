import { NavigationContainerProps, NavigationContainerRef } from '@react-navigation/core';
import * as React from 'react';
import type { DocumentTitleOptions, LinkingOptions, LocaleDirection, Theme } from './types';
declare global {
    var REACT_NAVIGATION_DEVTOOLS: WeakMap<NavigationContainerRef<any>, {
        readonly linking: LinkingOptions<any>;
    }>;
}
type Props<ParamList extends {}> = NavigationContainerProps & {
    direction?: LocaleDirection;
    theme?: Theme;
    linking?: LinkingOptions<ParamList>;
    fallback?: React.ReactNode;
    documentTitle?: DocumentTitleOptions;
};
export declare const NavigationContainer: <RootParamList extends {} = ReactNavigation.RootParamList>(props: NavigationContainerProps & {
    direction?: LocaleDirection | undefined;
    theme?: Theme | undefined;
    linking?: LinkingOptions<RootParamList> | undefined;
    fallback?: React.ReactNode;
    documentTitle?: DocumentTitleOptions | undefined;
} & {
    ref?: React.Ref<NavigationContainerRef<RootParamList>> | undefined;
}) => React.ReactElement;
export {};
//# sourceMappingURL=NavigationContainer.d.ts.map