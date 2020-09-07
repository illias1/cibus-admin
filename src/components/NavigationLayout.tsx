import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

// icons
import ReceiptIcon from "@material-ui/icons/Receipt";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import ListIcon from "@material-ui/icons/List";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import NavigationTab from "./NavigationTab";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import { IuseTypedHistoryProps } from "../utils/useTypedHistory";

const tabMapping = (tab: TNavTabs[0]) => <NavigationTab key={tab.to} to={tab.to} Icon={tab.Icon} />;

type TNavTabs = {
  to: IuseTypedHistoryProps;
  Icon: React.FC;
}[];
const navigationTabs: Record<"left" | "right", TNavTabs> = {
  left: [
    {
      to: "/new-order",
      Icon: () => <ReceiptIcon className={useStyles().icon} />,
    },
    {
      to: "/prepare-order",
      Icon: () => <FastfoodIcon className={useStyles().icon} />,
    },
    {
      to: "/delivered-order",
      Icon: () => <RestaurantIcon className={useStyles().icon} />,
    },
  ],
  right: [
    {
      to: "/tables",
      Icon: () => <ViewQuiltIcon className={useStyles().icon} />,
    },
    {
      to: "/menu",
      Icon: () => <ListIcon className={useStyles().icon} />,
    },
    {
      to: "/stats",
      Icon: () => <EqualizerIcon className={useStyles().icon} />,
    },
  ],
};

type INavigationLayoutProps = {};

const NavigationLayout: React.FC<INavigationLayoutProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.sidebar}>{navigationTabs.left.map(tabMapping)}</Box>
      <Box className={classes.center}>{children}</Box>
      <Box style={{ right: 0 }} className={classes.sidebar}>
        <Link style={{ top: 10 }} className={classes.cornerIcon} to="/">
          <HomeIcon fontSize="large" />
        </Link>
        {navigationTabs.right.map(tabMapping)}
        <Link style={{ bottom: 10 }} className={classes.cornerIcon} to="settings">
          <SettingsIcon fontSize="large" />
        </Link>
      </Box>
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
      maxWidth: "calc(100% - 180px)",
      margin: "auto",
    },
    root: {
      display: "flex",
      height: "100%",
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
