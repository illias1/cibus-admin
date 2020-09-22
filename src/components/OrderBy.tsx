import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { TStore } from "../store/types";

export type TOrderBy = "time" | "table";

type IOrderByProps = {
  orderBy: TOrderBy;
  handleOrderByChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const OrderBy: React.FC<IOrderByProps> = ({ orderBy, handleOrderByChange }) => {
  const { t } = useTranslation();
  return (
    <FormControl style={{ marginTop: 10 }} component="fieldset">
      <FormLabel component="legend">{t("order_by")}</FormLabel>
      <RadioGroup
        row
        aria-label="order-by"
        name="orderBy"
        value={orderBy}
        onChange={handleOrderByChange}
      >
        <FormControlLabel value="time" control={<Radio />} label={t("time")} />
        <FormControlLabel value="table" control={<Radio />} label={t("table")} />
      </RadioGroup>
    </FormControl>
  );
};

export const sortByTableOrTime = (
  a: TStore["orders"][number],
  b: TStore["orders"][number],
  orderBy: TOrderBy
) =>
  orderBy === "time"
    ? a.createdAt.localeCompare(b.createdAt)
    : a.tableName.localeCompare(b.tableName);

export default OrderBy;
