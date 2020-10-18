type TIsUrlValid = string;

export const getIsUrlValid = (url: string): TIsUrlValid => {
  if (url.includes(" ")) {
    return "registerProperty.errors.no_spaces";
  }
  if (url.includes("/")) {
    return "registerProperty.errors.no_backslash";
  }
  return "";
};

export const updatePropertyForPropertyEdit = /* GraphQL */ `
  mutation UpdateProperty($input: UpdatePropertyInput!, $condition: ModelPropertyConditionInput) {
    updateProperty(input: $input, condition: $condition) {
      name
      NonUniqueName
      open
      ownerId
      tables
      currency
      language
      address {
        country
        city
        exact
      }
      image {
        main
      }
      info {
        Facebook
        Instagram
      }
      booleans {
        subscribeCustomerToOrder
      }
      createdAt
      updatedAt
    }
  }
`;
