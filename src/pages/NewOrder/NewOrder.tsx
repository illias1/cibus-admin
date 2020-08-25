import React from "react";
import OrderCard from "../../components/OrderCard";
import { useTypedSelector } from "../../store/types";
import { filterOrderByStatus } from "../../store/selectors";
import { useTranslation } from "react-i18next";

type INewOrderProps = {};

const NewOrder: React.FC<INewOrderProps> = ({ ...props }) => {
  const awaitingOrders = useTypedSelector(filterOrderByStatus("AWAITING"));
  const { t } = useTranslation();
  return (
    <div>
      {awaitingOrders.length > 0
        ? awaitingOrders.map((item) => <OrderCard order={item} />)
        : t("no_new_orders_today")}
    </div>
  );
};

export default NewOrder;
