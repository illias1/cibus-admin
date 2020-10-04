import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const Item: React.FC = () => {
  const classes = useStyles();
  return (
    <Card className={classes.menuitem}>
      <Box className={classes.itemcontent}>
        <Box className={classes.tileAndPrice}>
          <Typography className={classes.titleItem} variant="h6">
            Sushi Festival
          </Typography>
          <Typography className={classes.price} variant="subtitle1">
            $ 7.69
          </Typography>
        </Box>
        <Typography className={classes.ingredients} variant="body1" color="textSecondary">
          A Stellar Line Up Of 17 Sushi Pieces - Salmon Baby Rolls, Avocado Baby Rools And Omega-3
          Rich Sashimi Grade Atlantic Salmon Nigiri, An Itsu Customer Favourite
        </Typography>
      </Box>
      <div className={classes.cover} />
    </Card>
  );
};

const sampleCategories = ["Sushi", "Salads", "Snacks", "Gyoza's & Bao's", "Rice Bowl"];
const favorites: any[] = ["", ""];
const ContentPreview: React.FC = () => {
  const classes = useStyles();
  return (
    <Box>
      <Box id="categoriesContainer" className={classes.root}>
        {sampleCategories.map((cat, i) => (
          <a
            id={`label-category-${cat}`}
            key={i}
            className={classes.chip}
            href="#1"
            // needed to actually scroll sincr the onUpdate method would block it
          >
            {cat}
          </a>
        ))}
      </Box>
      <Box className={classes.content}>
        {favorites.length > 0 && (
          <Typography gutterBottom={true} className={classes.title} variant="h4">
            Chef Favorites
          </Typography>
        )}
        <Box className={classes.horizontalParent}>
          {favorites.map((fav) => (
            <div key={fav.id} className={classes.horizontalChild}>
              <Item />
            </div>
          ))}
        </Box>
        <Item />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      whiteSpace: "nowrap",
      overflow: "auto",
      boxShadow: "0px 5px 30px #0000000D",
      padding: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(5),
      borderBottomLeftRadius: theme.spacing(5),
      position: "sticky",
      top: 0,
      backgroundColor: "white",
    },
    chip: {
      marginRight: theme.spacing(3),
      color: theme.palette.text.disabled,
      fontSize: theme.typography.h6.fontSize,
    },
    content: {
      padding: "18px 23px",
    },
    title: {
      font: "normal normal bold 43px/40px Josefin Sans",
      letterSpacing: 0,
      fontSize: 22,
      color: "black",
    },
    horizontalChild: {
      flex: "0 0 auto",
      width: "83%",
      marginRight: "14px",
      overflow: "inherit",
      borderRadius: "20px",
    },
    horizontalParent: {
      display: "flex",
      overflowX: "auto",
      marginRight: "-23px",
      marginBottom: theme.spacing(2),
    },
    menuitem: {
      display: "flex",
      borderRadius: 10,
      height: 100,
      flexDirection: "row",
      boxShadow: "0px 3px 50px #00000029",
      margin: "0 0 10px 0",
      alignItems: "center",
    },
    itemcontent: {
      padding: 23,
      flexGrow: 1,
    },
    cover: {
      minWidth: 107,
      maxWidth: 107,
      height: 100,
      background: "lightgray",
    },

    tileAndPrice: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    titleItem: {
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
      // fontFamily: theme.typography.secondaryFontFamily,
    },
    price: {
      minWidth: "fit-content",
    },
  })
);

export default ContentPreview;
