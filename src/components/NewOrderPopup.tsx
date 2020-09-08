import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { useTranslation } from "react-i18next";
import { useTypedSelector, OrderStatus } from "../store/types";

type INewOrderPopupProps = {
  handlePopupClose: () => void;
  open: boolean;
};

const NewOrderPopup: React.FC<INewOrderPopupProps> = ({ handlePopupClose, open }) => {
  const classes = useStyles();
  const REQUESTEDOrdersNumber = useTypedSelector(
    (state) =>
      state.orders.filter((order) => (order?.status as OrderStatus) === "REQUESTED_BY_CUSTOMER")
        .length
  );
  const { t } = useTranslation();
  const body = (
    <Box onClick={handlePopupClose} className={classes.root}>
      <div className={classes.counter}>{REQUESTEDOrdersNumber}</div>
      <Typography variant="h3">{t("NEW_ORDER")}</Typography>
      <Typography>{t("tap_anywhere_to_accept")}</Typography>
    </Box>
  );
  return (
    <Modal
      // className={classes.modal}
      open={open}
      onClose={handlePopupClose}
      aria-labelledby="new-order-popup"
      aria-describedby="a-notification-about-new-incoming-order"
    >
      {body}
    </Modal>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      background: "black",
    },
    counter: {
      backgroundColor: theme.palette.secondary.main,
      width: 300,
      height: 300,
      borderRadius: "50%",
      marginBottom: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: theme.typography.h2.fontSize,
    },
  })
);

export default NewOrderPopup;
