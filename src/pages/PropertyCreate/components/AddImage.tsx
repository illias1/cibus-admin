import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Storage } from "aws-amplify";
import { useDispatch } from "react-redux";
import { setSelectedProperty } from "../../../store/actions";
import { TStore } from "../../../store/types";
import { mutation } from "../../../utils/mutation";
import { UpdatePropertyMutation, UpdatePropertyMutationVariables } from "../../../API";
import { updateProperty } from "../../../graphql/mutations";
import { Typography } from "@material-ui/core";

type IAddImageProps = {
  property: TStore["selectedProperty"];
  settablesRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};
type TPhoto = { selected: boolean; image: any };

const AddImage: React.FC<IAddImageProps> = ({ property, settablesRegistered }) => {
  const [photo, setphoto] = React.useState<TPhoto>();
  const [errorMessage, seterrorMessage] = React.useState<string>("");
  const [uploading, setuploading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const handleUpload = async () => {
    let imageKey = { key: "" };
    if (photo?.selected) {
      try {
        setuploading(true);
        imageKey = (await Storage.put(`${property.name}/main`, photo.image)) as { key: string };
        const { data } = await mutation<UpdatePropertyMutation, UpdatePropertyMutationVariables>(
          updateProperty,
          { input: { name: property.name, image: { main: imageKey.key } } }
        );
        setuploading(false);
        dispatch(setSelectedProperty(property));
      } catch (error) {
        seterrorMessage("error uploading image");
        return;
      }
    }
  };
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Button
        variant="outlined"
        onClick={() => document.getElementById("uploadPhotoMenuItem")?.click()}
      >
        Choose your establishment main image
      </Button>
      {errorMessage}
      <input
        onChange={async (e) => {
          // if (e.target.files && e.target.files.item(0)) {
          setphoto({
            selected: true,
            image: e.target.files?.item(0),
          });
          // }
        }}
        accept="image/*"
        id="uploadPhotoMenuItem"
        style={{ display: "none" }}
        type="file"
      />
      <Button onClick={handleUpload}>upload</Button>
      <Typography>
        You don't need to choose one, in which case your menu page would still exist but we believe
        this image adds character...
      </Typography>
      <Button onClick={() => settablesRegistered(false)}>Back</Button>
      <Button onClick={() => dispatch(setSelectedProperty(property))}>Shkip</Button>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 50,
    },
  })
);

export default AddImage;
