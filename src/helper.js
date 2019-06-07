import { AsyncStorage } from "react-native";

const key = "wishList";

export async function addWishlistToStorageHelper(sku) {
  let wishList = await getWishlistFromStorageHelper();
  let isExist = checkExist(wishList, sku);
  if (isExist) {
    //delete
    wishList = wishList.filter(function(value) {
      return value !== sku;
    });
  } else {
    //add
    wishList.push(sku);
  }
  await AsyncStorage.setItem(key, JSON.stringify(wishList));
  return wishList;
}

export async function getWishlistFromStorageHelper() {
  let skuList = await AsyncStorage.getItem(key);
  if (skuList) {
    return JSON.parse(skuList);
  }
  return [];
}

export function checkExist(array, item) {
  if (array && array.length > 0) {
    return array.some(element => element === item);
  }
  return false;
}
