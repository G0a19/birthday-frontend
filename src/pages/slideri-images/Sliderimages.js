import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../shared/Header";
import { SRLWrapper } from "simple-react-lightbox";
import Trash from "./../../shared/icons/Trash";
import Choisemodel from "../../shared/choicemodel/Choisemodel";
import ErrorModel from "../../shared/ErrorModel";
import FeatchLoader from "../../shared/featchloader/FeatchLoader";
import { useHistory } from "react-router-dom";

import "./Sliderimages.css";

const Sliderimages = () => {
  const [sliderImages, setSliderImages] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [seccuesMsg, setsSccuesMsg] = useState(false);
  let user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    const getSliderImages = async () => {
      setIsLoading(true);
      try {
        const call = await fetch(
          "https://birth-day-ap.herokuapp.com/sliderimages"
        );
        const response = await call.json();
        if (response.images.length !== 0) setSliderImages(response.images);
        else setSliderImages(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSliderImages();
  }, []);

  const removeHandler = async (event) => {
    const id = event.target.getAttribute("data-id");
    setImageId(sliderImages.find((image) => image.imageId == id).imageId);
    setDeleteImage(true);
  };

  const removeChoiceModelHandler = () => {
    setDeleteImage(false);
  };

  const deleteImageHandler = async () => {
    setSliderImages(sliderImages.filter((image) => image.imageId !== imageId));
    setDeleteImage(false);
    setIsLoading(true);
    try {
      const call = await fetch(
        "https://birth-day-ap.herokuapp.com/sliderimages",
        {
          method: "DELETE",
          body: JSON.stringify({ imageid: imageId }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const response = await call.json();
      if (response.error) {
        setError(response.error);
        setIsLoading(false);
        return;
      }
      setsSccuesMsg(response.message);
      setIsLoading(false);
      console.log(response);
    } catch (error) {}
  };

  const seccuesMsgHandler = (msg) => {
    setsSccuesMsg(false);
  };

  const errorSet = () => {
    setError(false);
  };

  const components =
    sliderImages.length > 0 ? (
      sliderImages.map((image, key) => (
        <div key={key} className="images_single">
          <img
            src={"https://drive.google.com/uc?export=view&id=" + image.imageId}
            alt="img"
          />
          <div
            className="images_single-remove"
            data-id={image.imageId}
            onClick={removeHandler}
          >
            <Trash />
          </div>
        </div>
      ))
    ) : (
      <h2 className="noImages">no images found</h2>
    );

  return (
    <Fragment>
      <Header />
      {seccuesMsg && (
        <ErrorModel message={seccuesMsg} setError={seccuesMsgHandler} />
      )}
      {error && <ErrorModel message={error} setError={errorSet} />}
      {isLoading && <FeatchLoader />}
      {deleteImage && (
        <Choisemodel
          title="Do you want to delete this image"
          no={removeChoiceModelHandler}
          yes={deleteImageHandler}
        />
      )}
      <SRLWrapper>
        <div className="images">{components}</div>
      </SRLWrapper>
    </Fragment>
  );
};

export default Sliderimages;
