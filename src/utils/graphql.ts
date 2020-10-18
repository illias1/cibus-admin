export const getPropertyAtInit = /* GraphQL */ `
  query GetProperty($name: String!, $date: String!) {
    getProperty(name: $name) {
      name
      NonUniqueName
      ownerId
      currency
      language
      open
      booleans {
        subscribeCustomerToOrder
      }
      orders(
        createdAtStatus: { beginsWith: { createdAt: $date } }
        filter: { status: { beginsWith: "R" } }
      ) {
        items {
          id
          propertyName
          createdAt
          status
          tableName
          priceTotal
          customerName
          orderItem {
            id
            price
            name
            quantity
            customerComment
            options {
              id
              label
              optionChoice {
                addPrice
                name
              }
            }
            optionsTotalPrice
          }
          updatedAt
        }
        nextToken
      }
    }
  }
`;

export type GetPropertyAtInitVariables = {
  name: string;
  date: string;
};
