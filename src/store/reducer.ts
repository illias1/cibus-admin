import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initialState } from "./state";
import { setOrders, addAwaitingOrder } from "./actions";

export const reducer = reducerWithInitialState(initialState)
  .case(setOrders, (state, orders) => ({
    ...state,
    orders,
  }))
  .case(addAwaitingOrder, (state, newAwaitingOrder) => ({
    ...state,
    orders: [...state.orders, newAwaitingOrder],
  }));
