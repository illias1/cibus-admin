import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useTypedSelector } from "../store/types";
import Loader from "./Loader";
import NavigationLayout from "./NavigationLayout";

const Home = lazy(() => import("../pages/Home"));
const NewOrder = lazy(() => import("../pages/NewOrder"));
const PrepareOrder = lazy(() => import("../pages/PrepareOrder"));
const DeliveredOrder = lazy(() => import("../pages/DeliverOrder"));
const Tables = lazy(() => import("../pages/Tables"));
const Menu = lazy(() => import("../pages/Menu"));
const PropertyWrapper = lazy(() => import("../components/PropertyWrapper"));

const Stats = lazy(() => import("../pages/Stats"));
const Settings = lazy(() => import("../pages/Settings"));
const PropertySelect = lazy(() => import("../pages/PropertySelect"));

const Navigator: React.FC = ({ ...props }) => {
  const selectedProperty = useTypedSelector((store) => store.selectedProperty);

  if (selectedProperty) {
    return (
      <Suspense fallback={<Loader />}>
        <Switch>
          <PropertyWrapper>
            <NavigationLayout>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/new-order">
                <NewOrder />
              </Route>
              <Route path="/prepare-order">
                <PrepareOrder />
              </Route>
              <Route path="/delivered-order">
                <DeliveredOrder />
              </Route>
              <Route path="/tables">
                <Tables />
              </Route>
              <Route path="/menu">
                <Menu />
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </NavigationLayout>
          </PropertyWrapper>
        </Switch>
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<Loader />}>
      <PropertySelect />
    </Suspense>
  );
};

export default Navigator;
