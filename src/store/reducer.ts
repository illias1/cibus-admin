import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initialState } from "./state";
import { setOrders, addAwaitingOrder, setSelectedProperty } from "./actions";
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
  .case(addAwaitingOrder, (state, newAwaitingOrder) => ({
    ...state,
    orders: [...state.orders, newAwaitingOrder],
  }));
