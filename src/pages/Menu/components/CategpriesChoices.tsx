import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { ButtonBase, Chip } from "@material-ui/core";

type ICategpriesChoicesProps = {
  categories: string[];
  active: string;
  setactiveCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategpriesChoices: React.FC<ICategpriesChoicesProps> = ({
  categories,
  active,
  setactiveCategory,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {categories.map((cat) => (
        <ButtonBase key={cat} onClick={() => setactiveCategory(cat)}>
          <Chip
            className={classes.cat}
            label={cat}
            color={active === cat ? "primary" : "secondary"}
          />
        </ButtonBase>
      ))}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cat: {
      margin: 5,
      cursor: "pointer",
    },
    root: {
      marginBottom: 20,
      [theme.breakpoints.down("xs")]: {
        paddingRight: 30,
      },
    },
  })
);

export default React.memo(CategpriesChoices);
