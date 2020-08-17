import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./utils/theme";

const MenuPage = lazy(() => import("./pages/SamplePage"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch></Switch>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
