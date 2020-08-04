import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { CustomTheme } from "../../../../../utils/customCreateTheme";

type TItem = {
  title: string;
  price: number;
  ingredients?: string[];
  onClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
};

const Item: React.FC<TItem> = ({ title, price, ingredients, onClick }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Card className={classes.root} onClick={onClick}>
      <Box className={classes.content}>
        <Box className={classes.tileAndPrice}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{t("price_euro", { price })}</Typography>
        </Box>
        <Typography
          className={classes.ingredients}
          variant="body1"
          color="textSecondary"
        >
          {ingredients}
        </Typography>
      </Box>
      <CardMedia
        className={classes.cover}
        image="https://via.placeholder.com/110x100"
        title="Live from space album cover"
      />
    </Card>
  );
};

const useStyles = makeStyles((theme: CustomTheme) =>
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
      padding: 23,
    },
    cover: {
      minWidth: 107,
      height: 100,
    },

    tileAndPrice: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    ingredients: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2 /* numb,r of lines to show */,
      "-webkit-box-orient": "vertical",
      fontFamily: theme.typography.secondaryFontFamily,
    },
  })
);

export default Item;
