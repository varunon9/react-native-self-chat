import Toast from 'react-native-root-toast';

export const showToastMessage = (
  message,
  options = {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM
  }
) => {
  Toast.show(message, {
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    ...options
  });
};
