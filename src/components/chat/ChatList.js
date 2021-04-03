import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import GenericStyles from '../../styles/GenericStyles';

import Screens from '../../common/Screens';
import ErrorBoundary from '../../common/ErrorBoundary';
import { logoutIcon, threeDotsMenuIcon } from '../../images';
import {
  CustomImageButton,
  NavigationHeader,
  ThreeDotsMenuComponent
} from '../lib';
import { navigateToScreen, resetNavigation } from '../../utils/navigation';
import { FIRESTORE_COLLECTIONS } from '../../utils/constants';
import { logErrorWithMessage } from '../../utils/logger';
import ChatListItem from './ChatListItem';

const ChatList = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    firestore()
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(uid)
      .collection(FIRESTORE_COLLECTIONS.CHATS)
      .orderBy('lastMessage.createdAt')
      .get()
      .then(querySnapshot => {
        const chats = [];
        querySnapshot.forEach(documentSnapshot => {
          chats.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        setChats(chats);
      })
      .catch(error => {
        logErrorWithMessage(error.message, 'ChatList.useEffect.firestore');
      });
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
  }
});

export default ChatList;
