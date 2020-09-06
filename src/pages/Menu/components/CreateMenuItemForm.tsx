import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {
  Language,
  CreateMenuItemMutation,
  CreateMenuItemMutationVariables,
  MenuItemStatus,
} from "../../../API";
import { useTranslation } from "react-i18next";
import { Button, FormControl, Box, CircularProgress } from "@material-ui/core";
import { mutation } from "../../../utils/mutation";
import { createMenuItem } from "../../../graphql/mutations";
import { useTypedSelector } from "../../../store/types";

type IaddMenuItemFormProps = {
  languages: Language[];
  onCreate: (data: CreateMenuItemMutation) => void;
};

type Inputs = {
  callories: string;
  notes: string;
  price: number;
  i18n: {
    category: string;
    description: string;
    language: Language;
    name: string;
  }[];
};

const AddMenuItemForm: React.FC<IaddMenuItemFormProps> = ({ languages, onCreate }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { name } = useTypedSelector((state) => state.selectedProperty);
  const { register, handleSubmit } = useForm<Inputs>();
  const [creating, setcreating] = React.useState<boolean>(false);
  const onSubmit = async (inputs: Inputs) => {
    setcreating(true);
    const { data, error } = await mutation<CreateMenuItemMutation, CreateMenuItemMutationVariables>(
      createMenuItem,
      {
        input: {
          ...inputs,
          propertyName: name,
          status: MenuItemStatus["AVAILABLE"],
        },
      }
    );
    setcreating(false);
    if (error) {
      alert(JSON.stringify(error));
    }
    if (data) {
      onCreate(data);
    }
  };

  return (
    <FormControl>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <TextField
          className={classes.textField}
          variant="outlined"
          label={t("menu_form_notes")}
          name="notes"
          inputRef={register}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label={t("menu_form_price")}
          type="number"
          name="price"
          inputRef={register({ required: true })}
          required={true}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label={t("menu_form_callories")}
          name="callories"
          inputRef={register}
        />
        <Box className={classes.languagesBox}>
          {languages.map((language, index) => (
            <Box className={classes.root} style={{ paddingTop: 30 }}>
              <TextField
                className={classes.textField}
                variant="outlined"
                value={language}
                name={`i18n[${index}].language`}
                inputRef={register}
                label={t("language")}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label={t("menu_form_name")}
                name={`i18n[${index}].name`}
                inputRef={register({ required: true })}
                required={true}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label={t("menu_form_description")}
                name={`i18n[${index}].description`}
                inputRef={register}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label={t("menu_form_category")}
                name={`i18n[${index}].category`}
                inputRef={register}
              />
            </Box>
          ))}
        </Box>
        {creating ? (
          <CircularProgress color="secondary" />
        ) : (
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        )}
      </form>
    </FormControl>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    languagesBox: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    textField: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
  })
);

export default AddMenuItemForm;
