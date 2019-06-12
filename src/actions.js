import { searchService } from "./services";
import {
  getWishlistFromStorageHelper,
  addWishlistToStorageHelper
} from "./helper";

export function searchAction(keySearch) {
  return dispatch => {
    return searchService(keySearch).then(
      data => {
        dispatch(onSuccess("SEARCH", data));
      },
      error => {
        dispatch(onError("SEARCH", error));
      }
    );
  };
}

export function getWishlistFromAsyncStorage() {
  return async dispatch => {
    try {
      let wishlist = await getWishlistFromStorageHelper();
      dispatch(onSuccess("GET_WISHLIST", wishlist));
    } catch (err) {
      dispatch(onError("GET_WISHLIST", err));
    }
  };
}

export function changeWishlist(sku) {
  return async dispatch => {
    try {
      let wishlist = await addWishlistToStorageHelper(sku);
      dispatch(onSuccess("ADD_TO_WISHLIST", wishlist));
    } catch (err) {
      console.log("addToWishlist error", err);
    }
  };
}

function onSuccess(type, data) {
  return { type: type + "_SUCCESS", data };
}

function onError(type, data) {
  return { type: type + "_ERROR", data };
}
