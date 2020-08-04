import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { StyledButton } from "../../../components/Button";
import { useTranslation } from "react-i18next";
type ITwoButtonsProps = {
  onCLickLeft: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCLickRight: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  leftLabel: string;
  rightLabel: string;
  rightDisable?: boolean;
};

const TwoButtons: React.FC<ITwoButtonsProps> = ({
  onCLickLeft,
  onCLickRight,
  leftLabel,
  rightLabel,
  rightDisable = false,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box className={classes.buttons}>
      <StyledButton className={classes.button} onCLick={onCLickLeft}>
        {t(leftLabel)}
      </StyledButton>
      <StyledButton
        disabled={rightDisable}
        className={classes.button}
        onCLick={onCLickRight}
      >
        {t(rightLabel)}
      </StyledButton>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: "flex",
      justifyContent: "space-evenly",
      padding: "0 15px",
      width: "100%",
      boxSizing: "border-box",
      marginTop: theme.spacing(2),
    },
    button: {
      width: "100%",
      margin: "0 7px",
    },
  })
);
export default TwoButtons;
