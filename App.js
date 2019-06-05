import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { store } from './src/store';
import { Header, ProductList } from './src/_components';

export default class App extends React.Component {
  componentDidMount(){
    console.log('componentDidMount: ', this.props);
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header />
          <ProductList />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
  }
});
