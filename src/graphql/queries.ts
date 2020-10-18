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
          items {
            name
            NonUniqueName
            open
            ownerId
            menuComponents {
              id
              type
            }
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
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
      nextToken
    }
  }
`;
export const orderByPropertyByCreatedAtByStatus = /* GraphQL */ `
  query OrderByPropertyByCreatedAtByStatus(
    $propertyName: String
    $createdAtStatus: ModelOrderOrderByPropertyByCreatedAtByStatusCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByPropertyByCreatedAtByStatus(
      propertyName: $propertyName
      createdAtStatus: $createdAtStatus
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
export const getStuffCall = /* GraphQL */ `
  query GetStuffCall($id: ID!) {
    getStuffCall(id: $id) {
      id
      propertyName
      tableName
      createdAt
      updatedAt
    }
  }
`;
export const listStuffCalls = /* GraphQL */ `
  query ListStuffCalls(
    $filter: ModelStuffCallFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStuffCalls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        propertyName
        tableName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
