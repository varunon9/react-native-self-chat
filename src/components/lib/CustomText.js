import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Colors from '../../common/Colors';

import { isAndroid } from '../../utils/helperFunctions';

const CustomText = props => {
  const { style } = props;

  return (
    <Text
      {...props}
      style={[styles.style, isAndroid ? styles.fontFamilyRoboto : {}, style]}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  style: {
    color: Colors.BLACK,
    fontSize: 18
  },
  fontFamilyRoboto: {
    fontFamily: 'Roboto'
  }
});

CustomText.propTypes = {
  style: Text.propTypes.style
};

export default CustomText;
