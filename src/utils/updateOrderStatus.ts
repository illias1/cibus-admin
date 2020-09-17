import { mutation } from "./mutation";
import { UpdateOrderMutation, UpdateOrderMutationVariables } from "../API";
import { updateOrder } from "../graphql/mutations";
import { OrderStatusEnum, OrderStatus } from "../store/types";
import { updateOrderStatus } from "../store/actions";
import { Dispatch } from "react";

export const updateOrderUtil = async (
  id: string,
  status: OrderStatus,
  createdAt: string,
  dispatch: Dispatch<any>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  const { data, error } = await mutation<UpdateOrderMutation, UpdateOrderMutationVariables>(
    updateOrder,
    {
      input: {
        id,
        status: OrderStatusEnum[status],
        createdAt: createdAt,
      },
    }
  );
  if (data && data.updateOrder) {
    dispatch(updateOrderStatus(data["updateOrder"]));
    setLoading(false);
  }
  if (error) {
    alert(JSON.stringify(error));
    setLoading(false);
  }
};
