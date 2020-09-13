import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Box, useMediaQuery, Button, IconButton, Switch } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import {
  Language,
  Currency,
  UpdateMenuItemMutation,
  UpdateMenuItemMutationVariables,
  MenuItemStatus,
} from "../../../API";
import { useTypedSelector } from "../../../store/types";
import { priceDisplay } from "./utils";
// icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { TNonNullMenuItem } from "../../../types";
import { mutation } from "../../../utils/mutation";
import { updateMenuItem } from "../../../graphql/mutations";
import "./styles.css";
import { AmplifyS3Image } from "@aws-amplify/ui-react";

type TItem = {
  item: TNonNullMenuItem;
  setopenDrawer: React.Dispatch<
    React.SetStateAction<{ open: boolean; item: TNonNullMenuItem | null }>
  >; // title: string;
  // price: number;
  // ingredients?: string;
  // favorite: boolean;
  // status: boolean;
  // id: string;
  // img: string;
  // onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
};

const Item: React.FC<TItem> = ({
  // title,
  // price,
  // ingredients,
  // // onClick,
  // img,
  // id,
  // favorite,
  // status,
  item,
  setopenDrawer,
}) => {
  const handleToggle = async (
    id: string,
    updatedState: boolean,
    property: "status" | "favorite"
  ) => {
    setFavStatusState({
      ...FavStatusState,
      [property]: updatedState,
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
      setshakeOption(property);
      setFavStatusState({
        ...FavStatusState,
        [property]: !updatedState,
      });
      setTimeout(() => {
        setshakeOption(null);
      }, 1000);
    }
  };
  const { price, image, id, favorite, status } = item;
  const classes = useStyles();
  const { i18n } = useTranslation();
  const [FavStatusState, setFavStatusState] = React.useState<
    Record<"favorite" | "status", boolean>
  >({ favorite: false, status: false });
  React.useEffect(() => {
    setFavStatusState({
      favorite: favorite ? true : false,
      status: status === MenuItemStatus["AVAILABLE"] ? true : false,
    });
  }, []);
  const [shakeOption, setshakeOption] = React.useState<"favorite" | "status" | null>(null);
  const phoneTrue = useMediaQuery("(max-width: 960px)");
  const { currency } = useTypedSelector((state) => state.selectedProperty);
  const options = (
    <Box className={classes.options}>
      <IconButton
        className={shakeOption === "favorite" ? "shake-horizontal" : ""}
        color="primary"
        onClick={() => handleToggle(id, !FavStatusState.favorite, "favorite")}
      >
        {FavStatusState.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Switch
        className={shakeOption === "status" ? "shake-horizontal" : ""}
        color="primary"
        checked={FavStatusState.status ? true : false}
        onChange={(event) => handleToggle(id, event.target.checked, "status")}
      />
      <Button onClick={() => setopenDrawer((prev) => ({ ...prev, open: true, item }))}>edit</Button>
    </Box>
  );
  return (
    <Card className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.tileAndPrice}>
          <Typography className={classes.title} variant="h6">
            {item.i18n[0].name}
          </Typography>
          <Typography className={classes.price} variant="body1">
            {priceDisplay(currency as Currency, price, i18n.language as Language)}
          </Typography>
        </Box>
        {phoneTrue ? (
          options
        ) : (
          <Typography className={classes.ingredients} variant="body1" color="textSecondary">
            {item.i18n[0].description}
          </Typography>
        )}
      </Box>

      {phoneTrue ? <> </> : options}
      {image ? (
        image.includes("http") ? (
          <img
            id={id}
            className={classes.cover}
            src={image || ""}
            alt={item.i18n[0].name}
            onError={() => {
              document.getElementById(id)!.style.display = "none";
            }}
          />
        ) : (
          <AmplifyS3Image className={classes.cover} imgKey={image} />
        )
      ) : null}
    </Card>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      borderRadius: 10,
      height: 100,
      flexDirection: "row",
      boxShadow: "0px 3px 50px #00000029",
      margin: "0 0 10px 0",
      alignItems: "center",
    },
    content: {
      padding: 23,
      flexGrow: 1,
    },
    cover: {
      minWidth: 107,
      maxWidth: 107,
      height: 100,
      "&$ img": {
        width: "100%",
        height: "100%",
      },
    },

    tileAndPrice: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      textOverflow: "ellipsis",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": 1,
      display: "-webkit-box",
      overflow: "hidden",
    },
    ingredients: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2 /* numb,r of lines to show */,
      "-webkit-box-orient": "vertical",
      // @ts-ignore
      fontFamily: theme.typography.secondaryFontFamily,
    },
    price: {
      minWidth: "fit-content",
    },
    options: {
      display: "inline-flex",
      alignItems: "center",
    },
  })
);

export default React.memo(Item);
