import React from "react";
import Navigator from "./components/Navigator";

type IAppProps = {};

const App: React.FC<IAppProps> = ({ ...props }) => {
  return (
    <>
      <Navigator />
    </>
  );
};

export default App;
