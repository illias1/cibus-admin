import React from "react";
import OrderCard from "../../components/OrderCard";
import { TStore, useTypedSelector } from "../../store/types";
import { filterOrderByStatus } from "../../store/selectors";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles, Typography, Divider } from "@material-ui/core";

import { sortByTableOrTime } from "../../components/OrderBy";
import { CustomTheme } from "../../utils/theme";
import Grid from "@material-ui/core/Grid/Grid";
import CenteredTitle from "../../components/CenteredTitle";

type INewOrderProps = {};

const NewOrder: React.FC<INewOrderProps> = ({ ...props }) => {
  const RECEIVEDOrders = useTypedSelector(filterOrderByStatus("READY"));
  const { currency } = useTypedSelector((state) => state.selectedProperty);
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box>
      {RECEIVEDOrders.sort((a, b) => sortByTableOrTime(a, b, "table")).length > 0 ? (
        Object.entries(groupBy(RECEIVEDOrders, "tableName")).map(([tableName, orderArray]) => (
          <Box key={tableName} className={classes.tableBox}>
            <Typography>
              Total table #{tableName} -{" "}
              {(orderArray as TStore["orders"])
                .reduce((prev, curr) => prev + curr.priceTotal, 0)
                .toFixed(2)}
              {currency}
            </Typography>
            {(orderArray as TStore["orders"]).map((item, index) => (
              <OrderCard status="PAYED" key={item.id} order={item} />
            ))}
          </Box>
        ))
      ) : (
        <CenteredTitle title={t("no_orders_being_deliverd_today")} />
      )}
    </Box>
  );
};
const groupBy = function (xs: any[], key: keyof typeof xs[number]) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const useStyles = makeStyles((theme: CustomTheme) =>
  createStyles({
    tableBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: theme.spacing(5),
    },
  })
);
export default NewOrder;
