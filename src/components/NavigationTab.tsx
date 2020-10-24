import React from "react";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";

type INavigationTabProps = {
  to: string;
  Icon: React.FC;
  number?: number;
};

const NavigationTab: React.FC<INavigationTabProps> = ({ to, Icon, number }) => {
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
      {number !== undefined && number > 0 && (
        <Typography className={classes.number}>{number}</Typography>
      )}
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
      position: "relative",
    },
    number: {
      position: "absolute",
      right: -5,
      top: "10%",
      background: theme.palette.getContrastText(theme.palette.background.default),
      padding: 5,
      borderRadius: 5,
    },
  })
);

export default NavigationTab;
