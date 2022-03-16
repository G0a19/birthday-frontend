import { Fragment, react, useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import Header from "../../shared/Header";
import cakeImg from "./../../images/cake.png";
import Plus from "./../../shared/icons/Plus";
import FeatchLoader from "../../shared/featchloader/FeatchLoader";
import "swiper/css";
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  SwiperCore.use([Autoplay]);

  useEffect(() => {
    setIsLoading(true);
    const getUsers = async () => {
      try {
        const call = await fetch("https://birth-day-ap.herokuapp.com/users");
        const response = await call.json();
        setUsers(response.users);
      } catch (err) {}
    };
    getUsers();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Fragment>
      {isLoading && <FeatchLoader />}
      <Header />
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={2000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
      >
        <SwiperSlide>
          <div className="swiper_img img1"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper_img img2"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper_img img3"></div>
        </SwiperSlide>
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
