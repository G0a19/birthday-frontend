import { Fragment, react, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RMIUploader } from "react-multiple-image-uploader";
import { SRLWrapper } from "simple-react-lightbox";

import "./ImagesPage.css";
import SendLoader from "../../shared/sendicon/SendLoader";
import FeatchLoader from "../../shared/featchloader/FeatchLoader";
import axios from "axios";
import Header from "../../shared/Header";
import ErrorModel from "./../../shared/ErrorModel";

const ImagesPage = () => {
  let user = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [blessImages, setBlessImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [seccuesMsg, setSeccuesMsg] = useState(false);

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
  }, []);

  const errorHandler = () => {
    setError(false);
  };

  const seccuesMsgHandler = (msg) => {
    window.location.reload(false);
  };

  const onUpload = async (data) => {
    setImages(data);
    setIsLoading(2);
    const formData = new FormData();
    data.map((file) => formData.append("file", file.file));
    formData.append("blessId", blessId);
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
      setSeccuesMsg(call.data.message);
      setIsLoading(false);
    } catch (error) {
      setError("somthing went wrong please try again later");
      setIsLoading(false);
    }
  };

  const onRemove = (id) => {
    console.log("Remove image id", id);
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
      <div className="imagespage">
        <RMIUploader
          onUpload={onUpload}
          onRemove={onRemove}
          dataSources={images}
        />
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
                </div>
              ))}
          </div>
        </SRLWrapper>
      </div>
    </Fragment>
  );
};

export default ImagesPage;
