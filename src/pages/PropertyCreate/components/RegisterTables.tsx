import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { mutation } from "../../../utils/mutation";
import { UpdatePropertyMutation, UpdatePropertyMutationVariables } from "../../../API";
import { updateProperty } from "../../../graphql/mutations";
import AddImage from "./AddImage";
import { TStore } from "../../../store/types";

type IRegisterTablesProps = {
  property: TStore["selectedProperty"];
};

type TRegisterTablesInputs = {
  tables: { name: string }[];
};
// check if an array's values are all unique
function checkForUniqueness(array: string[]) {
  return new Set(array).size === array.length;
}

const RegisterTables: React.FC<IRegisterTablesProps> = ({ property }) => {
  const { control, register, handleSubmit, getValues, trigger, errors } = useForm<
    TRegisterTablesInputs
  >();
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "tables",
  });
  const [tablesNumber, settablesNumber] = React.useState<number>(0);
  const [errorMessage, seterrorMessage] = React.useState<string>("");

  const handleGenerate = () => {
    const appendTablesArray = [...Array(tablesNumber)].map((_, index) => ({
      name: index + 1,
    }));
    append(appendTablesArray);
  };
  const onSubmit: SubmitHandler<TRegisterTablesInputs> = async (formResult) => {
    const { data } = await mutation<UpdatePropertyMutation, UpdatePropertyMutationVariables>(
      updateProperty,
      {
        input: {
          name: property.name,
          tables: formResult.tables.map((obj) => obj.name),
        },
      }
    );
    if (data.updateProperty?.tables) {
      settablesRegistered(true);
    } else {
      seterrorMessage(
        "An error happened while registering the tables, try again or skip and complete the step later"
      );
    }
  };

  const validateUniqueness = () => {
    const tablesValues = getValues();
    return checkForUniqueness(tablesValues.tables.map((obj) => obj.name));
  };
  const classes = useStyles();
  const [tablesRegistered, settablesRegistered] = React.useState<boolean>(false);
  if (tablesRegistered) {
    return <AddImage settablesRegistered={settablesRegistered} property={property} />;
  }

  return (
    <Box style={{ marginTop: 50 }} className={classes.root}>
      <TextField
        type="number"
        value={tablesNumber}
        onChange={(e) => settablesNumber(Number(e.target.value))}
        label="number of tables"
      />
      <Button onClick={handleGenerate}>Generate</Button>

      <Typography>Give your tables unique names</Typography>

      {errors?.tables && errors.tables[0]?.name?.type === "validate" && (
        <Typography color="error">must be unqiue</Typography>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <li key={field.id}>
            <TextField
              variant="outlined"
              name={`tables[${index}].name`}
              inputRef={register({
                required: true,
                validate: index === 0 ? validateUniqueness : undefined,
              })}
              onChange={() => trigger(`tables[0].name`)}
              defaultValue={field.name}
            />
            <Button type="button" onClick={() => remove(index)}>
              Remove
            </Button>
            <Button onClick={() => insert(index + 1, { name: "" })}>Insert a table after</Button>
          </li>
        ))}
        <Button onClick={() => append({ name: "" })}>Add one more table</Button>
        <Typography>
          The order doesn't matter to the program, it's here only for your own convenince
        </Typography>
        {fields.length > 0 && <Button type="submit">register</Button>}
      </form>

      <Typography>
        You don't need to do this now but without registered tables your establishement won't be
        online. So you will have to do this later anyway. Of course, you can change it later as well
      </Typography>
      <Typography color="error">{errorMessage}</Typography>
      <Button onClick={() => settablesRegistered(true)}>Skip</Button>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export default RegisterTables;
