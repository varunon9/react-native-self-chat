import React from 'react';
import { View } from 'react-native';

import GenericStyles from '../styles/GenericStyles';

import { CustomActivityIndicator } from './lib';

const SplashScreen = () => {
  return (
    <View style={GenericStyles.fill}>
      <CustomActivityIndicator style={GenericStyles.fill} size={'large'} />
    </View>
  );
};

export default SplashScreen;
