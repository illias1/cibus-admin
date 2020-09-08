import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Language } from "../../../API";
import AddMenuItemForm from "./CreateMenuItemForm";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { TcategorizedMenuItems } from "./utils";

type ICreateMenuItemFormWithLanguagesProps = {
  languages: Language[];
  setlanguages: React.Dispatch<React.SetStateAction<Language[]>>;
  categorizedMenuItems: TcategorizedMenuItems;
  setcategorizedMenuItems: React.Dispatch<React.SetStateAction<TcategorizedMenuItems>>;
};

const CreateMenuItemFormWithLanguages: React.FC<ICreateMenuItemFormWithLanguagesProps> = ({
  languages,
  setlanguages,
  categorizedMenuItems,
  setcategorizedMenuItems,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [showCreateForm, setshowCreateForm] = React.useState<boolean>(false);
  const [newLanguage, setnewLanguage] = React.useState<Language>(Language["en"]);

  return (
    <>
      <Typography>{t("menu_page_translated_languages")}</Typography>
      <Box className={classes.item}>
        {languages.map((item, index) => (
          <Chip key={index} label={item} />
        ))}
      </Box>
      <Box className={classes.item}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">
            {t("menu_page_new_translation")}
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            value={newLanguage}
            onChange={(e) => {
              if (!languages.includes(e.target.value as Language)) {
                setnewLanguage(e.target.value as Language);
              }
            }}
          >
            {Object.keys(Language).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton
          color="primary"
          onClick={() => {
            if (!languages.includes(newLanguage)) {
              setlanguages([...languages, newLanguage]);
            }
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      <Button
        variant="outlined"
        color={showCreateForm ? "secondary" : "primary"}
        onClick={() => setshowCreateForm(!showCreateForm)}
      >
        {showCreateForm ? t("menu_hide_the_form") : t("menu_create_new_item")}
      </Button>
      <Collapse in={showCreateForm}>
        <AddMenuItemForm
          onCreate={(data) => {
            //   an item always has a category, if it hasn't been provided at creation => it's "Uncategorized"
            const updatedCategorizedMenuItems = categorizedMenuItems
              ? categorizedMenuItems.map((item) =>
                  item.category === data.createMenuItem!.i18n[0]!.category
                    ? { ...item, items: [...item.items, data.createMenuItem] }
                    : item
                )
              : [
                  {
                    category: data.createMenuItem?.i18n[0].category,
                    items: [data.createMenuItem],
                  },
                ];
            // @ts-ignore
            setcategorizedMenuItems(updatedCategorizedMenuItems);
          }}
          languages={languages}
        />
      </Collapse>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    item: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      margin: theme.spacing(1),
    },
  })
);

export default CreateMenuItemFormWithLanguages;
