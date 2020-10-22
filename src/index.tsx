import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./utils/theme";
import { CssBaseline } from "@material-ui/core";
import AuthStateApp from "./AuthStateApp";
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/Loader";
Amplify.configure(aws_exports);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Suspense fallback={<Loader />}>
            <AuthStateApp />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
