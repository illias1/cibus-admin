import React from "react";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";

type INavigationTabProps = {
  to: string;
  Icon: React.FC;
};

const NavigationTab: React.FC<INavigationTabProps> = ({ to, Icon }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const theme = useTheme();
  return (
    <Link
      to={to}
      style={{
        backgroundColor:
          pathname === to ? theme.palette.primary.main : theme.palette.secondary.main,
      }}
      className={classes.root}
    >
      <Icon />
    </Link>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "20%",
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default NavigationTab;
