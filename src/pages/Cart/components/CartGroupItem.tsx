import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardMedia from "@material-ui/core/CardMedia";
import { IMAGE_OVERLAY_COLOR } from "../../../utils/_constants";
type TItem = {
  title: string;
  price: number;
  myOrder?: boolean;
  tip: number;
  orderPlaced: boolean;
};

const Item: React.FC<TItem> = ({ title, price, myOrder = false, tip, orderPlaced }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Card className={classes.root}>
      <Box className={classes.content}>
        <Typography variant="h5" className={classes.name}>
          {myOrder ? t("cart_my_order") : t("cart_friend_s_order", { name: title })}
        </Typography>
        <Box className={classes.tipButton}>
          {myOrder ? (
            <Button className={classes.button} endIcon={<ExpandMoreIcon />}>
              {t("cart_modify_tip")}
            </Button>
          ) : (
            <div />
          )}
        </Box>
        <Box className={classes.priceInfo}>
          <Typography className={classes.tipInfo} align="right">
            {t("cart_total")}: {price - tip}
          </Typography>
          <Typography className={classes.tipInfo} align="right">
            {t("cart_tip")}: {tip}
          </Typography>
          <Typography align="right" variant="h5">
            {t("price_euro", { price: price })}
          </Typography>
        </Box>
      </Box>
      <div className={classes.cover}>
        <Typography variant="body1" align="center">
          {orderPlaced ? t("cart_order_placed") : t("cart_waiting_to_place_order_automatically")}
        </Typography>
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      borderRadius: 10,
      height: 100,
      flexDirection: "row",
      boxShadow: "0px 3px 50px #00000029",
      margin: "0 0 10px 0",
    },
    content: {
      flexGrow: 1,
      display: "flex",
      padding: "10px",
    },
    cover: {
      minWidth: 107,
      maxWidth: 107,
      height: 100,
      backgroundColor: IMAGE_OVERLAY_COLOR,
      color: theme.palette.getContrastText(IMAGE_OVERLAY_COLOR),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    name: {
      position: "absolute",
      maxWidth: theme.spacing(18),
    },
    tipButton: {
      alignSelf: "flex-end",
    },
    priceInfo: {
      flexGrow: 1,
      alignSelf: "flex-end",
    },
    button: {
      fontSize: 10,
      textTransform: "none",
      padding: 0,
      color: theme.palette.text.secondary,
    },
    tipInfo: {
      color: theme.palette.text.secondary,
      fontSize: 11,
    },
  })
);

export default Item;
