import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography, TextField, Button, Box } from "@material-ui/core";
import { TItems } from "../MenuScreen";
import { useTranslation } from "react-i18next";
import { StyledButton } from "../../../../../components/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../../store/actions";
import { useTypedSelector } from "../../../../../store/types";
import { useHistory, useParams } from "react-router-dom";
import { TParams } from "../../../../../types";

type IItemPopupProps = {
  items: TItems;
  handleClose: () => void;
};

const ItemPopup: React.FC<IItemPopupProps> = ({
  items: { title, price, ingredients, allergy },
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
          background: `linear-gradient( rgba(256, 256, 256, 0), rgba(256, 256, 256, 1)), url(https://via.placeholder.com/900)`,
        }}
        className={classes.image}
      />
      <Container>
        <Typography variant="h4">{title}</Typography>
        <Typography>{ingredients}</Typography>
        <Typography>{allergy}</Typography>
        <TextField
          id="standard-textarea"
          placeholder={t("item_popup_note_placeholder")}
          multiline
          fullWidth
        />

        <Box className={classes.priceZone}>
          <Box>
            <Button variant="outlined">-</Button>
            {quantity}
            <Button variant="outlined">+</Button>
          </Box>
          <Typography>{price}</Typography>
        </Box>
        <StyledButton
          disabled={
            cartItems.findIndex((item) => item.item.title === title) < 0
              ? false
              : true
          }
          onCLick={() => {
            dispatch(
              addToCart({
                status: "added",
                item: { title, price, ingredients, allergy },
                quantity,
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
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: 265,
    },
    priceZone: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
  })
);

export default ItemPopup;
