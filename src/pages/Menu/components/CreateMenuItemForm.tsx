import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {
  Language,
  CreateMenuItemMutation,
  CreateMenuItemMutationVariables,
  MenuItemStatus,
} from "../../../API";
import { useTranslation } from "react-i18next";
import { Button, FormControl, Box, CircularProgress, Typography } from "@material-ui/core";
import { mutation } from "../../../utils/mutation";
import { createMenuItem } from "../../../graphql/mutations";
import { useTypedSelector } from "../../../store/types";
import { UNCATEGORIZED } from "../../../utils/_constants";

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
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [creating, setcreating] = React.useState<boolean>(false);
  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const inputsMadeReadyForSubmission: Inputs = {
      ...inputs,
      i18n: inputs.i18n.map((langObj) =>
        langObj.category
          ? langObj
          : {
              ...langObj,
              category: UNCATEGORIZED,
            }
      ),
    };
    setcreating(true);
    const { data, error } = await mutation<CreateMenuItemMutation, CreateMenuItemMutationVariables>(
      createMenuItem,
      {
        input: {
          ...inputsMadeReadyForSubmission,
          propertyName: name,
          status: MenuItemStatus["AVAILABLE"],
          favorite: false,
        },
      }
    );
    setcreating(false);
    if (error) {
      alert(JSON.stringify(error));
    }
    if (data?.createMenuItem) {
      onCreate(data);
    }
    reset();
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
        <Typography>{t("menu_page_your_translation_in")}</Typography>
        <Box className={classes.languagesBox}>
          {languages.map((language, index) => (
            <Box key={index} className={classes.root} style={{ paddingTop: 30 }}>
              <Typography>{language}</Typography>
              <TextField
                className={classes.textField}
                variant="outlined"
                value={language}
                name={`i18n[${index}].language`}
                inputRef={register}
                label={t("language")}
                style={{ display: "none" }}
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
                multiline={true}
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
            {t("save")}
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
