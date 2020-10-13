import React from "react";
import { makeStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
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
import Title from "../../../components/Title";
import FormTitle from "./FormTitle";
import { customStyles, customWithStyles } from "../../../utils/theme";
import SmallActionButton from "../../../components/SmallActionButton";
// icons
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import MainActionButton from "./MainActionButton";
import ExplanationMessage from "./ExplanationMessage";
import { useTranslation } from "react-i18next";
interface IRegisterTablesProps extends WithStyles<typeof customStyles> {
  property: TStore["selectedProperty"];
}

type TRegisterTablesInputs = {
  tables: { name: string }[];
};
// check if an array's values are all unique
function checkForUniqueness(array: string[]) {
  return new Set(array).size === array.length;
}

const RegisterTables: React.FC<IRegisterTablesProps> = ({ property, classes }) => {
  const { control, register, handleSubmit, getValues, trigger, errors } = useForm<
    TRegisterTablesInputs
  >();
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "tables",
  });
  const [tablesNumber, settablesNumber] = React.useState<number | string>("");
  const [errorMessage, seterrorMessage] = React.useState<string>("");
  const { t } = useTranslation();

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
  const useClasses = useStyles();
  const [tablesRegistered, settablesRegistered] = React.useState<boolean>(false);
  if (tablesRegistered) {
    return <AddImage settablesRegistered={settablesRegistered} property={property} />;
  }

  return (
    <>
      <Title
        subtitle={t("registerProperty.subtitles.register_tables")}
        title={t("registerProperty.titles.register_tables", { location: property.name })}
      />
      <FormTitle title={t("registerProperty.form_titles.tables_info")} />
      <Box className={useClasses.line}>
        <TextField
          style={{ marginRight: 30 }}
          className={classes.customizedTextFieldMainBack}
          type="number"
          variant="outlined"
          value={tablesNumber}
          onChange={(e) => settablesNumber(Number(e.target.value))}
          label={t("registerProperty.labels.number_of_tables")}
        />
        <SmallActionButton onClick={handleGenerate}>
          {t("registerProperty.actions.generate_tables")}
        </SmallActionButton>
      </Box>

      <FormTitle title={t("registerProperty.form_titles.table_names")} />
      <ExplanationMessage
        message={t("registerProperty.explanations.tables_convenience_numbered")}
      />
      <form style={{ position: "relative", marginBottom: 50 }} onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Box className={useClasses.line} key={field.id}>
            <TextField
              className={`${useClasses.tableName} ${classes.customizedTextFieldMainBack}`}
              variant="outlined"
              error={Boolean(errors && errors.tables && errors.tables[index]?.name)}
              name={`tables[${index}].name`}
              inputRef={register({
                required: true,
                validate: index === 0 ? validateUniqueness : undefined,
              })}
              onChange={() => trigger(`tables[0].name`)}
              defaultValue={field.name}
            />
            <IconButton color="inherit" type="button" onClick={() => remove(index)}>
              <BackspaceOutlinedIcon />
            </IconButton>
            <IconButton
              color="inherit"
              type="button"
              onClick={() => insert(index + 1, { name: "" })}
            >
              <PlaylistAddOutlinedIcon fontSize="large" />
              {index === 0 && (
                <Typography variant="caption"> [{t("registerProperty.actions.insert_a_table")}] </Typography>
              )}
            </IconButton>
          </Box>
        ))}
        <Button
          type="button"
          className={useClasses.addExtra}
          endIcon={<AddCircleOutlineIcon />}
          onClick={() => append({ name: "" })}
        >
          {t("registerProperty.actions.add_extra_table")}
        </Button>
        <MainActionButton disabled={fields.length === 0}>
          {t("registerProperty.actions.register")}
        </MainActionButton>
      </form>

      <Typography className={useClasses.error} color="error">
        {errorMessage} <br />{" "}
        {Boolean(errors.tables) && "Each field is required and has to be unique"}
      </Typography>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    line: {
      display: "flex",
      alignItems: "center",
      color: theme.palette.text.disabled,
    },
    tableName: {
      width: 145,
      "& div input": {
        textAlign: "center",
      },
    },
    addExtra: {
      color: theme.palette.text.hint,
      textTransform: "none",
      fontSize: 20,
      padding: 0,
      marginTop: 50,
    },

    error: {
      color: "#f44336",
      position: "fixed",
      right: "0",
      top: "300px",
      width: "28%",
    },
  })
);

export default customWithStyles(RegisterTables);
