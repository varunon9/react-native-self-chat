import React from 'react';
import {
  TouchableWithoutFeedback,
  ViewPropTypes,
  TouchableOpacity,
  Image,
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import GenericStyles from '../../styles/GenericStyles';
import Colors from '../../common/Colors';

import { CustomCard, CustomText } from '../lib';

const ThreeDotsMenuComponent = props => {
  const { onMenuClose, style, itemsArray } = props;

  return (
    <TouchableWithoutFeedback onPress={onMenuClose}>
      <View style={styles.container}>
        <CustomCard style={[styles.menu, style]} elevation={6}>
          {itemsArray.map((item, index) => {
            return item.visible ? (
              <TouchableOpacity
                key={index}
                style={[GenericStyles.row, styles.menuItem]}
                onPress={item.onPress}
              >
                <Image source={item.icon} style={item.iconStyle} />
                <CustomText style={item.labelStyle}>{item.label}</CustomText>
              </TouchableOpacity>
            ) : null;
          })}
        </CustomCard>
      </View>
    </TouchableWithoutFeedback>
  );
};

ThreeDotsMenuComponent.propTypes = {
  onMenuClose: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  itemsArray: PropTypes.arrayOf(
    PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      icon: PropTypes.any.isRequired,
      iconStyle: PropTypes.any,
      label: PropTypes.string.isRequired,
      labelStyle: PropTypes.any,
      onPress: PropTypes.func.isRequired
    }).isRequired
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: 0,
    marginRight: 6
  },
  menuItem: {
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 8,
    borderBottomWidth: 2,
    borderBottomColor: Colors.SILVER
  }
});

export default ThreeDotsMenuComponent;
