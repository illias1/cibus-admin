import actionCreatorFactory from "typescript-fsa";
import { TStore } from "./types";

const actionCreator = actionCreatorFactory();

export const setSelectedProperty = actionCreator<TStore["selectedProperty"]>("setSelectedProperty");
export const setOrders = actionCreator<TStore["orders"]>("setOrders");
export const addRequestedOrder = actionCreator<TStore["orders"][0]>("addRequestedOrder");
export const updateOrderStatus = actionCreator<TStore["orders"][0]>("updateOrder");
