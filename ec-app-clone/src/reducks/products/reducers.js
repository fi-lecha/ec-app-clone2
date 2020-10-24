// import * as Actions from "./actions.js";
// import initialState from "../store/initialState.js";

// export const UsersReducer = (state = initialState.users, action) => {
//   switch (action.type) {
//     case Actions.SIGN_IN:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };

import * as Actions from "./actions.js";
import initialState from "../store/initialState.js";

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return{
        ...state,
        list: [...action.payload]
      }
    case Actions.DELETE_PRODUCT:
      return{
        ...state,
        list: [...action.payload]
      }
    default:
      return state;
  }
};
