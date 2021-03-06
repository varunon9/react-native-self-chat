import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';

import GenericStyles from '../styles/GenericStyles';
import Colors from '../common/Colors';

import Screens from '../common/Screens';
import ErrorBoundary from '../common/ErrorBoundary';
import { CustomImageButton, CustomText } from './lib';
import { googleIcon } from '../images';
import { logErrorWithMessage } from '../utils/logger';
import { resetNavigation } from '../utils/navigation';
import { FIRESTORE_COLLECTIONS } from '../utils/constants';
import { showToastMessage } from '../utils/commonMethods';

const Login = () => {
  const googleSignin = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  const onGoogleLoginPress = () => {
    googleSignin()
      .then(async data => {
        const user = data.user;
        // check if default chat is created, create if not
        try {
          const documentSnapshot = await firestore()
            .collection(FIRESTORE_COLLECTIONS.USERS)
            .doc(user.uid)
            .get();
          if (!documentSnapshot.exists) {
            // create user
            await firestore()
              .collection(FIRESTORE_COLLECTIONS.USERS)
              .doc(user.uid)
              .set({
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                profileUrl: user.photoURL,
                createdAt: new Date()
              });
            // create default chat with self
            await firestore()
              .collection(FIRESTORE_COLLECTIONS.USERS)
              .doc(user.uid)
              .collection(FIRESTORE_COLLECTIONS.CHATS)
              .add({
                recipient: {
                  name: user.displayName,
                  profileUrl: user.photoURL
                },
                createdAt: new Date(),
                lastMessage: {
                  createdAt: new Date()
                }
              });
            resetNavigation({
              routes: [{ name: Screens.ChatList }]
            });
          } else {
            resetNavigation({
              routes: [{ name: Screens.ChatList }]
            });
          }
        } catch (error) {
          showToastMessage(error.message);
          logErrorWithMessage(
            error.message,
            'Login.onGoogleLoginPress.firestore'
          );
        }
      })
      .catch(error => {
        showToastMessage(error.message);
        logErrorWithMessage(error.message, 'Login.onGoogleLoginPress');
      });
  };

  return (
    <SafeAreaView style={styles.primaryBackgroundContainer}>
      <ErrorBoundary screenName={Screens.Login}>
        <View
          style={[
            GenericStyles.fill,
            GenericStyles.p16,
            styles.justifyContentCenter
          ]}
        >
          <CustomText
            style={[
              GenericStyles.fontSize28,
              GenericStyles.whiteText,
              GenericStyles.centerAlignedText
            ]}
          >
            Self Chat
          </CustomText>
          <CustomImageButton
            source={googleIcon}
            text={'Login with Google'}
            textStyle={[
              GenericStyles.whiteText,
              GenericStyles.centerAlignedText,
              GenericStyles.fill
            ]}
            style={[styles.whiteBorder, GenericStyles.mt24, styles.p12]}
            imageStyle={styles.googleIcon}
            onPress={onGoogleLoginPress}
          />
        </View>
      </ErrorBoundary>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  whiteBorder: {
    borderRadius: 7,
    borderColor: Colors.WHITE,
    borderWidth: 1
  },
  googleIcon: {
    width: 28,
    height: 28
  },
  primaryBackgroundContainer: {
    backgroundColor: Colors.PRIMARY,
    flex: 1
  },
  p12: {
    padding: 12
  },
  justifyContentCenter: {
    justifyContent: 'center'
  }
});

export default Login;
