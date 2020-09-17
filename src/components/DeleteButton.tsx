import { Button, ClickAwayListener, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

type IDeleteButtonProps = {
  onClick: () => void;
};

const DeleteButton: React.FC<IDeleteButtonProps> = ({ onClick }) => {
  const [deleteOn, setdeleteOn] = React.useState<boolean>(false);
  const classes = useStyles();
  const { t } = useTranslation();
  const handleDelete = async () => {
    if (deleteOn) {
      onClick();
    } else {
      setdeleteOn(true);
    }
  };
  return (
    <ClickAwayListener onClickAway={() => setdeleteOn(false)}>
      <Button
        onClick={handleDelete}
        variant={deleteOn ? "contained" : "outlined"}
        className={classes.delete}
      >
        {deleteOn ? t("confirm") : t("delete")}
      </Button>
    </ClickAwayListener>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    delete: {
      color: theme.palette.error.main,
    },
  })
);

export default DeleteButton;
