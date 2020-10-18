import React from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Switch,
  Theme,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../../store/actions";
import LanguageSwitch from "../../components/LanguageSwitch";
import { mutation } from "../../utils/mutation";
import { Language, UpdatePropertyMutation, UpdatePropertyMutationVariables } from "../../API";
import { useTypedSelector } from "../../store/types";

type ISettingsProps = {};

export const updateProperty = /* GraphQL */ `
  mutation UpdateProperty($input: UpdatePropertyInput!, $condition: ModelPropertyConditionInput) {
    updateProperty(input: $input, condition: $condition) {
      booleans {
        subscribeCustomerToOrder
      }
    }
  }
`;

const Settings: React.FC<ISettingsProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    name,
    booleans: { subscribeCustomerToOrder },
  } = useTypedSelector((state) => state.selectedProperty);
  const [subscribeCustomerToOrders, setsubscribeCustomerToOrders] = React.useState<boolean>(false);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setsubscribeCustomerToOrders(event.target.checked);
    const { error } = await mutation<UpdatePropertyMutation, UpdatePropertyMutationVariables>(
      updateProperty,
      {
        input: {
          name,
          booleans: {
            subscribeCustomerToOrder: event.target.checked,
          },
        },
      }
    );
    if (error) {
      alert("save error");
    }
  };
  React.useEffect(() => {
    setsubscribeCustomerToOrders(Boolean(subscribeCustomerToOrder));
  }, [subscribeCustomerToOrder]);
  return (
    <Box className={classes.root}>
      <LanguageSwitch />
      <Typography>Notify customers about order status</Typography>
      <Switch
        checked={subscribeCustomerToOrders}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <Button
        onClick={() =>
          dispatch(
            setSelectedProperty({
              name: "",
              open: false,
              currency: "",
              language: Language.ko,
              nonUniqueName: "",
              address: { exact: "", country: "", city: "" },
              booleans: {
                subscribeCustomerToOrder: null,
              },
            })
          )
        }
      >
        Go to properties list
      </Button>
      <AmplifySignOut button-text={t("sign_out")}></AmplifySignOut>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      height: "100%",
      alignItems: "center",
    },
  })
);

export default Settings;
