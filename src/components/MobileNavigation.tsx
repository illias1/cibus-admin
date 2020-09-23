import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MenuIcon from "@material-ui/icons/Menu";
import {
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  withStyles,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { navigationTabs } from "./NavigationLayout";
import LangaugeSwitch from "./LanguageSwitch";
import { useTypedSelector } from "../store/types";
import { useDispatch } from "react-redux";
import StuffCallDesktop, { StuffCallCommon } from "./StuffCallDesktop";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 5,
    top: 5,
    transform: "none",
  },
}))(Badge);

type IMobileNavigationProps = {};

const MobileNavigation: React.FC<IMobileNavigationProps> = ({ ...props }) => {
  const history = useHistory();
  const [value, setValue] = React.useState(history.location.pathname);
  const [drawerOpen, setdrawerOpen] = React.useState<boolean>(false);
  const stuffCalls = useTypedSelector((state) => state.stuffCalls);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <>
      <StyledBadge color="error" badgeContent={stuffCalls.length}>
        <IconButton
          color="primary"
          className={classes.drawerAnchor}
          onClick={() => setdrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </StyledBadge>

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        classes={{ paper: classes.drawer }}
        onClose={() => setdrawerOpen(false)}
        onOpen={() => setdrawerOpen(true)}
      >
        <List>
          {[...navigationTabs.right, ...navigationTabs.other].map(({ to, Icon, label }) => (
            <Link onClick={() => setdrawerOpen(false)} key={label} className={classes.link} to={to}>
              <ListItem button>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={t(label)} />
              </ListItem>
            </Link>
          ))}
          <Divider />
          <LangaugeSwitch />
          <Divider />
          <StuffCallCommon dispatch={dispatch} t={t} stuffCalls={stuffCalls} />
        </List>
      </SwipeableDrawer>

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          history.push(newValue);
        }}
        showLabels
        className={classes.bottomNavigation}
      >
        {navigationTabs.left.map(({ label, Icon, to }) => (
          <BottomNavigationAction value={to} key={label} label={t(label)} icon={<Icon />} />
        ))}
      </BottomNavigation>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: "inherit",
      textDecoration: "none",
    },
    bottomNavigation: {
      width: "100%",
      bottom: 0,
      position: "fixed",
    },
    drawerAnchor: {
      position: "fixed",
      right: theme.spacing(2),
      top: theme.spacing(2),
      backgroundColor: theme.palette.secondary.light,
    },
    drawer: {
      width: "50%",
    },
  })
);

export default MobileNavigation;
