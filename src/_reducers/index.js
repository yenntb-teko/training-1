import { combineReducers } from "redux";
import { product } from "./product.reducer";
import { wishlist } from "./wishlist.reducer";

const rootReducer = combineReducers({
  product,
  wishlist
});

export default rootReducer;
