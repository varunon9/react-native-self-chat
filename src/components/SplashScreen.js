import React, { useEffect } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

import GenericStyles from '../styles/GenericStyles';

import { CustomActivityIndicator } from './lib';
import { resetNavigation } from '../utils/navigation';
import Screens from '../common/Screens';

const SplashScreen = () => {
  useEffect(() => {
    // docs https://rnfirebase.io/auth/usage
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        // user is logged-in
        resetNavigation({
          routes: [{ name: Screens.ChatList }]
        });
      } else {
        // not logged-in
        resetNavigation({
          routes: [{ name: Screens.Login }]
        });
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    // docs: https://rnfirebase.io/auth/social-auth#google
    // add web-client-id and not android-client-id
    GoogleSignin.configure({
      webClientId:
        '682995426344-h2fk5paq71v2umcrgt2u178g8jd5nite.apps.googleusercontent.com'
    });
  }, []);

  return (
    <View style={GenericStyles.fill}>
      <CustomActivityIndicator style={GenericStyles.fill} size={'large'} />
    </View>
  );
};

export default SplashScreen;
