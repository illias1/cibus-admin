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
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
// icons
import PrintIcon from "@material-ui/icons/Print";
import BlockIcon from "@material-ui/icons/Block";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { TStore, OrderStatus, useTypedSelector, OrderStatusEnum } from "../store/types";
import { useTranslation } from "react-i18next";
import { updateOrderUtil } from "../utils/updateOrderStatus";
import { useDispatch } from "react-redux";
import { TFunction } from "i18next";
import { priceDisplay } from "../pages/Menu/components/utils";
import { Currency, Language } from "../API";
import SimplePopover from "./Popover";
type IOrderCardProps = {
  order: TStore["orders"][0];
  // handleConfirm: (id: string) => void;
  status: OrderStatus;
};

const statusToButtonLabelMain = (status: OrderStatus, t: TFunction): string => {
  switch (status) {
    case "RECEIVED_BY_RESTAURANT":
      return t("confirm");
    case "READY":
      return t("order_ready");
    case "PAYED":
      return t("order_payed");
    default:
      return "";
  }
};
const statusToButtonLabelSecondary = (status: OrderStatus, t: TFunction): string => {
  switch (status) {
    case "RECEIVED_BY_RESTAURANT":
      return t("cancel");
    default:
      return t("help");
  }
};

const OrderCard: React.FC<IOrderCardProps> = ({ order, status }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { currency } = useTypedSelector((state) => state.selectedProperty);
  const [loading, setloading] = React.useState<boolean>(false);
  return (
    <Box style={{ background: loading ? "rgba(0, 0, 0, 0.5)" : "white" }} className={classes.root}>
      <Box>
        <Box className={classes.top}>
          <Typography>{t("table_#", { number: order?.tableName })}</Typography>
          <Typography>{new Date(order.createdAt).toLocaleTimeString()}</Typography>
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
                  <Typography style={{ lineHeight: 1 }} variant="h6">
                    {item.name}
                  </Typography>
                  <Typography variant="caption">{item.customerComment}</Typography>
                </TableCell>
                <TableCell align="right" className={classes.cell}>
                  {item.price} {currency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Typography className={classes.total} variant="h6">
        Total : {priceDisplay(currency as Currency, order!.priceTotal, i18n.language as Language)}
      </Typography>
      <Container className={classes.bottom}>
        <SimplePopover
          startIcon={<PrintIcon />}
          buttonClassName={classes.button}
          buttonLabel={t("card_button_print")}
          Content={() => (
            <Box style={{ padding: 10 }}>
              {" "}
              <Typography>{t("card_print_tell_us_if_needed")}</Typography>
            </Box>
          )}
        />
        <Button
          onClick={() => updateOrderUtil(order!.id, status, order!.createdAt, dispatch, setloading)}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          {statusToButtonLabelMain(status, t)}
        </Button>
        <Button
          startIcon={<BlockIcon />}
          className={classes.button}
          variant="contained"
          color="inherit"
          onClick={
            OrderStatusEnum.REQUESTED_BY_CUSTOMER === order?.status
              ? () => updateOrderUtil(order!.id, "DENIED", order!.createdAt, dispatch, setloading)
              : () => console.log("not received by rstaurant status")
          }
        >
          {statusToButtonLabelSecondary(status, t)}
        </Button>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "90%",
      maxWidth: 500,
      height: "fit-content",
      minHeight: 300,
      borderRadius: 5,
      marginTop: 29,
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
    button: {
      borderRadius: 36,
      textTransform: "capitalize",
    },
    bottom: {
      display: "flex",
      justifyContent: "space-around",
      marginBottom: 10,
    },
    total: {
      textAlign: "right",
      marginRight: theme.spacing(2),
    },
  })
);

export default OrderCard;
