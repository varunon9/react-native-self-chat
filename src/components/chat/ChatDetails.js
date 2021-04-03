import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import GenericStyles from '../../styles/GenericStyles';

import ErrorBoundary from '../../common/ErrorBoundary';
import Screens from '../../common/Screens';
import {
  CustomImageButton,
  NavigationHeader,
  ThreeDotsMenuComponent
} from '../lib';
import { logoutIcon, threeDotsMenuIcon } from '../../images';

const ChatDetails = ({ route }) => {
  const { chat } = route.params;

  const [menuVisible, setMenuVisible] = useState(false);

  const onMenuToggle = () => {
    setMenuVisible(!menuVisible);
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
    <SafeAreaView style={GenericStyles.whiteBackgroundContainer}>
      <ErrorBoundary screenName={Screens.ChatList}>
        <NavigationHeader
          title={chat.recipient.name}
          menuVisible={menuVisible}
          menuItems={menuItems}
          onMenuToggle={onMenuToggle}
          RightComponent={renderRightComponent()}
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
  }
});

export default ChatDetails;