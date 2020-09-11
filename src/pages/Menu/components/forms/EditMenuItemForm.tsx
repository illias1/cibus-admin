import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {
  Language,
  GetMenuItemQuery,
  UpdateMenuItemMutation,
  UpdateMenuItemMutationVariables,
} from "../../../../API";
import { useTranslation } from "react-i18next";
import { Button, FormControl, Box, CircularProgress, Typography } from "@material-ui/core";
import { mutation } from "../../../../utils/mutation";
import { updateMenuItem } from "../../../../graphql/mutations";
import { UNCATEGORIZED } from "../../../../utils/_constants";
import ISO6391 from "iso-639-1";
import { TStore } from "../../../../store/types";

type IEditMenuItemFormProps = {
  languages: Language[];
  onEdit: (data: UpdateMenuItemMutation) => void;
  menuItem: TStore["menu"]["categorizedItems"][string][string];
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

const AddMenuItemForm: React.FC<IEditMenuItemFormProps> = ({ languages, onEdit, menuItem }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<Inputs>();
  const [creating, setcreating] = React.useState<boolean>(false);
  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const inputsMadeReadyForSubmission: Inputs = {
      ...inputs,
      price: Number(inputs.price),
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
    const { data, error } = await mutation<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>(
      updateMenuItem,
      {
        input: {
          ...inputsMadeReadyForSubmission,
          id: menuItem!.id,
        },
      }
    );
    setcreating(false);
    if (error) {
      console.log(error);
    }
    if (data?.updateMenuItem) {
      onEdit(data);
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
          defaultValue={menuItem?.notes}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label={t("menu_form_price")}
          type="number"
          name="price"
          inputRef={register({ required: true })}
          required={true}
          defaultValue={menuItem?.price}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label={t("menu_form_callories")}
          name="callories"
          inputRef={register}
          defaultValue={menuItem?.callories}
        />
        <Typography>{t("menu_page_your_translation_in")}</Typography>
        <Box className={classes.languagesBox}>
          {languages.map((language, index) => (
            <Box key={language} className={classes.root} style={{ paddingTop: 30 }}>
              <Typography>{ISO6391.getName(language)}</Typography>
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
                defaultValue={menuItem?.i18n[0].name}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label={t("menu_form_description")}
                name={`i18n[${index}].description`}
                multiline={true}
                inputRef={register}
                defaultValue={menuItem?.i18n[0].description}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label={t("menu_form_category")}
                name={`i18n[${index}].category`}
                inputRef={register}
                defaultValue={menuItem?.i18n[0].category}
              />
            </Box>
          ))}
        </Box>
        {languages.length > 0 ? (
          creating ? (
            <CircularProgress color="secondary" />
          ) : (
            <Box>
              <Button color="primary" variant="contained" type="submit">
                {t("save")}
              </Button>
              <Button color="inherit" variant="outlined">
                {t("cancel")}
              </Button>
            </Box>
          )
        ) : (
          <Typography>{t("menu_feedback_need_select_at_least_one_language")}</Typography>
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
