import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Apploader from "./shared/Apploader/Apploader";

import "./App.css";

const Login = React.lazy(() => import("./pages/login/Login"));
const New = React.lazy(() => import("./pages/new-bless/New"));
const User = React.lazy(() => import("./pages/user/User"));
const Home = React.lazy(() => import("./pages/home/Home"));
const Bless = React.lazy(() => import("./pages/bless/Bless"));
const Rewrite = React.lazy(() => import("./pages/rewrite/Rewrite.js"));

function App() {
  let user = useSelector((state) => state.user);

  return (
    <Suspense fallback={<Apploader />}>
      <Switch>
        {!user.id && (
          <Route path="/">
            <Login />
          </Route>
        )}

        <Route path="/newbless" exact>
          <New />
        </Route>

        <Route path="/users/">
          <User />
        </Route>

        <Route path="/bless/">
          <Bless />
        </Route>

        <Route path="/rewrite/">
          <Rewrite />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
