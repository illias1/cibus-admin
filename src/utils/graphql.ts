export const getPropertyAtInit = /* GraphQL */ `
  query GetProperty($name: String!, $date: String!) {
    getProperty(name: $name) {
      name
      ownerId
      tables
      currency
      open
      createdAt
      updatedAt
      menu {
        items {
          id
          propertyName
          price
          status
          callories
          image
          createdAt
          updatedAt
        }
        nextToken
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
          orderItem {
            price
            name
            quantity
            customerComment
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
