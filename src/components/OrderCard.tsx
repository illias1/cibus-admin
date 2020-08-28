import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// material
import Box from "@material-ui/core/Box";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";

import { TStore, OrderStatus, useTypedSelector } from "../store/types";
import { useTranslation } from "react-i18next";
import { updateOrderUtil } from "../utils/updateOrderStatus";
import { useDispatch } from "react-redux";
import { TFunction } from "i18next";
import { CircularProgress } from "@material-ui/core";
type IOrderCardProps = {
  order: TStore["orders"][0];
  // handleConfirm: (id: string) => void;
  status: OrderStatus;
};

const statusToButtonLabel = (status: OrderStatus, t: TFunction): string => {
  switch (status) {
    case "READY":
      return t("confirm_order");
    case "RECEIVED":
      return t("order_ready");
    case "PAYED":
      return t("order_payed");
    default:
      return "";
  }
};

const OrderCard: React.FC<IOrderCardProps> = ({ order, status }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const time = order?.createdAt.slice(
    order?.createdAt.indexOf(":") - 2,
    order?.createdAt.indexOf(":") + 3
  );
  const { currency } = useTypedSelector((state) => state.selectedProperty);
  const [loading, setloading] = React.useState<boolean>(false);
  return (
    <Box style={{ background: loading ? "rgba(0, 0, 0, 0.5)" : "white" }} className={classes.root}>
      <Box>
        <Box className={classes.top}>
          <Typography>{t("table_#", { number: order?.tableName })}</Typography>
          <Typography>{time}</Typography>
        </Box>
        {loading && <CircularProgress style={{ alignSelf: "center" }} />}
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {order?.orderItem.map((item, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox" align="center" className={classes.cell}>
                  {item.quantity} x
                </TableCell>
                <TableCell className={classes.cell}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="caption">{item.customerComment}</Typography>
                </TableCell>
                <TableCell align="right" className={classes.cell}>
                  {item.price} {currency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography variant="caption">Total : {order?.priceTotal}</Typography>
      </Box>
      <Button
        onClick={() => updateOrderUtil(order!.id, status, order!.createdAt, dispatch, setloading)}
        className={classes.confirm}
        variant="contained"
        color="primary"
      >
        {statusToButtonLabel(status, t)}
      </Button>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400,
      height: "fit-content",
      minHeight: 300,
      borderRadius: 5,
      margin: 29,
      color: theme.palette.common.black,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    top: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `${theme.palette.secondary.main} 7px solid`,
      height: 50,
      paddingLeft: 40,
      paddingRight: 40,
    },
    table: {},
    cell: {
      color: theme.palette.getContrastText(theme.palette.common.white),
    },
    confirm: {},
  })
);

export default OrderCard;
