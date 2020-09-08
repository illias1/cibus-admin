import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItemCard from "./MenuItem";
// icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// utils
import { updateMenuItem } from "../../../graphql/mutations";
import {
  UpdateMenuItemMutation,
  UpdateMenuItemMutationVariables,
  MenuItemStatus,
} from "../../../API";
import { mutation } from "../../../utils/mutation";
import { TcategorizedMenuItems } from "./utils";
import { Button, IconButton } from "@material-ui/core";
import { TMenuState } from "../Menu";
import "./styles.css";
type IDisplayMenuItemsProps = {
  state: TMenuState;
  setState: React.Dispatch<React.SetStateAction<TMenuState>>;
  categorizedMenuItems: TcategorizedMenuItems;
};
type TShakeItemOption = Record<"favorite" | "status", string>;
const initialShakeItemOption: TShakeItemOption = {
  favorite: "",
  status: "",
};

const DisplayMenuItems: React.FC<IDisplayMenuItemsProps> = ({
  state,
  setState,
  categorizedMenuItems,
}) => {
  const classes = useStyles();
  const [shakeItemOption, setshakeItemOption] = React.useState<TShakeItemOption>(
    initialShakeItemOption
  );

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

  return (
    <Box className={classes.root}>
      {categorizedMenuItems?.map(({ items, category }, i) => (
        <React.Fragment key={category}>
          <Typography id={`category-${category}`} className={classes.title} variant="h4">
            {category}
          </Typography>
          {items.map((item, index) => (
            <Box className={classes.item} key={index}>
              {item ? (
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
                      onClick={() => handleToggle(item.id, !state[item.id].favorite, "favorite")}
                      color="inherit"
                    >
                      {
                        // @ts-ignore
                        state[item.id].favorite ? (
                          <FavoriteIcon color="primary" />
                        ) : (
                          <FavoriteBorderIcon />
                        )
                      }
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

                    <Button variant="outlined" color="secondary">
                      Edit
                    </Button>
                  </Box>
                </>
              ) : null}
            </Box>
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
  })
);

export default DisplayMenuItems;
