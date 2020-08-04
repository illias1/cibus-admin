import { withStyles, Tabs, Theme, createStyles, Tab } from "@material-ui/core";
import React from "react";

export const CustomTabs = withStyles({
  root: {
    marginBottom: "2em",
  },
  indicator: {
    display: "none",
  },
})(Tabs);

export const CustomTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: "50%",
      fontWeight: theme.typography.fontWeightBold,
      fontFamily: theme.typography.fontFamily,
      fontSize: "25px",
      color: theme.palette.action.disabled,
      boxShadow: "0px 5px 30px #0000000D",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      borderRadius: "10px",
      "&$selected": {
        color: theme.palette.text.primary,
      },
      //   "&:focus": {
      //     color: "#40a9ff",
      //   },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label: string;
}
