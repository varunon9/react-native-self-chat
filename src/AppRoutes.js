import React, { useEffect, useRef } from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import { BackHandler } from 'react-native';

import Screens from './common/Screens';
import { canGoBack, goBack } from './utils/navigation';
import { showToastMessage } from './utils/commonMethods';
import SplashScreen from './components/SplashScreen';
import Login from "./components/Login";
import ChatList from "./components/chat/ChatList";

const Stack = createStackNavigator();

const AppRoutes = () => {
  const exitPressedRef = useRef(false);

  const exitPress = () => {
    if (canGoBack()) {
      goBack();
      return true;
    }
    if (exitPressedRef.current) {
      BackHandler.exitApp();
    } else {
      showToastMessage('Press back again to exit !');
      exitPressedRef.current = true;
      setTimeout(() => {
        exitPressedRef.current = false;
      }, 2000);
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', exitPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', exitPress);
    };
  }, []);

  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Stack.Screen name={Screens.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={Screens.Login} component={Login} />
      <Stack.Screen name={Screens.ChatList} component={ChatList} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
