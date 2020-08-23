import actionCreatorFactory from "typescript-fsa";
import { TStore } from "./types";

const actionCreator = actionCreatorFactory();

export const setOrders = actionCreator<TStore["orders"]>("setOrders");
export const addAwaitingOrder = actionCreator<TStore["orders"][0]>("addAwaitingOrder");
