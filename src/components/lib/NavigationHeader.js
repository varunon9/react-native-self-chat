import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../common/Colors';
import GenericStyles from '../../styles/GenericStyles';

import CustomText from './CustomText';

const NavigationHeader = props => {
  const { title, RightComponent } = props;

  return (
    <View style={styles.container}>
      <View style={GenericStyles.centerAlignedRow}>
        <CustomText numberOfLines={2} style={styles.title}>
          {title}
        </CustomText>
        <View style={GenericStyles.fill} />
        {RightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY,
    padding: 12,
    backgroundColor: Colors.WHITE,
    height: 58,
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8
  }
});

NavigationHeader.propTypes = {
  title: PropTypes.string.isRequired,
  RightComponent: PropTypes.element
};

export default NavigationHeader;
