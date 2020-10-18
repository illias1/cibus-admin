import { TStore } from "./types";
import { LOCAL_STORAGE_PROPERTY, LOCAL_STORAGE_STUFF_CALLS } from "../utils/_constants";
import { Language } from "../API";

export const initialState: TStore = {
  orders: [],
  selectedProperty: {
    name: localStorage.getItem(LOCAL_STORAGE_PROPERTY) || "",
    open: false,
    currency: "",
    language: Language.ko,
    booleans: {
      subscribeCustomerToOrder: null,
    },
    address: {
      exact: "",
      city: "",
      country: "",
    },
    nonUniqueName: "",
  },
  menu: {
    categorizedItems: {},
    categoriesNumber: 0,
    languages: [],
    menuComponents: [],
  },
  stuffCalls: JSON.parse(localStorage.getItem(LOCAL_STORAGE_STUFF_CALLS) || "[]"),
  user: {
    id: "",
  },
};
