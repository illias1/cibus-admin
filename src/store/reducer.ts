import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initialState } from "./state";
import {
  setUserName,
  setUserAlreadyVisited,
  addToCart,
  removeItemFromCart,
  setCartItemsStatus,
  setGroupOrderPlaced,
} from "./actions";
import {
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_ALREADY_VISITED,
  LOCAL_STORAGE_CART,
} from "../utils/_constants";

export const reducer = reducerWithInitialState(initialState)
  .case(setUserName, (state, userName) => {
    localStorage.setItem(LOCAL_STORAGE_USER_NAME, userName);
    return {
      ...state,
      userName,
    };
  })
  .case(setUserAlreadyVisited, (state, userAlreadyVisited) => {
    localStorage.setItem(LOCAL_STORAGE_USER_ALREADY_VISITED, "true");
    return { ...state, userAlreadyVisited };
  })
  .case(addToCart, (state, payload) => {
    localStorage.setItem(
      LOCAL_STORAGE_CART,
      JSON.stringify([...state.cart, payload])
    );
    return {
      ...state,
      cart: [...state.cart, payload],
    };
  })
  .case(removeItemFromCart, (state, title) => {
    localStorage.setItem(
      LOCAL_STORAGE_CART,
      JSON.stringify(state.cart.filter((item) => item.item.title !== title))
    );
    return {
      ...state,
      cart: state.cart.filter((item) => item.item.title !== title),
    };
  })
  .case(setCartItemsStatus, (state, status) => ({
    ...state,
    cart: state.cart.map((item) => ({
      ...item,
      status,
    })),
  }))
  .case(setGroupOrderPlaced, (state, payload) => ({
    ...state,
    groupCartOrderPlaced: payload,
  }));
