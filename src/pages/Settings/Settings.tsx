import React from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../../store/actions";

type ISettingsProps = {};

const Settings: React.FC<ISettingsProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div>
      <AmplifySignOut button-text={t("sign_out")}></AmplifySignOut>
      <Button onClick={() => dispatch(setSelectedProperty({ name: "", open: false }))}>
        Go to properties list
      </Button>
    </div>
  );
};

export default Settings;
