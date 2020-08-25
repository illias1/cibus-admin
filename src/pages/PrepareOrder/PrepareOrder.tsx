import React from "react";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../store/types";
import { filterOrderByStatus } from "../../store/selectors";

type IPrepareOrderProps = {};

const PrepareOrder: React.FC<IPrepareOrderProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const awaitingOrders = useTypedSelector(filterOrderByStatus("ACCEPTED"));

  return (
    <div>
      {awaitingOrders.length > 0
        ? JSON.stringify(awaitingOrders)
        : t("no_orders_being_prepared_today")}
    </div>
  );
};

export default PrepareOrder;
