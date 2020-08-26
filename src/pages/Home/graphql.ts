export const updatePropertyOpen = /* GraphQL */ `
  mutation UpdateProperty($input: UpdatePropertyInput!, $condition: ModelPropertyConditionInput) {
    updateProperty(input: $input, condition: $condition) {
      name
      open
    }
  }
`;
