const initialState = {};

export function wishlist(state = initialState, action) {
  switch (action.type) {
    case "GET_WISHLIST_SUCCESS":
      return Object.assign({}, state, {
        data: action.data
      });
    case "ADD_TO_WISHLIST_SUCCESS":
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}
