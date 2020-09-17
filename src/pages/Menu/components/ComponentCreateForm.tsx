import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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

// type TLanguageLabels ={
//   register: any;
//   control: any;
// }
// const LanguageLabels : React.FC<TLanguageLabels> = ({register, control}) => {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "labels",
//   });
//   return (
//     <>
//     {
//       fields.map((item) => (
//         <TextField
//         key={item.id}
//         className={classes.textField}
//         variant="outlined"
//         label={t("menu_form_explanation_in", { language: ISO6391.getName(lang) })}
//         placeholder={t("menu_form_component_label_placeholder")}
//         inputRef={register({ required: true })}
//         name={`labels[${langIndex}]`}
//         required
//         focused={item ? true : false}
//       />
//       ))
//     }
//     </>
//   )
// }

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
  labels: string[];
  options: TFormOption[];
};
type TFormOption = {
  addPrice: string | undefined;
  name: string[];
};

const ComponentCreateForm: React.FC<IAppProps> = ({ item, setaddEditState }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    selectedProperty,
    menu: { menuComponents, languages },
  } = useTypedSelector((state) => state);
  const [langs, setlangs] = React.useState<Language[]>([]);
  const [mappedLangs, setmappedLangs] = React.useState<Language[]>([]);
  const { control, handleSubmit, register, setValue, reset, errors, getValues } = useForm<
    TFormInputs
  >({
    defaultValues: {},
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
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
      setupExistingFields(setValue, item, langs, append);
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
    const inputReady = prepareFormFieldsToSubmission(formResult, mappedLangs);
    const newMenuComponents = [...menuComponents];
    if (item) {
      const itemIndexInMenuComp = menuComponents.findIndex((comp) => comp.id === item?.id);
      newMenuComponents.splice(itemIndexInMenuComp, 1, inputReady);
    } else {
      newMenuComponents.push(inputReady);
    }
    const { data, error } = await mutation<UpdatePropertyMutation, UpdatePropertyMutationVariables>(
      updatePropertyForMenuComponents,
      {
        input: {
          name: selectedProperty.name,
          menuComponents: newMenuComponents,
        },
      }
    );
    if (error) {
      console.warn("error", error);
    }
    if (data && data.updateProperty) {
      dispatch(setupMenuComponents(data.updateProperty.menuComponents));
      setaddEditState({
        open: false,
        item: undefined,
      });
    }
  };
  console.log(errors);

  return (
    <Box className={classes.layout}>
      <button onClick={() => console.log(getValues())}>get values</button>
      <MenuLanguagesManage langs={mappedLangs} setlangs={setmappedLangs} />

      {item && <DeleteButton onClick={handleDelete} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.block}>
          <FormControl variant="outlined" required className={classes.firstRow}>
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
          <TextField
            className={classes.firstRow}
            variant="outlined"
            label={t("menu_form_max")}
            type="number"
            inputRef={register({ min: 0 })}
            placeholder={t("menu_form_optional")}
            name="max"
            error={Boolean(errors.max)}
            helperText={Boolean(errors.max) && t("has_to_be_a_positive_integer_number")}
          />
          <TextField
            className={classes.firstRow}
            variant="outlined"
            label={t("menu_form_exact")}
            type="number"
            name="exact"
            inputRef={register({ min: 0 })}
            placeholder={t("menu_form_optional")}
            error={Boolean(errors.exact)}
            helperText={Boolean(errors.max) && t("has_to_be_a_positive_integer_number")}
          />
          <Box className={classes.multilang}>
            <Box style={{ flex: "0 0 auto" }}>
              <Box>
                {mappedLangs.map((lang, langIndex) => (
                  <React.Fragment key={lang}>
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      label={t("menu_form_explanation_in", { language: ISO6391.getName(lang) })}
                      placeholder={t("menu_form_component_label_placeholder")}
                      inputRef={register({ required: true })}
                      name={`labels[${langIndex}]`}
                      required
                      focused={item ? true : false}
                    />
                  </React.Fragment>
                ))}
              </Box>
              {fields.map(({ id, addPrice, name }, optionIndex) => (
                <Box key={id}>
                  <TextField
                    error={
                      Boolean(errors && errors?.options && errors.options[optionIndex]?.addPrice) ||
                      false
                    }
                    className={classes.textField}
                    variant="outlined"
                    name={`options[${optionIndex}].addPrice`}
                    inputRef={register()}
                    label={t("menu_form_extra_price")}
                    // @ts-ignore
                    helperText={t("menu_price_helper")}
                    defaultValue={addPrice}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {selectedProperty.currency}
                        </InputAdornment>
                      ),
                    }}
                    style={{ maxWidth: 200 }}
                  />
                  {mappedLangs.map((lang, langIndex) => (
                    <React.Fragment key={lang}>
                      <TextField
                        className={classes.textField}
                        variant="outlined"
                        name={`options[${optionIndex}].name[${langIndex}]`}
                        inputRef={register({ required: true })}
                        label={`option in ${ISO6391.getName(lang)}`}
                        defaultValue={name[langIndex]}
                        required
                      />
                    </React.Fragment>
                  ))}
                  <Button className={classes.deleteOption} onClick={() => remove(optionIndex)}>
                    {t("menu_form_delete_option")}
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() =>
              append({
                addPrice: 0,
                name: mappedLangs.map((item) => ""),
              })
            }
          >
            {t("menu_form_add_option")}
          </Button>
        </Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={classes.save}
          type="submit"
        >
          {t("save")}
        </Button>
      </form>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      maxWidth: 320,
    },
    firstRow: {
      margin: theme.spacing(1),
      display: "inline-flex",
      alignSelf: "center",
      width: "50%",
      [theme.breakpoints.down("xs")]: {
        width: "90%",
      },
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    textField: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 320,
    },
    block: {
      display: "flex",
      flexDirection: "column",
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
      display: "block",
      margin: "30px auto",
    },
    deleteOption: {
      padding: 14,
      margin: 8,
      color: theme.palette.error.light,
    },
  })
);

export default ComponentCreateForm;
