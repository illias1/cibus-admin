import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initialState } from "./state";
import {
  setOrders,
  setSelectedProperty,
  updateOrderStatus,
  addRequestedOrder,
  setupMenu,
} from "./actions";
import { LOCAL_STORAGE_PROPERTY } from "../utils/_constants";

export const reducer = reducerWithInitialState(initialState)
  .case(setSelectedProperty, (state, selectedProperty) => {
    localStorage.setItem(LOCAL_STORAGE_PROPERTY, selectedProperty.name);
    return {
      ...state,
      selectedProperty,
    };
  })
  .case(setOrders, (state, orders) => ({
    ...state,
    orders,
  }))
  .case(addRequestedOrder, (state, newRequestedOrder) => ({
    ...state,
    orders: [...state.orders, newRequestedOrder],
  }))
  // @ts-ignore
  .case(updateOrderStatus, (state, payload) => {
    // @ts-ignore
    const index = state.orders.findIndex((item) => item?.id === payload.id);
    console.log("index", index);
    const ret = state.orders.slice(0);
    ret[index] = payload;
    return {
      ...state,
      orders: ret,
    };
  })
  .case(setupMenu, (state, menu) => ({
    ...state,
    menu,
  }));
