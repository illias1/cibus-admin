import React from "react";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../store/types";
import { filterOrderByStatus } from "../../store/selectors";

type IDeliverOrderProps = {};

const DeliverOrder: React.FC<IDeliverOrderProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const awaitingOrders = useTypedSelector(filterOrderByStatus("COMPLETED"));
  /*
  ===================
  add "TO DELIVER status??"
  ===================
  */

  return (
    <div>
      {awaitingOrders.length > 0
        ? JSON.stringify(awaitingOrders)
        : t("no_orders_being_prepared_today")}
    </div>
  );
};

export default DeliverOrder;
