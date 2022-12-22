import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../shared/Header";
import Input from "../../shared/Input";
import axios from "axios";
import ErrorModel from "./../../shared/ErrorModel";

import "./Slider.css";
import "./../login/Login.css";
import FileuploadInput from "../../shared/FileuploadInput";
import SendLoader from "../../shared/sendicon/SendLoader";

const Slider = () => {
  const [numberFiles, setNumberFiles] = useState([""]);
  let user = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [seccuesMsg, setSeccuesMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const addFile = (file) => {
    setFiles((prev) => [...prev, file]);
  };

  const incrementFiles = (e) => {
    e.preventDefault();
    setNumberFiles((prev) => [...prev, ""]);
  };

  const errorHandler = () => {
    setError(false);
  };

  const seccuesMsgHandler = (msg) => {
    history.push("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    files.map((file) => data.append("multi-files", file));
    const sendData = async () => {
      try {
        const call = await axios.post("https://birthday-backend-production.up.railway.app/sliderimages", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(call.data);
        setSeccuesMsg(call.data.message);
        setIsLoading(false);
      } catch (e) {
        setError("somthing went wrong please try again later");
        setIsLoading(false);
      }
    };
    sendData();
  };

  const inputs = numberFiles.map((file, key) => <FileuploadInput key={key} addFile={addFile} />);

  return (
    <Fragment>
      <Header />
      {isLoading && <SendLoader />}
      {seccuesMsg && <ErrorModel message={seccuesMsg} setError={seccuesMsgHandler} />}
      {error && <ErrorModel message={error} setError={errorHandler} />}
      <div className="sliderAdd">
        <h2 className="sliderAdd_title">slider Management</h2>
        <form className="sliderAdd_form" onSubmit={submitHandler}>
          {inputs}
          <button className="plusButton" onClick={incrementFiles}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path>
            </svg>
            <span>Add</span>
          </button>
          <button type="submit" className="sliderAdd_form-btn">
            <span>submit</span>
            <div className="liquid"></div>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Slider;
