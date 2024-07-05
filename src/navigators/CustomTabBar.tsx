import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { image } from '../configs/utils/images';
import { colors } from '../configs/utils/colors';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const iconName = route.name === 'Subscription' ? image.Subscription : route.name === 'Profile' ? image.Profile :route.name === 'Message'?image.Message:image.find; 

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabItem,
                isFocused ? styles.tabItemFocused : null,
              ]}
            >
              <Image
                source={iconName}
              
                style={[
                  styles.icon,
                  { tintColor: isFocused ? colors.backgroundColor : '#9E9E9E' },
                ]}
              />
              {isFocused && (
                <Text style={[styles.label, { color: isFocused ? colors.backgroundColor : '#9E9E9E' }]}>
                  {route.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    height:65,
    backgroundColor: '#fff', // Adjust the background color as per your design
    borderTopWidth: 0.5,
    borderTopColor: '#d6d6d6',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30, // Adjust the borderRadius as per your design
    width: '90%', // Adjust the width to make it float in the middle
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabItemFocused: {
    backgroundColor: '#ffe4fa',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginHorizontal:10,
    height:50
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize:10,
    lineHeight: 15,
    fontWeight: '600',
    marginTop: 5,
    marginLeft: 5,
  },
});

export default CustomTabBar;
