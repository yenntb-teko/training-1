import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

export class ProductItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let pd = this.props.item;
		return (
			<View style={styles.item} >
				<View style={{ flex: 1 }}>
					<Image style={{ flex: 1 }} source={{ uri: pd.images ?  pd.images[0].url : '' }} />
				</View>
				<View style={{ flex: 2, marginLeft: 10 }}>
					<Text style={{ fontWeight: 'bold', fontSize: 15 }}>{pd.name}</Text>
					<Text style={{ color: '#ff0000', fontSize: 15 }}>{pd.price && pd.price.sellPrice !== null ? pd.price.sellPrice + 'đ': ''}</Text>
					<Text style={styles.oldPrice}>{pd.price ? pd.price.supplierSalePrice : '' }</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	item: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 2
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  }
})