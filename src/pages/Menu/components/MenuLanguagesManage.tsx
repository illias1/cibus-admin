import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Language } from "../../../API";
import ISO6391 from "iso-639-1";
// material
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useTranslation } from "react-i18next";
type IMenuLanguagesManageProps = {
  langs: Language[];
  setlangs: React.Dispatch<React.SetStateAction<Language[]>>;
};

const MenuLanguagesManage: React.FC<IMenuLanguagesManageProps> = ({ langs, setlangs }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [newLanguage, setnewLanguage] = React.useState<Language>(i18n.language as Language);

  return (
    <>
      {langs.length > 0 && (
        <>
          <Typography align="center" style={{ width: "13em" }}>
            {t("menu_page_translated_languages")}
          </Typography>
          <Box className={classes.item}>
            {langs.map((item, index) => (
              <Chip
                onDelete={
                  index === 0
                    ? undefined
                    : () => setlangs(langs.filter((language) => language !== item))
                }
                style={{ marginRight: 5 }}
                key={item}
                label={ISO6391.getName(item)}
              />
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
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      margin: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
  })
);

export default MenuLanguagesManage;
