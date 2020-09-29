import React, { ChangeEvent } from "react";
import {
  CreatePropertyMutation,
  CreatePropertyMutationVariables,
  Currency,
  GetPropertyQuery,
  GetPropertyQueryVariables,
} from "../../API";
import { TStore, useTypedSelector } from "../../store/types";
import { mutation } from "../../utils/mutation";
import { createProperty } from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE, typedQuery } from "../../utils/useQuery";
import { SubmitHandler } from "react-hook-form";
import PropertyCreateUi from "./components/CreatePropertyUi";
import { getIsUrlValid } from "./utils";
const RegisterTables = React.lazy(() => import("../PropertyCreate/components/RegisterTables"));

type IPropertyCreateProps = {};
export const getProperty = /* GraphQL */ `
  query GetProperty($name: String!) {
    getProperty(name: $name) {
      name
    }
  }
`;
export type TPropertyCreateInputs = {
  NonUniqueName: string;
  address: {
    country: string;
    city: string;
    exact: string;
  };
  currency: Currency;
};

export type TuniquenessChecked = {
  unique: boolean | null;
  alreadyChecked: boolean;
};
const initialUniqueness: TuniquenessChecked = {
  unique: false,
  alreadyChecked: false,
};

const PropertyCreate: React.FC<IPropertyCreateProps> = ({ ...props }) => {
  const { id } = useTypedSelector((state) => state.user);
  const [urlName, setUrlName] = React.useState<string>("");
  const [uniquenessChecked, setuniquenessChecked] = React.useState<TuniquenessChecked>(
    initialUniqueness
  );

  // ============================================================================================================================================
  // helper functions
  const onSubmit: SubmitHandler<TPropertyCreateInputs> = async (formResult) => {
    console.log("formResult", formResult);
    const { data, error } = await mutation<CreatePropertyMutation, CreatePropertyMutationVariables>(
      createProperty,
      {
        input: {
          ...formResult,
          name: urlName,
          tables: [],
          open: false,
          ownerId: id,
        },
      }
    );
    if (data?.createProperty) {
      setpropertyCreated({
        name: data.createProperty.name,
        open: data.createProperty.open,
        currency: data.createProperty.currency,
      });
    } else {
      seterror(JSON.stringify(error));
    }
  };
  const handleUniquenessAndCorrectnessCheck = async () => {
    const isUrlValid = getIsUrlValid(urlName);
    if (isUrlValid === "") {
      const { query } = await typedQuery<GetPropertyQuery, GetPropertyQueryVariables>(
        getProperty,
        { name: urlName },
        GRAPHQL_AUTH_MODE.AWS_IAM
      );
      if (query?.getProperty) {
        setuniquenessChecked({
          unique: false,
          alreadyChecked: true,
        });
      } else {
        seterror("");
        setuniquenessChecked({
          unique: true,
          alreadyChecked: true,
        });
      }
    } else {
      seterror(isUrlValid);
    }
  };
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUrlName(e.target.value);
    setuniquenessChecked(initialUniqueness);
  };

  const [propertyCreated, setpropertyCreated] = React.useState<TStore["selectedProperty"]>({
    name: "",
    open: false,
    currency: Currency["KRW"],
  });
  const [error, seterror] = React.useState<string>("");
  if (propertyCreated.name) {
    return <RegisterTables property={propertyCreated} />;
  }
  return (
    <PropertyCreateUi
      error={error}
      handleInput={handleInput}
      handleUniquenessAndCorrectnessCheck={handleUniquenessAndCorrectnessCheck}
      onSubmit={onSubmit}
      urlName={urlName}
      uniquenessChecked={uniquenessChecked}
    />
  );
};

export default PropertyCreate;
