import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Typography, Divider, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

type IConfrimationPopupProps = {
  message: string;
  onConfirmationClick: () => void;
  open: boolean;
  handleClose: () => void;
};

const ConfrimationPopup: React.FC<IConfrimationPopupProps> = ({
  open,
  handleClose,
  onConfirmationClick,
  message,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const body = (
    <div className={classes.paper}>
      <Typography variant="subtitle2">{message}</Typography>
      <Divider />
      <div className={classes.divider} />
      <Button
        onClick={() => {
          onConfirmationClick();
          handleClose();
        }}
        className={classes.button}
      >
        {t("general_confirm")}
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-modal"
      aria-describedby="confirmation-modal"
    >
      {body}
    </Modal>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      borderTop: "2px solid #BAC0CB",
      borderTopColor: theme.palette.text.secondary,
      width: "100%",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(4),
      padding: theme.spacing(6, 2, 3),
      boxSizing: "border-box",
      margin: "-115px 0 0 -45%",
      top: "50%",
      left: "50%",
      width: "90%",
      height: "234px",
      position: "absolute",
      textAlign: "center",
      display: "flex",
      justifyContent: "space-evenly",
      flexDirection: "column",
      alignItems: "center",
    },
    button: {
      textTransform: "none",
    },
  })
);

export default ConfrimationPopup;
