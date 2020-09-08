import React from "react";
import OrderCard from "../../components/OrderCard";
import { useTypedSelector } from "../../store/types";
import { filterOrderByStatus } from "../../store/selectors";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

import { useDispatch } from "react-redux";

type INewOrderProps = {};

const NewOrder: React.FC<INewOrderProps> = ({ ...props }) => {
  const RECEIVEDOrders = useTypedSelector(filterOrderByStatus("READY"));
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Box className={classes.root}>
      {RECEIVEDOrders.length > 0
        ? RECEIVEDOrders.map((item, index) => <OrderCard status="PAYED" key={index} order={item} />)
        : t("no_orders_being_deliverd_today")}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);
export default NewOrder;
