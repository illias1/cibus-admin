import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

type ICenteredTitleProps = {
  title: string;
};

const CenteredTitle: React.FC<ICenteredTitleProps> = ({ title, children }) => {
  const classes = useStyles();
  return (
    <Grid
      style={{ height: "100vh" }}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography className={classes.root}>{title}</Typography>
      {children}
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontSize: theme.typography.subtitle1.fontSize,
      lineHeight: theme.typography.subtitle1.lineHeight,
      textAlign: "center",
    },
  })
);

export default CenteredTitle;
