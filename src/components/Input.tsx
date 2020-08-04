import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Input from "@material-ui/core/Input";

type IInputProps = {
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

export const StyledInput: React.FC<IInputProps> = ({
  placeholder,
  onChange,
}) => {
  const classes = useStyles();
  return (
    <>
      <Input
        className={classes.root}
        placeholder={placeholder}
        id="input-with-icon-adornment"
        disableUnderline={true}
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
        onChange={(e) => onChange(e)}
      />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1),
    },
  })
);
