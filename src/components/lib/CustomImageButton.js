import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewPropTypes,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import GenericStyles from '../../styles/GenericStyles';

import CustomText from './CustomText';

const CustomImageButton = props => {
  const { style, imageStyle, disabled, source, text, textStyle } = props;

  return (
    <TouchableOpacity
      {...props}
      style={[styles.style, style, disabled ? styles.disabled : {}]}
    >
      <View style={[GenericStyles.row, styles.alignItemsCenter]}>
        <Image source={source} style={imageStyle} />
        {text ? <CustomText style={textStyle}>{text}</CustomText> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  style: {
    padding: 8
  },
  disabled: {
    opacity: 0.5
  },
  alignItemsCenter: {
    alignItems: 'center'
  }
});

CustomImageButton.defaultProps = {
  disabled: false
};

CustomImageButton.propTypes = {
  style: ViewPropTypes.style,
  //imageStyle: ViewPropTypes.style, todo PropTypes for image style?
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  source: PropTypes.any.isRequired,
  text: PropTypes.string,
  textStyle: Text.propTypes.style
};

export default CustomImageButton;
