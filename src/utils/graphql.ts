export const getPropertyAtInit = /* GraphQL */ `
  query GetProperty($name: String!) {
    getProperty(name: $name) {
      name
      ownerId
      tables
      createdAt
      updatedAt
      menu {
        items {
          id
          propertyName
          price
          status
          allergyInfo
          callories
          image
          createdAt
          updatedAt
        }
        nextToken
      }
      orders(status: { beginsWith: "A" }) {
        items {
          id
          propertyName
          createdAt
          status
          tableName
          orderItem {
            price
            name
            quantity
            allergyInfo
            customerComment
          }
          updatedAt
        }
        nextToken
      }
    }
  }
`;
