const initialState = {};

export function product(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_SUCCESS':
      return Object.assign({}, state, {
        data: action.data
      })
    default:
      return state
  }
}