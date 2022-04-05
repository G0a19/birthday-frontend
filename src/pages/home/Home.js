import { Fragment, react, useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import SwiperCore, { Autoplay } from "swiper";

import Header from "../../shared/Header";
import cakeImg from "./../../images/cake.png";
import Plus from "./../../shared/icons/Plus";
import FeatchLoader from "../../shared/featchloader/FeatchLoader";
import "swiper/css";
import "./Home.css";
import "swiper/css/pagination";

const Home = () => {
  const [users, setUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sliderImages, setSliderImages] = useState(false);
  SwiperCore.use([Autoplay]);

  useEffect(() => {
    setIsLoading(true);
    const getUsers = async () => {
      try {
        const call = await fetch("https://birth-day-ap.herokuapp.com/users");
        const response = await call.json();
        setUsers(response.users);
        setIsLoading(false);
      } catch (err) {}
    };
    getUsers();

    const getSliderImages = async () => {
      setIsLoading(true);
      try {
        const call = await fetch(
          "https://birth-day-ap.herokuapp.com/sliderimages"
        );
        const response = await call.json();
        if (response.images.length !== 0) setSliderImages(response);
        else setSliderImages(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getSliderImages();
  }, []);

  const sliders = sliderImages ? (
    sliderImages.images.map((slider, key) => (
      <SwiperSlide className="slider" key={key}>
        <img
          src={`https://drive.google.com/uc?export=view&id=${slider.imageId}`}
          alt="img"
        ></img>
      </SwiperSlide>
    ))
  ) : (
    <Fragment>
      <SwiperSlide>
        <div className="swiper_img img1"></div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper_img img2"></div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper_img img3"></div>
      </SwiperSlide>
    </Fragment>
  );

  return (
    <Fragment>
      {isLoading && <FeatchLoader />}
      <Header />
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        pagination={true}
        modules={[Pagination]}
      >
        {sliders}
      </Swiper>

      <div className="allBlessings">
        {users &&
          users.map((user, key) => (
            <div key={key} className="Bless">
              <Link to={`/users/?user=${user.id}`}>
                <div className="Bless_wrapper">
                  <span className="Bless_wrapper-title">{user.name}</span>
                </div>
              </Link>
            </div>
          ))}

        <div className="Bless">
          <Link to="/newbless">
            <div className="Bless_wrapper">
              <Plus />
              <span className="Bless_wrapper-title">Add new</span>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
