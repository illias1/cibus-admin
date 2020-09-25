import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

// icons
import ReceiptIcon from "@material-ui/icons/Receipt";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import ListIcon from "@material-ui/icons/List";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import NavigationTab from "./NavigationTab";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import { IuseTypedHistoryProps } from "../utils/useTypedHistory";
import { Hidden } from "@material-ui/core";
import MobileNavigation from "./MobileNavigation";
import StuffCallDesktop from "./StuffCallDesktop";

const tabMapping = (tab: TNavTabs[0]) => <NavigationTab key={tab.to} to={tab.to} Icon={tab.Icon} />;

type TNavTabs = {
  to: IuseTypedHistoryProps;
  Icon: React.FC;
  label: string;
}[];
export const navigationTabs: Record<"left" | "right" | "other", TNavTabs> = {
  left: [
    {
      to: "/new-order",
      Icon: () => <ReceiptIcon className={useStyles().icon} />,
      label: "navigation_new_order",
    },
    {
      to: "/prepare-order",
      Icon: () => <FastfoodIcon className={useStyles().icon} />,
      label: "navigation_cooking",
    },
    {
      to: "/delivered-order",
      Icon: () => <AttachMoneyIcon className={useStyles().icon} />,
      label: "navigation_to_pay",
    },
  ],
  right: [
    {
      to: "/tables",
      Icon: () => <ViewQuiltIcon className={useStyles().icon} />,
      label: "navigation_tables",
    },
    {
      to: "/menu",
      Icon: () => <ListIcon className={useStyles().icon} />,
      label: "navigation_menu",
    },
    {
      to: "/stats",
      Icon: () => <EqualizerIcon className={useStyles().icon} />,
      label: "navigation_stats",
    },
  ],
  other: [
    {
      to: "/settings",
      Icon: () => <SettingsIcon className={useStyles().icon} />,
      label: "navigation_settings",
    },
    {
      to: "/",
      Icon: () => <HomeIcon className={useStyles().icon} />,
      label: "navigation_home",
    },
  ],
};

type INavigationLayoutProps = {};

const NavigationLayout: React.FC<INavigationLayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Hidden xsDown>
        <StuffCallDesktop />
        <Box className={classes.sidebar}>{navigationTabs.left.map(tabMapping)}</Box>
        <Box style={{ right: 0 }} className={classes.sidebar}>
          <Link style={{ top: 10 }} className={classes.cornerIcon} to="/">
            <HomeIcon fontSize="large" />
          </Link>
          {navigationTabs.right.map(tabMapping)}
          <Link style={{ bottom: 10 }} className={classes.cornerIcon} to="settings">
            <SettingsIcon fontSize="large" />
          </Link>
        </Box>
      </Hidden>
      <Box className={classes.center}>{children}</Box>
      <Hidden smUp>
        <MobileNavigation />
      </Hidden>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebar: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      width: 70,
      margin: 10,
      height: "100vh",
      position: "fixed",
    },
    center: {
      flexGrow: 1,
      // -width is calculated by summing the 2x sidebar width + 4x margin
      marginRight: "auto",
      marginLeft: "auto",
      [theme.breakpoints.up("sm")]: {
        maxWidth: "calc(100% - 180px)",
      },
    },
    root: {
      display: "flex",
      height: "100%",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "56px",
        overflow: "hidden",
        overflowY: "scroll",
      },
    },
    icon: {
      color: theme.palette.common.white,
    },
    cornerIcon: {
      position: "absolute",
      right: 22,
      color: "white",
    },
  })
);

export default NavigationLayout;
