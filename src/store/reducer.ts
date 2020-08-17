import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initialState } from "./state";

export const reducer = reducerWithInitialState(initialState);
