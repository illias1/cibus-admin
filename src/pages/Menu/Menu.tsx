import React from "react";
import { GetPropertyQueryVariables } from "../../API";
// compoents
import { makeStyles, Theme, createStyles, Fab, Drawer } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useQuery } from "../../utils/useQuery";
import { useTypedSelector } from "../../store/types";
import { GetPropertyQuery, getProperty } from "./components/utils";
import Loader from "../../components/Loader";
import CreateMenuItemFormWithLanguages from "./components/CreateMenuItemFormWithLanguages";
import { useDispatch } from "react-redux";
import { setupMenu } from "../../store/actions";
import CategoryListItem from "./components/CategoryListItem";
import { TNonNullMenuItem } from "../../types";
import ComponentCreateFormWithLanguages from "./components/ComponentCreateFormWithLanguages";
type IMenuProps = {};
export type TMenuState = Record<
  string,
  {
    favorite: boolean;
    status: boolean;
  }
>;

export type TDrawerState = {
  open: boolean;
  item: TNonNullMenuItem | null;
  manageComponents?: boolean;
};

const Menu: React.FC<IMenuProps> = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { name } = useTypedSelector((state) => state.selectedProperty);
  const { loading, data } = useQuery<GetPropertyQuery, GetPropertyQueryVariables>(getProperty, {
    name,
  });
  React.useEffect(() => {
    if (data && data.getProperty) {
      dispatch(setupMenu(data.getProperty));
    }
  }, [data]);

  const toggleDrawer = (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setopenDrawer({
      ...openDrawer,
      open: false,
      item: null,
    });
  };

  const [openDrawer, setopenDrawer] = React.useState<TDrawerState>({
    open: false,
    item: null,
    manageComponents: false,
  });
  return (
    <Box id="menuContainer" className={classes.page}>
      <Fab
        onClick={() =>
          setopenDrawer({
            ...openDrawer,
            open: true,
            item: null,
          })
        }
        color="primary"
        className={classes.fab}
      >
        <AddCircleIcon />
      </Fab>
      <Drawer
        classes={{
          paper: classes.drawer,
        }}
        anchor="left"
        open={openDrawer.open}
        onClose={toggleDrawer}
      >
        {openDrawer.manageComponents ? (
          <ComponentCreateFormWithLanguages setopenDrawer={setopenDrawer} />
        ) : (
          <CreateMenuItemFormWithLanguages openDrawer={openDrawer} setopenDrawer={setopenDrawer} />
        )}
      </Drawer>
      {loading ? <Loader /> : <CategoryListItem setopenDrawer={setopenDrawer} />}
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
      paddingTop: 30,
    },
    fab: {
      position: "fixed",
      bottom: "75px",
      right: 20,
      zIndex: 1,
      [theme.breakpoints.up("sm")]: {
        right: 100,
      },
      [theme.breakpoints.up("md")]: {
        right: 150,
      },
      [theme.breakpoints.up("lg")]: {
        right: "15%",
      },
    },
    drawer: {
      width: "50%",
      [theme.breakpoints.down("md")]: {
        width: "75%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  })
);
