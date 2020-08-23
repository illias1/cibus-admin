import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const NewOrder = lazy(() => import("../pages/NewOrder"));
const PrepareOrder = lazy(() => import("../pages/PrepareOrder"));
const DeliveredOrder = lazy(() => import("../pages/DeliverOrder"));
const Tables = lazy(() => import("../pages/Tables"));
const Menu = lazy(() => import("../pages/Menu"));
const Stats = lazy(() => import("../pages/Stats"));
const Settings = lazy(() => import("../pages/Settings"));

const Navigator: React.FC = ({ ...props }) => {
  return (
    <Switch>
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
    </Switch>
  );
};

export default Navigator;
