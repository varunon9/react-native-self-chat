import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

import GenericStyles from '../../styles/GenericStyles';

import Screens from '../../common/Screens';
import ErrorBoundary from '../../common/ErrorBoundary';
import { logoutIcon, threeDotsMenuIcon } from '../../images';
import {
  CustomImageButton,
  NavigationHeader,
  ThreeDotsMenuComponent
} from '../lib';
import { resetNavigation } from '../../utils/navigation';

const ChatList = () => {
  const [menuVisible, setMenuVisible] = useState(false);

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
