import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import { ThemeProvider } from "@material-ui/core/styles";
import { augmentedTheme } from "./utils/theme";
import { CssBaseline } from "@material-ui/core";
import AuthStateApp from "./AuthStateApp";
import { BrowserRouter } from "react-router-dom";
Amplify.configure(aws_exports);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={augmentedTheme}>
        <BrowserRouter>
          <CssBaseline />
          <AuthStateApp />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
