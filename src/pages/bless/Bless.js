import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Markup } from "interweave";
import Header from "../../shared/Header";
import Ballons from "../../shared/ballons/Ballons";
import ErrorModel from "../../shared/ErrorModel";
import FeatchLoader from "../../shared/featchloader/FeatchLoader";
import Choisemodel from "../../shared/choicemodel/Choisemodel";
import pencil from "./../../images/pencil-solid.svg";
import trashImage from "./../../images/TrashImg.svg";

import "./Bless.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Bless = (props) => {
  let user = useSelector((state) => state.user);
  const [bless, setBless] = useState(false);
  const [blessId, setBlessId] = useState(false);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trash, setTrash] = useState(false);
  const [showbtns, setShowbtns] = useState(false);
  const [seccuesMsg, setSeccuesMsg] = useState(false);
  const [image, setImage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    const url = new URL(window.location);
    const param = new URLSearchParams(url.search);
    const blessId = param.get("bless");
    setBlessId(blessId);
    const getBless = async () => {
      try {
        const call = await fetch(`https://birthday-backend-production.up.railway.app/blessing/getbless/${blessId}`);
        const response = await call.json();
        if (response.error) setErr(response.error);
        setBless(response.bless);
        setImage(response.bless.image);
        setIsLoading(false);
      } catch (err) {}
    };

    getBless();
  }, []);

  const setError = () => {
    setErr(false);
    history.push("/");
  };

  const showTrash = () => {
    setTrash(true);
  };

  const hideTrash = () => {
    setTrash(false);
  };

  const showbtnsHandler = () => {
    if (showbtns === "show_btns") {
      setShowbtns("");
      return;
    }
    setShowbtns("show_btns");
  };

  const seccuesMsgHandler = (msg) => {
    history.push("/");
  };

  const deleteBlessHandler = async () => {
    setTrash(false);
    setIsLoading(true);
    try {
      const call = await fetch(`https://birthday-backend-production.up.railway.app/blessing/${blessId}`, {
        method: "DELETE",
        body: JSON.stringify({
          userId: user.id,
          imageId: image.id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const response = await call.json();
      if (response.error) return setErr(response.error);
      setSeccuesMsg(response.message);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setSeccuesMsg(err);
    }
  };

  const date = new Date(bless.date);

  return (
    <Fragment>
      {seccuesMsg && <ErrorModel message={seccuesMsg} setError={seccuesMsgHandler} />}
      {trash && <Choisemodel title="Do you want to delete this bless" no={hideTrash} yes={deleteBlessHandler} />}
      {isLoading && <FeatchLoader />}
      <Header />
      {err && <ErrorModel message={err} setError={setError} />}
      <div className="blessRead">
        {!bless && <h2 className="not_found">No bless found</h2>}
        {bless && (
          <Fragment>
            <h2 className="blessRead_title">{bless.title}</h2>
            <div className="blessRead_description">
              <Markup content={bless.description} />
            </div>
            <img className="blessRead_img" src={"https://drive.google.com/uc?export=view&id=" + image.id ?? ""} alt="img" />
            {bless.user === user.id && (
              <div onClick={showbtnsHandler} className={"btns_wrapper " + showbtns}>
                <Link to={"/rewrite/?bless=" + blessId} className="blessRead_rewrite">
                  <img src={pencil} alt="rewrite"></img>
                </Link>
                <button onClick={showTrash} className="remove_bless">
                  <img src={trashImage} alt="trash" />
                </button>
              </div>
            )}
            <div className="date">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</div>
          </Fragment>
        )}
      </div>
      <Ballons number="5" />
    </Fragment>
  );
};

export default Bless;
