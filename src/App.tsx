import React, { Suspense } from "react";
import Modal from "@material-ui/core/Modal";

// comp
import NewOrderPopup from "./components/NewOrderPopup";
import { API, graphqlOperation } from "aws-amplify";
import useTypedHistory from "./utils/useTypedHistory";
import NavigationLayout from "./components/NavigationLayout";
import { useQuery } from "./utils/useQuery";
import { GetPropertyQuery, GetPropertyQueryVariables, OnCreateOrderSubscription } from "./API";
import { getPropertyAtInit } from "./utils/graphql";
import { useDispatch } from "react-redux";
import { setOrders, addAwaitingOrder } from "./store/actions";
import { onCreateOrder } from "./graphql/subscriptions";
import Backdrop from "@material-ui/core/Backdrop";
import { CircularProgress, makeStyles, Theme, createStyles } from "@material-ui/core";
import useAudio from "react-use/lib/useAudio";

type TResponseOnCreateOrder = {
  provider: any;
  value: {
    data: OnCreateOrderSubscription;
  };
};

function App() {
  const { push } = useTypedHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // ============================================================================================================================================
  // new order popup and audio
  const [orderPopupOpen, setorderPopupOpen] = React.useState<boolean>(false);
  const handlePopupClose = () => {
    setorderPopupOpen(false);
    controls.pause();
  };
  const [audio, state, controls, ref] = useAudio({
    src:
      "https://amplify-cibusadmin-dev-05236-deployment.s3.ap-northeast-2.amazonaws.com/jumun.mp3",
    autoPlay: false,
  });
  const { loading, data, error } = useQuery<GetPropertyQuery, GetPropertyQueryVariables>(
    getPropertyAtInit,
    {
      name: "prop1",
    }
  );
  React.useEffect(() => {
    console.log("state", state);
    if (state.time === state.duration && orderPopupOpen) {
      controls.play();
    }
  }, [state]);
  // ============================================================================================================================================
  // subscription
  React.useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateOrder, { propertyName: "prop1" }))
      // @ts-ignore
      .subscribe({
        next: (data: TResponseOnCreateOrder) => {
          dispatch(addAwaitingOrder(data.value.data.onCreateOrder));
          controls.play();
          setorderPopupOpen(true);
          push("/new-order");
        },
      });
    return () => subscription.unsubscribe();
  }, [push]);
  // ============================================================================================================================================
  // orders loading
  const [openloadingBackdrop, setOpenloadingBackdrop] = React.useState<boolean>(true);
  React.useEffect(() => {
    console.log("loading", loading);
    console.log(data, "data.getProperty");
    if (
      !loading &&
      // !error &&
      data &&
      data.getProperty
      // data.getProperty.orders &&
      // data.getProperty.orders.items
    ) {
      // @ts-ignore
      dispatch(setOrders(data.getProperty.orders.items));
    }
    // }
  }, [loading]);
  // ============================================================================================================================================
  // ============================================================================================================================================

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal
        // className={classes.modal}
        open={orderPopupOpen}
        onClose={handlePopupClose}
        aria-labelledby="new-order-popup"
        aria-describedby="a-notification-about-new-incoming-order"
      >
        <NewOrderPopup handlePopupClose={handlePopupClose} />
      </Modal>
      {audio}
      {loading ? (
        <Backdrop
          className={classes.backdrop}
          open={openloadingBackdrop}
          onClick={() => setOpenloadingBackdrop(false)}
        >
          <CircularProgress color="secondary" />
        </Backdrop>
      ) : (
        <NavigationLayout />
      )}
    </Suspense>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default App;
