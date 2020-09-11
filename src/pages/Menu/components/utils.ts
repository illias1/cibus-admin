import {
  Currency,
  MenuItemStatus,
  Language,
  UpdateMenuItemMutation,
  CreateMenuItemMutation,
  CreateMenuItemInput,
  UpdateMenuItemInput,
  GetMenuItemQuery,
} from "../../../API";
import { TNonNullMenuItem } from "../../../types";
import { Inputs } from "./forms/CreateMenuItemForm";
import { UNCATEGORIZED } from "../../../utils/_constants";

export type TcategorizedMenuItems = Record<string, Record<string, TNonNullMenuItem>>;

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

export const isUpdateMenuItemMutation = (
  data: UpdateMenuItemMutation | CreateMenuItemMutation
): data is UpdateMenuItemMutation => (data as UpdateMenuItemMutation).updateMenuItem !== undefined;

export const prepareInputsForCreateMutation = (
  inputs: Inputs,
  propertyName: string
): CreateMenuItemInput => {
  return {
    ...inputs,
    propertyName,
    status: MenuItemStatus["AVAILABLE"],
    favorite: false,
    price: Number(inputs.price),
    i18n: inputs.i18n.map((langObj) =>
      langObj.category
        ? langObj
        : {
            ...langObj,
            category: UNCATEGORIZED,
          }
    ),
  };
};

export const prepareInputsForUpdateMutation = (inputs: Inputs, id: string): UpdateMenuItemInput => {
  return {
    ...inputs,
    price: Number(inputs.price),
    id,
    i18n: inputs.i18n.map((langObj) =>
      langObj.category
        ? langObj
        : {
            ...langObj,
            category: UNCATEGORIZED,
          }
    ),
  };
};
