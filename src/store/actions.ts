import actionCreatorFactory from "typescript-fsa";
import { TStore } from "./types";
import { TNonNullPropertyQuery } from "../types";
import {
  UpdateMenuItemMutation,
  CreateMenuItemMutation,
  MenuComponentInput,
  UpdatePropertyMutation,
} from "../API";

const actionCreator = actionCreatorFactory();

export const setSelectedProperty = actionCreator<TStore["selectedProperty"]>("setSelectedProperty");
export const setOrders = actionCreator<TStore["orders"]>("setOrders");
export const addRequestedOrder = actionCreator<TStore["orders"][0]>("addRequestedOrder");
export const updateOrderStatus = actionCreator<TStore["orders"][0]>("updateOrder");
export const setupMenu = actionCreator<TNonNullPropertyQuery>("setupMenu");
export const setUpdateMenuItem = actionCreator<{
  data: NonNullable<UpdateMenuItemMutation["updateMenuItem"]>;
  // needed in case of update of category since otherwise duplication of item (previous version statys in the old category)
  previousItemData: {
    category: string;
    id: string;
  };
}>("setUpdateMenuItem");
export const setDeleteMenuItem = actionCreator<Record<"id" | "category", string>>("deleteMenuItem");
export const setAddNewMenuItem = actionCreator<
  NonNullable<CreateMenuItemMutation["createMenuItem"]>
>("setAddNewMenuItem");
export const setupMenuComponents = actionCreator<
  NonNullable<UpdatePropertyMutation["updateProperty"]>["menuComponents"]
>("setupMenuComponents");
export const setAddStuffCall = actionCreator<TStore["stuffCalls"][number]>("setAddStuffCall");
export const setRemoveStuffCall = actionCreator<number>("setRemoveStuffCall");
export const setUser = actionCreator<{ id: string }>("setUser");
