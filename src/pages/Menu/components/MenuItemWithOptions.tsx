import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuItemCard from "./MenuItem";
import EditMenuItemForm from "./forms/EditMenuItemForm";
// icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
// utils
import { TcategorizedMenuItems } from "./utils";
import { TMenuState } from "../Menu";
import "./styles.css";
import { UNCATEGORIZED } from "../../../utils/_constants";
import { useTranslation } from "react-i18next";
import { FixedSizeList as List } from "react-window";
import { Language, MenuItemStatus } from "../../../API";
import { useTypedSelector, TStore } from "../../../store/types";

type IDisplayMenuItemsProps = {
  // style: any;
  //   item: TcategorizedMenuItems[number]["items"][number];
  // data: TcategorizedMenuItems[number]["items"];
  languages: Language[];
  item: TStore["menu"]["categorizedItems"][string][string];
  // itemIndex: number;
};

// <MenuItemWithOptions
//   // item={items[index as number]}
//   // @ts-ignore
//   data={data}
//   itemIndex={index}
//   style={style}
//   languages={languages}
// />

// COMPONENT
const DisplayMenuItems: React.FC<IDisplayMenuItemsProps> = ({
  // style,
  languages,
  item,
  // data,
  // itemIndex,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [edit, setedit] = React.useState<boolean>(false);
  // @ts-ignore
  // const item = data[itemIndex];
  return (
    <React.Fragment>
      {item ? (
        <Box>
          <Box className={classes.item}>
            <>
              <Box className={classes.itemContainer}>
                {/* <MenuItemCard
                  id={item.id}
                  title={item.i18n[0].name}
                  ingredients={item.i18n[0].description || ""}
                  price={item!.price}
                  img={item.image || ""}
                /> */}
                <Button onClick={() => setedit(!edit)}>edit</Button>
              </Box>
            </>
          </Box>
          {edit && (
            <Collapse style={{ textAlign: "center" }} in={edit}>
              <Box className={classes.options}>
                <IconButton
                  // onClick={() => handleToggle(item.id, !state[item.id].favorite, "favorite")}
                  color="inherit"
                >
                  {item.favorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                </IconButton>
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.status === MenuItemStatus["AVAILABLE"]}
                      // onChange={(event) => handleToggle(item.id, event.target.checked, "status")}
                      name={item.id}
                      color="primary"
                    />
                  }
                  label="Available"
                />

                <Button
                  // onClick={() => seteditId(item.id)}
                  color="inherit"
                >
                  {t("edit")}
                </Button>

                <ClickAwayListener onClickAway={() => {}}>
                  <Button
                    // onClick={() => handleDelete(item.id, category)}
                    variant="outlined"
                    className={classes.delete}
                  >
                    {t("delete")}
                  </Button>
                </ClickAwayListener>
                <IconButton
                  // onClick={() => setdeleteId(item.id)}
                  color="inherit"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <EditMenuItemForm
                menuItem={item}
                languages={languages}
                onEdit={(data) => {
                  // updateCategorizedMenuItems(
                  //   data,
                  //   categorizedMenuItems,
                  //   setcategorizedMenuItems,
                  //   setState,
                  //   {
                  //     category: item.i18n[0].category ? item.i18n[0].category : UNCATEGORIZED,
                  //     id: item.id,
                  //   }
                  // );
                }}
              />
            </Collapse>
          )}
        </Box>
      ) : null}
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
