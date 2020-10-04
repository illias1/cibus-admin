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
import { Typography, WithStyles } from "@material-ui/core";
import Title from "./Title";
import MainActionButton from "./MainActionButton";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import { customStyles, customWithStyles } from "../../../utils/theme";
import SmallActionButton from "./SmallActionButton";
import FormTitle from "./FormTitle";
import ExplanationMessage from "./ExplanationMessage";
// import { ReactComponent as Placeholder } from "../../../assets/placeholderMenu.svg";
import placeholder from "../../../assets/placeholderMenu.png";
import { useTranslation } from "react-i18next";
import ContentPreview from "./ImagePreview";

interface IAddImageProps extends WithStyles<typeof customStyles> {
  property: TStore["selectedProperty"];
  settablesRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}
type TSocialMediaLinks = {
  facebookUrl: string;
  instagramId: string;
};
const initialSocialMediaLinks: TSocialMediaLinks = {
  facebookUrl: "",
  instagramId: "",
};
type TSocialMediaErrors = {
  errorFacebook: string;
  errorInstagram: string;
};
const initialSocialMediaErrors: TSocialMediaErrors = {
  errorFacebook: "",
  errorInstagram: "",
};
type TPhoto = { selected: boolean; image: any };

const AddImage: React.FC<IAddImageProps> = ({ property, settablesRegistered, classes }) => {
  // ============================================================================================================================================
  // SOCIAL MEDIA
  const [socialMedia, setsocialMedia] = React.useState<TSocialMediaLinks>(initialSocialMediaLinks);
  const [socialMediaErrors, setsocialMediaErrors] = React.useState<TSocialMediaErrors>(
    initialSocialMediaErrors
  );
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setsocialMedia({
      ...socialMedia,
      [e.target.name]: e.target.value,
    });
  };
  React.useEffect(() => {
    setsocialMediaErrors({
      errorFacebook:
        (socialMedia.facebookUrl.includes("http") && !socialMedia.facebookUrl.includes(" ")) ||
        socialMedia.facebookUrl.length < 5
          ? ""
          : t("registerProperty.errors.facebookUrl"),
      errorInstagram: socialMedia.instagramId.includes(" ")
        ? t("registerProperty.errors.instagramId")
        : "",
    });
  }, [socialMedia]);
  // ============================================================================================================================================
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [photo, setphoto] = React.useState<TPhoto>();
  const [placeholderSource, setplaceholderSource] = React.useState<any>("");
  const [errorMessage, seterrorMessage] = React.useState<string>("");
  const [uploading, setuploading] = React.useState<boolean>(false);
  function readURL(input: React.ChangeEvent<HTMLInputElement>) {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setplaceholderSource(reader.result);
      };

      reader.readAsDataURL(input.target.files[0]); // convert to base64 string
    }
  }
  const handleUpload = async () => {
    let imageKey = { key: "" };
    if (photo?.selected) {
      try {
        setuploading(true);
        imageKey = (await Storage.put(`${property.name}/main`, photo.image)) as { key: string };
      } catch (error) {
        seterrorMessage(t("registerProperty.errors.uploading_image"));
        return;
      }
    }
    const { data } = await mutation<UpdatePropertyMutation, UpdatePropertyMutationVariables>(
      updateProperty,
      {
        input: {
          name: property.name,
          image: { main: imageKey.key },
          info: {
            Facebook: socialMedia.facebookUrl,
            Instagram: socialMedia.instagramId,
          },
        },
      }
    );
    if (data.updateProperty) {
      setuploading(false);
      dispatch(setSelectedProperty(property));
    } else {
      seterrorMessage(t("registerProperty.errors.connection"));
    }
  };
  const useClasses = useStyles();
  return (
    <Box className={useClasses.root}>
      <Title
        title={t("registerProperty.titles.register_image", { location: property.nonUniqueName })}
        subtitle={t("registerProperty.subtitles.register_image")}
      />
      <FormTitle title={t("registerProperty.form_titles.social_media")} />
      <ExplanationMessage message={t("registerProperty.explanations.social_media")} />
      <TextField
        label="Facebook url"
        placeholder="https://www.facebook.com/name"
        name="facebookUrl"
        value={socialMedia.facebookUrl}
        onChange={handleInput}
        variant="outlined"
        className={`${classes.customizedTextFieldMainBack} ${useClasses.textField}`}
        error={Boolean(socialMediaErrors.errorFacebook)}
        helperText={socialMediaErrors.errorFacebook}
      />
      <TextField
        className={`${classes.customizedTextFieldMainBack} ${useClasses.textField}`}
        InputProps={{
          startAdornment: (
            <InputAdornment disableTypography position="start">
              @
            </InputAdornment>
          ),
        }}
        error={Boolean(socialMediaErrors.errorInstagram)}
        onChange={handleInput}
        name="instagramId"
        label="Instagram id"
        helperText={socialMediaErrors.errorInstagram}
        value={socialMedia.instagramId}
        variant="outlined"
      />
      <FormTitle title={t("registerProperty.form_titles.select_image")} />
      <SmallActionButton onClick={() => document.getElementById("uploadPhotoMenuItem")?.click()}>
        {t("registerProperty.actions.choose_image")}
      </SmallActionButton>
      <ExplanationMessage message={t("registerProperty.explanations.image_preview")} />
      <input
        onChange={async (e) => {
          setphoto({
            selected: true,
            image: e.target.files?.item(0),
          });
          readURL(e);
        }}
        accept="image/*"
        id="uploadPhotoMenuItem"
        style={{ display: "none" }}
        type="file"
      />
      <div className={useClasses.placeholderContainer}>
        <div
          style={{
            backgroundImage: `url(${placeholderSource})`,
            backgroundPositionY: "bottom",
            backgroundPositionX: "center",
            backgroundSize: "cover",
          }}
          className={useClasses.image}
        >
          <Typography variant="h5" className={useClasses.restName}>
            {property.nonUniqueName}
          </Typography>
          <Typography variant="h6" className={useClasses.restAddress}>
            {property.address?.city} {property.address?.exact}
          </Typography>
        </div>
        <ContentPreview />
      </div>
      <Typography color="error">{errorMessage}</Typography>
      <Box className={useClasses.actions}>
        <Button onClick={() => dispatch(setSelectedProperty(property))}>{t("general.skip")}</Button>
        <MainActionButton
          style={{ position: "relative" }}
          onClick={handleUpload}
          disabled={
            Boolean(socialMediaErrors.errorFacebook) || Boolean(socialMediaErrors.errorInstagram)
          }
        >
          {t("registerProperty.actions.register")}
        </MainActionButton>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 50,
    },
    image: {
      borderBottomLeftRadius: theme.spacing(6),
      borderBottomRightRadius: theme.spacing(6),
      width: "100%",
      height: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    placeholderContainer: {
      width: 300,
      height: 533,
      background: "white",
      marginTop: 40,
      marginBottom: 40,
      overflow: "hidden",
    },
    restName: {
      color: theme.palette.common.white,
    },
    restAddress: {
      color: theme.palette.text.hint,
      marginBottom: theme.spacing(4),
    },
    textField: {
      minWidth: 300,
      margin: theme.spacing(1),
      marginLeft: 0,
    },
    actions: {
      marginTop: "40px",
      marginBottom: "30px",
      position: "absolute",
      right: "10px",
      [theme.breakpoints.up("sm")]: {
        position: "absolute",
        right: "14%",
        bottom: "10%",
      },
    },
  })
);

export default customWithStyles(AddImage);
