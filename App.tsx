import React, {FunctionComponent} from 'react';
import {LogBox, StatusBar, View, Text, StyleSheet} from 'react-native';

import 'react-native-gesture-handler';
import AppNavigator from './src/navigators/AppNavigator';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '438738743028-fr1s2rrijn8qos6cnsqtkfm7q8dp6ttq.apps.googleusercontent.com',
});

LogBox.ignoreAllLogs();

const App: FunctionComponent<any> = () => <AppNavigator />;

export default App;
