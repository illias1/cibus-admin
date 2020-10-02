import {
  Box,
  Button,
  Collapse,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Language, MenuComponentInput } from "../../../API";
import { useTypedSelector } from "../../../store/types";
import { TDrawerState } from "../Menu";
import ComponentCreateForm from "./ComponentCreateForm";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import { CustomTheme } from "../../../utils/theme";

type IComponentCreateFormWithLanguagesProps = {
  setopenDrawer: React.Dispatch<React.SetStateAction<TDrawerState>>;
};
export type TAddEditState = {
  open: boolean;
  item?: MenuComponentInput;
};

const ComponentCreateFormWithLanguages: React.FC<IComponentCreateFormWithLanguagesProps> = ({
  setopenDrawer,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { menuComponents } = useTypedSelector((state) => state.menu);
  const [addEditState, setaddEditState] = React.useState<TAddEditState>({
    open: false,
  });
  return (
    <Box className={classes.text}>
      <Typography style={{ padding: 16 }} color="primary" variant="h4">
        {t("title_components")}
      </Typography>
      <Typography className={classes.text} gutterBottom paragraph color="primary">
        {t("components_explanation")}
      </Typography>
      <Collapse in={!addEditState.open}>
        <List>
          {menuComponents.map((comp) => (
            <ListItem
              button
              onClick={() => {
                setaddEditState({ open: true, item: comp });
              }}
              color="inherit"
              key={comp.id}
            >
              <ListItemIcon>
                <EditIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={comp.translations[0].label} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          className={classes.createNew}
          onClick={() => setaddEditState({ open: true })}
        >
          {t("add_new")}
        </Button>
      </Collapse>
      <Collapse in={addEditState.open}>
        <ComponentCreateForm setaddEditState={setaddEditState} item={addEditState.item} />{" "}
        <Button
          className={classes.comeBackToComp}
          onClick={() => setaddEditState({ open: false, item: undefined })}
        >
          {t("menu_form_back_to_components")}
        </Button>
      </Collapse>
      <Button
        variant="contained"
        color="secondary"
        className={classes.cancel}
        onClick={() =>
          setopenDrawer({
            open: false,
            manageComponents: false,
            item: null,
          })
        }
      >
        {t("cancel")}
      </Button>
    </Box>
  );
};

const useStyles = makeStyles((theme: CustomTheme) =>
  createStyles({
    comeBackToComp: {
      display: "block",
      margin: "10px auto",
    },
    createNew: {
      color: "white",
      background: "#191A39",
      textTransform: "none",
      position: "absolute",
      right: "10px",
      bottom: "20px",
      padding: "10px 20px",
    },
    cancel: {
      position: "absolute",
      right: "10px",
      top: "20px",
    },
    text: {
      paddingRight: 16,
      paddingLeft: 16,
    },
  })
);

export default ComponentCreateFormWithLanguages;
