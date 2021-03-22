import React from 'react';
import { SafeAreaView, View } from 'react-native';

import GenericStyles from '../../styles/GenericStyles';

import Screens from '../../common/Screens';
import ErrorBoundary from '../../common/ErrorBoundary';
import { CustomButton } from '../lib';

const ChatList = () => {
  return (
    <SafeAreaView style={GenericStyles.whiteBackgroundContainer}>
      <ErrorBoundary screenName={Screens.ChatList}>
        <View style={GenericStyles.fill}>
          <CustomButton text={'ChatList'} />
        </View>
      </ErrorBoundary>
    </SafeAreaView>
  );
};

export default ChatList;
