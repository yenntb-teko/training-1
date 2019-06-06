import React, { Component } from 'react';
import { Header, ProductList } from '../_components';
import { View } from 'react-native';

export class HomeScreen extends Component {
  render(){
    return (
      <View>
        <Header />
        <ProductList />
      </View>
    )
  }
}