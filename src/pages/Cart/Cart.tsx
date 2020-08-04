import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store/types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";
// componetns
import GroupTab from "./components/GroupTab";
import IndividualTab from "./components/IndividualTab";
import CartHeader from "./components/CartHeader";
import TabPanel from "./components/TabPanel";

function a11yProps(index: number) {
  return {
    id: `cart-tab-${index}`,
    "aria-controls": `cart-tabpanel-${index}`,
  };
}

type ICartProps = {};

const Cart: React.FC<ICartProps> = ({ ...props }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };
  return (
    <div>
      <CartHeader />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        className={classes.tabLabel}
      >
        <Tab label={t("cart_individual_order_tab_label")} {...a11yProps(0)} />
        <Tab label={t("cart_table_order_tab_label")} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <IndividualTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GroupTab />
      </TabPanel>
    </div>
  );
};

export default Cart;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabLabel: {
    textTransform: "none",
  },
}));
