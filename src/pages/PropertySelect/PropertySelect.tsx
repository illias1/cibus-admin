import React from "react";
import { useGetUser } from "./useGetUser";
import Loader from "../../components/Loader";
import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../../store/actions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// icons
import EditSharpIcon from "@material-ui/icons/EditSharp";
import LaunchIcon from "@material-ui/icons/Launch";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import useTypedHistory from "../../utils/useTypedHistory";

const PropertyCreate = React.lazy(() => import("../PropertyCreate"));

type IPrepareOrderProps = {};

const PrepareOrder: React.FC<IPrepareOrderProps> = ({ ...props }) => {
  const { loading, data, error } = useGetUser();
  const dispatch = useDispatch();
  const history = useTypedHistory();
  const [registerNewProperty, setregisterNewProperty] = React.useState<boolean>(false);
  const classes = useStyles();
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
      <Typography gutterBottom variant="h5" align="center">
        Location list
      </Typography>
      <Typography>
        Have multiple locations? You can manage all your locations in this page.
      </Typography>
      <Typography>
        Need to delete a location? Please contact admin@cibus.online for support.{" "}
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.getUser?.properties?.items?.map((item) => (
            <React.Fragment key={item?.name}>
              {item && item.name && (
                <Box key={item.name} className={classes.row}>
                  <EditSharpIcon />
                  <Typography>{item.name}</Typography>
                  <Typography>
                    {item.address?.country}, {item.address?.city}, {item.address?.exact}
                  </Typography>
                  <Typography>{item.tables?.length}</Typography>
                  <LaunchIcon />
                </Box>
              )}
            </React.Fragment>
          ))}

          <Button
            onClick={() => setregisterNewProperty(true)}
            variant="text"
            color="secondary"
            startIcon={<AddCircleOutlineIcon />}
          >
            Register a new location
          </Button>
        </>
      )}
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export default PrepareOrder;
