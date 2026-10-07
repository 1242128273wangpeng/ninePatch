import React, {Component} from 'react';
import {Image, StyleSheet, View, requireNativeComponent} from 'react-native';

const RCTImageCapInset = requireNativeComponent('RCTImageCapInset');

class NinePatchView extends Component {
  render() {
    const {children, source, capInsets: _capInsets, ...rest} = this.props;
    const normalizedSource = Image.resolveAssetSource(source);

    return (
      <View {...rest}>
        <RCTImageCapInset style={styles.capInset} source={normalizedSource} />
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  capInset: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default NinePatchView;
