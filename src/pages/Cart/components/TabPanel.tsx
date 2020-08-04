import React from "react";
import Box from "@material-ui/core/Box";

type TTabPanel = {
  children: React.ReactNode;
  index: number;
  value: number;
};
const TabPanel = (props: TTabPanel) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cart-tabpanel-${index}`}
      aria-labelledby={`cart-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default TabPanel;
