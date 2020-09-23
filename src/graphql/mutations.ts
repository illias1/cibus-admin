/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createProperty = /* GraphQL */ `
  mutation CreateProperty(
    $input: CreatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    createProperty(input: $input, condition: $condition) {
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
export const updateProperty = /* GraphQL */ `
  mutation UpdateProperty(
    $input: UpdatePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    updateProperty(input: $input, condition: $condition) {
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
export const deleteProperty = /* GraphQL */ `
  mutation DeleteProperty(
    $input: DeletePropertyInput!
    $condition: ModelPropertyConditionInput
  ) {
    deleteProperty(input: $input, condition: $condition) {
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
export const createMenuItem = /* GraphQL */ `
  mutation CreateMenuItem(
    $input: CreateMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    createMenuItem(input: $input, condition: $condition) {
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
export const updateMenuItem = /* GraphQL */ `
  mutation UpdateMenuItem(
    $input: UpdateMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    updateMenuItem(input: $input, condition: $condition) {
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
export const deleteMenuItem = /* GraphQL */ `
  mutation DeleteMenuItem(
    $input: DeleteMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    deleteMenuItem(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const updateStuffCall = /* GraphQL */ `
  mutation UpdateStuffCall(
    $input: UpdateStuffCallInput!
    $condition: ModelStuffCallConditionInput
  ) {
    updateStuffCall(input: $input, condition: $condition) {
      id
      propertyName
      tableName
      createdAt
      updatedAt
    }
  }
`;
export const deleteStuffCall = /* GraphQL */ `
  mutation DeleteStuffCall(
    $input: DeleteStuffCallInput!
    $condition: ModelStuffCallConditionInput
  ) {
    deleteStuffCall(input: $input, condition: $condition) {
      id
      propertyName
      tableName
      createdAt
      updatedAt
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const createStuffCall = /* GraphQL */ `
  mutation CreateStuffCall(
    $input: CreateStuffCallInput!
    $condition: ModelStuffCallConditionInput
  ) {
    createStuffCall(input: $input, condition: $condition) {
      id
      propertyName
      tableName
      createdAt
      updatedAt
    }
  }
`;
