import { createStore as reduxCreateStore,
   combineReducers,
   applyMiddleware } from "redux";
   import thunk from 'redux-thunk';

// import { ProductsReducer } from "../products/reducers.js";
import { ProductsReducer } from "../products/reducers.js";
import { UsersReducer } from "../users/reducers.js";
import { connectRouter,routerMiddleware } from "connected-react-router";

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      products: ProductsReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );
}
