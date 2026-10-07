import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

const PADDING_KEYS = [
  'padding',
  'paddingHorizontal',
  'paddingVertical',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'paddingStart',
  'paddingEnd',
];

function splitPadding(style) {
  const flat = StyleSheet.flatten(style) || {};
  const boxStyle = {};
  const paddingStyle = {};

  Object.keys(flat).forEach(key => {
    if (PADDING_KEYS.includes(key)) {
      paddingStyle[key] = flat[key];
    } else {
      boxStyle[key] = flat[key];
    }
  });

  return {boxStyle, paddingStyle};
}

class NinePatchView extends Component {
  render() {
    const {children, source, style, capInsets, ...rest} = this.props;
    const {boxStyle, paddingStyle} = splitPadding(style);

    return (
      <View {...rest} style={boxStyle}>
        <Image
          source={source}
          resizeMode="stretch"
          capInsets={capInsets}
          pointerEvents="none"
          style={[
            styles.background,
            {width: boxStyle.width, height: boxStyle.height},
          ]}
        />
        <View style={paddingStyle}>{children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default NinePatchView;
