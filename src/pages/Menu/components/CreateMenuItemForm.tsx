import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { SubmitHandler } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Language, MenuComponentInput } from "../../../API";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormControl,
  Box,
  CircularProgress,
  Typography,
  ClickAwayListener,
  InputAdornment,
  Collapse,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { UNCATEGORIZED } from "../../../utils/_constants";
import ISO6391 from "iso-639-1";
import { TNonNullMenuItem } from "../../../types";

type IaddMenuItemFormProps = {
  languages: Language[];
  setopenDrawer: React.Dispatch<
    React.SetStateAction<{ open: boolean; item: TNonNullMenuItem | null }>
  >;
  handleSubmit: any;
  register: any;
  deleteOn: boolean;
  handleDelete: (id: string, category: string) => Promise<void>;
  onSubmit: SubmitHandler<Inputs>;
  setdeleteOn: React.Dispatch<React.SetStateAction<boolean>>;
  item: TNonNullMenuItem | null;
  currency: string;
  setshowComponents: React.Dispatch<React.SetStateAction<boolean>>;
  showComponents: boolean;
  menuComponents: MenuComponentInput[];
  errorMessage: string;
  creating: boolean;
  setphoto: React.Dispatch<
    React.SetStateAction<{
      selected: boolean;
      image: File | null | undefined;
    }>
  >;
};

export type Inputs = {
  callories: string;
  notes: string;
  price: number;
  i18n: Record<
    Language,
    {
      category: string;
      description: string;
      name: string;
    }
  >;
  addComponents: boolean[] | undefined;
};

const AddMenuItemForm: React.FC<IaddMenuItemFormProps> = ({
  languages,
  setopenDrawer,
  handleDelete,
  handleSubmit,
  register,
  deleteOn,
  onSubmit,
  setdeleteOn,
  item,
  currency,
  setphoto,
  setshowComponents,
  showComponents,
  menuComponents,
  errorMessage,
  creating,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <FormControl>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <Box>
          <ClickAwayListener onClickAway={() => setdeleteOn(false)}>
            <Button
              onClick={() => handleDelete(item!.id, item!.i18n[0].category || UNCATEGORIZED)}
              variant={deleteOn ? "contained" : "outlined"}
              className={classes.delete}
            >
              {deleteOn ? t("confirm") : t("delete")}
            </Button>
          </ClickAwayListener>
        </Box>

        <TextField
          className={classes.textField}
          variant="outlined"
          label={t("menu_form_notes")}
          name="notes"
          inputRef={register}
          defaultValue={item && item.notes ? item.notes : ""}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label={t("menu_form_price")}
          name="price"
          inputRef={register({ required: true })}
          InputProps={{
            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
          }}
          required={true}
          defaultValue={item ? item.price : ""}
          helperText={t("menu_price_helper")}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label={t("menu_form_callories")}
          name="callories"
          inputRef={register}
          defaultValue={item && item.callories ? item.callories : ""}
        />
        <input
          onChange={async (e) => {
            // if (e.target.files && e.target.files.item(0)) {
            setphoto({
              selected: true,
              image: e.target.files?.item(0),
            });
            // }
          }}
          accept="image/*"
          id="uploadPhotoMenuItem"
          style={{ display: "none" }}
          type="file"
        />
        <Typography>{t("menu_page_your_translation_in")}</Typography>
        <Box className={classes.languagesBox}>
          {languages.map((language, index) => (
            <Box key={language} className={classes.root} style={{ paddingTop: 30 }}>
              <Typography>{ISO6391.getName(language)}</Typography>
              <TextField
                className={classes.textField}
                variant="outlined"
                label={t("menu_form_name")}
                name={`i18n.${language}.name`}
                inputRef={register({ required: true })}
                required={true}
                defaultValue={
                  item ? item.i18n.find((transl) => transl.language === language)?.name : ""
                }
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label={t("menu_form_description")}
                name={`i18n.${language}.description`}
                multiline={true}
                inputRef={register}
                defaultValue={
                  item ? item.i18n.find((transl) => transl.language === language)?.description : ""
                }
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label={t("menu_form_category")}
                helperText={t("menu_category_helper")}
                name={`i18n.${language}.category`}
                inputRef={register}
                defaultValue={
                  item ? item.i18n.find((transl) => transl.language === language)?.category : ""
                }
              />
            </Box>
          ))}
        </Box>
        <Button
          variant="outlined"
          onClick={() => document.getElementById("uploadPhotoMenuItem")?.click()}
        >
          {item?.image ? t("menu_upload_new_photo") : t("menu_upload_photo")}
        </Button>
        <Typography>{t("explication_components_in_create_menu_item")}</Typography>
        <Button onClick={() => setshowComponents(!showComponents)}>
          {showComponents ? t("menu_form_hide_components") : t("menu_form_show_components")}
        </Button>
        <Collapse in={showComponents}>
          <FormGroup>
            {menuComponents
              ? menuComponents.map((component, index) => (
                  <FormControlLabel
                    key={component.id}
                    control={
                      <Checkbox
                        color="primary"
                        inputRef={register}
                        name={`addComponents[${index}]`}
                        defaultChecked={
                          item && item.addComponents && item.addComponents.includes(component.id)
                            ? true
                            : false
                        }
                      />
                    }
                    label={component.translations[0].label}
                  />
                ))
              : t("menu_form_no_components_yet")}
          </FormGroup>
        </Collapse>
        {errorMessage.length > 0 && <Typography color="error">{errorMessage}</Typography>}
        {languages.length > 0 ? (
          creating ? (
            <CircularProgress color="secondary" />
          ) : (
            <Button className={classes.save} color="primary" variant="contained" type="submit">
              {t("save")}
            </Button>
          )
        ) : (
          <Typography>{t("menu_feedback_need_select_at_least_one_language")}</Typography>
        )}
      </form>
      <Button onClick={() => setopenDrawer((prev) => ({ ...prev, open: false, item: null }))}>
        Cancel
      </Button>
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
    delete: {
      color: theme.palette.error.main,
    },
    save: {
      marginTop: 20,
      marginBottom: 10,
    },
  })
);

export default AddMenuItemForm;
