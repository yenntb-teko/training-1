import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { BottomTabNavigator } from "./bottomTabNavigator";

export const AppNavigator = createAppContainer(BottomTabNavigator);
