import React from 'react';
import { StyleSheet, View, ViewPropTypes, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import GenericStyles from '../../styles/GenericStyles';
import Colors from '../../common/Colors';

const CustomTextInput = props => {
  const {
    containerStyle,
    style,
    LeftComponent,
    RightComponent,
    refCallback,
    ...remainingProps
  } = props;

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View style={GenericStyles.centerAlignedRow}>
        {LeftComponent}
        <TextInput
          {...remainingProps}
          style={[styles.textInputStyle, GenericStyles.fill, style]}
          ref={refCallback}
        />
        {RightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.GREY,
    borderRadius: 8,
    padding: 12
  },
  textInputStyle: {
    padding: 0
  }
});

CustomTextInput.defaultProps = {
  LeftComponent: null,
  RightComponent: null
};

CustomTextInput.propTypes = {
  containerStyle: ViewPropTypes.style,
  style: TextInput.propTypes.style,
  LeftComponent: PropTypes.element,
  RightComponent: PropTypes.element,
  refCallback: PropTypes.func
};

export default CustomTextInput;
