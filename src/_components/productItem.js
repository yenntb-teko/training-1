import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { changeWishlist } from "../actions";
import { checkExist } from "../helper";
import { writeStockQuantity, writeWishlist } from "../firebase";
import Constants from "expo-constants";

class ProductItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { item } = this.props;
    //add stock into firebase database
    let stock = this.calculateTotalStock(item.stocks);
    writeStockQuantity(item.sku, stock);
  }

  calculateTotalStock(stocks) {
    let stock =
      stocks && stocks.length > 0
        ? stocks.reduce((sum, element) => {
            return sum + element.available;
          }, 0)
        : 0;
    return stock;
  }

  changeWishlist(sku) {
    //this.props.dispatch(changeWishlist(sku));
    console.log("changeWishlist: ", this.props.wishlist);
    let { wishlist } = this.props;
    let listChange = wishlist.data ? wishlist.data : [];
    let isExit = checkExist(listChange, sku);
    if (isExit) {
      //delete
      listChange = listChange.filter(function(value) {
        return value !== sku;
      });
    } else {
      //add
      listChange.push(sku);
    }
    this.props.dispatch(writeWishlist(Constants.deviceName, listChange));
  }

  render() {
    let pd = this.props.item;
    const { wishlist, product } = this.props;
    console.log("wishlist in proItem: ", wishlist);
    let isExit = checkExist(wishlist.data, pd.sku);

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
          <View style={styles.itemRight}>
            <Icon
              name={isExit ? "star" : "star-o"}
              type="font-awesome"
              color="#f4ec4b"
              size={20}
              onPress={() => this.changeWishlist(pd.sku)}
            />
          </View>
          <View style={[styles.itemRight, { marginTop: 5 }]}>
            <Text
              style={{
                fontStyle: "italic",
                backgroundColor: "#c0c0c0",
                borderRadius: 5
              }}
            >
              {`Tồn kho: ${
                product && product.stocks && product.stocks[pd.sku]
                  ? product.stocks[pd.sku].stockQuantity
                  : 0
              }`}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: "auto",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 2
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  itemRight: {
    flex: 1,
    alignItems: "flex-end",
    marginEnd: 20
  }
});

function mapStateToProps(state) {
  const { wishlist, product } = state;
  return { wishlist, product };
}

const component = connect(mapStateToProps)(ProductItem);
export { component as ProductItem };
