import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

type ITitleProps = {
  title?: string;
  subtitle?: string;
};

const Title: React.FC<ITitleProps> = ({ title, subtitle }) => {
  const classes = useStyles();
  return (
    <>
      <Typography color="primary" gutterBottom variant="h1">
        {title}
      </Typography>
      <Typography color="primary" className={classes.intro} variant="body1">
        {subtitle}
      </Typography>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    intro: {
      //fontWeight: 100,
      marginBottom: 40,
    },
  })
);

export default Title;
