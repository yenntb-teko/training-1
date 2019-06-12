import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { searchAction, getWishlistFromAsyncStorage } from "../actions";
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
      fetchMock.get("*", response);
      let dispatchAction = searchAction("120050");
      await dispatchAction(store.dispatch);
      expect(store.getActions()).toEqual([
        {
          type: "SEARCH_SUCCESS",
          data: response
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
  });
});
