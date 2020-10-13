import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

type IExplanationMessageProps = {
  message: string;
};

const ExplanationMessage: React.FC<IExplanationMessageProps> = ({ message }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.help} variant="caption" color="inherit">
      {message}
    </Typography>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    help: {
      color: theme.palette.text.disabled,
    },
  })
);

export default ExplanationMessage;
