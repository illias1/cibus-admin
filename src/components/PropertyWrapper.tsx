import React, { Suspense } from "react";

// comp
import NewOrderPopup from "../components/NewOrderPopup";
import Loader from "../components/Loader";
import { API, graphqlOperation } from "aws-amplify";
import useTypedHistory from "../utils/useTypedHistory";
import { useQuery } from "../utils/useQuery";
import {
  GetPropertyQuery,
  GetPropertyQueryVariables,
  OnCreateOrderSubscription,
  OnCreateStuffCallSubscription,
} from "../API";
import { getPropertyAtInit, GetPropertyAtInitVariables } from "../utils/graphql";
import { useDispatch } from "react-redux";
import {
  setOrders,
  addRequestedOrder,
  setSelectedProperty,
  setAddStuffCall,
} from "../store/actions";
import { onCreateOrder } from "../graphql/subscriptions";
import useAudio from "react-use/lib/useAudio";
import { useTypedSelector } from "../store/types";
import { useTranslation } from "react-i18next";

type TResponseOnCreateOrder = {
  provider: any;
  value: {
    data: OnCreateOrderSubscription;
  };
};
type TResponseOnCreatezstuffCall = {
  provider: any;
  value: {
    data: OnCreateStuffCallSubscription;
  };
};

export const onCreateStuffCall = /* GraphQL */ `
  subscription OnCreateStuffCall($propertyName: String) {
    onCreateStuffCall(propertyName: $propertyName) {
      propertyName
      tableName
      createdAt
    }
  }
`;

const App: React.FC<{}> = ({ children }) => {
  const { push } = useTypedHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
      "https://amplify-cibusadmin-prod-205815-deployment.s3.ap-northeast-2.amazonaws.com/md3gw-wvz7l.mp3",
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
        error: (e: any) => {
          alert(t("errors.connection.websocket"));
        },
        next: (data: TResponseOnCreateOrder) => {
          console.log("data", data);
          if (data.value.data.onCreateOrder) {
            dispatch(addRequestedOrder(data.value.data.onCreateOrder));
            controls.play();
            setorderPopupOpen(true);
            push("/new-order");
          }
        },
      });
    const subscriptionStuffCall = API.graphql(
      graphqlOperation(onCreateStuffCall, { propertyName: selectedProperty.name })
    )
      // @ts-ignore
      .subscribe({
        error: (e: any) => {
          alert(t(""));
        },
        next: (data: TResponseOnCreatezstuffCall) => {
          console.log("data", data);
          if (data.value.data.onCreateStuffCall) {
            dispatch(
              setAddStuffCall({
                table: data.value.data.onCreateStuffCall.tableName,
                createdAt: data.value.data.onCreateStuffCall.createdAt,
              })
            );
            if (window && window.navigator && "vibrate" in navigator) {
              navigator.vibrate =
                navigator.vibrate ||
                // @ts-ignore
                navigator.webkitVibrate ||
                // @ts-ignore
                navigator.mozVibrate ||
                // @ts-ignore
                navigator.msVibrate;

              window.navigator.vibrate([300, 200, 300]);
            } else {
              controls.play();
              setTimeout(() => {
                controls.pause();
              }, 1000);
            }
          }
        },
      });
    return () => {
      subscription.unsubscribe();
      subscriptionStuffCall.unsubscribe();
    };
  }, []);
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
          address: data.getProperty.address,
          nonUniqueName: data.getProperty.NonUniqueName,
          booleans: {
            subscribeCustomerToOrder: data.getProperty.booleans?.subscribeCustomerToOrder,
          },
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
