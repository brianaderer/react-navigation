import * as React from 'react';
import { ViewProps } from 'react-native';
import type { StackPresentationTypes } from 'react-native-screens';
type ContainerProps = ViewProps & {
    stackPresentation: StackPresentationTypes;
    children: React.ReactNode;
};
export declare function DebugContainer(props: ContainerProps): JSX.Element;
export {};
//# sourceMappingURL=DebugContainer.d.ts.map