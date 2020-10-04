import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

type IMainActionButtonProps = {
  disabled: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const MainActionButton: React.FC<IMainActionButtonProps> = ({
  disabled,
  children,
  onClick,
  style,
}) => {
  const classes = useStyles();
  return (
    <Button
      color="secondary"
      style={style}
      className={classes.submit}
      disabled={disabled}
      variant="contained"
      type="submit"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submit: {
      position: "absolute",
      bottom: 0,
      right: 0,
      textTransform: "none",
      padding: "12px 20px",
      borderRadius: 25,
      fontSize: 20,
    },
  })
);

export default MainActionButton;
