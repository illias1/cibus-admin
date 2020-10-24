import { reducerWithInitialState } from "typescript-fsa-reducers";
import { initialByActiveStatus, initialState } from "./state";
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
  setAddStuffCall,
  setRemoveStuffCall,
  setUser,
} from "./actions";
import {
  LOCAL_STORAGE_PROPERTY,
  LOCAL_STORAGE_STUFF_CALLS,
  UNCATEGORIZED,
} from "../utils/_constants";

import { TNonNullMenuItem } from "../types";
import { TcategorizedMenuItems } from "../pages/Menu/components/utils";
import { CreateMenuItemMutation, Language } from "../API";
import { byActiveStatus, OrderStatus, OrderStatusEnum, TStore } from "./types";

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
    ordersStats: {
      byStatus: orders.reduce((acc, curr): byActiveStatus => {
        switch (curr.status as OrderStatus) {
          case "RECEIVED_BY_RESTAURANT":
          case "REQUESTED_BY_CUSTOMER":
          case "READY":
            return {
              ...acc,
              [curr.status as keyof byActiveStatus]: acc[curr.status as keyof byActiveStatus] + 1,
            };
          default:
            return acc;
        }
      }, initialByActiveStatus),
    },
  }))
  .case(addRequestedOrder, (state, newRequestedOrder) => ({
    ...state,
    orders: [...state.orders, newRequestedOrder],
    ordersStats: {
      byStatus: {
        ...state.ordersStats.byStatus,
        REQUESTED_BY_CUSTOMER: state.ordersStats.byStatus.REQUESTED_BY_CUSTOMER + 1,
      },
    },
  }))
  // @ts-ignore
  .case(updateOrderStatus, (state, payload) => {
    // @ts-ignore
    const index = state.orders.findIndex((item) => item?.id === payload.id);
    const ret = state.orders.slice(0);
    ret[index] = payload;
    const newByActiveStatus =
      payload.status === OrderStatusEnum.PAYED || payload.status === OrderStatusEnum.DENIED
        ? { ...state.ordersStats?.byStatus }
        : {
            ...state.ordersStats?.byStatus,
            [payload.status as keyof byActiveStatus]:
              state.ordersStats.byStatus[payload.status as keyof byActiveStatus] + 1,
          };
    newByActiveStatus[state.orders[index].status as keyof byActiveStatus] =
      newByActiveStatus[state.orders[index].status as keyof byActiveStatus] - 1;
    return {
      ...state,
      orders: ret,
      ordersStats: {
        byStatus: newByActiveStatus,
      },
    };
  })
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
    let newLanguages = state.menu.languages;
    addNewLanguageIfApplicable(payload, state, newLanguages);
    return {
      ...state,
      menu: {
        ...state.menu,
        languages: newLanguages,
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
    let newLanguages = state.menu.languages;
    addNewLanguageIfApplicable(data, state, newLanguages);
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
  }))
  .case(setAddStuffCall, (state, payload) => {
    localStorage.setItem(LOCAL_STORAGE_STUFF_CALLS, JSON.stringify([...state.stuffCalls, payload]));
    return {
      ...state,
      stuffCalls: [...state.stuffCalls, payload],
    };
  })
  .case(setRemoveStuffCall, (state, index) => {
    const newStuffCalls = state.stuffCalls
      .slice(0, index)
      .concat(state.stuffCalls.slice(index + 1));
    localStorage.setItem(LOCAL_STORAGE_STUFF_CALLS, JSON.stringify(newStuffCalls));
    return {
      ...state,
      stuffCalls: newStuffCalls,
    };
  })
  .case(setUser, (state, user) => ({
    ...state,
    user,
  }));

const addNewLanguageIfApplicable = (
  payload: NonNullable<CreateMenuItemMutation["createMenuItem"]>,
  state: TStore,
  newLanguages: Language[]
) => {
  if (!payload.i18n.every((transl) => state.menu.languages.includes(transl.language))) {
    newLanguages = newLanguages
      .concat(payload.i18n.map((transl) => transl.language))
      .reduce((prev, curr) => {
        return prev.includes(curr) ? prev : prev.concat([curr]);
      }, [] as Language[]);
  }
};
