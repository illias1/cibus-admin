import React from "react";
import { useGetUser } from "./useGetUser";
import Loader from "../../components/Loader";
import { Box, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../../store/actions";

type IPrepareOrderProps = {};

const PrepareOrder: React.FC<IPrepareOrderProps> = ({ ...props }) => {
  const { loading, data, error } = useGetUser();
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log("loading, data, error", loading, data, error);
  }, [loading, data, error]);
  return (
    <Box>
      Welcome
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {data.getUser?.properties?.items?.map((item) => (
            <React.Fragment key={item?.name}>
              {item && item.name && (
                <Button
                  onClick={() =>
                    dispatch(
                      setSelectedProperty({
                        name: item?.name,
                        open: item.open,
                        currency: item.currency,
                      })
                    )
                  }
                >
                  {item?.name}
                </Button>
              )}
            </React.Fragment>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PrepareOrder;
