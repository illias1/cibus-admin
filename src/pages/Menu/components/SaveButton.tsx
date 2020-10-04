import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { CustomTheme } from "../../../utils/theme";

type ISaveButtonProps = {
  disabled?: boolean;
  classname?: string;
};

const SaveButton: React.FC<ISaveButtonProps> = ({ classname, disabled, children }) => {
  const useClasses = useStyles();
  return (
    <Button
      color="primary"
      variant="contained"
      size="large"
      className={`${classname} ${useClasses.save}`}
      type="submit"
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

const useStyles = makeStyles((theme: CustomTheme) =>
  createStyles({
    save: {
      textTransform: "none",
      background: theme.palette.primaryBlack,
      color: "white",
      marginTop: 40,
      marginBottom: 40,
      position: "absolute",
      padding: "10px 35px",
      right: 10,
    },
  })
);

export default SaveButton;
