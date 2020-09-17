import React from "react";
import OrderCard from "../../components/OrderCard";
import { useTypedSelector } from "../../store/types";
import { filterOrderByStatus } from "../../store/selectors";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

import OrderBy, { sortByTableOrTime } from "../../components/OrderBy";

type INewOrderProps = {};

const NewOrder: React.FC<INewOrderProps> = ({ ...props }) => {
  const REQUESTEDOrders = useTypedSelector(filterOrderByStatus("REQUESTED_BY_CUSTOMER"));
  const { t } = useTranslation();
  const classes = useStyles();
  const [orderBy, setorderBy] = React.useState<"table" | "time">("table");
  React.useEffect(() => {
    console.log("orderBy", orderBy);
    console.log(
      REQUESTEDOrders.sort((a, b) => sortByTableOrTime(a, b, orderBy)).map((item) => item.tableName)
    );
  }, [orderBy]);
  const handleOrderByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setorderBy((event.target as HTMLInputElement).value as "time" | "table");
  };
  return (
    <Box className={classes.root}>
      <OrderBy orderBy={orderBy} handleOrderByChange={handleOrderByChange} />
      {REQUESTEDOrders.length > 0
        ? REQUESTEDOrders.sort((a, b) => sortByTableOrTime(a, b, orderBy)).map((item, index) => (
            <OrderCard status="RECEIVED_BY_RESTAURANT" key={index} order={item} />
          ))
        : t("no_new_orders_today")}
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
