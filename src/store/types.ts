import { TypedUseSelectorHook, useSelector } from "react-redux";

export type TStore = {};

export const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;
