import React from "react";
import { useGetUser } from "./useGetUser";
import Loader from "../../components/Loader";
import { Container, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../../store/actions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DoubleArrowOutlinedIcon from "@material-ui/icons/DoubleArrowOutlined";
import AddIcon from "@material-ui/icons/Add";
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
    return <PropertyCreate />;
  }
  return (
    <Container>
      <Typography gutterBottom variant="h1" className={classes.welcome} align="center">
        Welcome {data.getUser?.name}
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={4}>
          {data.getUser?.properties?.items?.map((item) => (
            <React.Fragment key={item?.name}>
              {item && item.name && (
                <Grid item xs={12} sm={6}>
                  <Paper
                    onClick={() =>
                      dispatch(
                        setSelectedProperty({
                          name: item?.name,
                          open: item.open,
                          currency: item.currency,
                        })
                      )
                    }
                    className={classes.paper}
                  >
                    {`menu.cibus.onilne/${item?.name}`}
                    <br />
                    {item.NonUniqueName}
                    <br />
                    {item.address?.city} {item.address?.exact}
                    <br />
                    <br />
                    <br />
                    <DoubleArrowOutlinedIcon />
                  </Paper>
                </Grid>
              )}
            </React.Fragment>
          ))}
          <Grid item sm={6} xs={12}>
            <Paper
              onClick={() => setregisterNewProperty(true)}
              style={{ padding: "4em", textAlign: "center" }}
              className={classes.paper}
            >
              <Typography>Create New Property</Typography>
              <AddIcon />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      minHeight: "10em",
      cursor: "pointer",
    },
    welcome: {},
  })
);

export default PrepareOrder;
