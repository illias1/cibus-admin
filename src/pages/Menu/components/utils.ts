import {
  Currency,
  MenuItemStatus,
  Language,
  UpdateMenuItemMutation,
  CreateMenuItemMutation,
  CreateMenuItemInput,
  UpdateMenuItemInput,
  MenuCompType,
  MenuComponentInput,
} from "../../../API";
import { TNonNullMenuItem } from "../../../types";
import { Inputs } from "./CreateMenuItemForm";
import { UNCATEGORIZED } from "../../../utils/_constants";
import { TStore } from "../../../store/types";
import { TFormInputs } from "./ComponentCreateForm";

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
    menuComponents: Array<{
      __typename: "MenuComponent";
      id: string;
      type: MenuCompType;
      translations: Array<{
        __typename: "MenuCompTransl";
        language: Language;
        label: string;
        optionChoice: Array<{
          __typename: "ItemOptionChoice";
          name: string;
          addPrice: number | null;
        }>;
      }>;
      restrictions: {
        __typename: "MenuCompRestr";
        max: number | null;
        exact: number | null;
      } | null;
    }> | null;
    menu: {
      __typename: "ModelMenuItemConnection";
      items: Array<{
        __typename: "MenuItem";
        id: string;
        propertyName: string;
        price: number;
        addComponents: Array<string | null> | null;
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
          favorite
          addComponents
          callories
          image
          notes
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      menuComponents {
        id
        type
        translations {
          language
          label
          optionChoice {
            name
            addPrice
          }
        }
        restrictions {
          max
          exact
        }
      }
    }
  }
`;

const getI18nInput = (inputsI18n: Inputs["i18n"]): CreateMenuItemInput["i18n"] =>
  Object.entries(inputsI18n).map(([language, langObj]) =>
    langObj.category
      ? { ...langObj, language: language as Language }
      : {
          ...langObj,
          category: UNCATEGORIZED,
          language: language as Language,
        }
  );

export const isUpdateMenuItemMutation = (
  data: UpdateMenuItemMutation | CreateMenuItemMutation
): data is UpdateMenuItemMutation => (data as UpdateMenuItemMutation).updateMenuItem !== undefined;

export const prepareInputsForCreateMutation = (
  originalInputs: Inputs,
  propertyName: string,
  menuComponents: TStore["menu"]["menuComponents"],
  image?: string
): CreateMenuItemInput => {
  const { addComponents, ...inputs } = originalInputs;
  const preparedAddComp = addComponents
    ? (addComponents
        .map((compBool, index) => (compBool ? menuComponents[index].id : false))
        .filter((item) => item) as string[])
    : undefined;

  return {
    ...inputs,
    propertyName,
    image,
    status: MenuItemStatus["AVAILABLE"],
    favorite: false,
    addComponents: preparedAddComp,
    price: Number(inputs.price),
    i18n: getI18nInput(inputs.i18n),
  };
};

export const prepareInputsForUpdateMutation = (
  originalInputs: Inputs,
  id: string,
  menuComponents: TStore["menu"]["menuComponents"],
  image?: string
): UpdateMenuItemInput => {
  const { addComponents, ...inputs } = originalInputs;
  const preparedAddComp = addComponents
    ? (addComponents
        .map((compBool, index) => (compBool ? menuComponents[index].id : false))
        .filter((item) => item) as string[])
    : undefined;
  return {
    ...inputs,
    price: Number(inputs.price),
    image,
    addComponents: preparedAddComp,
    id,
    i18n: getI18nInput(inputs.i18n),
  };
};

export const setupExistingFields = (
  setValue: any,
  item: MenuComponentInput,
  append: (
    value: Partial<Record<string, any>> | Partial<Record<string, any>>[],
    shouldFocus?: boolean | undefined
  ) => void
) => {
  if (item) {
    setValue("type", item.type || "CHECKBOX");
    item.translations.forEach((transl, langIndex) => {
      setValue(`labels.${transl.language}`, transl.label);
    });
    append(
      item.translations[0].optionChoice.map((option, optionIndex) => ({
        addPrice: option.addPrice,
        name: item.translations.map((trans) => trans.optionChoice[optionIndex].name),
      }))
    );
  }
};

export const prepareFormFieldsToSubmission = (
  data: TFormInputs,
  item: MenuComponentInput | undefined
): MenuComponentInput => {
  return {
    restrictions: {
      max: Number(data.max),
      exact: Number(data.exact),
    },
    type: data.type,
    id: item ? item.id : Math.random().toString(20).substr(2, 7),
    translations: Object.entries(data.labels).map(([lang, labelInLang], langIndex) => ({
      label: labelInLang,
      language: lang as Language,
      optionChoice: Object.entries(data.options).map(
        ([_, optionWithMultipleTranslationsInNameObject]) => ({
          name: optionWithMultipleTranslationsInNameObject.name[lang as Language],
          addPrice: Number(optionWithMultipleTranslationsInNameObject.addPrice),
        })
      ),
    })),
  };
};

export const updatePropertyForMenuComponents = /* GraphQL */ `
  mutation UpdateProperty($input: UpdatePropertyInput!, $condition: ModelPropertyConditionInput) {
    updateProperty(input: $input, condition: $condition) {
      menuComponents {
        id
        type
        translations {
          language
          label
          optionChoice {
            name
            addPrice
          }
        }
        restrictions {
          max
          exact
        }
      }
    }
  }
`;
