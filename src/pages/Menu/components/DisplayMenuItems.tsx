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
import { TcategorizedMenuItems, updateCategorizedMenuItems } from "./utils";
import { TMenuState } from "../Menu";
import "./styles.css";
import { UNCATEGORIZED } from "../../../utils/_constants";
import { useTranslation } from "react-i18next";
import { FixedSizeList as List } from "react-window";
import { useTypedSelector } from "../../../store/types";

type IDisplayMenuItemsProps = {
  state: TMenuState;
  setState: React.Dispatch<React.SetStateAction<TMenuState>>;

  languages: Language[];
};
export type TShakeItemOption = Record<"favorite" | "status" | "whole", string>;
const initialShakeItemOption: TShakeItemOption = {
  favorite: "",
  status: "",
  whole: "",
};

// COMPONENT
const DisplayMenuItems: React.FC<IDisplayMenuItemsProps> = ({ state, setState, languages }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { menu } = useTypedSelector((state) => state);
  const [shakeItemOption, setshakeItemOption] = React.useState<TShakeItemOption>(
    initialShakeItemOption
  );
  const [editId, seteditId] = React.useState<string>("");
  const [deleteId, setdeleteId] = React.useState<string>("");
  // ============================================================================================================================================
  // HADNLE TOGGLE
  const handleToggle = async (
    id: string,
    updatedState: boolean,
    property: keyof TMenuState[string]
  ) => {
    console.log("id", id);
    setState({
      ...state,
      [id]: {
        ...state[id],
        [property]: updatedState,
      },
    });
    const { data, error } = await mutation<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>(
      updateMenuItem,
      {
        input: {
          id,
          [property]:
            property === "status"
              ? updatedState
                ? MenuItemStatus["AVAILABLE"]
                : MenuItemStatus["OUT_OF_STOCK"]
              : updatedState,
        },
      }
    );
    if (error) {
      setshakeItemOption({
        ...initialShakeItemOption,
        [property]: id,
      });
      setState({
        ...state,
        [id]: {
          ...state[id],
          [property]: !updatedState,
        },
      });
      setTimeout(() => {
        setshakeItemOption(initialShakeItemOption);
      }, 1000);
    }
  };
  // ============================================================================================================================================

  const handleDelete = async (id: string, category: string) => {
    const { error, data } = await mutation<DeleteMenuItemMutation, DeleteMenuItemMutationVariables>(
      deleteMenuItem,
      {
        input: {
          id,
        },
      }
    );
    if (error) {
      setshakeItemOption({
        ...initialShakeItemOption,
        whole: id,
      });
      setTimeout(() => {
        setshakeItemOption(initialShakeItemOption);
      }, 1000);
    }
    // if (data) {
    //   setcategorizedMenuItems(
    //     categorizedMenuItems.map((cat) =>
    //       cat.category === category
    //         ? { ...cat, items: cat.items.filter((menuItem) => menuItem!.id !== id) }
    //         : cat
    //     )
    //   );
    // }
  };
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
                <Box className={shakeItemOption.whole === item.id ? "shake-horizontal" : ""}>
                  <Box className={classes.item}>
                    <>
                      <Box className={classes.itemContainer}>
                        <MenuItemCard
                          id={item.id}
                          title={item!.i18n[0].name}
                          ingredients={item!.i18n[0].description || ""}
                          price={item!.price}
                          img={item.image || ""}
                        />
                      </Box>
                      <Box className={classes.options}>
                        <IconButton
                          className={shakeItemOption.favorite === item.id ? "shake-horizontal" : ""}
                          onClick={() =>
                            handleToggle(item.id, !state[item.id].favorite, "favorite")
                          }
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
                              onChange={(event) =>
                                handleToggle(item.id, event.target.checked, "status")
                              }
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
