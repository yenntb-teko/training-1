import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { searchAction } from '../actions';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { keySearch: '' };
  }

  searchItems = () => {
    console.log('searchItems: ', this.state.keySearch);
    console.log('this.props: ', this.props);
    this.props.dispatch(searchAction(this.state.keySearch));
  }

  render() {
    return (
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Nhập tên, mã sản phẩm"
          onChangeText={(keySearch) => this.setState({ keySearch })}
          value={this.state.keySearch}
          onSubmitEditing={this.searchItems}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#dc2329',
    justifyContent: 'center',
    height: 120,
    alignItems: 'center',
  },
  searchInput: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 5,
    textAlign: 'center'
  }
});

const component = connect()(Header);
export { component as Header };

