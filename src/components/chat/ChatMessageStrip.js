import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import GenericStyles from '../../styles/GenericStyles';
import Colors from '../../common/Colors';

import { CustomText } from '../lib';

const ChatMessageStrip = ({ message }) => {
  return (
    <View style={[GenericStyles.centerAlignedRow, GenericStyles.mb12]}>
      <View style={[GenericStyles.fill, styles.greyBar]} />
      <CustomText style={styles.mh8}>{message}</CustomText>
      <View style={[GenericStyles.fill, styles.greyBar]} />
    </View>
  );
};

ChatMessageStrip.propTypes = {
  message: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  mh8: {
    marginHorizontal: 8
  },
  greyBar: {
    height: 1,
    backgroundColor: Colors.GREY
  }
});

export default ChatMessageStrip;
