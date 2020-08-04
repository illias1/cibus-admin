import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import headerImage from "../../../assets/hero-photo.png";

type ICartHeaderProps = {};

const CartHeader: React.FC<ICartHeaderProps> = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundImage: `url(${headerImage})`,
        backgroundPositionY: "bottom",
      }}
      className={classes.root}
    >
      <Typography align="center" className={classes.text} variant="h6">
        Eleven Madison Park
      </Typography>
      <Typography align="center" className={classes.text} variant="body1">
        11 Madison Ave, New York, NY 10010,
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottomLeftRadius: theme.spacing(6),
      borderBottomRightRadius: theme.spacing(6),
      height: 96,
      width: "100%",
      padding: 16,
      boxSizing: "border-box",
    },
    text: {
      color: "#fff",
    },
  })
);

export default CartHeader;
