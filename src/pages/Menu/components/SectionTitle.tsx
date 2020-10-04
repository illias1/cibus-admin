import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

type ISectionTitleProps = {
  title: string;
  explanation?: string;
};

const SectionTitle: React.FC<ISectionTitleProps> = ({ title, explanation }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h6">{title}</Typography>
      <Typography color="primary">{explanation}</Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
    },
  })
);

export default SectionTitle;
