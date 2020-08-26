/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      name
      createdAt
      updatedAt
      owner
      properties {
        items {
          name
          NonUniqueName
          open
          ownerId
          tables
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        createdAt
        updatedAt
        owner
        properties {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getProperty = /* GraphQL */ `
  query GetProperty($name: String!) {
    getProperty(name: $name) {
      name
      NonUniqueName
      open
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
          notes
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      orders {
        items {
          id
          propertyName
          createdAt
          status
          tableName
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listPropertys = /* GraphQL */ `
  query ListPropertys(
    $name: String
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPropertys(
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        name
        NonUniqueName
        open
        ownerId
        tables
        createdAt
        updatedAt
        menu {
          nextToken
        }
        orders {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getMenuItem = /* GraphQL */ `
  query GetMenuItem($id: ID!) {
    getMenuItem(id: $id) {
      id
      propertyName
      i18n {
        language
        name
        category
        description
      }
      price
      status
      allergyInfo
      callories
      image
      notes
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listMenuItems = /* GraphQL */ `
  query ListMenuItems(
    $filter: ModelMenuItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenuItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        propertyName
        i18n {
          language
          name
          category
          description
        }
        price
        status
        allergyInfo
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
`;
export const menuItemsByProperty = /* GraphQL */ `
  query MenuItemsByProperty(
    $propertyName: String
    $sortDirection: ModelSortDirection
    $filter: ModelMenuItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    menuItemsByProperty(
      propertyName: $propertyName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        propertyName
        i18n {
          language
          name
          category
          description
        }
        price
        status
        allergyInfo
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
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      propertyName
      orderItem {
        name
        price
        quantity
        allergyInfo
        customerComment
      }
      createdAt
      status
      tableName
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        propertyName
        orderItem {
          name
          price
          quantity
          allergyInfo
          customerComment
        }
        createdAt
        status
        tableName
        updatedAt
      }
      nextToken
    }
  }
`;
export const orderByPropertyByCreatedAt = /* GraphQL */ `
  query OrderByPropertyByCreatedAt(
    $propertyName: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPropertyByCreatedAt(
      propertyName: $propertyName
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        propertyName
        orderItem {
          name
          price
          quantity
          allergyInfo
          customerComment
        }
        createdAt
        status
        tableName
        updatedAt
      }
      nextToken
    }
  }
`;
export const orderByPropertyByStatus = /* GraphQL */ `
  query OrderByPropertyByStatus(
    $propertyName: String
    $status: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPropertyByStatus(
      propertyName: $propertyName
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        propertyName
        orderItem {
          name
          price
          quantity
          allergyInfo
          customerComment
        }
        createdAt
        status
        tableName
        updatedAt
      }
      nextToken
    }
  }
`;
