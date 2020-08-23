import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import Observable from "zen-observable";

type ConfigType<VariableType extends {}> = {
  query: string;
  key: string;
  variables?: VariableType;
};

export const useSubscriptionByItself = <ItemType, VariablesType extends {} = {}>({
  config,
  itemData,
}: {
  config?: ConfigType<VariablesType>;
  itemData?: ItemType;
} = {}) => {
  const [item, update] = React.useState<ItemType | undefined>(itemData);

  React.useEffect(() => {
    let unsubscribe;
    if (config) {
      const { query, key, variables } = config;
      const subscription = API.graphql(graphqlOperation(query, variables));
      if (subscription instanceof Observable) {
        const sub = subscription.subscribe({
          next: (payload) => {
            alert("item subscription");
            try {
              const {
                value: {
                  data: { [key]: item },
                },
              }: {
                value: { data: { [key: string]: ItemType } };
              } = payload;

              update(item);
            } catch (error) {
              console.error(
                `${error.message} - Check the key property: the current value is ${key}`
              );
            }
          },
        });
        unsubscribe = () => {
          sub.unsubscribe();
        };
      }
    }
    return unsubscribe;
  }, [config]);

  return [item];
};
