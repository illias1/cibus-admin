import React from "react";
// Authentication
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifyConfirmSignIn,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import App from "./App";
import background from "./assets/background.png";
import { useLocation } from "react-router-dom";
import { I18n } from "aws-amplify";
import { Translations } from "@aws-amplify/ui-components";
import { useTranslation } from "react-i18next";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// @ts-ignore
let userLang = navigator.language || navigator.userLanguage;
userLang = ["en", "ko"].includes(userLang) ? userLang : "en";
I18n.setLanguage(userLang);

const AuthStateApp: React.FunctionComponent = () => {
  const [affiliateName, setaffiliateName] = React.useState<string>("");
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object | undefined>();
  const classes = useStyles();
  const { t } = useTranslation();
  const formFields = [
    {
      type: "email",
      label: t("sign_in.label.email"),
      placeholder: Translations.SIGN_UP_EMAIL_PLACEHOLDER,
      required: true,
    },
    {
      type: "password",
      label: t("sign_in.label.password"),
      placeholder: Translations.SIGN_UP_PASSWORD_PLACEHOLDER,
      required: true,
    },
  ];
  let query = useQuery();
  const affiliateQuery = query.get("affiliate");

  React.useEffect(() => {
    if (affiliateQuery) {
      setaffiliateName(affiliateQuery);
    }
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <App />
  ) : (
    <div className={classes.auth}>
      <div className={classes.title}>
        <Typography className={classes.TittleOne}>Welcome to</Typography>
        <Typography className={classes.TittleTwo}>cibus.online</Typography>
      </div>
      <AmplifyAuthenticator
        initialAuthState={affiliateQuery ? AuthState.SignUp : AuthState.SignIn}
        usernameAlias="email"
      >
        <AmplifySignIn formFields={formFields} slot="sign-in"></AmplifySignIn>

        <AmplifySignUp
          usernameAlias="email"
          slot="sign-up"
          formFields={[
            ...formFields,
            {
              type: "custom:affiliate",
              label: t("sign_in.label.affiliate"),
              value: affiliateName,
            },
          ]}
        />
        <AmplifyConfirmSignIn
          formFields={[]}
          headerText={Translations.CONFIRM_SIGN_UP_HEADER_TEXT}
          slot="confirm-sign-up"
          handleSubmit={(state) => setAuthState(AuthState["SignIn"])}
        ></AmplifyConfirmSignIn>
      </AmplifyAuthenticator>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    auth: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      height: "100vh",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), #000),
          url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      paddingRight: theme.spacing(5),
    },
    title: {
      position: "absolute",
      top: "10%",
      color: "white",
      left: "10%",
    },

    TittleOne: {
      fontFamily: "Josefin Sans",
      fontWeight: "bolder",
      fontSize: "137px",
      lineHeight: "120px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "50px",
        lineHeight: "50px",
      },
    },
    TittleTwo: {
      fontFamily: "Josefin Sans",
      fontWeight: "bolder",
      fontSize: "110px",
      lineHeight: "120px",
      color: theme.palette.primary.light,
      [theme.breakpoints.down("xs")]: {
        fontSize: "50px",
        lineHeight: "50px",
      },
    },
  })
);

export default AuthStateApp;

I18n.putVocabulariesForLanguage("en", {
  // Used for header text in sign in component
  [Translations.SIGN_IN_HEADER_TEXT]: "Sign in to your account",
  // Used for the submit button text in sign in component
  [Translations.SIGN_IN_ACTION]: "Login",
  // Used for the text in sign up screen to change to the sign in screen
  [Translations.SIGN_UP_HAVE_ACCOUNT_TEXT]: "Have an account?",
  // Used for header text in sign up component
  [Translations.SIGN_UP_HEADER_TEXT]: "Create a new account",
  // Used for the button text in sign up screen to change to the sign in screen
  [Translations.SIGN_IN_TEXT]: "Sign in",
  // Used for the submit button text in sign up component
  [Translations.SIGN_UP_SUBMIT_BUTTON_TEXT]: "Sign up",
  // U
  [Translations.SIGN_UP_EMAIL_PLACEHOLDER]: "Enter your email address",
  [Translations.SIGN_UP_PASSWORD_PLACEHOLDER]: "Enter your password",
  // Text inside of the Sign Out button
  [Translations.SIGN_OUT]: "Sign out",
  // Used for header text in confirm sign up component
  [Translations.CONFIRM_SIGN_UP_HEADER_TEXT]:
    "Confirm your email by clicking the link in your email",
  //Used for the submit button text in confirm sign up component
  [Translations.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT]: "",
  // The header text of the forgot password section
  [Translations.RESET_YOUR_PASSWORD]: "Reset your password",
  // The text displayed inside of the send code button for the form
  [Translations.SEND_CODE]: "Send Code",
  [Translations.NEW_PASSWORD_LABEL]: "New password",
  [Translations.NEW_PASSWORD_PLACEHOLDER]: "Enter your new password",
});
I18n.putVocabulariesForLanguage("ko", {
  // Used for header text in sign in component
  [Translations.SIGN_IN_HEADER_TEXT]: "계정에 로그인하십시오",
  // Used for the submit button text in sign in component
  [Translations.SIGN_IN_ACTION]: "로그인",
  // Used for the text in sign up screen to change to the sign in screen
  [Translations.SIGN_UP_HAVE_ACCOUNT_TEXT]: "가입 벌써 하셨어요?",
  // Used for header text in sign up component
  [Translations.SIGN_UP_HEADER_TEXT]: "새 계정을 만들기",
  // Used for the button text in sign up screen to change to the sign in screen
  [Translations.SIGN_IN_TEXT]: "로그인",
  // Used for the submit button text in sign up component
  [Translations.SIGN_UP_SUBMIT_BUTTON_TEXT]: "가입하기",
  // U
  [Translations.SIGN_UP_EMAIL_PLACEHOLDER]: "이메일 주소를 입력하십시오",
  [Translations.SIGN_UP_PASSWORD_PLACEHOLDER]: "비밀번호를 입력하십시오",
  // Text inside of the Sign Out button
  [Translations.SIGN_OUT]: "로그아웃",
  // Used for header text in confirm sign up component
  [Translations.CONFIRM_SIGN_UP_HEADER_TEXT]: "이메일로 보낸 링크를 클릭하시기 바랍니다",
  //Used for the submit button text in confirm sign up component
  [Translations.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT]: "",
  // The header text of the forgot password section
  [Translations.RESET_YOUR_PASSWORD]: "암호를 다시 설정합니다",
  // The text displayed inside of the send code button for the form
  [Translations.SEND_CODE]: "전송 코드",
  [Translations.NEW_PASSWORD_LABEL]: "새 암호",
  [Translations.NEW_PASSWORD_PLACEHOLDER]: "새 암호를 입력하십시오",
});
