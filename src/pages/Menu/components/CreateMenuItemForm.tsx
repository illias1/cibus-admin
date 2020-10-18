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
  InputAdornment,
  Collapse,
  FormGroup,
  FormControlLabel,
  Checkbox,
  WithStyles,
  IconButton,
} from "@material-ui/core";
import { UNCATEGORIZED } from "../../../utils/_constants";
import ISO6391 from "iso-639-1";
import { TNonNullMenuItem } from "../../../types";
import Title from "../../../components/Title";
import DeleteButton from "../../../components/DeleteButton";
import MenuLanguageManage from "./MenuLanguagesManage";
import SectionTitle from "./SectionTitle";
import { customStyles, customWithStyles } from "../../../utils/theme";
import SmallActionButton from "../../../components/SmallActionButton";
import { TUploadPicture } from "./CreateMenuItemFormWithLanguages";
// icons
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
interface IaddMenuItemFormProps extends WithStyles<typeof customStyles> {
  languages: Language[];
  setlangs: React.Dispatch<React.SetStateAction<Language[]>>;
  setopenDrawer: React.Dispatch<
    React.SetStateAction<{ open: boolean; item: TNonNullMenuItem | null }>
  >;
  handleSubmit: any;
  register: any;
  handleDelete: (id: string, category: string) => Promise<void>;
  onSubmit: SubmitHandler<Inputs>;
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
  picture: TUploadPicture;
}

export type Inputs = {
  // callories: string;
  // notes: string;
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
  setlangs,
  setopenDrawer,
  handleDelete,
  handleSubmit,
  register,
  onSubmit,
  item,
  currency,
  setphoto,
  setshowComponents,
  showComponents,
  menuComponents,
  errorMessage,
  creating,
  picture,
  classes,
}) => {
  const useClasses = useStyles();
  const { t } = useTranslation();
  const cancelCloseDrawer = () => setopenDrawer((prev) => ({ ...prev, open: false, item: null }));
  return (
    <FormControl className={useClasses.root}>
      <CancelButton onClick={cancelCloseDrawer}>{t("cancel")}</CancelButton>

      <Title title={t("menu.item_form.title")} subtitle={t("menu.item_form.subtitle")} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <TextField
          className={`${classes.customizedTextFieldPaper} ${useClasses.textField}`}
          variant="outlined"
          label={t("menu_form_notes")}
          name="notes"
          inputRef={register}
          defaultValue={item && item.notes ? item.notes : ""}
        /> */}
        {/* <TextField
            className={`${classes.customizedTextFieldPaper} ${useClasses.textField}`}
            variant="outlined"
            label={t("menu_form_callories")}
            name="callories"
            inputRef={register}
            defaultValue={item && item.callories ? item.callories : ""}
          /> */}
        <SectionTitle title={t("menu.item_form.section_titles.price")} />
        <TextField
          className={`${classes.customizedTextFieldPaper} ${useClasses.textField}`}
          variant="outlined"
          label={t("menu_form_price")}
          name="price"
          inputRef={register({ required: true })}
          InputProps={{
            startAdornment: (
              <InputAdornment disableTypography position="start">
                {currency}
              </InputAdornment>
            ),
          }}
          required={true}
          defaultValue={item ? item.price : ""}
          helperText={t("menu_price_helper")}
        />
        <SectionTitle
          title={t("menu.item_form.section_titles.item_components")}
          explanation={t("menu.item_form.explanations.item_components")}
        />
        <Button
          style={{ textTransform: "none", marginTop: 20 }}
          endIcon={showComponents ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setshowComponents(!showComponents)}
          variant="contained"
        >
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
        <SectionTitle title={t("label_translation")} />
        <MenuLanguageManage
          rootStyle={{ position: "relative" }}
          langs={languages}
          setlangs={setlangs}
          labelClassname={useClasses.none}
          controlClassname={`${classes.customizedTextFieldPaper} ${useClasses.textField}`}
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
        <SectionTitle
          explanation={t("menu.item_form.explanations.details_explanation")}
          title={t("menu.item_form.section_titles.details")}
        />
        <Box className={useClasses.upload}>
          <SmallActionButton
            onClick={() => document.getElementById("uploadPhotoMenuItem")?.click()}
          >
            {item?.image ? t("menu_upload_new_photo") : t("menu_upload_photo")}
          </SmallActionButton>

          <Typography style={{ marginLeft: 20 }}>{picture.image?.name || item?.image}</Typography>
        </Box>
        <Box className={useClasses.languagesBox}>
          <Box style={{ flex: "0 0 auto" }}>
            {languages.length === 0 && (
              <Typography color="error">
                {t("menu_feedback_need_select_at_least_one_language")}
              </Typography>
            )}
            {languages.map((language, index) => (
              <React.Fragment key={language}>
                <Typography>
                  {t("components.labels.details_in_language", {
                    language: ISO6391.getName(language),
                  })}
                </Typography>
                <Box display="flex">
                  <TextField
                    className={`${classes.customizedTextFieldPaper} ${useClasses.textField}`}
                    variant="outlined"
                    label={t("menu.item_form.labels.name")}
                    name={`i18n.${language}.name`}
                    inputRef={register({ required: true })}
                    required={true}
                    defaultValue={
                      item ? item.i18n.find((transl) => transl.language === language)?.name : ""
                    }
                  />
                  <TextField
                    className={`${classes.customizedTextFieldPaper} ${useClasses.textField}`}
                    variant="outlined"
                    label={t("menu.item_form.labels.category")}
                    // helperText={t("menu_category_helper")}
                    name={`i18n.${language}.category`}
                    inputRef={register}
                    defaultValue={
                      item ? item.i18n.find((transl) => transl.language === language)?.category : ""
                    }
                  />
                  <TextField
                    style={{ minWidth: 350 }}
                    className={`${classes.customizedTextFieldPaper} ${useClasses.textField}`}
                    variant="outlined"
                    label={t("menu.item_form.labels.description")}
                    placeholder={t("menu.item_form.placeholders.description")}
                    name={`i18n.${language}.description`}
                    multiline={true}
                    inputRef={register}
                    defaultValue={
                      item
                        ? item.i18n.find((transl) => transl.language === language)?.description
                        : ""
                    }
                  />
                  <IconButton
                    color="inherit"
                    onClick={() =>
                      setlangs(languages.slice(0, index).concat(languages.slice(index + 1)))
                    }
                  >
                    <BackspaceOutlinedIcon />
                  </IconButton>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </Box>

        {errorMessage.length > 0 && <Typography color="error">{errorMessage}</Typography>}
        {item ? (
          <DeleteButton
            classname={useClasses.delete}
            onClick={() => handleDelete(item!.id, item!.i18n[0].category || UNCATEGORIZED)}
          >
            {t("delete")}
          </DeleteButton>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            className={useClasses.delete}
            onClick={cancelCloseDrawer}
          >
            Cancel
          </Button>
        )}
        {creating ? (
          <CircularProgress color="secondary" />
        ) : (
          <SaveButton disabled={languages.length === 0}>{t("save")}</SaveButton>
        )}
      </form>
    </FormControl>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 30,
    },
    languagesBox: {
      display: "flex",
      flexWrap: "wrap",
      overflow: "auto",
    },
    textField: {
      margin: theme.spacing(1),
      marginLeft: 0,
      minWidth: 250,
    },
    delete: {
      position: "absolute",
      right: 10,
      marginTop: 100,
      marginBottom: 40,
      textTransform: "none",
    },
    none: {
      display: "none",
    },
    upload: {
      display: "flex",
      marginTop: 20,
      marginBottom: 20,
    },
  })
);

export default customWithStyles(AddMenuItemForm);
