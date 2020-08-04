import React from "react";
import { useTypedSelector, TStore } from "../../store/types";
// screens and components
import WelcomeScreen from "./components/WelcomeScreen";
import GuideScreen from "./components/GuideScreen";
import MenuScreen from "./components/MenuScreen.tsx";

type IMenuProps = {};

const Menu: React.FC<IMenuProps> = ({ ...props }) => {
  const { userName, userAlreadyVisited } = useTypedSelector((state) => state);
  React.useEffect(() => {
    console.log(Boolean(userName), "userName");
  }, [userName]);
  return (
    <>
      {!Boolean(userName) ? (
        <WelcomeScreen />
      ) : userAlreadyVisited ? (
        <MenuScreen />
      ) : (
        <GuideScreen />
      )}
    </>
  );
};

export default Menu;
