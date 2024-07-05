import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Keyboard, Platform } from 'react-native';

import CustomTabBar from './CustomTabBar';
import Subscription from '../screen/bottomTab/Subscription';
import Message from '../screen/bottomTab/Message';
import Profile from '../screen/bottomTab/Profile';
import { image } from '../configs/utils/images';
import Findmatches from '../screen/bottomTab/Findmatches';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      
      }}
 tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Find Matches"
        component={Findmatches}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={image.Subscription}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#7756FC' : color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={Subscription}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={image.Subscription}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#7756FC' : color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={image.Message}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#7756FC' : color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={image.Profile}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#7756FC' : color,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
