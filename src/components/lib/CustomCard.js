import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ViewPropTypes,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import { elevationShadowStyle } from '../../styles/GenericStyles';
import Colors from '../../common/Colors';

const CustomCard = function (props) {
  const {
    onPress,
    children,
    style,
    noFeedback,
    elevation,
    gradient,
    onLongPress
  } = props;

  const shadowEffect = elevationShadowStyle(elevation);
  if (noFeedback) {
    return (
      <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
        <View style={[styles.style, shadowEffect, style]}>{children}</View>
      </TouchableWithoutFeedback>
    );
  } else if (onPress || onLongPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={[
          styles.style,
          shadowEffect,
          gradient ? styles.p0 : styles.p12,
          style
        ]}
      >
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.style, styles.p12, shadowEffect, style]}>
        {children}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    shadowColor: Colors.GREY
  },
  p0: {
    padding: 0
  },
  p12: {
    padding: 12
  }
});

CustomCard.defaultProps = {
  elevation: 1
};

CustomCard.propTypes = {
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  noFeedback: PropTypes.bool,
  elevation: PropTypes.number,
  onLongPress: PropTypes.func
};

export default CustomCard;
