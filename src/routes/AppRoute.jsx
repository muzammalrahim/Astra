import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../screens/Dashboard";
import Project from "../screens/Project";

const AppRoute = () => {
  return (
    <>
      {
        // helperFunctions.isFoundRoute(path) ?
        !(!!sessionStorage?.getItem('uid')) &&
        <Redirect to="/login" />
      }
      <Switch>
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/projects" component={Project} />
        {/* <Route path="/" exact component={Login}></Route> */}
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={SignUp}></Route>
      </Switch>
    </>
  );
};

export default AppRoute;
