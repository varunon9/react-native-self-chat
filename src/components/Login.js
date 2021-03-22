import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import GenericStyles from '../styles/GenericStyles';
import Colors from '../common/Colors';

import Screens from '../common/Screens';
import ErrorBoundary from '../common/ErrorBoundary';
import { CustomImageButton, CustomText } from './lib';
import { googleIcon } from '../images';

const Login = () => {
  const onGoogleLoginPress = () => {};

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
