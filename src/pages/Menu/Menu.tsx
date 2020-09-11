import React from "react";
import { Language, MenuItemStatus, GetPropertyQueryVariables } from "../../API";
// compoents
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { useQuery } from "../../utils/useQuery";
import { useTypedSelector } from "../../store/types";
import {
  ordeMenuItemsByCategories,
  GetPropertyQuery,
  getProperty,
  TcategorizedMenuItems,
} from "./components/utils";
import Loader from "../../components/Loader";
import CreateMenuItemFormWithLanguages from "./components/CreateMenuItemFormWithLanguages";
import DisplayMenuItems from "./components/DisplayMenuItems";
import { useDispatch } from "react-redux";
import { setupMenu } from "../../store/actions";

type IMenuProps = {};
export type TMenuState = Record<
  string,
  {
    favorite: boolean;
    status: boolean;
  }
>;

const Menu: React.FC<IMenuProps> = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { name } = useTypedSelector((state) => state.selectedProperty);
  const { loading, data } = useQuery<GetPropertyQuery, GetPropertyQueryVariables>(getProperty, {
    name,
  });
  React.useEffect(() => {
    if (data && data.getProperty && data.getProperty.menu && data.getProperty.menu.items) {
      console.log("data", data);
      setState(
        data.getProperty.menu.items.reduce(
          (prev, curr) =>
            curr && curr.id
              ? {
                  ...prev,
                  [curr.id]: {
                    favorite: curr?.favorite ? true : false,
                    status: curr?.status === MenuItemStatus.AVAILABLE,
                  },
                }
              : prev,
          {} as TMenuState
        )
      );
      console.log("setState after receive data launched", state);
      dispatch(setupMenu(ordeMenuItemsByCategories(data.getProperty)));
      if (data.getProperty.menu.items.length > 0) {
        setlanguages(data.getProperty.menu.items[0]!.i18n.map((item) => item.language));
      }
    }
  }, [data]);

  const [state, setState] = React.useState<TMenuState>({});
  const [languages, setlanguages] = React.useState<Language[]>([]);
  React.useEffect(() => {
    console.log("state", state);
  }, [state]);

  return (
    <Box className={classes.page}>
      <CreateMenuItemFormWithLanguages
        setState={setState}
        languages={languages}
        setlanguages={setlanguages}
      />

      {loading ? (
        <Loader />
      ) : data && data.getProperty && ordeMenuItemsByCategories(data.getProperty) ? (
        <DisplayMenuItems state={state} setState={setState} languages={languages} />
      ) : (
        "no menu items"
      )}
    </Box>
  );
};

export default Menu;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    image: {
      borderBottomLeftRadius: theme.spacing(6),
      borderBottomRightRadius: theme.spacing(6),
      width: "100%",
      height: "599px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
  })
);

// export type I18nMenuItemInput = {
//   language: Language;
//   name: string;
//   category?: string | null;
//   description?: string | null;
// };
// const menu: {
//   propertyName: string;
//   i18n: Array<I18nMenuItemInput>;
//   price: number;
//   status: MenuItemStatus;
//   allergyInfo: string | null;
//   callories?: string | null;
//   image?: string | null;
//   notes?: string | null;
// }[] = [
//   // ============================================================================================================================================
//   {
//     propertyName: "valhalla",
//     price: 2.0,
//     status: MenuItemStatus["AVAILABLE"],
//     allergyInfo: "",
//     callories: "",
//     image: "",
//     notes: "",
//     i18n: [
//       {
//         language: Language["es"],
//         name: "",
//         category: "Cervezas",
//         description: "",
//       },
//     ],
//   },
// ];
