import React from "react";
import { mock } from "../../MOCK_DATA";
import { mutation } from "../../utils/mutation";
import { CreateMenuItemMutation, CreateMenuItemMutationVariables } from "../../API";
import { createMenuItem } from "../../graphql/mutations";
type IMenuProps = {};

const Menu: React.FC<IMenuProps> = ({ ...props }) => {
  //   const handleClick = () => {
  //     for (let index = 30; index < 100; index++) {
  //       mutation<CreateMenuItemMutation, CreateMenuItemMutationVariables>(createMenuItem, {
  //         // @ts-ignore
  //         input: mock[index],
  //       });
  //     }
  //   };
  return <div>{/* <button onClick={handleClick}>load</button> */}</div>;
};

export default Menu;
