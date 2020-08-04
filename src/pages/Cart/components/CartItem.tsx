import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../../store/actions";
type TItem = {
  title: string;
  price: number;
  ingredients?: string[];
};

const Item: React.FC<TItem> = ({ title, price, ingredients }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Card className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.horizontal}>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
          <Typography variant="body2">
            {t("price_euro", { price: price })}
          </Typography>
        </Box>
        <Typography
          className={classes.ingredients}
          variant="body2"
          color="textSecondary"
        >
          {ingredients}
        </Typography>
        <Box className={classes.horizontal}>
          <Button className={classes.button} endIcon={<ExpandMoreIcon />}>
            {t("cart_item_customize_option")}
          </Button>
          <IconButton
            onClick={() => dispatch(removeItemFromCart(title))}
            className={classes.iconButton}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      </Box>

      {/* tried to use the skeleton but doesn't show up with suspense
      if using the img onLoad as ternary - image never renders so never loads so skeleton persists 
      if adding display none to image till loads - skeleton takes less space than needed */}
      {/* <Suspense
        fallback={() => (
          <Skeleton variant="rect" animation="wave" className={classes.cover} />
        )}
      > */}
      <img
        className={classes.cover}
        src="https://via.placeholder.com/110x100"
        alt="sdf"
        // onLoad={() => {
        // setimageLoaded(true);
        // console.log("image loaded");
        // }}
        // onError={() => console.log("image load errror")}
      />
      {/* </Suspense> */}

      {/* <CardMedia
        className={classes.cover}
        image="https://via.placeholder.com/110x100"
      /> */}
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
      padding: "10px 10px 10px 23px",
    },
    cover: {
      minWidth: 107,
      height: 100,
    },
    title: {
      fontSize: "17px",
      letterSpacing: 0,
    },
    horizontal: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    ingredients: {
      fontSize: "11px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2 /* numb,r of lines to show */,
      "-webkit-box-orient": "vertical",
      maxWidth: "90%",
    },
    button: {
      textTransform: "none",
      fontSize: theme.typography.caption.fontSize,
      padding: 0,
    },
    iconButton: {
      padding: 0,
    },
  })
);

export default Item;
