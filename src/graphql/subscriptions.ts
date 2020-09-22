/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($propertyName: String) {
    onCreateOrder(propertyName: $propertyName) {
      id
      propertyName
      orderItem {
        id
        name
        price
        quantity
        customerComment
        options {
          id
          label
          optionChoice {
            name
            addPrice
          }
        }
        optionsTotalPrice
      }
      createdAt
      status
      tableName
      priceTotal
      customerName
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
        id
        name
        price
        quantity
        customerComment
        options {
          id
          label
          optionChoice {
            name
            addPrice
          }
        }
        optionsTotalPrice
      }
      createdAt
      status
      tableName
      priceTotal
      customerName
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
          NonUniqueName
          open
          ownerId
          menuComponents {
            id
            type
            translations {
              language
              label
            }
            restrictions {
              max
              exact
            }
          }
          tables
          currency
          address {
            country
            city
            exact
          }
          image {
            main
          }
          createdAt
          updatedAt
          menu {
            items {
              id
              propertyName
              price
              addComponents
              status
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
          orders {
            items {
              id
              propertyName
              createdAt
              status
              tableName
              priceTotal
              customerName
              updatedAt
            }
            nextToken
          }
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
          NonUniqueName
          open
          ownerId
          menuComponents {
            id
            type
            translations {
              language
              label
            }
            restrictions {
              max
              exact
            }
          }
          tables
          currency
          address {
            country
            city
            exact
          }
          image {
            main
          }
          createdAt
          updatedAt
          menu {
            items {
              id
              propertyName
              price
              addComponents
              status
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
          orders {
            items {
              id
              propertyName
              createdAt
              status
              tableName
              priceTotal
              customerName
              updatedAt
            }
            nextToken
          }
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
          NonUniqueName
          open
          ownerId
          menuComponents {
            id
            type
            translations {
              language
              label
            }
            restrictions {
              max
              exact
            }
          }
          tables
          currency
          address {
            country
            city
            exact
          }
          image {
            main
          }
          createdAt
          updatedAt
          menu {
            items {
              id
              propertyName
              price
              addComponents
              status
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
          orders {
            items {
              id
              propertyName
              createdAt
              status
              tableName
              priceTotal
              customerName
              updatedAt
            }
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;
export const onCreateProperty = /* GraphQL */ `
  subscription OnCreateProperty($ownerId: String) {
    onCreateProperty(ownerId: $ownerId) {
      name
      NonUniqueName
      open
      ownerId
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
      tables
      currency
      address {
        country
        city
        exact
      }
      image {
        main
      }
      createdAt
      updatedAt
      menu {
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
          addComponents
          status
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
      orders {
        items {
          id
          propertyName
          orderItem {
            id
            name
            price
            quantity
            customerComment
            options {
              id
              label
            }
            optionsTotalPrice
          }
          createdAt
          status
          tableName
          priceTotal
          customerName
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onUpdateProperty = /* GraphQL */ `
  subscription OnUpdateProperty($ownerId: String) {
    onUpdateProperty(ownerId: $ownerId) {
      name
      NonUniqueName
      open
      ownerId
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
      tables
      currency
      address {
        country
        city
        exact
      }
      image {
        main
      }
      createdAt
      updatedAt
      menu {
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
          addComponents
          status
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
      orders {
        items {
          id
          propertyName
          orderItem {
            id
            name
            price
            quantity
            customerComment
            options {
              id
              label
            }
            optionsTotalPrice
          }
          createdAt
          status
          tableName
          priceTotal
          customerName
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onDeleteProperty = /* GraphQL */ `
  subscription OnDeleteProperty($ownerId: String) {
    onDeleteProperty(ownerId: $ownerId) {
      name
      NonUniqueName
      open
      ownerId
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
      tables
      currency
      address {
        country
        city
        exact
      }
      image {
        main
      }
      createdAt
      updatedAt
      menu {
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
          addComponents
          status
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
      orders {
        items {
          id
          propertyName
          orderItem {
            id
            name
            price
            quantity
            customerComment
            options {
              id
              label
            }
            optionsTotalPrice
          }
          createdAt
          status
          tableName
          priceTotal
          customerName
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
      addComponents
      status
      favorite
      callories
      image
      notes
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
      addComponents
      status
      favorite
      callories
      image
      notes
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
      addComponents
      status
      favorite
      callories
      image
      notes
      createdAt
      updatedAt
      owner
    }
  }
`;
