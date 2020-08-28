import React from "react";
import OrderCard from "../../components/OrderCard";
import { useTypedSelector } from "../../store/types";
import { filterOrderByStatus } from "../../store/selectors";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

type INewOrderProps = {};

const NewOrder: React.FC<INewOrderProps> = ({ ...props }) => {
  const READYOrders = useTypedSelector(filterOrderByStatus("READY"));
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {READYOrders.length > 0
        ? READYOrders.map((item, index) => <OrderCard status="RECEIVED" key={index} order={item} />)
        : t("no_orders_being_prepared_today")}
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
