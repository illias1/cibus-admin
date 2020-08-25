import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useTypedSelector, OrderStatus } from "../store/types";

type INewOrderPopupProps = {
  handlePopupClose: () => void;
};

const NewOrderPopup: React.FC<INewOrderPopupProps> = ({ handlePopupClose }) => {
  const classes = useStyles();
  const awaitingOrdersNumber = useTypedSelector(
    (state) => state.orders.filter((order) => (order?.status as OrderStatus) === "AWAITING").length
  );
  const { t } = useTranslation();
  return (
    <Box onClick={handlePopupClose} className={classes.root}>
      <div className={classes.counter}>{awaitingOrdersNumber}</div>
      <Typography variant="h3">{t("NEW_ORDER")}</Typography>
      <Typography>{t("tap_anywhere_to_accept")}</Typography>
    </Box>
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
