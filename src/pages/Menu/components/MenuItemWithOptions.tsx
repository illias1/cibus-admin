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
import { TShakeItemOption } from "./DisplayMenuItems";
import { Language } from "../../../API";

type IDisplayMenuItemsProps = {
  seteditId: React.Dispatch<React.SetStateAction<string>>;
  setdeleteId: React.Dispatch<React.SetStateAction<string>>;
  setcategorizedMenuItems: React.Dispatch<React.SetStateAction<TcategorizedMenuItems>>;
  setState: React.Dispatch<React.SetStateAction<TMenuState>>;
  shakeItemOption: TShakeItemOption;
  style: any;
  //   item: TcategorizedMenuItems[number]["items"][number];
  data: TcategorizedMenuItems[number]["items"];
  categorizedMenuItems: TcategorizedMenuItems;
  handleToggle: (
    id: string,
    updatedState: boolean,
    property: keyof TMenuState[string]
  ) => Promise<void>;
  handleDelete: (id: string, category: string) => Promise<void>;
  category: string;
  deleteId: string;
  editId: string;
  state: TMenuState;
  languages: Language[];
  itemIndex: number;
};

// <MenuItemWithOptions
//   seteditId={seteditId}
//   setdeleteId={setdeleteId}
//   setcategorizedMenuItems={setcategorizedMenuItems}
//   setState={setState}
//   shakeItemOption={shakeItemOption}
//   // item={items[index as number]}
//   // @ts-ignore
//   data={data}
//   itemIndex={index}
//   handleDelete={handleDelete}
//   handleToggle={handleToggle}
//   category={category}
//   deleteId={deleteId}
//   editId={editId}
//   state={state}
//   style={style}
//   languages={languages}
//   categorizedMenuItems={categorizedMenuItems}
// />

// COMPONENT
const DisplayMenuItems: React.FC<IDisplayMenuItemsProps> = ({
  seteditId,
  setdeleteId,
  setcategorizedMenuItems,
  setState,
  shakeItemOption,
  style,
  handleDelete,
  handleToggle,
  category,
  deleteId,
  editId,
  state,
  languages,
  categorizedMenuItems,
  data,
  itemIndex,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  // @ts-ignore
  const item = data[itemIndex];
  console.log("data", data);
  return (
    <React.Fragment>
      {item ? (
        <Box style={style} className={shakeItemOption.whole === item.id ? "shake-horizontal" : ""}>
          <Box className={classes.item}>
            <>
              <Box className={classes.itemContainer}>
                {/* <MenuItemCard
                  id={item.id}
                  title={item!.i18n[0].name}
                  ingredients={item!.i18n[0].description || ""}
                  price={item!.price}
                  img={item.image || ""}
                /> */}
              </Box>
              <Box className={classes.options}>
                <IconButton
                  className={shakeItemOption.favorite === item.id ? "shake-horizontal" : ""}
                  onClick={() => handleToggle(item.id, !state[item.id].favorite, "favorite")}
                  color="inherit"
                >
                  {state[item.id].favorite ? (
                    <FavoriteIcon color="primary" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <FormControlLabel
                  className={shakeItemOption.status === item.id ? "shake-horizontal" : ""}
                  control={
                    <Switch
                      checked={state[item.id].status}
                      onChange={(event) => handleToggle(item.id, event.target.checked, "status")}
                      name={item.id}
                      color="primary"
                    />
                  }
                  label="Available"
                />

                <Button onClick={() => seteditId(item.id)} color="inherit">
                  {t("edit")}
                </Button>

                {deleteId === item.id ? (
                  <ClickAwayListener onClickAway={() => setdeleteId("")}>
                    <Button
                      onClick={() => handleDelete(item.id, category)}
                      variant="outlined"
                      className={classes.delete}
                    >
                      {t("delete")}
                    </Button>
                  </ClickAwayListener>
                ) : (
                  <IconButton onClick={() => setdeleteId(item.id)} color="inherit">
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </>
          </Box>

          <Collapse style={{ textAlign: "center" }} in={item.id === editId}>
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
                seteditId("");
              }}
              seteditId={seteditId}
            />
          </Collapse>
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
