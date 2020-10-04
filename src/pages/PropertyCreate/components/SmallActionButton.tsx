import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

type ISmallActionButtonProps = {
  onClick: () => void;
};

const SmallActionButton: React.FC<ISmallActionButtonProps> = ({ onClick, children }) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} color="secondary" className={classes.check} variant="contained">
      {children}
    </Button>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    check: {
      padding: "2px 20px",
      textTransform: "none",
    },
  })
);

export default SmallActionButton;
