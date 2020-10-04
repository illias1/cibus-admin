import { useHistory } from "react-router-dom";

export type IuseTypedHistoryProps =
  | "/new-order"
  | "/prepare-order"
  | "/create-new-property"
  | "/delivered-order"
  | "/tables"
  | "/menu"
  | "/stats"
  | "/settings"
  | "/";

const useTypedHistory = () => {
  const history = useHistory();
  return { push: (to: IuseTypedHistoryProps) => history.push(to) };
};

export default useTypedHistory;
