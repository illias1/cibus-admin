import React, { Suspense } from "react";
import Modal from "@material-ui/core/Modal";

// comp
import NewOrderPopup from "../components/NewOrderPopup";
import Loader from "../components/Loader";
import { API, graphqlOperation } from "aws-amplify";
import useTypedHistory from "../utils/useTypedHistory";
import { useQuery } from "../utils/useQuery";
import { GetPropertyQuery, GetPropertyQueryVariables, OnCreateOrderSubscription } from "../API";
import { getPropertyAtInit } from "../utils/graphql";
import { useDispatch } from "react-redux";
import { setOrders, addAwaitingOrder, setSelectedProperty } from "../store/actions";
import { onCreateOrder } from "../graphql/subscriptions";
import useAudio from "react-use/lib/useAudio";
import { useTypedSelector } from "../store/types";
import Box from "@material-ui/core/Box";

type TResponseOnCreateOrder = {
  provider: any;
  value: {
    data: OnCreateOrderSubscription;
  };
};

const App: React.FC<{}> = ({ children }) => {
  const { push } = useTypedHistory();
  const dispatch = useDispatch();
  const { selectedProperty } = useTypedSelector((state) => state);

  // ============================================================================================================================================
  // new order popup and audio
  const [orderPopupOpen, setorderPopupOpen] = React.useState<boolean>(false);
  const handlePopupClose = () => {
    setorderPopupOpen(false);
    controls.pause();
  };
  const [audio, state, controls] = useAudio({
    src:
      "https://amplify-cibusadmin-dev-05236-deployment.s3.ap-northeast-2.amazonaws.com/jumun.mp3",
    autoPlay: false,
  });
  const { loading, data, error } = useQuery<GetPropertyQuery, GetPropertyQueryVariables>(
    getPropertyAtInit,
    {
      name: selectedProperty.name,
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
    const subscription = API.graphql(
      graphqlOperation(onCreateOrder, { propertyName: selectedProperty.name })
    )
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
    if (!loading && !error && data && data.getProperty) {
      // @ts-ignore
      dispatch(setOrders(data.getProperty.orders.items));
      dispatch(
        setSelectedProperty({
          name: selectedProperty.name,
          open: data.getProperty.open,
        })
      );
    }
    // }
  }, [loading]);
  // ============================================================================================================================================
  // ============================================================================================================================================

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewOrderPopup open={orderPopupOpen} handlePopupClose={handlePopupClose} />
      {audio}
      {loading ? (
        <Loader open={openloadingBackdrop} onClick={() => setOpenloadingBackdrop(false)} />
      ) : (
        <>{children}</>
        // <Box>here</Box>
      )}
    </Suspense>
  );
};

export default App;
