import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  View,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

import GenericStyles, {
  elevationShadowStyle
} from '../../styles/GenericStyles';
import Colors from '../../common/Colors';

import CustomText from './CustomText';

const CustomButton = props => {
  const {
    style,
    textStyle,
    disabled,
    isFull,
    isCurved,
    text,
    imageSource,
    imageStyle,
    ...remainingProps
  } = props;
  const buttonStyle = {};

  if (isFull) {
    buttonStyle.width = '100%';
    buttonStyle.borderRadius = 8;
  }
  if (isCurved) {
    buttonStyle.borderRadius = 32;
  }

  return (
    <TouchableOpacity
      {...remainingProps}
      disabled={disabled}
      style={[
        elevationShadowStyle(1),
        styles.buttonStyle,
        buttonStyle,
        style,
        disabled ? styles.disabled : {}
      ]}
    >
      <View style={GenericStyles.centerAlignedRow}>
        {imageSource ? <Image source={imageSource} style={imageStyle} /> : null}
        <View
          style={
            isFull ? [GenericStyles.fill, GenericStyles.centerAligned] : {}
          }
        >
          {text ? (
            <CustomText style={[GenericStyles.bold, textStyle]}>
              {text}
            </CustomText>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 16,
    backgroundColor: Colors.PRIMARY,
    alignSelf: 'flex-start'
  },
  disabled: {
    opacity: 0.5
  }
});

CustomButton.defaultProps = {
  disabled: false,
  isFull: true,
  isCurved: false
};

CustomButton.propTypes = {
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  isFull: PropTypes.bool,
  isCurved: PropTypes.bool,
  imageSource: PropTypes.any,
  imageStyle: PropTypes.any
};

export default CustomButton;
