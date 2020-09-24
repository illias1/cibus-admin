import React from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useTranslation } from "react-i18next";
import { Box, Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../../store/actions";
import LanguageSwitch from "../../components/LanguageSwitch";

type ISettingsProps = {};

const Settings: React.FC<ISettingsProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <LanguageSwitch />
      <Button
        onClick={() => dispatch(setSelectedProperty({ name: "", open: false, currency: "" }))}
      >
        Go to properties list
      </Button>
      <AmplifySignOut button-text={t("sign_out")}></AmplifySignOut>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      height: "100%",
      alignItems: "center",
    },
  })
);

export default Settings;
