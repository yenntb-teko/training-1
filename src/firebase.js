import firebase from "firebase";

export function writeStockQuantity(sku, stockQuantity) {
  firebase
    .database()
    .ref(`stocks/${sku}`)
    .set({
      stockQuantity: stockQuantity
    });
}

export function getStockQuantity() {
  return dispatch => {
    firebase
      .database()
      .ref(`stocks`)
      .on("value", snapshot => {
        dispatch({
          type: "GET_STOCK_QUANTITY_SUCCESS",
          data: snapshot.val()
        });
      });
  };
}

export function writeWishlist(device, wishlist) {
  return async dispatch => {
    await firebase
      .database()
      .ref(`wishlist/${device}`)
      .set(wishlist);
    dispatch({
      type: "ADD_TO_WISHLIST_SUCCESS",
      data: wishlist
    });
  };
}

export function getWishlist(device) {
  return dispatch => {
    firebase
      .database()
      .ref(`wishlist/${device}`)
      .on("value", snapshot => {
        dispatch({
          type: "GET_WISHLIST_SUCCESS",
          data: snapshot.val()
        });
      });
  };
}

export function offStocks() {
  firebase
    .database()
    .ref(`stocks`)
    .off();
}
