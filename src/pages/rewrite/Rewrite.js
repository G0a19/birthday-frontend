import { react, Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Rewrite.css";
import "./../login/Login.css";
import "./../new-bless/New.css";
import Header from "../../shared/Header";
import Input from "../../shared/Input";
import SendLoader from "../../shared/sendicon/SendLoader";
import ErrorModel from "../../shared/ErrorModel";
import Textwithcontent from "../../shared/Textwithcontent";
import axios from "axios";

const Rewrite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [seccuesMsg, setSeccuesMsg] = useState(false);
  const [bless, setBless] = useState(false);
  const [blessId, setBlessId] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  let user = useSelector((state) => state.user);
  const history = useHistory();

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateYear = (e) => {
    setYear(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updateDescription = (value) => {
    setDescription(value);
  };

  console.log(description);

  const errorSet = () => {
    setError(false);
  };

  const seccuesMsgHandler = (msg) => {
    history.push("/");
  };

  useEffect(() => {
    const url = new URL(window.location);
    const param = new URLSearchParams(url.search);
    const blessId = param.get("bless");
    setBlessId(blessId);
    const getBless = async () => {
      try {
        const call = await fetch(`https://birthday-backend.onrender.com/blessing/getbless/${blessId}`);
        const response = await call.json();
        console.log(response);
        if (response.error) setError(response.error);
        setBless(response.bless);
        setTitle(response.bless.title);
        setYear(response.bless.year);
        setImage(response.bless.image);
        updateDescription(response.bless.description);
      } catch (err) {}
    };
    getBless();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("title", title);
    data.append("description", description);
    data.append("year", year);
    try {
      const call = await axios.patch(`https://birthday-backend.onrender.com/blessing/${bless.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (call.data.error) {
        setError(call.data.error);
        setIsLoading(false);
        return;
      }
      setSeccuesMsg("Bless updated");
    } catch (error) {
      setError(error.response.data.error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      {seccuesMsg && <ErrorModel message={seccuesMsg} setError={seccuesMsgHandler} />}
      {error && <ErrorModel message={error} setError={errorSet} />}
      {isLoading && <SendLoader />}
      <Header></Header>
      {bless && (
        <div className="new">
          <h2 className="new_title">update bless</h2>
          <form onSubmit={submitHandler}>
            <Input value={title} handler={updateTitle} placeholder="TITLE" title="title" type="text" />
            <Input value={year} handler={updateYear} placeholder="YEAR" title="year" type="number" />
            <Input handler={updateImage} type="file" accept=".png,.jpeg,.jpg" />
            <Textwithcontent updateDescription={updateDescription} text={bless.description} />
            <div className="new_btn-contianer">
              <button className="new_btn" type="submit">
                update
              </button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Rewrite;
