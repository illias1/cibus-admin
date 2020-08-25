import { TStore, OrderStatus } from "./types";
export const filterOrderByStatus = (status: OrderStatus) => (store: TStore) =>
  store.orders.filter((order) => order?.status === status);
