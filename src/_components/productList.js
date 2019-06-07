import React, { Component } from "react";
import { ProductItem } from "../_components";
import { connect } from "react-redux";
import { FlatList, ScrollView } from "react-native";

class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data =
      this.props.product && this.props.product.data
        ? this.props.product.data
        : null;
    return (
      <ScrollView>
        {data && data.result && data.result.products && (
          <FlatList
            data={data.result.products}
            renderItem={({ item }) => <ProductItem item={item} />}
          />
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { product } = state;
  return {
    product
  };
}

const component = connect(mapStateToProps)(ProductList);
export { component as ProductList };
