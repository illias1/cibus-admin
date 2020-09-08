import { GetMenuItemQuery, Currency, MenuItemStatus, Language } from "../../../API";

export const ordeMenuItemsByCategories = (initial: GetPropertyQuery["getProperty"]) => {
  const payload = initial!.menu!.items;
  if (payload) {
    const categories = [...(payload.map((item) => item!.i18n[0].category) as string[]), ""];
    const categoriesWithoutRepetition = categories.reduce(
      (prev, curr) => {
        if (prev.indexOf(curr) === -1 && curr) {
          return [...prev, curr];
        }
        return prev;
      },
      [categories[0]]
    );
    const itemsByCategory = categoriesWithoutRepetition.map((item) => ({
      category: item,
      items: [] as GetMenuItemQuery["getMenuItem"][],
    }));
    payload.forEach((menuItem) => {
      const indexOfCategoryOfMenuItem = menuItem!.i18n[0].category
        ? categoriesWithoutRepetition.indexOf(menuItem!.i18n[0].category)
        : categoriesWithoutRepetition.length - 1;
      itemsByCategory[indexOfCategoryOfMenuItem].items.push(menuItem);
    });
    return itemsByCategory;
  }
};

export type TcategorizedMenuItems = ReturnType<typeof ordeMenuItemsByCategories>;

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
