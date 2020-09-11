import {
  GetMenuItemQuery,
  Currency,
  MenuItemStatus,
  Language,
  UpdateMenuItemMutation,
  CreateMenuItemMutation,
} from "../../../API";
import { UNCATEGORIZED } from "../../../utils/_constants";
import { TMenuState } from "../Menu";

export const ordeMenuItemsByCategories = (initial: GetPropertyQuery["getProperty"]) => {
  const payload = initial!.menu!.items;
  if (payload) {
    let res: TcategorizedMenuItems = {};
    const categories = [...(payload.map((item) => item!.i18n[0].category) as string[]), ""];
    categories.forEach((cat) => {
      res[cat] = {};
    });
    payload.forEach((curr) => {
      // @ts-ignore
      res[curr!.i18n[0]!.category ? curr!.i18n[0]!.category : UNCATEGORIZED][curr.id] = curr;
    });
    return res;
    // const categoriesWithoutRepetition = categories.reduce(
    //   (prev, curr) => {
    //     if (prev.indexOf(curr) === -1 && curr) {
    //       return [...prev, curr];
    //     }
    //     return prev;
    //   },
    //   [categories[0]]
    // );
    // const itemsByCategory = categoriesWithoutRepetition.map((item) => ({
    //   category: item,
    //   items: [] as GetMenuItemQuery["getMenuItem"][],
    // }));
    // payload.forEach((menuItem) => {
    //   const indexOfCategoryOfMenuItem = menuItem!.i18n[0].category
    //     ? categoriesWithoutRepetition.indexOf(menuItem!.i18n[0].category)
    //     : categoriesWithoutRepetition.length - 1;
    //   itemsByCategory[indexOfCategoryOfMenuItem].items.push(menuItem);
    // });
    // return itemsByCategory;
  }
  return {} as TcategorizedMenuItems;
};

// export type TcategorizedMenuItems = ReturnType<typeof ordeMenuItemsByCategories>;
export type TcategorizedMenuItems = Record<string, Record<string, GetMenuItemQuery["getMenuItem"]>>;

export const priceDisplay = (currency: Currency, price: number, language: Language): string => {
  switch (currency) {
    case Currency["USD"]:
      return `$ ${price}`;
    case Currency["KRW"]:
      return language === Language["ko"] ? `${price}원` : `$₩ {price}`;
    default:
      return `${price} ${currency}`;
  }
};

export type GetPropertyQuery = {
  getProperty: {
    __typename: "Property";
    menu: {
      __typename: "ModelMenuItemConnection";
      items: Array<{
        __typename: "MenuItem";
        id: string;
        propertyName: string;
        price: number;
        favorite: boolean;
        status: MenuItemStatus;
        allergyInfo: string | null;
        callories: string | null;
        i18n: {
          __typename: "I18nMenuItem";
          category: string;
          description: string;
          language: Language;
          name: string;
        }[];
        image: string | null;
        notes: string | null;
        createdAt: string;
        updatedAt: string;
        owner: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export const getProperty = /* GraphQL */ `
  query GetProperty($name: String!) {
    getProperty(name: $name) {
      menu {
        items {
          id
          propertyName
          price
          i18n {
            category
            description
            language
            name
          }
          status
          allergyInfo
          favorite
          callories
          image
          notes
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;

const isUpdateMenuItemMutation = (
  data: UpdateMenuItemMutation | CreateMenuItemMutation
): data is UpdateMenuItemMutation => (data as UpdateMenuItemMutation).updateMenuItem !== undefined;

export const updateCategorizedMenuItems = (
  data: UpdateMenuItemMutation | CreateMenuItemMutation,
  categorizedMenuItems: TcategorizedMenuItems,
  setcategorizedMenuItems: React.Dispatch<React.SetStateAction<TcategorizedMenuItems>>,
  setState: React.Dispatch<React.SetStateAction<Record<string, TMenuState[string]>>>,
  // needed in case of update of category since otherwise duplication of item (previous version statys in the old category)
  previousItemData?: {
    category: string;
    id: string;
  }
): void => {
  const mutationItem = isUpdateMenuItemMutation(data) ? data.updateMenuItem : data.createMenuItem;
  let updatedCategorizedMenuItems: TcategorizedMenuItems = JSON.parse(
    JSON.stringify(categorizedMenuItems)
  );
  const category = mutationItem!.i18n[0].category || UNCATEGORIZED;
  if (!categorizedMenuItems[category]) {
    updatedCategorizedMenuItems[category] = {};
  }
  updatedCategorizedMenuItems[category][mutationItem!.id] = mutationItem;
  if (previousItemData && previousItemData.category !== category) {
    delete updatedCategorizedMenuItems[previousItemData.category][previousItemData.id];
  }
  setState((prev) => ({
    ...prev,
    [mutationItem!.id]: {
      favorite: mutationItem?.favorite ? true : false,
      status: mutationItem?.status === MenuItemStatus["AVAILABLE"],
    },
  }));
  // @ts-ignore
  setcategorizedMenuItems(updatedCategorizedMenuItems);
};
//   an item always has a category, if it hasn't been provided at creation => it's "Uncategorized"
// const categoryIndex = categorizedMenuItems?.findIndex(
//   (item) => item.category === mutationItem?.i18n[0].category
// );
// const inCategoryIndex =
//   categoryIndex > -1
//     ? categorizedMenuItems[categoryIndex].items.findIndex((item) => item?.id === mutationItem?.id)
//     : -1;
// const updatedCategorizedMenuItems =
//   categoryIndex > -1
//     ? // if the category already exists
//       inCategoryIndex > -1
//       ? // if the item already existed in this category, replace the old one by the updated version
//         categorizedMenuItems.map((item) =>
//           item.category === mutationItem!.i18n[0]!.category
//             ? {
//                 ...item,
//                 items: [...item.items].map((item, index) =>
//                   index === inCategoryIndex ? mutationItem : item
//                 ),
//               }
//             : item
//         )
//       : // if the item appears in the category for the first time, add it to the end of the list
//         categorizedMenuItems.map((item) =>
//           item.category === mutationItem!.i18n[0]!.category
//             ? { ...item, items: [...item.items, mutationItem] }
//             : item
//         )
//     : // if this category doesn't exist yet, add it with the first item in it
//       [
//         ...categorizedMenuItems,
//         {
//           category: mutationItem?.i18n[0].category,
//           items: [mutationItem],
//         },
//       ];
// if (previousItemData && previousItemData.category !== mutationItem?.i18n[0].category) {
//   const prevCatIndex = updatedCategorizedMenuItems.findIndex(
//     (item) => item.category === previousItemData.category
//   );
//   const inCatPrevIndex = updatedCategorizedMenuItems[prevCatIndex].items.findIndex(
//     (item) => item?.id === previousItemData.id
//   );
//   updatedCategorizedMenuItems[prevCatIndex].items.splice(inCatPrevIndex, 1);
// }
