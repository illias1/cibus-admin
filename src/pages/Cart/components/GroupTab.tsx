import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { useTypedSelector, TGroupCartItem } from "../../../store/types";
import CartItem from "./CartGroupItem";
import TotalPrice from "./TotalPrice";
import { useTranslation } from "react-i18next";
import TwoButtons from "./TwoButtons";
import { StyledButton } from "../../../components/Button";
import ConfrimationPopup from "./ConfrimationPopup";
import { useDispatch } from "react-redux";
import { setGroupOrderPlaced } from "../../../store/actions";

type IGroupTabProps = {};

const calculateGroupTotal = (
  groupCart: TGroupCartItem[],
  propertyToCalculate: Exclude<keyof TGroupCartItem, "customerName">
) =>
  Number(
    groupCart
      .reduce((prev, curr): number => prev + curr[propertyToCalculate], 0)
      .toPrecision(3)
  );

const GroupTab: React.FC<IGroupTabProps> = ({ ...props }) => {
  const { cart, groupCart } = useTypedSelector((state) => state);
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const groupOrderPlaced = useTypedSelector(
    (state) => state.groupCartOrderPlaced
  );
  const [open, setopen] = React.useState<boolean>(false);
  const handleClose = () => {
    setopen(false);
  };
  const myOrderTotal = Number(
    cart
      .reduce((prev, curr): number => prev + curr.item.price * curr.quantity, 0)
      .toPrecision(3)
  );
  const othersOrderTotal = calculateGroupTotal(groupCart, "price");
  const othersTipTotal = calculateGroupTotal(groupCart, "tip");
  const [myTip, setmyTip] = React.useState<number>(4.5);
  return (
    <div>
      <ConfrimationPopup
        open={open}
        message={t("cart_table_order_override_confirmation_request")}
        handleClose={handleClose}
        onConfirmationClick={() => dispatch(setGroupOrderPlaced(true))}
      />
      <Box>
        <CartItem
          tip={myTip}
          title="My order"
          myOrder={true}
          price={myOrderTotal}
        />
        {groupCart.map((customer) => (
          <CartItem
            tip={customer.tip}
            price={customer.price}
            title={customer.customerName}
          />
        ))}
      </Box>
      <TotalPrice
        tip={myTip + othersTipTotal}
        price={othersOrderTotal + myOrderTotal}
      />
      <Typography variant="caption" align="center">
        {t("cart_order_placement_override_explanation")}
      </Typography>

      <StyledButton
        disabled={groupOrderPlaced}
        className={classes.middleBtn}
        onCLick={() => setopen(true)}
      >
        {t("cart_place_table_order")}
      </StyledButton>
      <TwoButtons
        onCLickRight={() => {}}
        onCLickLeft={() => {}}
        leftLabel="cart_pay_all"
        rightLabel="cart_pay_my_order"
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    middleBtn: {
      margin: `${theme.spacing(1)}px auto`,
      width: "60%",
      display: "block",
    },
  })
);

export default GroupTab;
