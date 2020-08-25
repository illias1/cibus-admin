/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($propertyName: String) {
    onCreateOrder(propertyName: $propertyName) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($id: ID, $propertyName: String) {
    onUpdateOrder(id: $id, propertyName: $propertyName) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
      id
      email
      name
      createdAt
      updatedAt
      owner
      properties {
        items {
          name
          ownerId
          tables
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
      id
      email
      name
      createdAt
      updatedAt
      owner
      properties {
        items {
          name
          ownerId
          tables
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
      id
      email
      name
      createdAt
      updatedAt
      owner
      properties {
        items {
          name
          ownerId
          tables
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onCreateProperty = /* GraphQL */ `
  subscription OnCreateProperty($owner: String) {
    onCreateProperty(owner: $owner) {
      name
      ownerId
      tables
      createdAt
      updatedAt
      owner
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
export const onUpdateProperty = /* GraphQL */ `
  subscription OnUpdateProperty($owner: String) {
    onUpdateProperty(owner: $owner) {
      name
      ownerId
      tables
      createdAt
      updatedAt
      owner
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
export const onDeleteProperty = /* GraphQL */ `
  subscription OnDeleteProperty($owner: String) {
    onDeleteProperty(owner: $owner) {
      name
      ownerId
      tables
      createdAt
      updatedAt
      owner
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
export const onCreateMenuItem = /* GraphQL */ `
  subscription OnCreateMenuItem($owner: String) {
    onCreateMenuItem(owner: $owner) {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateMenuItem = /* GraphQL */ `
  subscription OnUpdateMenuItem($owner: String) {
    onUpdateMenuItem(owner: $owner) {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteMenuItem = /* GraphQL */ `
  subscription OnDeleteMenuItem($owner: String) {
    onDeleteMenuItem(owner: $owner) {
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
      createdAt
      updatedAt
      owner
    }
  }
`;
