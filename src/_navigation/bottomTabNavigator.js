import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { HomeScreen, ProfileScreen } from '../_screens';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});
HomeStack.navigationOptions = {
  tabBarLabel: 'Home'
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});
ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile'
}

export const BottomTabNavigator = createBottomTabNavigator({
  HomeStack, ProfileStack
});