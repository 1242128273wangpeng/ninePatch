import type {Component} from 'react';
import type {ImageSourcePropType, StyleProp, ViewStyle} from 'react-native';
import type {ReactNode} from 'react';

export interface NinePatchViewProps {
  source?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  /** iOS only. Unstretched edges, in points, matching the .9.png stretch markers. */
  capInsets?: {top: number; left: number; bottom: number; right: number};
}

export default class NinePatchView extends Component<NinePatchViewProps> {}
