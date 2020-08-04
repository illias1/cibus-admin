import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardMedia from "@material-ui/core/CardMedia";
type TItem = {
  title: string;
  price: number;
  myOrder?: boolean;
  tip: number;
};

const Item: React.FC<TItem> = ({ title, price, myOrder = false, tip }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Card className={classes.root}>
      <Box className={classes.content}>
        <Typography variant="h5" className={classes.name}>
          {myOrder
            ? t("cart_my_order")
            : t("cart_friend_s_order", { name: title })}
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
      <CardMedia
        className={classes.cover}
        image="https://via.placeholder.com/110x100"
      />
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
      height: 100,
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
