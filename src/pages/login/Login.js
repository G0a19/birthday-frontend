import react from "react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserHander } from "./../../store/Store";
import { useHistory } from "react-router-dom";

import "./Login.css";

import Spinner from "./../../shared/Spinner";
import ErrorModel from "./../../shared/ErrorModel";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLabel, setEmailLable] = useState("");
  const [passwordLabel, setPasswordLable] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  let history = useHistory();

  const updateEmail = (e) => {
    if (e.target.value.length > 0) setEmailLable("form_label-foucs");
    else setEmailLable("");
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    if (e.target.value.length > 0) setPasswordLable("form_label-foucs");
    else setPasswordLable("");
    setPassword(e.target.value);
  };

  const errorSet = () => {
    setError(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const call = await fetch("https://birthday-backend.onrender.com/users/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await call.json();
    if (response.error) {
      setIsLoading(false);
      return setError(response.error);
    } else dispatch(setUserHander(response));
    setIsLoading(false);
    history.push("/");
  };

  return (
    <React.Fragment>
      {error && <ErrorModel message={error} setError={errorSet} />}
      {isLoading && <Spinner />}
      <div className="form_wrapper">
        <form className="form" onSubmit={onSubmit}>
          <h2 className="form_title">Login</h2>
          <div className="form_contianer">
            <input className="form_input" placeholder="Email" type="email" value={email} onChange={updateEmail} />
            <label className={"form_label " + emailLabel}>Email</label>
          </div>

          <div className="form_contianer">
            <input className="form_input" type="password" placeholder="Password" value={password} onChange={updatePassword} />
            <label className={"form_label " + passwordLabel}>Password</label>
          </div>

          <div className="form_footer">
            <button className="form_submit">Login</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
