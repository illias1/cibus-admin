import React from "react";

type ISettingsProps = {};

const Settings: React.FC<ISettingsProps> = ({ ...props }) => {
  React.useEffect(() => {
    console.log("rendered settings");
  }, []);
  return <div>Settings</div>;
};

export default Settings;
