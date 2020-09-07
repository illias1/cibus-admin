import React from "react";
import {
  Language,
  MenuItemStatus,
  GetPropertyQueryVariables,
  UpdateMenuItemMutation,
  UpdateMenuItemMutationVariables,
} from "../../API";
import { updateMenuItem } from "../../graphql/mutations";
// compoents
import AddMenuItemForm from "./components/CreateMenuItemForm";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  makeStyles,
  Theme,
  createStyles,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import { useQuery } from "../../utils/useQuery";
import { useTypedSelector } from "../../store/types";
import {
  ordeMenuItemsByCategories,
  GetPropertyQuery,
  getProperty,
  TcategorizedMenuItems,
} from "./components/utils";
import Loader from "../../components/Loader";
import MenuItemCard from "./components/MenuItem";
import { mutation } from "../../utils/mutation";
import { useTranslation } from "react-i18next";

type IMenuProps = {};

const Menu: React.FC<IMenuProps> = ({ ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [showCreateForm, setshowCreateForm] = React.useState<boolean>(false);
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
              ? { ...prev, [curr.id]: curr?.status === MenuItemStatus.AVAILABLE }
              : prev,
          {} as Record<string, boolean>
        )
      );
      setcategorizedMenuItems(ordeMenuItemsByCategories(data.getProperty));
      setlanguages(data.getProperty.menu.items[0]!.i18n.map((item) => item.language));
    }
  }, [data]);
  const [categorizedMenuItems, setcategorizedMenuItems] = React.useState<TcategorizedMenuItems>([]);
  const [state, setState] = React.useState<Record<string, boolean>>({});
  const [languages, setlanguages] = React.useState<Language[]>([]);
  const [newLanguage, setnewLanguage] = React.useState<Language>();
  const [isUpdating, setisUpdating] = React.useState<string>("");
  const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setisUpdating(event.target.name);
    setState({ ...state, [event.target.name]: event.target.checked });
    const { data, error } = await mutation<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>(
      updateMenuItem,
      {
        input: {
          id: event.target.name,
          status: event.target.checked
            ? MenuItemStatus["AVAILABLE"]
            : MenuItemStatus["OUT_OF_STOCK"],
        },
      }
    );
    if (data?.updateMenuItem?.status && data.updateMenuItem.id) {
      setState({
        ...state,
        [data.updateMenuItem.id]: data.updateMenuItem.status === MenuItemStatus.AVAILABLE,
      });
    } else {
    }
    setisUpdating("");
  };
  return (
    <Box className={classes.page}>
      <Typography>{t("menu_page_translated_languages")}</Typography>
      <Box className={classes.item}>
        {languages.map((item) => (
          <Chip label={item} />
        ))}
      </Box>
      <Box className={classes.item}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">
            {t("menu_page_new_translation")}
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            value={newLanguage}
            onChange={(e) => {
              setnewLanguage(e.target.value as Language);
            }}
          >
            {Object.keys(Language).map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton
          color="primary"
          onClick={() => {
            if (newLanguage) {
              setlanguages([...languages, newLanguage]);
            }
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      <Button
        variant="outlined"
        color={showCreateForm ? "secondary" : "primary"}
        onClick={() => setshowCreateForm(!showCreateForm)}
      >
        {showCreateForm ? t("menu_hide_the_form") : t("menu_create_new_item")}
      </Button>
      <Collapse in={showCreateForm}>
        <AddMenuItemForm
          onCreate={(data) => {
            const updatedCategorizedMenuItems = categorizedMenuItems
              ? categorizedMenuItems.map((item) =>
                  item.category === data.createMenuItem!.i18n[0]!.category
                    ? { ...item, items: [...item.items, data.createMenuItem] }
                    : item
                )
              : [
                  {
                    category: data.createMenuItem?.i18n[0].category,
                    items: [data.createMenuItem],
                  },
                ];
            // @ts-ignore
            setcategorizedMenuItems(updatedCategorizedMenuItems);
          }}
          languages={languages}
        />
      </Collapse>
      {loading ? (
        <Loader />
      ) : data && data.getProperty && ordeMenuItemsByCategories(data.getProperty) ? (
        <Box className={classes.root}>
          {categorizedMenuItems?.map(({ items, category }, i) => (
            <React.Fragment key={category}>
              <Typography id={`category-${category}`} className={classes.title} variant="h4">
                {category}
              </Typography>
              {items.map((item, index) => (
                <Box className={classes.item} key={index}>
                  {item ? (
                    <>
                      <Box className={classes.itemContainer}>
                        <MenuItemCard
                          id={item.id}
                          title={item!.i18n[0].name}
                          ingredients={item!.i18n[0].description || ""}
                          price={item!.price}
                          img={item.image || ""}
                        />
                      </Box>
                      {isUpdating === item.id ? (
                        <Box width={100}>
                          <LinearProgress />
                        </Box>
                      ) : (
                        <FormControlLabel
                          control={
                            <Switch
                              checked={state[item.id]}
                              onChange={handleSwitchChange}
                              name={item.id}
                              color="primary"
                            />
                          }
                          label="Available"
                        />
                      )}
                    </>
                  ) : null}
                </Box>
              ))}
            </React.Fragment>
          ))}
        </Box>
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
    root: {
      padding: "18px 23px",
    },
    title: {
      font: "SemiBold 17px/20px Josefin Sans",
      letterSpacing: 0,
    },
    item: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    itemContainer: {
      width: 375,
      marginRight: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
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
