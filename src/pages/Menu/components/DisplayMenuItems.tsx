import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItemCard from "./MenuItem";
// utils
import { updateMenuItem } from "../../../graphql/mutations";
import {
  UpdateMenuItemMutation,
  UpdateMenuItemMutationVariables,
  MenuItemStatus,
} from "../../../API";
import { mutation } from "../../../utils/mutation";
import { TcategorizedMenuItems } from "./utils";

type IDisplayMenuItemsProps = {
  state: Record<string, boolean>;
  setState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  categorizedMenuItems: TcategorizedMenuItems;
};

const DisplayMenuItems: React.FC<IDisplayMenuItemsProps> = ({
  state,
  setState,
  categorizedMenuItems,
}) => {
  const classes = useStyles();
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
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "18px 23px",
    },
    title: {
      font: "SemiBold 17px/20px Josefin Sans",
      letterSpacing: 0,
    },
    itemContainer: {
      width: "100%",
      maxWidth: 400,
      marginRight: theme.spacing(3),
    },
    item: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
      },
    },
  })
);

export default DisplayMenuItems;
