import {
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
    <>
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
              <ListItemText secondary={comp.type} primary={comp.translations[0].label} />
            </ListItem>
          ))}
        </List>
        <IconButton
          style={{ width: "100%" }}
          color="primary"
          onClick={() => setaddEditState({ open: true })}
        >
          <AddCircleIcon />
        </IconButton>
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
        style={{ position: "absolute", right: 0 }}
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
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    comeBackToComp: {
      display: "block",
      margin: "10px auto",
    },
  })
);

export default ComponentCreateFormWithLanguages;
