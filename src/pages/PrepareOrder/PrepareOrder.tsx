import React from "react";
import OrderCard from "../../components/OrderCard";
import { useTypedSelector } from "../../store/types";
import { filterOrderByStatus } from "../../store/selectors";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import OrderBy, { sortByTableOrTime } from "../../components/OrderBy";
import CenteredTitle from "../../components/CenteredTitle";

type INewOrderProps = {};

const NewOrder: React.FC<INewOrderProps> = ({ ...props }) => {
  const RECEIVED_BY_RESTAURANTOrders = useTypedSelector(
    filterOrderByStatus("RECEIVED_BY_RESTAURANT")
  );
  const { t } = useTranslation();
  const classes = useStyles();
  const [orderBy, setorderBy] = React.useState<"table" | "time">("time");
  const handleOrderByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setorderBy((event.target as HTMLInputElement).value as "time" | "table");
  };
  if (RECEIVED_BY_RESTAURANTOrders.length === 0) {
    return <CenteredTitle title={t("no_orders_being_prepared_today")} />;
  }
  return (
    <Box className={classes.root}>
      <OrderBy orderBy={orderBy} handleOrderByChange={handleOrderByChange} />

      {RECEIVED_BY_RESTAURANTOrders.sort((a, b) => sortByTableOrTime(a, b, orderBy)).map(
        (item, index) => (
          <OrderCard status="READY" key={index} order={item} />
        )
      )}
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
