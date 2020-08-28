import React, { Suspense } from "react";

// comp
import NewOrderPopup from "../components/NewOrderPopup";
import Loader from "../components/Loader";
import { API, graphqlOperation } from "aws-amplify";
import useTypedHistory from "../utils/useTypedHistory";
import { useQuery } from "../utils/useQuery";
import { GetPropertyQuery, GetPropertyQueryVariables, OnCreateOrderSubscription } from "../API";
import { getPropertyAtInit, GetPropertyAtInitVariables } from "../utils/graphql";
import { useDispatch } from "react-redux";
import { setOrders, addRequestedOrder, setSelectedProperty } from "../store/actions";
import { onCreateOrder } from "../graphql/subscriptions";
import useAudio from "react-use/lib/useAudio";
import { useTypedSelector } from "../store/types";

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
  const { loading, data, error } = useQuery<GetPropertyQuery, GetPropertyAtInitVariables>(
    getPropertyAtInit,
    {
      name: selectedProperty.name,
      date: new Date().toISOString().slice(0, 10),
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
          console.log("data", data);
          dispatch(addRequestedOrder(data.value.data.onCreateOrder));
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
          currency: data.getProperty.currency,
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
