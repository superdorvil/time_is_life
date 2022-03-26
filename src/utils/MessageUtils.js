import {ToastAndroid} from 'react-native';

export const shortToast = message => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const longToast = message => {
  ToastAndroid.show(message, ToastAndroid.LONG);
};
