import React from "react";
import { useGetUser } from "./useGetUser";
import Loader from "../../components/Loader";
import { Button, Container, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../../store/actions";
import Grid from "@material-ui/core/Grid";
// icons
import EditSharpIcon from "@material-ui/icons/EditSharp";
import LaunchIcon from "@material-ui/icons/Launch";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useTranslation } from "react-i18next";
import Title from "../../components/Title";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { Currency, GetPropertyQuery, GetUserQuery } from "../../API";
import useTypedHistory from "../../utils/useTypedHistory";

const PropertyCreate = React.lazy(() => import("../PropertyCreate"));
type TPropertyFromUser = NonNullable<
  NonNullable<NonNullable<GetUserQuery["getUser"]>["properties"]>["items"]
>[number];

type IPrepareOrderProps = {};

const PrepareOrder: React.FC<IPrepareOrderProps> = ({ ...props }) => {
  const { loading, data, error } = useGetUser();
  const dispatch = useDispatch();
  const history = useTypedHistory();
  const { t } = useTranslation();
  const [registerNewProperty, setregisterNewProperty] = React.useState<boolean>(false);
  const classes = useStyles();
  const setProperty = (item: TPropertyFromUser) => () => {
    dispatch(
      setSelectedProperty({
        open: item?.open || false,
        currency: item?.currency || Currency["USD"],
        booleans: {
          subscribeCustomerToOrder: item?.booleans?.subscribeCustomerToOrder,
        },
        address: {
          city: item?.address?.city,
          exact: item?.address?.exact,
          country: item?.address?.country,
        },
        name: item?.name || "",
        nonUniqueName: item?.NonUniqueName || "",
      })
    );
  };
  React.useEffect(() => {
    console.log("loading, data, error", loading, data, error);
  }, [loading, data, error]);
  if (registerNewProperty) {
    return (
      <Container maxWidth="md" style={{ marginTop: 50 }}>
        <PropertyCreate />
      </Container>
    );
  }
  return (
    <Container maxWidth="md" style={{ marginTop: 50 }}>
      <Title subtitle={t("property_select.subtitle")} title={t("property_select.title")} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.getUser?.properties?.items?.map((item) => (
            <React.Fragment key={item?.name}>
              {item && item.name && (
                <Grid spacing={4} justify="space-between" container className={classes.row}>
                  <Grid key={item.name} item xs={1}>
                    <IconButton
                      color="inherit"
                      style={{ padding: 0 }}
                      onClick={() => {
                        history.push("/settings");
                        setProperty(item)();
                      }}
                    >
                      <EditSharpIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">
                      {item.address?.country}, {item.address?.city}, {item.address?.exact}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">
                      {t("property_select.tables_registered", { number: item.tables?.length })}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton style={{ padding: 0 }} color="inherit" onClick={setProperty(item)}>
                      <LaunchIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
            </React.Fragment>
          ))}

          <Button
            onClick={() => setregisterNewProperty(true)}
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            className={classes.new}
          >
            Register a new location
          </Button>
          <Title subtitle={t("property_select.delete_location_contact_admin")} />
        </>
      )}
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      marginTop: 20,
      color: theme.palette.text.hint,
    },
    new: {
      color: theme.palette.text.hint,
      textTransform: "none",
      fontSize: 20,
      marginTop: 80,
    },
  })
);

export default PrepareOrder;
