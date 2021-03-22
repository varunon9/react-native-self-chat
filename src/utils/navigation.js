import React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

// if screen already exists then navigate to it otherwise push screen
export function navigateToScreen(name, params) {
  navigationRef.current?.navigate(name, params);
}

// push a new screen on top of stack
export function pushToScreen(name, params) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function canGoBack() {
  navigationRef.current?.canGoBack();
}

export function resetNavigation(params) {
  navigationRef.current?.reset(params);
}
