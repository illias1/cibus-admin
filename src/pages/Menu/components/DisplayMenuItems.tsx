import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuItemCard from "./MenuItem";
import EditMenuItemForm from "./forms/EditMenuItemForm";
import MenuItemWithOptions from "./MenuItemWithOptions";
// icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
// utils
import { updateMenuItem, deleteMenuItem } from "../../../graphql/mutations";
import {
  UpdateMenuItemMutation,
  UpdateMenuItemMutationVariables,
  MenuItemStatus,
  Language,
  DeleteMenuItemMutation,
  DeleteMenuItemMutationVariables,
} from "../../../API";
import { mutation } from "../../../utils/mutation";
import { TcategorizedMenuItems } from "./utils";
import { TMenuState } from "../Menu";
import "./styles.css";
import { UNCATEGORIZED } from "../../../utils/_constants";
import { useTranslation } from "react-i18next";
import { FixedSizeList as List } from "react-window";
import { useTypedSelector } from "../../../store/types";

type IDisplayMenuItemsProps = {
  languages: Language[];
};

// COMPONENT
const DisplayMenuItems: React.FC<IDisplayMenuItemsProps> = ({ languages }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { menu } = useTypedSelector((state) => state);

  return (
    <Box className={classes.root}>
      {Object.entries(menu)?.map(([category, items]) => (
        <React.Fragment key={category}>
          <Typography id={`category-${category}`} className={classes.title} variant="h3">
            {category}
          </Typography>
          {Object.entries(items).map(([id, item]) => (
            <React.Fragment key={id}>
              {item ? (
                <MenuItemWithOptions
                  // item={items[index as number]}
                  // @ts-ignore
                  // data={data}
                  item={item}
                  // itemIndex={index}
                  // style={style}
                  languages={languages}
                />
              ) : null}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "18px 23px",
    },
    title: {
      font: "SemiBold 17px/20px Josefin Sans",
      letterSpacing: 0,
    },
    itemContainer: {
      width: "100%",
      maxWidth: 400,
      marginRight: theme.spacing(3),
    },
    item: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
      },
    },
    options: {
      display: "flex",
      justifyContent: "space-evenly",
      width: "100%",
    },
    delete: {
      color: theme.palette.error.main,
    },
  })
);

export default DisplayMenuItems;
