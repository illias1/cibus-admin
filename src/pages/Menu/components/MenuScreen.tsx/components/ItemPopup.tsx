import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography, TextField, Box, ButtonBase } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { StyledButton } from "../../../../../components/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../../store/actions";
import { useTypedSelector } from "../../../../../store/types";
import { useHistory, useParams } from "react-router-dom";
import { TParams } from "../../../../../types";
import image from "../../../../../assets/popup.png";
import { TItems } from "../../../../../sampleData";

type IItemPopupProps = {
  items: TItems;
  handleClose: () => void;
};

const ItemPopup: React.FC<IItemPopupProps> = ({
  items: { title, price, ingredients, allergy, notes, cal, img },
  handleClose,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const cartItems = useTypedSelector((state) => state.cart);
  const { t } = useTranslation();
  const { restaurantId, tableNumber } = useParams<TParams>();
  const [quantity, setquantity] = React.useState<number>(1);
  return (
    <Container className={classes.root}>
      <div
        style={{
          background: `linear-gradient( rgba(256, 256, 256, 0), rgba(256, 256, 256, 1)), url(${image})`,
        }}
        className={classes.image}
      />
      <Container>
        <Typography variant="h4">{title}</Typography>
        <Typography color="textSecondary" variant="body2">
          {ingredients}
        </Typography>
        <Typography className={classes.paragraph} variant="body1">
          {t("menu_allergy_info_label")}
        </Typography>

        <Typography color="textSecondary" variant="body2">
          {allergy}
        </Typography>
        <Typography className={classes.paragraph} variant="body1">
          {t("menu_special_instructions_label")}
        </Typography>
        <TextField
          id="standard-textarea"
          placeholder={t("item_popup_note_placeholder")}
          multiline
          fullWidth
        />

        <Box className={classes.priceZone}>
          <Box>
            <ButtonBase
              className={classes.mathBtn}
              onClick={() => {
                if (quantity > 1) {
                  setquantity(quantity - 1);
                }
              }}
            >
              -
            </ButtonBase>
            {quantity}
            <ButtonBase className={classes.mathBtn} onClick={() => setquantity(quantity + 1)}>
              +
            </ButtonBase>
          </Box>
          <Typography variant="h5">{t("price_euro", { price })}</Typography>
        </Box>
        <StyledButton
          className={classes.cartBtn}
          disabled={cartItems.findIndex((item) => item.item.title === title) < 0 ? false : true}
          onCLick={() => {
            dispatch(
              addToCart({
                status: "added",
                item: { title, price, ingredients, allergy, img: "", notes, cal },
                quantity,
                img,
              })
            );
            history.push(`/${restaurantId}/${tableNumber}/cart`);
            handleClose();
          }}
        >
          Add to Cart
        </StyledButton>
      </Container>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      backgroundColor: theme.palette.background.paper,
      width: "80%",
      borderRadius: theme.spacing(3),
      height: "80%",
      overflowY: "scroll",
    },
    image: {
      width: "100%",
      height: 265,
    },
    priceZone: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      height: theme.spacing(10),
      alignItems: "center",
    },
    mathBtn: {
      minWidth: "18px",
      height: "18px",
      border: "2px solid #929EA5",
      borderRadius: 1,
      margin: "0 10px",
    },
    paragraph: {
      marginTop: theme.spacing(2),
    },
    cartBtn: {
      margin: "0 auto 1em",
      display: "block",
      width: "80%",
    },
  })
);

export default ItemPopup;
