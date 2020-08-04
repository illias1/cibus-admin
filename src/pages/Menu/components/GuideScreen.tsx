import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { StyledButton } from "../../../components/Button";
import { useDispatch } from "react-redux";
import { setUserAlreadyVisited } from "../../../store/actions";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../../store/types";
import background from "../../../assets/background.png";

type IGuideScreenProps = {};

const GuideScreen: React.FC<IGuideScreenProps> = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userName = useTypedSelector((state) => state.userName);

  const handleSkip = () => {
    dispatch(setUserAlreadyVisited(true));
  };
  return (
    <Container
      style={{
        background: `linear-gradient(0deg, #000000 0%, #080808 18%, #2D2D2D69 100%), url(${background})`,
        height: "100vh",
      }}
    >
      <StyledButton
        className={classes.skip}
        color="default"
        onCLick={handleSkip}
      >
        {t("general_skip_button")}
      </StyledButton>
      <Box className={classes.main}>
        <Typography className={classes.text} variant="h4" component="h2">
          {t("guide_welcome_message", { userName })}
        </Typography>

        <Typography className={classes.text}>
          {t("guide_explanation_message")}
        </Typography>
        <StyledButton onCLick={() => {}}>
          {t("guide_main_action_button")}
        </StyledButton>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skip: {
      position: "absolute",
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    text: {
      color: "white",
      marginBottom: theme.spacing(10),
    },
    main: {
      paddingTop: "100%",
    },
  })
);

export default GuideScreen;
