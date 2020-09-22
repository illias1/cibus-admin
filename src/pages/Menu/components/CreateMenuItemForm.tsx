import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {
  Language,
  CreateMenuItemMutation,
  CreateMenuItemMutationVariables,
  DeleteMenuItemMutation,
  DeleteMenuItemMutationVariables,
  UpdateMenuItemMutation,
} from "../../../API";
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
import { mutation } from "../../../utils/mutation";
import { createMenuItem, deleteMenuItem, updateMenuItem } from "../../../graphql/mutations";
import { useTypedSelector } from "../../../store/types";
import { UNCATEGORIZED } from "../../../utils/_constants";
import ISO6391 from "iso-639-1";
// icons
import { useDispatch } from "react-redux";
import { TAppSyncError, TNonNullMenuItem } from "../../../types";
import { setDeleteMenuItem, setAddNewMenuItem, setUpdateMenuItem } from "../../../store/actions";
import { prepareInputsForUpdateMutation, prepareInputsForCreateMutation } from "./utils";
import { v4 as uuid } from "uuid";
import { Storage } from "aws-amplify";

type IaddMenuItemFormProps = {
  languages: Language[];
  setopenDrawer: React.Dispatch<
    React.SetStateAction<{ open: boolean; item: TNonNullMenuItem | null }>
  >;
  openDrawer: { open: boolean; item: TNonNullMenuItem | null };
};

export type Inputs = {
  callories: string;
  notes: string;
  price: number;
  i18n: {
    category: string;
    description: string;
    language: Language;
    name: string;
  }[];
  addComponents: boolean[] | undefined;
};

const AddMenuItemForm: React.FC<IaddMenuItemFormProps> = ({
  languages,
  setopenDrawer,
  openDrawer,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { name, currency } = useTypedSelector((state) => state.selectedProperty);
  const { menuComponents } = useTypedSelector((state) => state.menu);
  const dispatch = useDispatch();
  const { item } = openDrawer;
  // const { item } = useTypedSelector((state) => state.menu.edit);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [creating, setcreating] = React.useState<boolean>(false);
  const [deleteOn, setdeleteOn] = React.useState<boolean>(false);
  const [showComponents, setshowComponents] = React.useState<boolean>(false);
  const [errorMessage, seterrorMessage] = React.useState<string>("");
  const handleDelete = async (id: string, category: string) => {
    if (deleteOn) {
      const { error, data } = await mutation<
        DeleteMenuItemMutation,
        DeleteMenuItemMutationVariables
      >(deleteMenuItem, {
        input: {
          id,
        },
      });
      if (error) {
        console.log("dlete unsuccessful");
      }
      if (data) {
        dispatch(
          setDeleteMenuItem({
            category: item!.i18n[0].category || UNCATEGORIZED,
            id: item!.id,
          })
        );
        setopenDrawer({
          open: false,
          item: null,
        });
      }
    } else {
      setdeleteOn(true);
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    let imageKey;
    if (photo.selected) {
      try {
        imageKey = await Storage.put(`${name}/${uuid()}`, photo.image);
      } catch (error) {
        seterrorMessage("error uploading image");
        return;
      }
    }
    const inputsMadeReadyForSubmission = item
      ? prepareInputsForUpdateMutation(
          inputs,
          item.id,
          menuComponents,
          imageKey ? (imageKey as { key: string }).key : ""
        )
      : prepareInputsForCreateMutation(
          inputs,
          name,
          menuComponents,
          imageKey ? (imageKey as { key: string }).key : ""
        );
    setcreating(true);
    const { data, error } = await mutation<CreateMenuItemMutation, CreateMenuItemMutationVariables>(
      item ? updateMenuItem : createMenuItem,
      {
        input: inputsMadeReadyForSubmission as CreateMenuItemMutationVariables["input"],
      }
    );
    setcreating(false);
    if (error) {
      console.warn(JSON.stringify(error));
      if (error) {
        seterrorMessage((error as TAppSyncError).errors[0].message);
      }
    } else {
      reset();
      const result = item
        ? ((data as unknown) as UpdateMenuItemMutation).updateMenuItem
        : data?.createMenuItem;
      if (item === null && result) {
        dispatch(setAddNewMenuItem(result));
        setopenDrawer({
          open: false,
          item: null,
        });
      }
      if (item !== null && result) {
        dispatch(
          setUpdateMenuItem({
            data: result,
            previousItemData: {
              category: item.i18n[0].category || UNCATEGORIZED,
              id: item.id,
            },
          })
        );
        setopenDrawer({
          open: false,
          item: null,
        });
      }
    }
  };
  const [photo, setphoto] = React.useState<{
    selected: boolean;
    image: File | null | undefined;
  }>({
    selected: false,
    image: null,
  });
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
                defaultValue={
                  item ? item.i18n.find((transl) => transl.language === language)?.name : ""
                }
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label={t("menu_form_description")}
                name={`i18n[${index}].description`}
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
                name={`i18n[${index}].category`}
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
          {t("menu_upload_photo")}
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