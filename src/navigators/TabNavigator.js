import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from './CustomTabBar';
import Subscription from '../screen/bottomTab/Subscription';

import Message from '../screen/bottomTab/Message';
import Profile from '../screen/bottomTab/Profile';
import { image } from '../configs/utils/images';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
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
              source={image.}
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
