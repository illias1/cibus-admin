import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useTypedSelector, TStore } from "../store/types";
import { filterOrderByStatus } from "../store/selectors";

type IOrderCardProps = {
  order: TStore["orders"][0];
};

const OrderCard: React.FC<IOrderCardProps> = ({ order }) => {
  const classes = useStyles();
  return <Box className={classes.root}>{JSON.stringify(order)}</Box>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export default OrderCard;
