import React from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useTranslation } from "react-i18next";

type ISettingsProps = {};

const Settings: React.FC<ISettingsProps> = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <div>
      <AmplifySignOut button-text={t("sign_out")}></AmplifySignOut>
    </div>
  );
};

export default Settings;
