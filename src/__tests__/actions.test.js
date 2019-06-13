import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  searchAction,
  getWishlistFromAsyncStorage,
  changeWishlist
} from "../actions";
import fetchMock from "fetch-mock";
import { AsyncStorage } from "react-native";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {};
let store = {};
jest.mock("AsyncStorage");

beforeEach(() => {
  store = mockStore(initialState);
});

describe("searchAction", () => {
  describe("when called", () => {
    it("search success", async () => {
      let response = {
        code: "SUCCESS",
        result: {
          products: [{ sku: "1200501" }]
        }
      };
      fetchMock.get(
        "https://listing-stg.teko.vn/api/search/?channel=pv_online&visitorId=c8kjs98922fsd&q=120050",
        response
      );
      let dispatchAction = searchAction("120050");
      await dispatchAction(store.dispatch);
      expect(store.getActions()).toEqual([
        {
          type: "SEARCH_SUCCESS",
          data: response
        }
      ]);
    });
    it("search error", async () => {
      let respErr = {
        code: "ERROR",
        result: null
      };
      fetchMock.get(
        "https://listing-stg.teko.vn/api/search/?channel=pv_online&visitorId=c8kjs98922fsd&q=undefine",
        Promise.reject(respErr)
      );
      let dispatchAction = searchAction("undefine");
      await dispatchAction(store.dispatch);
      expect(store.getActions()).toEqual([
        {
          type: "SEARCH_ERROR",
          data: respErr
        }
      ]);
    });
  });
});

describe("getWishlistFromAsyncStorage", () => {
  describe("when called", () => {
    it("get wishlist success", async () => {
      //using methor of writing below, there is no need to declare: jest.mock("AsyncStorage");
      //AsyncStorage.getItem = jest.fn(async () => "[1,2]");
      AsyncStorage.getItem.mockResolvedValue("[1, 2]");
      let dispatchAction = getWishlistFromAsyncStorage();
      await dispatchAction(store.dispatch);
      expect(store.getActions()).toEqual([
        {
          type: "GET_WISHLIST_SUCCESS",
          data: [1, 2]
        }
      ]);
    });
    it("get wishlist error", async () => {
      AsyncStorage.getItem = jest.fn(async () => Promise.reject("error"));
      let dispatchAction = getWishlistFromAsyncStorage();
      await dispatchAction(store.dispatch);
      expect(store.getActions()).toEqual([
        {
          type: "GET_WISHLIST_ERROR",
          data: "error"
        }
      ]);
    });
  });
});

describe("changeWishlist", () => {
  describe("when called", () => {
    it("change wishlist success", async () => {
      AsyncStorage.getItem.mockResolvedValue("[1, 2]");
      let dispatchAction = changeWishlist(3);
      await dispatchAction(store.dispatch);
      expect(store.getActions()).toEqual([
        {
          type: "ADD_TO_WISHLIST_SUCCESS",
          data: [1, 2, 3]
        }
      ]);
    });
  });
});
