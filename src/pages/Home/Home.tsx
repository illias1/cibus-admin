import React from "react";
import { Typography, Grid, Switch, Box, makeStyles, Theme, createStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { mutation } from "../../utils/mutation";
import { UpdatePropertyMutation, UpdatePropertyMutationVariables } from "../../API";
import { updateProperty } from "../../graphql/mutations";
import { useTypedSelector } from "../../store/types";

type ISampleProps = {};
const hours = new Date().getHours();
console.log(hours, "hours");

const Sample: React.FC<ISampleProps> = ({ ...props }) => {
  const { open, name } = useTypedSelector((state) => state.selectedProperty);
  const [state, setState] = React.useState({
    checkedC: open,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    mutation<UpdatePropertyMutation, UpdatePropertyMutationVariables>(updateProperty, {
      input: {
        name,
        open: event.target.checked,
      },
    });
  };
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h3">
        {hours < 12 ? t("good_morning") : hours < 17 ? t("good_afternoon") : t("good_evening")}
      </Typography>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>
            <Typography>Close</Typography>
          </Grid>
          <Grid item>
            <Switch
              color="primary"
              checked={state.checkedC}
              onChange={handleChange}
              name="checkedC"
            />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
    },
  })
);
export default Sample;
