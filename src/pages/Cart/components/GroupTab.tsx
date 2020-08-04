import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { useTypedSelector } from "../../../store/types";
import CartItem from "./CartGroupItem";
import TotalPrice from "./TotalPrice";
import { theme } from "../../../utils/theme";
import { useTranslation } from "react-i18next";
import TwoButtons from "./TwoButtons";
import { StyledButton } from "../../../components/Button";
import ConfrimationPopup from "./ConfrimationPopup";

type IGroupTabProps = {};

const GroupTab: React.FC<IGroupTabProps> = ({ ...props }) => {
  const { cart, groupCart } = useTypedSelector((state) => state);
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setopen] = React.useState<boolean>(false);
  const handleClose = () => {
    setopen(false);
  };
  return (
    <div>
      <ConfrimationPopup
        open={open}
        message={t("cart_table_order_override_confirmation_request")}
        handleClose={handleClose}
        onConfirmationClick={() => ({})}
      />
      <Box>
        <CartItem
          tip={4.5}
          title="My order"
          myOrder={true}
          price={cart
            .map((item) => item.item.price)
            .reduce((prevVal, currVal) => prevVal + currVal)}
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
        tip={12}
        price={Number(
          groupCart
            .map((item) => item.price)
            .reduce((prev, curr) => prev + curr)
            .toPrecision(3)
        )}
      />
      <Typography variant="caption" align="center">
        {t("cart_order_placement_override_explanation")}
      </Typography>

      <StyledButton className={classes.middleBtn} onCLick={() => setopen(true)}>
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
