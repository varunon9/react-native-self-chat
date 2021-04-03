import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import GenericStyles from '../../styles/GenericStyles';
import { CustomText } from '../lib';
import Colors from '../../common/Colors';

const ChatListItem = ({ item, onPress }) => {
  const { recipient, lastMessage } = item;

  return (
    <TouchableOpacity style={[GenericStyles.row, styles.p12]} onPress={onPress}>
      <Image
        source={{ uri: recipient.profileUrl }}
        style={styles.profileIcon}
      />
      <View style={[GenericStyles.fill, styles.bottomBorder]}>
        <View style={GenericStyles.centerAlignedRow}>
          <CustomText style={[GenericStyles.bold, GenericStyles.fontSize20]}>
            {recipient.name}
          </CustomText>
        </View>
        <CustomText>{lastMessage.text}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    marginRight: 16
  },
  p12: {
    padding: 12
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY
  }
});

export default ChatListItem;
