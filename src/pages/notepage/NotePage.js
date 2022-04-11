import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../shared/Header";
import Textwithcontent from "../../shared/Textwithcontent";
import ErrorModel from "../../shared/ErrorModel";
import SendLoader from "../../shared/sendicon/SendLoader";
import { Markup } from "interweave";

import "./NotePage.css";
import "./../slider/Slider.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const NotePage = () => {
  const [writeNoteClass, setWriteNoteClass] = useState(false);
  const [description, setDescription] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let user = useSelector((state) => state.user);

  const url = new URL(window.location);
  const param = new URLSearchParams(url.search);
  const blessId = param.get("bless");

  useEffect(() => {
    const getNote = async () => {
      setIsLoading(true);
      try {
        const call = await fetch(
          "https://birth-day-ap.herokuapp.com/blessing/getnote/" + blessId
        );
        const response = await call.json();
        setDescription(response.note);
        setUpdatedDescription(response.note);
        setIsLoading(false);
      } catch (error) {}
    };
    getNote();
  }, []);

  const updateDescription = (value) => {
    setUpdatedDescription(value);
  };

  const showWriteNoteHandler = () => {
    if (writeNoteClass) {
      setWriteNoteClass(false);
      return;
    }
    setWriteNoteClass("showNote");
  };

  const seccuesMsgHandler = () => {
    setSuccessMsg(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const call = await fetch(
        "https://birth-day-ap.herokuapp.com/blessing/note",
        {
          method: "POST",
          body: JSON.stringify({
            blessId: blessId,
            noteContent: updatedDescription,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const response = await call.json();
      setSuccessMsg(response.message);
      setDescription(updatedDescription);
      setWriteNoteClass(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {isLoading && <SendLoader />}
      {successMsg && (
        <ErrorModel message={successMsg} setError={seccuesMsgHandler} />
      )}
      <Header />
      <div className="notepage">
        <h2 className="notepage_title">note</h2>
        <div className="notepage_description">
          <Markup content={description} />
        </div>
      </div>
      <button
        className={"update_note-btn " + writeNoteClass}
        onClick={showWriteNoteHandler}
      >
        <span>+</span>
      </button>

      <form
        className={"writeNote " + writeNoteClass}
        onSubmit={onSubmitHandler}
      >
        {description && (
          <Textwithcontent
            text={description}
            updateDescription={updateDescription}
          />
        )}
        <button type="submit" className="sliderAdd_form-btn">
          <span>submit</span>
          <div className="liquid"></div>
        </button>
      </form>
    </Fragment>
  );
};

export default NotePage;
