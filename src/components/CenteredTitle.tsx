import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

type ICenteredTitleProps = {
  title: string;
};

const CenteredTitle: React.FC<ICenteredTitleProps> = ({ title }) => {
  const classes = useStyles();
  return (
    <Grid style={{ height: "100vh" }} container alignItems="center">
      <Typography className={classes.root}>{title}</Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontSize: theme.typography.homeTitle.fontSize,
      lineHeight: theme.typography.homeTitle.lineHeight,
      textAlign: "center",
    },
  })
);

export default CenteredTitle;
