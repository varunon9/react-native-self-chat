import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './src/AppRoutes';
import { navigationRef } from './src/utils/navigation';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default App;
