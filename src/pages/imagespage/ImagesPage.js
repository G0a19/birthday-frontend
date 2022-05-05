import { Fragment, react, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SRLWrapper } from "simple-react-lightbox";

import "./ImagesPage.css";
import SendLoader from "../../shared/sendicon/SendLoader";
import FeatchLoader from "../../shared/featchloader/FeatchLoader";
import axios from "axios";
import Header from "../../shared/Header";
import ErrorModel from "./../../shared/ErrorModel";
import Trash from "./../../shared/icons/Trash";
import Choisemodel from "../../shared/choicemodel/Choisemodel";
import Upload from "../../shared/icons/Upload";
import Docs from "./../../shared/icons/Docs";

const ImagesPage = () => {
  let user = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [blessImages, setBlessImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [seccuesMsg, setSeccuesMsg] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);
  const [imageId, setImageId] = useState(false);

  const url = new URL(window.location);
  const param = new URLSearchParams(url.search);
  const blessId = param.get("bless");

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(1);
      try {
        const call = await fetch(
          "https://birth-day-ap.herokuapp.com/images/" + blessId
        );
        const response = await call.json();
        setIsLoading(false);
        setBlessImages(response.images);
      } catch (error) {
        setError("somthing went wrong please try again later");
        setIsLoading(false);
      }
    };

    getImages();
  }, [blessId]);

  const errorHandler = () => {
    setError(false);
  };

  const seccuesMsgHandler = (msg) => {
    window.location.reload(false);
  };

  const uploadImagesHandler = (event) => {
    if (Array.from(event.target.files).length === 0) {
      return;
    }
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const onUploadHandler = async (event) => {
    event.preventDefault();
    setIsLoading(2);
    const formData = new FormData();
    images.map((file) => formData.append("file", file));
    formData.append("blessId", blessId);
    console.log(formData);
    try {
      const call = await axios.post(
        "https://birth-day-ap.herokuapp.com/images",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (call.data.error) {
        setError(call.data.error);
        return;
      }
      console.log(call.data);
      setSeccuesMsg(call.data.message);
      setIsLoading(false);
    } catch (error) {
      setError("somthing went wrong please try again later");
      setIsLoading(false);
    }
  };

  const removeImageHandler = async (event) => {
    setImageId(event.target.getAttribute("data-id"));
    setDeleteImage(true);
  };

  const removeChoiceModelHandler = () => {
    setDeleteImage(false);
  };

  const deleteImageHandler = async () => {
    setBlessImages(blessImages.filter((image) => image.imageId !== imageId));
    setDeleteImage(false);
    setIsLoading(2);
    try {
      const call = await fetch("https://birth-day-ap.herokuapp.com/images", {
        method: "DELETE",
        body: JSON.stringify({ imageid: imageId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const response = await call.json();
      if (response.error) {
        setError(response.error);
        setIsLoading(false);
        return;
      }
      setSeccuesMsg(response.message);
      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <Fragment>
      <Header />
      {isLoading === 1 && <FeatchLoader />}
      {isLoading === 2 && <SendLoader />}
      {seccuesMsg && (
        <ErrorModel message={seccuesMsg} setError={seccuesMsgHandler} />
      )}
      {error && <ErrorModel message={error} setError={errorHandler} />}
      {deleteImage && (
        <Choisemodel
          title="Do you want to delete this image"
          no={removeChoiceModelHandler}
          yes={deleteImageHandler}
        />
      )}
      <div className="imagespage">
        <form className="imagespage_form" onSubmit={onUploadHandler}>
          <div className="imagespage_upload">
            <input
              className="imagespage_upload-input"
              type="file"
              onChange={uploadImagesHandler}
              accept=".png,.jpeg,.jpg"
              multiple
            />
            <Upload />
          </div>
          <button className="imagespage_form-btn download-button">
            <div className="docs">
              <Docs />
              Docs
            </div>
            <div className="download">
              <svg
                className="css-i6dzq1"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                height="24"
                width="24"
                viewBox="0 0 24 24"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line y2="3" x2="12" y1="15" x1="12"></line>
              </svg>
            </div>
          </button>
        </form>

        <div className="imagespage_files">
          {images.map((image, key) => {
            return (
              <span key={key} className="imagespage_files">
                {image.name}
              </span>
            );
          })}
        </div>

        <SRLWrapper>
          <div className="imagespage_images">
            {blessImages &&
              blessImages.map((image, key) => (
                <div key={key} className="imagespage_singleImage">
                  <img
                    src={
                      "https://drive.google.com/uc?export=view&id=" +
                      image.imageId
                    }
                    alt="img"
                  />
                  <div
                    className="imagespage_singleImage-remove"
                    data-id={image.imageId}
                    onClick={removeImageHandler}
                  >
                    <Trash />
                  </div>
                </div>
              ))}
          </div>
        </SRLWrapper>
      </div>
    </Fragment>
  );
};

export default ImagesPage;
