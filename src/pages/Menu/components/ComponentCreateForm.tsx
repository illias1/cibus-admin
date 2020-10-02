import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import {
  Language,
  MenuComponentInput,
  MenuCompType,
  UpdatePropertyMutation,
  UpdatePropertyMutationVariables,
} from "../../../API";
import { mutation } from "../../../utils/mutation";
import { useTypedSelector } from "../../../store/types";
import { useDispatch } from "react-redux";
import { setupMenuComponents } from "../../../store/actions";
import { useTranslation } from "react-i18next";
import ISO6391 from "iso-639-1";
import DeleteButton from "../../../components/DeleteButton";
import {
  prepareFormFieldsToSubmission,
  setupExistingFields,
  updatePropertyForMenuComponents,
} from "./utils";
import { TAddEditState } from "./ComponentCreateFormWithLanguages";
import { TMutationError } from "../../../types";
import MenuLanguagesManage from "./MenuLanguagesManage";
import { CustomTheme } from "../../../utils/theme";
// icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

export const ititialMenuComponentInput: MenuComponentInput = {
  id: "",
  type: MenuCompType.CHECKBOX,
  restrictions: {
    max: undefined,
  },
  translations: [],
};
type IAppProps = {
  item: MenuComponentInput | undefined;
  setaddEditState: React.Dispatch<React.SetStateAction<TAddEditState>>;
};
export type TFormInputs = {
  type: MenuCompType;
  max: number | undefined;
  exact: number | undefined;
  labels: Record<Language, string>;
  options: TFormOption[];
};
type TFormOption = {
  addPrice: string | undefined;
  name: Record<Language, string>;
};

const ComponentCreateForm: React.FC<IAppProps> = ({ item, setaddEditState }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    selectedProperty,
    menu: { menuComponents, languages },
  } = useTypedSelector((state) => state);
  // needed to set up existing fields only once in the begnning
  const [langs, setlangs] = React.useState<Language[]>([]);
  // needed to actually draw the fields and dynamically change langugegs
  const [mappedLangs, setmappedLangs] = React.useState<Language[]>([]);
  const { control, handleSubmit, register, setValue, reset, errors, watch } = useForm<TFormInputs>({
    defaultValues: {},
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const typeSelected = watch("type");

  React.useEffect(() => {
    if (item) {
      const itemLangs = item.translations.map((trnasl) => trnasl.language);
      setlangs(itemLangs);
      setmappedLangs(itemLangs);
    } else {
      setlangs(languages);
      setmappedLangs(languages);
    }
    return () => {
      reset();
    };
  }, [item, languages]);
  React.useEffect(() => {
    if (item) {
      setupExistingFields(setValue, item, append);
    } else {
      if (fields.length === 0) {
        append({
          addPrice: 0,
          name: [],
        });
      }
    }
  }, [langs]);

  const handleDelete = async () => {
    const { data, error } = await mutation<UpdatePropertyMutation, UpdatePropertyMutationVariables>(
      updatePropertyForMenuComponents,
      {
        input: {
          name: selectedProperty.name,
          menuComponents: menuComponents.filter((comp) => comp.id !== item?.id),
        },
      }
    );
    if (data && data.updateProperty) {
      dispatch(
        setupMenuComponents(
          data?.updateProperty?.menuComponents ||
            (error as TMutationError).data.updateProperty.menuComponents
        )
      );
      setaddEditState({ open: false, item: undefined });
    }
    if (error) {
      console.error(error);
    }
  };
  const onSubmit: SubmitHandler<TFormInputs> = async (formResult) => {
    console.log("from resut", formResult);
    if (formResult.labels && formResult.options) {
      const inputReady = prepareFormFieldsToSubmission(formResult, item);
      console.log("input ready", inputReady);
      const newMenuComponents = [...menuComponents];
      if (item) {
        const itemIndexInMenuComp = menuComponents.findIndex((comp) => comp.id === item?.id);
        newMenuComponents.splice(itemIndexInMenuComp, 1, inputReady);
      } else {
        newMenuComponents.push(inputReady);
      }
      const { data, error } = await mutation<
        UpdatePropertyMutation,
        UpdatePropertyMutationVariables
      >(updatePropertyForMenuComponents, {
        input: {
          name: selectedProperty.name,
          menuComponents: newMenuComponents,
        },
      });
      if (error) {
        alert(JSON.stringify(error));
      }
      if (data && data.updateProperty) {
        dispatch(setupMenuComponents(data.updateProperty.menuComponents));
        reset();
        setlangs([]);
        setaddEditState({
          open: false,
          item: undefined,
        });
      }
    }
  };

  // ============================================================================================================================================
  // ============================================================================================================================================
  // ============================================================================================================================================
  // UI

  return (
    <Box className={classes.layout}>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Typography style={{ marginLeft: 8 }} className={classes.label}>
          {t("components.labels.component_type")}
        </Typography>
        <Box style={{ position: "relative" }}>
          <FormControl
            variant="outlined"
            required
            className={`${classes.customized} ${classes.firstRow}`}
          >
            <InputLabel id="demo-simple-select-label">type</InputLabel>
            <Controller
              as={
                <Select labelId="demo-simple-select-label">
                  <MenuItem value={"CHECKBOX"}>{t("menu_form_option")}</MenuItem>
                  <MenuItem value={"RADIO"}>{t("menu_form_mandatory_choice")}</MenuItem>
                </Select>
              }
              control={control}
              name="type"
              defaultValue="CHECKBOX"
            />
          </FormControl>
          {typeSelected && typeSelected === MenuCompType.CHECKBOX && (
            <>
              <TextField
                className={`${classes.customized} ${classes.firstRow}`}
                variant="outlined"
                label={t("menu_form_max")}
                type="number"
                inputRef={register({ min: 0 })}
                placeholder={t("menu_form_optional")}
                defaultValue={item?.restrictions?.max || undefined}
                name="max"
                error={Boolean(errors.max)}
                helperText={Boolean(errors.max) && t("has_to_be_a_positive_integer_number")}
              />
              <TextField
                className={`${classes.customized} ${classes.firstRow}`}
                variant="outlined"
                label={t("menu_form_exact")}
                type="number"
                name="exact"
                inputRef={register({ min: 0 })}
                placeholder={t("menu_form_optional")}
                defaultValue={item?.restrictions?.exact || undefined}
                error={Boolean(errors.exact)}
                helperText={Boolean(errors.max) && t("has_to_be_a_positive_integer_number")}
              />
            </>
          )}
          <MenuLanguagesManage
            controlClassname={classes.customized}
            labelClassname={classes.label}
            langs={mappedLangs}
            setlangs={setmappedLangs}
          />
        </Box>
        <Box className={classes.multilang}>
          <Box style={{ flex: "0 0 auto" }}>
            <Box style={{ display: "flex" }}>
              <Box style={{ marginRight: 200 }} className={classes.titleIconInline}>
                <Typography className={classes.label}>{t("title_component_details")}</Typography>
                <IconButton
                  color="inherit"
                  onClick={() =>
                    append({
                      addPrice: 0,
                      name: mappedLangs.map((item) => ""),
                    })
                  }
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
              {mappedLangs.slice(1).map((lang) => (
                <Box key={lang} className={classes.titleIconInline}>
                  <Typography className={classes.label}>
                    {t("components.labels.details_in_language", {
                      language: ISO6391.getName(lang),
                    })}
                  </Typography>
                  <IconButton
                    color="inherit"
                    onClick={() =>
                      setmappedLangs(mappedLangs.filter((language) => language !== lang))
                    }
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Box>
              {mappedLangs.map((lang, langIndex) => (
                <React.Fragment key={lang}>
                  <TextField
                    style={langIndex === 0 ? { marginRight: 200 } : {}}
                    className={`${classes.customized} ${classes.textField}`}
                    variant="outlined"
                    label={t("components.labels.name")}
                    placeholder={t("menu_form_component_label_placeholder")}
                    inputRef={register({ required: true })}
                    name={`labels.${lang}`}
                    required
                    focused={item ? true : false}
                  />
                </React.Fragment>
              ))}
            </Box>
            {fields.map(({ id, addPrice, name }, optionIndex) => (
              <Box key={id}>
                <TextField
                  className={`${classes.customized} ${classes.textField}`}
                  variant="outlined"
                  name={`options[${optionIndex}].name.${mappedLangs[0]}`}
                  inputRef={register({ required: true })}
                  label={t("components.labels.option")}
                  defaultValue={name[mappedLangs[0]]}
                  required
                />
                <TextField
                  error={
                    Boolean(errors && errors?.options && errors.options[optionIndex]?.addPrice) ||
                    false
                  }
                  variant="outlined"
                  className={`${classes.customized} ${classes.price}`}
                  name={`options[${optionIndex}].addPrice`}
                  inputRef={register()}
                  label={t("menu_form_extra_price")}
                  defaultValue={addPrice}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment disableTypography position="start">
                        {selectedProperty.currency}
                      </InputAdornment>
                    ),
                  }}
                  style={{ maxWidth: 200 }}
                />
                <IconButton
                  color="inherit"
                  style={{ marginTop: 12, paddingLeft: 5 }}
                  onClick={() => {
                    if (fields.length > 1) {
                      remove(optionIndex);
                    }
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                {mappedLangs.slice(1).map((lang, langIndex) => (
                  <React.Fragment key={lang}>
                    <TextField
                      className={`${classes.customized} ${classes.textField}`}
                      variant="outlined"
                      name={`options[${optionIndex}].name.${lang}`}
                      inputRef={register({ required: true })}
                      label={t("components.labels.option")}
                      defaultValue={name[lang]}
                      required
                    />
                  </React.Fragment>
                ))}
              </Box>
            ))}
            <Box className={classes.titleIconInline}>
              <Box className={classes.textField} />
              <Typography variant="caption">{t("menu_price_helper")}</Typography>
            </Box>
          </Box>
        </Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={`${classes.absoluteRight} ${classes.save}`}
          type="submit"
          disabled={fields.length === 0 || mappedLangs.length === 0}
        >
          {t("save")}
        </Button>
        {item && (
          <DeleteButton
            classname={`${classes.absoluteRight} ${classes.delete}`}
            onClick={handleDelete}
          />
        )}
      </form>
      <Typography color="error">
        {fields.length === 0 && t("errors.components.set_option")}
        <br />
        {mappedLangs.length === 0 && t("errors.components.set_language")}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: CustomTheme) =>
  createStyles({
    firstRow: {
      margin: theme.spacing(1),
      // display: "inline-flex",
      width: "50%",
      [theme.breakpoints.down("xs")]: {
        width: "90%",
      },
    },
    customized: {
      "& div": {
        background: "#EFF4F8",
        color: theme.palette.primaryBlack,
        borderRadius: 5,
      },
      "& label": {
        color: theme.palette.primaryBlack,
      },
      "& label.MuiInputLabel-shrink": {
        color: theme.palette.primaryBlack,
        padding: "3px 5px",
        background: "#EFF4F8",
        borderRadius: 8,
      },
    },
    // when changing here - change as well titleIconInline
    textField: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 320,
    },
    price: {
      marginTop: theme.spacing(1),
      width: 150,
    },
    multilang: {
      display: "flex",
      flexWrap: "nowrap",
      overflow: "auto",
    },
    layout: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    save: {
      textTransform: "none",
      background: theme.palette.primaryBlack,
      color: "white",
      marginTop: 40,
    },
    absoluteRight: {
      position: "absolute",
      right: 10,
    },
    delete: {
      marginTop: 100,
      marginBottom: 40,
      textTransform: "none",
    },
    titleIconInline: {
      display: "flex",
      alignItems: "center",
      // has to be the same as textfield
      marginLeft: theme.spacing(1),
      minWidth: 208,
      maxWidth: 320,
    },
    label: {
      fontSize: 17,
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

export default ComponentCreateForm;
