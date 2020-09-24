import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LanguageIcon from "@material-ui/icons/Language";
import { useTranslation } from "react-i18next";
import {
  MenuItem,
  Menu,
  ListItem,
  ListItemIcon,
  ListItemText,
  ButtonBase,
} from "@material-ui/core";
import { Language } from "../API";

export default function LanguageSwitch() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
  const { i18n, t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSwitch = (lang: Language) => {
    i18n.changeLanguage(lang);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonBase onClick={handleClick}>
        <ListItem>
          <ListItemIcon>
            <LanguageIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={t("language")} />
        </ListItem>
      </ButtonBase>
      <Menu
        classes={{
          paper: classes.popover,
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem dense={true} onClick={() => handleSwitch(Language["es"])}>
          Español
        </MenuItem>
        <MenuItem dense={true} onClick={() => handleSwitch(Language["en"])}>
          English
        </MenuItem>
        {/* <MenuItem dense={true} onClick={() => handleSwitch(Language["ko"])}>
          한국어
        </MenuItem> */}
      </Menu>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  popover: {
    marginTop: 35,
    borderRadius: 15,
  },
}));
