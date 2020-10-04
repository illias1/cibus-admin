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
  controlClassname?: string;
  labelClassname?: string;
};

const MenuLanguagesManage: React.FC<IMenuLanguagesManageProps> = ({
  langs,
  setlangs,
  controlClassname,
  labelClassname,
}) => {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const [newLanguage, setnewLanguage] = React.useState<Language>(i18n.language as Language);

  return (
    <Box className={classes.root}>
      <Typography style={{ marginLeft: 8 }} className={labelClassname}>
        {t("label_translation")}
      </Typography>
      <Box className={classes.item}>
        <FormControl variant="outlined" className={`${controlClassname} ${classes.formControl}`}>
          <Select
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
          color="inherit"
          onClick={() => {
            if (!langs.includes(newLanguage)) {
              setlangs([...langs, newLanguage]);
            }
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      right: 0,
      bottom: 0,
      [theme.breakpoints.down("xs")]: {
        position: "relative",
      },
    },
    item: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
  })
);

export default MenuLanguagesManage;
