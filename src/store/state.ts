import { TStore } from "./types";
import { LOCAL_STORAGE_PROPERTY, LOCAL_STORAGE_STUFF_CALLS } from "../utils/_constants";
import { Language } from "../API";
export const initialByActiveStatus = {
  READY: 0,
  RECEIVED_BY_RESTAURANT: 0,
  REQUESTED_BY_CUSTOMER: 0,
};

export const initialState: TStore = {
  orders: [],
  ordersStats: {
    byStatus: initialByActiveStatus,
  },
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
