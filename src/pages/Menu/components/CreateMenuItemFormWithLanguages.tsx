import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Language } from "../../../API";
import AddMenuItemForm from "./CreateMenuItemForm";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ISO6391 from "iso-639-1";

import { useTypedSelector } from "../../../store/types";
import { TNonNullMenuItem } from "../../../types";

type ICreateMenuItemFormWithlangsProps = {
  setopenDrawer: React.Dispatch<
    React.SetStateAction<{ open: boolean; item: TNonNullMenuItem | null }>
  >;
  openDrawer: { open: boolean; item: TNonNullMenuItem | null };
};

const CreateMenuItemFormWithlangs: React.FC<ICreateMenuItemFormWithlangsProps> = ({
  setopenDrawer,
  openDrawer,
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { languages } = useTypedSelector((state) => state.menu);
  const [newLanguage, setnewLanguage] = React.useState<Language>(i18n.language as Language);
  const [langs, setlangs] = React.useState<Language[]>([]);
  React.useEffect(() => {
    setlangs(languages);
  }, []);
  return (
    <Box className={classes.root}>
      {langs.length > 0 && (
        <>
          <Typography>{t("menu_page_translated_languages")}</Typography>
          <Box className={classes.item}>
            {langs.map((item) => (
              <Chip style={{ marginRight: 5 }} key={item} label={ISO6391.getName(item)} />
            ))}
          </Box>
        </>
      )}
      <Box className={classes.item}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">
            {t("menu_page_new_translation")}
          </InputLabel>
          <Select
            label={t("menu_page_new_translation")}
            labelId="demo-simple-select-filled-label"
            value={newLanguage}
            onChange={(e) => {
              if (!langs.includes(e.target.value as Language)) {
                setnewLanguage(e.target.value as Language);
              }
            }}
          >
            {Object.keys(Language).map((item) => (
              <MenuItem key={item} value={item}>
                {ISO6391.getName(item)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton
          color="primary"
          onClick={() => {
            if (!langs.includes(newLanguage)) {
              setlangs([...langs, newLanguage]);
            }
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      <AddMenuItemForm
        openDrawer={openDrawer}
        setopenDrawer={setopenDrawer}
        onCreate={(data) => {
          // updateCategorizedMenuItems(
          //   data,
          //   categorizedMenuItems,
          //   setcategorizedMenuItems,
          //   setState
          // )
        }}
        languages={langs}
      />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
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

export default React.memo(CreateMenuItemFormWithlangs);
