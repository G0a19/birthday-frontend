import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import Apploader from "./shared/Apploader/Apploader";
import ErrorModel from "./shared/ErrorModel";

import "./App.css";

const Login = React.lazy(() => import("./pages/login/Login"));
const New = React.lazy(() => import("./pages/new-bless/New"));
const User = React.lazy(() => import("./pages/user/User"));
const Home = React.lazy(() => import("./pages/home/Home"));
const Bless = React.lazy(() => import("./pages/bless/Bless"));
const Rewrite = React.lazy(() => import("./pages/rewrite/Rewrite.js"));
const Slider = React.lazy(() => import("./pages/slider/Slider.js"));
const BlessPage = React.lazy(() => import("./pages/blessPage/BlessPage.js"));
const SliderImages = React.lazy(() =>
  import("./pages/slideri-images/Sliderimages.js")
);

function App() {
  let user = useSelector((state) => state.user);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (user.token) {
      const { exp } = jwt_decode(user.token);
      const expirationTime = exp * 1000 - 60000;
      if (Date.now() >= expirationTime) {
        setIsLogout(true);
      } else {
        const remaningTime = expirationTime - new Date();
        setTimeout(() => {
          setIsLogout(true);
        }, remaningTime);
      }
    }
  }, [user.token]);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Suspense fallback={<Apploader />}>
      {isLogout && (
        <ErrorModel
          message="expiration Time is over"
          setError={logoutHandler}
        />
      )}
      <Switch>
        {!user.token && (
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

        <Route path="/blesspage/bless/">
          <Bless />
        </Route>

        <Route path="/blesspage/">
          <BlessPage />
        </Route>

        <Route path="/rewrite/">
          <Rewrite />
        </Route>

        <Route path="/slider" exact>
          <Slider />
        </Route>

        <Route path="/sliderimages" exact>
          <SliderImages />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
