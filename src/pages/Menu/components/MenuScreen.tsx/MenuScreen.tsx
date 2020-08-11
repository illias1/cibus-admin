import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
// components
import MenuItem from "./components/MenuItem";
import CategoriesSlider from "./components/CategoriesSlider";
import ItemPopup from "./components/ItemPopup";
import background from "../../../../assets/background.png";
import { TItems, sampleItems } from "../../../../sampleData";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useHistory, useParams } from "react-router-dom";
import { TParams } from "../../../../types";
type IMenuScreenProps = {};

const MenuScreen: React.FC<IMenuScreenProps> = ({ ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  const { restaurantId, tableNumber } = useParams<TParams>();
  const [popupOpen, setpopupOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setpopupOpen(false);
  };
  const [items, setitems] = React.useState<TItems>({
    title: "",
    ingredients: [],
    price: 0,
    allergy: [],
    img: "",
    notes: [],
    cal: "",
  });
  return (
    <>
      <Modal
        className={classes.modal}
        open={popupOpen}
        onClose={handleClose}
        aria-labelledby="item-details-popup"
        aria-describedby="area-to-see-details-and-add-to-cart"
      >
        <ItemPopup
          handleClose={handleClose}
          items={{
            allergy: items.allergy,
            price: items!.price,
            title: items.title,
            ingredients: items?.ingredients,
            img: items.img,
            cal: items.cal,
            notes: items.notes,
          }}
        />
      </Modal>
      <Fab
        onClick={() => history.push(`/${restaurantId}/${tableNumber}/cart`)}
        className={classes.cartFAB}
        color="primary"
        aria-label="add"
      >
        <ShoppingBasketIcon />
      </Fab>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundPositionY: "bottom",
          backgroundSize: "cover",
        }}
        className={classes.image}
      >
        <Typography variant="h5" className={classes.restName}>
          Eleven Madison Park
        </Typography>
        <Typography variant="h6" className={classes.restAddress}>
          11 Madison Ave, New York, NY 10010,
        </Typography>
      </div>
      <CategoriesSlider categories={sampleItems.map((item) => item.category)} />
      <Box className={classes.root}>
        {sampleItems.map(({ items, category }, i) => (
          <React.Fragment key={category}>
            <Typography id={`category-${category}`} className={classes.title} variant="h4">
              {category}
            </Typography>
            {items.map(({ title, price, ingredients, allergy, img, cal, notes }, index) => (
              <MenuItem
                onClick={(e) => {
                  setpopupOpen(true);
                  setitems({ title, price, ingredients, allergy, img, cal, notes });
                }}
                key={index}
                title={title}
                ingredients={ingredients}
                price={price}
                img={img}
              />
            ))}
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      borderBottomLeftRadius: theme.spacing(6),
      borderBottomRightRadius: theme.spacing(6),
      width: "100%",
      height: "599px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    root: {
      padding: "18px 23px",
    },
    title: {
      font: "SemiBold 17px/20px Josefin Sans",
      letterSpacing: 0,
    },
    modal: {
      display: "flex",
      alignItems: "center",
    },
    cartFAB: {
      position: "fixed",
      bottom: "9px",
      right: "9px",
      background: "grey",
    },
    restName: {
      color: theme.palette.common.white,
    },
    restAddress: {
      color: theme.palette.text.hint,
      marginBottom: theme.spacing(4),
    },
  })
);

export default MenuScreen;
