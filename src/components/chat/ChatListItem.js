import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';

import GenericStyles from '../../styles/GenericStyles';
import commonStyles from './commonStyles';
import Colors from '../../common/Colors';

import { CustomText } from '../lib';

const getParsedLastMessageDate = date => {
  const createdAtTimestamp = date.toMillis();
  const now = Date.now();
  const diff = now - createdAtTimestamp;
  if (diff <= 24 * 3600 * 1000) {
    return dayjs(createdAtTimestamp).format('HH:mm');
  } else {
    return dayjs(createdAtTimestamp).format('DD MMM, YYYY');
  }
};

const ChatListItem = ({ item, onPress }) => {
  const { recipient, lastMessage } = item;

  return (
    <TouchableOpacity style={[GenericStyles.row, styles.p12]} onPress={onPress}>
      <Image
        source={{ uri: recipient.profileUrl }}
        style={commonStyles.profileIcon}
      />
      <View style={[GenericStyles.fill, styles.bottomBorder]}>
        <View style={GenericStyles.centerAlignedRow}>
          <CustomText style={[GenericStyles.bold, GenericStyles.fontSize20]}>
            {recipient.name}
          </CustomText>
          <View style={GenericStyles.fill} />
          <CustomText
            style={[GenericStyles.greyText, GenericStyles.fontSize14]}
          >
            {getParsedLastMessageDate(lastMessage.createdAt)}
          </CustomText>
        </View>
        <CustomText
          style={[
            GenericStyles.greyText,
            GenericStyles.fontSize14,
            styles.mb12
          ]}
        >
          {lastMessage.text}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  p12: {
    padding: 12
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY
  },
  mb12: {
    marginBottom: 12
  }
});

export default ChatListItem;
