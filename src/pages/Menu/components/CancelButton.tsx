import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

type ICancelButtonProps = {
  onClick: () => void;
};

const CancelButton: React.FC<ICancelButtonProps> = ({ onClick, children }) => {
  const classes = useStyles();
  return (
    <Button variant="contained" color="secondary" className={classes.cancel} onClick={onClick}>
      {children}
    </Button>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cancel: {
      position: "absolute",
      right: "10px",
      top: "20px",
    },
  })
);

export default CancelButton;
