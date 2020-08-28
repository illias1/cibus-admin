import React from "react";
import { Auth, graphqlOperation, API } from "aws-amplify";
import { GetUserQueryVariables, GetUserQuery } from "../../API";
// import { getUser } from "../../graphql/queries";

type ErrorType = {
  data: any;
  errors: any;
};

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
          ownerId
          tables
          createdAt
          updatedAt
          currency
        }
        nextToken
      }
    }
  }
`;

export const useGetUser = () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState({} as GetUserQuery);
  const fetchQuery = async (query: string, variables?: GetUserQueryVariables) => {
    try {
      const { data } = (await API.graphql(graphqlOperation(query, variables))) as {
        data: GetUserQuery;
      };
      setData(data);
    } catch (error) {
      //   console.warn(error);
      setError((error as ErrorType).errors);
      setData((error as ErrorType).data);
    } finally {
      setLoading(false);
    }
  };
  const getUsername = async () => {
    const user: TUser = await Auth.currentAuthenticatedUser();
    console.log("user", user);
    fetchQuery(getUser, {
      id: user.username,
    });
  };
  React.useEffect(() => {
    getUsername();
  }, []);

  return {
    loading,
    data,
    error,
  };
};

type TUser = {
  Session: any;
  attributes: any;
  authenticationFlowType: any;
  client: any;
  keyPrefix: any;
  pool: any;
  preferredMFA: any;
  signInUserSession: any;
  storage: any;
  userDataKey: any;
  username: string;
};
