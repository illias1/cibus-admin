import { TStore } from "./types";
import { LOCAL_STORAGE_PROPERTY } from "../utils/_constants";

export const initialState: TStore = {
  orders: [],
  selectedProperty: {
    name: localStorage.getItem(LOCAL_STORAGE_PROPERTY) || "",
    open: false,
  },
};
