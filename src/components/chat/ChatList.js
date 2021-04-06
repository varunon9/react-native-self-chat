import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ActionButton from 'react-native-action-button';

import GenericStyles from '../../styles/GenericStyles';

import Screens from '../../common/Screens';
import ErrorBoundary from '../../common/ErrorBoundary';
import { chatIcon, logoutIcon, threeDotsMenuIcon } from '../../images';
import {
  CustomImageButton,
  NavigationHeader,
  ThreeDotsMenuComponent
} from '../lib';
import { navigateToScreen, resetNavigation } from '../../utils/navigation';
import { FIRESTORE_COLLECTIONS } from '../../utils/constants';
import { logErrorWithMessage } from '../../utils/logger';
import ChatListItem from './ChatListItem';
import Colors from '../../common/Colors';

const ChatList = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    const subscriber = firestore()
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(uid)
      .collection(FIRESTORE_COLLECTIONS.CHATS)
      .orderBy('lastMessage.createdAt')
      .onSnapshot(
        querySnapshot => {
          const chats = [];
          querySnapshot.forEach(documentSnapshot => {
            chats.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
          });
          setChats(chats);
        },
        error => {
          logErrorWithMessage(error.message, 'ChatList.useEffect.firestore');
        }
      );
    return () => {
      subscriber();
    };
  }, []);

  const onMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const onLogoutPress = () => {
    auth()
      .signOut()
      .then(() => {
        setMenuVisible(!menuVisible);
        resetNavigation({
          routes: [{ name: Screens.Login }]
        });
      });
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

  const renderChatMessagesList = ({ item }) => {
    return (
      <ChatListItem
        item={item}
        onPress={() => navigateToScreen(Screens.ChatDetails, { chat: item })}
      />
    );
  };

  const onCreateNewContactPress = () => {};

  const menuItems = [
    {
      visible: true,
      label: 'Logout',
      onPress: onLogoutPress,
      icon: logoutIcon,
      iconStyle: styles.menuIcon
    }
  ];

  return (
    <SafeAreaView style={GenericStyles.whiteBackgroundContainer}>
      <ErrorBoundary screenName={Screens.ChatList}>
        <NavigationHeader
          title={'Messages'}
          menuVisible={menuVisible}
          menuItems={menuItems}
          onMenuToggle={onMenuToggle}
          RightComponent={renderRightComponent()}
        />
        <FlatList data={chats} renderItem={renderChatMessagesList} />
        {menuVisible && (
          <ThreeDotsMenuComponent
            onMenuClose={onMenuToggle}
            itemsArray={menuItems}
          />
        )}
        <ActionButton
          buttonColor={Colors.BLUE}
          onPress={onCreateNewContactPress}
          renderIcon={() => <Image source={chatIcon} style={styles.chatIcon} />}
          fixNativeFeedbackRadius
        />
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
  chatIcon: {
    width: 21,
    height: 21
  }
});

export default ChatList;
