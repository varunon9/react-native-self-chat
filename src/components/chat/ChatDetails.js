import React, { useState, useEffect } from 'react';
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
  ThreeDotsMenuComponent,
  CustomActivityIndicator
} from '../lib';
import { backIcon, logoutIcon, threeDotsMenuIcon } from '../../images';
import { goBack } from '../../utils/navigation';
import ChatInput from './ChatInput';
import { FIRESTORE_COLLECTIONS, MESSAGE_TYPE } from '../../utils/constants';
import { logErrorWithMessage } from '../../utils/logger';
import ChatMessageFlatListItem from './ChatMessageFlatListItem';

const MESSAGE_LIMIT = 15;

// only last 15 (MESSAGE_LIMIT) are listened in real time
// this function is responsible for merging recent chats (retrieved via live listener)
const getMergedRecentChats = (previousRecentChats, recentChats) => {
  if (previousRecentChats.length > 0) {
    const newRecentChats = [];
    for (let i = 0; i < recentChats.length; i++) {
      if (recentChats[i].messageId === previousRecentChats[0].messageId) {
        break;
      }
      newRecentChats.push(recentChats[i]);
    }
    return [...newRecentChats, ...previousRecentChats];
  } else {
    return recentChats;
  }
};

const ChatDetails = ({ route }) => {
  const { chat } = route.params;

  const [menuVisible, setMenuVisible] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  // Firestore cursor is not supported in query.onSnapshot so maintaining two chat list
  // oldChats -> chat list via cursor, recentChats -> chat list via live listener
  const [oldChats, setOldChats] = useState([]);
  const [recentChats, setRecentChats] = useState([]);

  // if true, show a loader at the top of chat list
  const [moreChatsAvailable, setMoreChatsAvailable] = useState(true);

  const getChatRef = () => {
    const uid = auth().currentUser.uid;
    return firestore()
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(uid)
      .collection(FIRESTORE_COLLECTIONS.CHATS)
      .doc(chat.id);
  };

  useEffect(() => {
    const query = getChatRef()
      .collection(FIRESTORE_COLLECTIONS.MESSAGES)
      .orderBy('createdAt', 'desc')
      .limit(MESSAGE_LIMIT);
    const listener = query.onSnapshot(
      querySnapshot => {
        let chats = [];
        querySnapshot.forEach(snapshot => {
          chats.push(snapshot.data());
        });
        // merge recentChats & chats
        setRecentChats(previousRecentChats =>
          getMergedRecentChats(previousRecentChats, chats)
        );
        if (chats.length < MESSAGE_LIMIT) {
          setMoreChatsAvailable(false);
        }
      },
      error => {
        logErrorWithMessage(error.message, 'ChatDetails.query.onSnapshot');
      }
    );

    return () => {
      // unsubscribe listener
      listener();
    };
  }, []);

  const onChatListEndReached = () => {
    if (!moreChatsAvailable) {
      return;
    }
    let startAfterTime;
    if (oldChats.length > 0) {
      startAfterTime = oldChats[oldChats.length - 1].createdAt;
    } else if (recentChats.length > 0) {
      startAfterTime = recentChats[recentChats.length - 1].createdAt;
    } else {
      setMoreChatsAvailable(false);
      return;
    }
    // query data using cursor
    getChatRef()
      .startAfter(startAfterTime)
      .limit(MESSAGE_LIMIT)
      .get()
      .then(querySnapshot => {
        let chats = [];
        querySnapshot.forEach(snapshot => {
          chats.push(snapshot.data());
        });
        if (chats.length === 0) {
          setMoreChatsAvailable(false);
        } else {
          setOldChats([...oldChats, ...chats]);
        }
      })
      .catch(error => {
        logErrorWithMessage(
          error.message,
          'ChatDetails.onChatListEndReached.getGuestChatMessagesQuery'
        );
      });
  };

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
    const chatRef = getChatRef();
    // post message
    try {
      await chatRef.update({
        lastMessage: {
          createdAt: new Date(),
          messageType: MESSAGE_TYPE.TEXT,
          text: inputMessage
        }
      });
      await chatRef.collection(FIRESTORE_COLLECTIONS.MESSAGES).add({
        createdAt: new Date(),
        messageType: MESSAGE_TYPE.TEXT,
        text: inputMessage,
        messageId: chatRef.collection(FIRESTORE_COLLECTIONS.MESSAGES).doc().id
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
        <FlatList
          contentContainerStyle={GenericStyles.p16}
          inverted
          data={[...recentChats, ...oldChats]}
          onEndReached={onChatListEndReached}
          onEndReachedThreshold={0.2}
          keyExtractor={item => item.messageId}
          ListFooterComponent={
            moreChatsAvailable ? <CustomActivityIndicator /> : null
          }
          renderItem={({ item, index }) => (
            <ChatMessageFlatListItem
              item={item}
              index={index}
              chatList={[...recentChats, ...oldChats]}
            />
          )}
        />
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
