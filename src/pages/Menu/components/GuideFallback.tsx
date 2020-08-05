import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

type IGuideFallbackProps = {};

const GuideFallback: React.FC<IGuideFallbackProps> = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div>
      <Skeleton width={80} height={40} className={classes.skip} />
      <div className={classes.main}>
        <Skeleton width={"30%"} height={40} variant="text" />
        <Skeleton width={"60%"} height={40} variant="text" />
        <Skeleton width={"60%"} height={40} variant="text" />
        <Skeleton width={"80%"} height={200} variant="text" />
        <Skeleton width={"80%"} height={110} variant="text" />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    skip: {
      position: "absolute",
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    main: {
      bottom: theme.spacing(6),
      width: "80%",
      position: "absolute",
      left: "50%",
      transform: "translate(-40%, 0)",
    },
  })
);

export default GuideFallback;
