import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

type IMenuFallbackProps = {};

type IMenuItemProps = {};
const MenuItem: React.FC<IMenuItemProps> = ({ ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ width: "100%" }}>
        <div className={classes.item}>
          <Skeleton width={"50%"} height={20} variant="text" />
          <Skeleton width={20} height={20} variant="text" />
        </div>
        <Skeleton width={"85%"} height={40} variant="text" />
      </div>
      <Skeleton width={"30%"} height={60} variant="circle" />
    </div>
  );
};

const MenuFallback: React.FC<IMenuFallbackProps> = ({ ...props }) => {
  return (
    <>
      <Skeleton
        style={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
        width={"100%"}
        height={500}
        variant="rect"
      />
      <Skeleton
        style={{ margin: "20px 0 0 20px" }}
        width="30%"
        height={40}
        variant="text"
      />
      <MenuItem />
      <MenuItem />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      display: "flex",
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      width: "85%",
    },
  })
);

export default MenuFallback;
