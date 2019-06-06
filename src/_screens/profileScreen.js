import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class ProfileScreen extends Component{
  render(){
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", fontWeight: 'bold', fontSize: 30 }}>
        <Text>This is ProfileScreen</Text>
      </View>
    )
  }
}