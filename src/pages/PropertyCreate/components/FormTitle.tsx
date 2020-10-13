import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

type IFormTitleProps = {
  title: string;
};

const FormTitle: React.FC<IFormTitleProps> = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography gutterBottom className={classes.formTitle} variant="h5">
      {title}
    </Typography>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formTitle: {
      color: theme.palette.text.hint,
      marginTop: 50,
    },
  })
);

export default FormTitle;
