import React from "react";
// Authentication
import { AmplifyAuthenticator, AmplifySignUp, AmplifyConfirmSignIn } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import App from "./App";
import background from "./assets/background.png";

const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object | undefined>();
  const classes = useStyles();
  React.useEffect(() => {
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
        <Typography variant="h1">Welcome to</Typography>
        <Typography variant="h1">cibus.online</Typography>
      </div>
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
          usernameAlias="email"
          slot="sign-up"
          formFields={[{ type: "email" }, { type: "password" }]}
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
      height: "100%",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), #000),
          url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      paddingRight: theme.spacing(5),
    },
    title: {
      position: "absolute",
      top: "20%",
      color: "white",
      left: "10%",
    },
  })
);

export default AuthStateApp;
