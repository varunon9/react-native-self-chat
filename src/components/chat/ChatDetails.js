import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import GenericStyles from '../../styles/GenericStyles';
import commonStyles from './commonStyles';

import ErrorBoundary from '../../common/ErrorBoundary';
import Screens from '../../common/Screens';
import {
  CustomImageButton,
  NavigationHeader,
  ThreeDotsMenuComponent
} from '../lib';
import { backIcon, logoutIcon, threeDotsMenuIcon } from '../../images';
import { goBack } from '../../utils/navigation';
import ChatInput from './ChatInput';
import { FIRESTORE_COLLECTIONS, MESSAGE_TYPE } from '../../utils/constants';
import { logErrorWithMessage } from '../../utils/logger';

const ChatDetails = ({ route }) => {
  const { chat } = route.params;

  const [menuVisible, setMenuVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const onMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const renderLeftComponent = () => {
    return (
      <View style={GenericStyles.centerAlignedRow}>
        <CustomImageButton
          source={backIcon}
          imageStyle={styles.backIcon}
          onPress={goBack}
          style={styles.backButton}
        />
        <Image
          source={{ uri: chat.recipient.profileUrl }}
          style={[commonStyles.profileIcon, styles.profileIcon]}
        />
      </View>
    );
  };

  const renderRightComponent = () => {
    return (
      <CustomImageButton
        source={threeDotsMenuIcon}
        imageStyle={styles.threeDotsMenu}
        onPress={onMenuToggle}
        style={styles.pl24}
      />
    );
  };

  const onDeleteChatPress = () => {};

  const onMessageSubmit = async () => {
    const uid = auth().currentUser.uid;
    // post message
    try {
      await firestore()
        .collection(FIRESTORE_COLLECTIONS.USERS)
        .doc(uid)
        .collection(FIRESTORE_COLLECTIONS.CHATS)
        .doc(chat.id)
        .update({
          lastMessage: {
            createdAt: new Date(),
            messageType: MESSAGE_TYPE.TEXT,
            text: inputMessage
          }
        });
      setInputMessage('');
    } catch (error) {
      logErrorWithMessage(error.message, 'ChatDetails.onMessageSubmit');
    }
    // update chat.lastMessage
  };

  const menuItems = [
    {
      visible: true,
      label: 'Delete Chat',
      onPress: onDeleteChatPress,
      icon: logoutIcon,
      iconStyle: styles.menuIcon
    }
  ];

  return (
    <SafeAreaView style={GenericStyles.silverBackgroundContainer}>
      <ErrorBoundary screenName={Screens.ChatList}>
        <NavigationHeader
          title={chat.recipient.name}
          menuVisible={menuVisible}
          menuItems={menuItems}
          onMenuToggle={onMenuToggle}
          LeftComponent={renderLeftComponent()}
          RightComponent={renderRightComponent()}
        />
        <FlatList contentContainerStyle={GenericStyles.p16} inverted />
        <ChatInput
          onMessageInputChange={message => setInputMessage(message)}
          onMessageSubmit={onMessageSubmit}
          inputMessage={inputMessage}
        />
        {menuVisible && (
          <ThreeDotsMenuComponent
            onMenuClose={onMenuToggle}
            itemsArray={menuItems}
          />
        )}
      </ErrorBoundary>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pl24: {
    paddingLeft: 24
  },
  threeDotsMenu: {
    width: 4.5,
    height: 22.5
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 8
  },
  backIcon: {
    height: 18,
    width: 10.5
  },
  backButton: {
    paddingVertical: 8,
    paddingLeft: 0,
    paddingRight: 8
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18
  }
});

export default ChatDetails;
