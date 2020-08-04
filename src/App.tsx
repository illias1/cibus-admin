import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./utils/theme";

const MenuPage = lazy(() => import("./pages/Menu"));
const HomePage = lazy(() => import("./pages/Home"));
const CartPage = lazy(() => import("./pages/Cart"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              exact
              path="/:restaurantId/:tableNumber"
              component={MenuPage}
            />
            <Route
              path="/:restaurantId/:tableNumber/cart"
              component={CartPage}
            />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
