import { PermissionsAndroid } from 'react-native';
import { logErrorWithMessage } from './logger';

export async function requestWriteStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Write Storage Permission',
        message: 'CoCo app needs access to your storage'
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    logErrorWithMessage(
      error.message,
      'permissions.requestWriteStoragePermission'
    );
    return false;
  }
}
