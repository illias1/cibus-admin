import React from "react";
import { Typography, Grid, Switch, Box, makeStyles, Theme, createStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { mutation } from "../../utils/mutation";
import { UpdatePropertyMutation, UpdatePropertyMutationVariables } from "../../API";
import { useTypedSelector } from "../../store/types";
import CenteredTitle from "../../components/CenteredTitle";

type ISampleProps = {};
const hours = new Date().getHours();
export const updateProperty = /* GraphQL */ `
  mutation UpdateProperty($input: UpdatePropertyInput!, $condition: ModelPropertyConditionInput) {
    updateProperty(input: $input, condition: $condition) {
      open
    }
  }
`;
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
      <CenteredTitle
        title={
          hours < 12 ? t("good_morning") : hours < 17 ? t("good_afternoon") : t("good_evening")
        }
      >
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
      </CenteredTitle>
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
