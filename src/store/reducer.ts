import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initialState } from "./state";
import {
  setOrders,
  setSelectedProperty,
  updateOrderStatus,
  addRequestedOrder,
  setupMenu,
  setDeleteMenuItem,
  setAddNewMenuItem,
  setUpdateMenuItem,
  setupMenuComponents,
} from "./actions";
import { LOCAL_STORAGE_PROPERTY, UNCATEGORIZED } from "../utils/_constants";

import { TNonNullMenuItem } from "../types";
import { TcategorizedMenuItems } from "../pages/Menu/components/utils";
import { Language } from "../API";

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
  // .case(setupMenu, (state, menu) => ({
  //   ...state,
  //   menu,
  // }));
  .case(setupMenu, (state, { menuComponents, menu }) => {
    const payload = menu;
    if (payload && payload.items) {
      const itemsByCategory: TcategorizedMenuItems = {};
      const languages: Language[] = [];
      const categories = [
        // we always have a category, probaby UNCATEGORID
        ...((payload.items.filter((item) => item !== null) as TNonNullMenuItem[]).map((item) =>
          item.i18n[0].category ? item.i18n[0].category : UNCATEGORIZED
        ) as string[]),
        "",
      ];
      categories.forEach((cat) => {
        itemsByCategory[cat] = {};
      });
      payload.items.forEach((curr) => {
        if (curr) {
          if (curr.i18n.length > 0) {
            curr.i18n.forEach((translation) => {
              if (!languages.includes(translation.language)) {
                languages.push(translation.language);
              }
            });
          }
          itemsByCategory[curr?.i18n[0].category ? curr.i18n[0].category : UNCATEGORIZED][
            curr.id
          ] = curr;
        }
      });
      return {
        ...state,
        menu: {
          categoriesNumber: Object.keys(itemsByCategory).length,
          categorizedItems: itemsByCategory,
          languages,
          menuComponents: menuComponents ? menuComponents : [],
        },
      };
    }
    return state;
  })
  .case(setDeleteMenuItem, (state, { category, id }) => {
    delete state.menu.categorizedItems[category][id];
    return {
      ...state,
      menu: {
        ...state.menu,
      },
    };
  })
  .case(setAddNewMenuItem, (state, payload) => {
    const category = payload.i18n[0].category as string;
    if (!state.menu.categorizedItems[category]) {
      state.menu.categoriesNumber = state.menu.categoriesNumber + 1;
    }
    // if (!payload.i18n.every((transl) => state.menu.languages.includes(transl.language))) {
    //   state.menu.languages = [
    //     ...state.menu.languages,
    //     ...payload.i18n.map((transl) => transl.language),
    //   ].reduce((prev, curr) => {
    //     return prev.includes(curr) ? prev : [...prev, curr];
    //   }, [] as Language[]);
    // }
    return {
      ...state,
      menu: {
        ...state.menu,
        categorizedItems: {
          ...state.menu.categorizedItems,
          [category]: {
            ...state.menu.categorizedItems[category],
            [payload.id]: payload,
          },
        },
      },
    };
  })
  .case(setUpdateMenuItem, (state, { data, previousItemData }) => {
    if (previousItemData.category !== data.i18n[0].category) {
      delete state.menu.categorizedItems[previousItemData.category][previousItemData.id];
    }
    return {
      ...state,
      menu: {
        ...state.menu,
        categorizedItems: {
          ...state.menu.categorizedItems,
          [data.i18n[0].category || UNCATEGORIZED]: {
            ...state.menu.categorizedItems[data.i18n[0].category || UNCATEGORIZED],
            [data.id]: data,
          },
        },
      },
    };
  })
  .case(setupMenuComponents, (state, menuComponents) => ({
    ...state,
    menu: {
      ...state.menu,
      menuComponents: menuComponents || [],
    },
  }));
