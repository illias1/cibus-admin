import React, { Dispatch } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import DeleteIcon from "@material-ui/icons/Delete";
import { setRemoveStuffCall } from "../store/actions";
import { TFunction } from "i18next";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../store/types";
import ButtonBase from "@material-ui/core/ButtonBase";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

type IStuffCallDesktopProps = {};

export const StuffCallCommon: React.FC<{
  t: TFunction;
  stuffCalls: {
    table: string;
    createdAt: string;
  }[];
  dispatch: Dispatch<any>;
}> = ({ stuffCalls, t, dispatch }) => {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Typography color="primary">{t("call_stuff_table")}</Typography>
        </ListItemIcon>
        <ListItemText primary={t("call_stuff_time")} />
      </ListItem>
      {stuffCalls.map((call, index) => {
        return (
          <ListItem key={call.createdAt}>
            <ListItemIcon>
              <Typography color="primary">{call.table}</Typography>
            </ListItemIcon>
            <ListItemText primary={new Date(call.createdAt).toLocaleTimeString()} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => dispatch(setRemoveStuffCall(index))}
                color="inherit"
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </>
  );
};

const StuffCallDesktop: React.FC<IStuffCallDesktopProps> = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const stuffCalls = useTypedSelector((state) => state.stuffCalls);
  const [open, setopen] = React.useState<boolean>(false);
  return (
    <Collapse in={open} collapsedHeight={"3.5em"} className={classes.root}>
      <ButtonBase className={classes.buttonBase} onClick={() => setopen(!open)}>
        <Typography variant="h6" style={{ marginTop: 8, marginRight: 8 }} align="center">
          {t("stuff_call")}
        </Typography>
        {stuffCalls.length > 0 && (
          <Typography variant="h6" className={classes.stufCallsNumber}>
            {stuffCalls.length}
          </Typography>
        )}
      </ButtonBase>
      <List>
        <StuffCallCommon stuffCalls={stuffCalls} t={t} dispatch={dispatch} />
      </List>
    </Collapse>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.paper,
      zIndex: 1,
      position: "absolute",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderRadius: theme.spacing(1),
    },
    buttonBase: {
      display: "flex",
      alignItems: "baseline",
      width: "inherit",
    },
    stufCallsNumber: {
      width: "2em",
      borderRadius: "50%",
      background: theme.palette.error.dark,
    },
  })
);

export default StuffCallDesktop;
