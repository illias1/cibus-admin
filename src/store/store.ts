import { createStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

export const store = createStore(
  reducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export type RootState = ReturnType<typeof store.getState>;
