import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { getWishlistFromAsyncStorage, addToWishlist } from "../actions";
import { checkExist } from "../helper";

class ProductItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    this.props.dispatch(getWishlistFromAsyncStorage());
  };

  addToWishlist(sku) {
    this.props.dispatch(addToWishlist(sku));
  }

  render() {
    let pd = this.props.item;
    const { wishlist } = this.props;
    let isExit = wishlist ? checkExist(wishlist.data, pd.sku) : null;

    return (
      <View style={styles.item}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ flex: 1 }}
            source={{ uri: pd.images ? pd.images[0].url : "" }}
          />
        </View>
        <View style={{ flex: 2, marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>{pd.name}</Text>
          <Text style={{ color: "#ff0000", fontSize: 15 }}>
            {pd.price && pd.price.sellPrice !== null
              ? pd.price.sellPrice + "đ"
              : ""}
          </Text>
          <Text style={styles.oldPrice}>
            {pd.price ? pd.price.supplierSalePrice : ""}
          </Text>
          <View style={{ flex: 1, alignItems: "flex-end", marginEnd: 20 }}>
            <Icon
              name={isExit ? "star" : "star-o"}
              type="font-awesome"
              color="#f4ec4b"
              size={20}
              onPress={() => this.addToWishlist(pd.sku)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 100,
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 2
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  }
});

function mapStateToProps(state) {
  const { wishlist } = state;
  return { wishlist };
}

const component = connect(mapStateToProps)(ProductItem);
export { component as ProductItem };
