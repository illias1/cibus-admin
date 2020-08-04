import actionCreatorFactory from "typescript-fsa";
import { TCartItem, TCartItemStatus } from "./types";

const actionCreator = actionCreatorFactory();

export const setUserName = actionCreator<string>("setUserName");
export const setUserAlreadyVisited = actionCreator<boolean>(
  "setUserAlreadyVisited"
);
export const addToCart = actionCreator<TCartItem>("addToCart");
export const removeItemFromCart = actionCreator<string>("removeItemFromCart");
export const setCartItemsStatus = actionCreator<TCartItemStatus>(
  "setCartItemsStatus"
);
