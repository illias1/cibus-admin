import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

type IWelcomeFallbackProps = {};

const WelcomeFallback: React.FC<IWelcomeFallbackProps> = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton width={230} height={100} variant="text" />
      <div>
        <Skeleton width={230} height={100} variant="text" />
        <Skeleton width={230} height={20} variant="text" />
        <Skeleton width={230} height={20} variant="text" />
        <Skeleton
          style={{ margin: "auto" }}
          width={100}
          height={20}
          variant="text"
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      height: "100vh",
    },
  })
);

export default WelcomeFallback;
