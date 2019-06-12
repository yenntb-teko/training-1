import {
  addWishlistToStorageHelper,
  getWishlistFromStorageHelper,
  checkExist
} from "../helper";
import { AsyncStorage } from "react-native";

describe("checkExist", () => {
  describe("when called", () => {
    it("return true if item exist in array list", () => {
      let isExist = checkExist(["1200501", "1200503"], "1200501");
      expect(isExist).toBe(true);
    });
    it("return false if item is not exist in array list", () => {
      let isExist = checkExist(["1200501", "1200503"], "1200502");
      expect(isExist).toBe(false);
    });
    it("return false if array is null", () => {
      let isExist = checkExist(null, "1200502");
      expect(isExist).toBe(false);
    });
  });
});

describe("getWishlistFromStorageHelper", () => {
  describe("when called", () => {
    it("return an array of sku", async () => {
      AsyncStorage.getItem = jest.fn(async () => "[1,2]");
      let skuList = await getWishlistFromStorageHelper();
      expect(skuList).toEqual([1, 2]);
    });
    it("return an empty array if storage do not have data wishlist", async () => {
      AsyncStorage.getItem = jest.fn(async () => null);
      let skuList = await getWishlistFromStorageHelper();
      expect(skuList).toEqual([]);
    });
  });
});

describe("addWishlistToStorageHelper", () => {
  describe("when called", () => {
    it("return array added into storage", async () => {
      AsyncStorage.getItem.mockResolvedValue("[1, 2]");
      let skuListAdd = await addWishlistToStorageHelper(3);
      expect(skuListAdd).toEqual([1, 2, 3]);
    });
    it("return array after delete", async () => {
      AsyncStorage.getItem.mockResolvedValue("[1, 2]");
      let skuListAdd = await addWishlistToStorageHelper(1);
      expect(skuListAdd).toEqual([2]);
    });
  });
});
