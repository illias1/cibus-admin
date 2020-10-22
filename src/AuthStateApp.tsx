import React from "react";
// Authentication
import { AmplifyAuthenticator, AmplifySignUp, AmplifyConfirmSignIn } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import App from "./App";
import background from "./assets/background.png";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AuthStateApp: React.FunctionComponent = () => {
  const [affiliateName, setaffiliateName] = React.useState<string>("");
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object | undefined>();
  const classes = useStyles();
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
        <AmplifySignUp
          usernameAlias="email"
          slot="sign-up"
          formFields={[
            { type: "email" },
            { type: "password" },
            { type: "custom:affiliate", label: "your reccomender", value: affiliateName },
          ]}
        />
        <AmplifyConfirmSignIn
          formFields={[]}
          headerText="Confirm your email by clicking the link in your email"
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
