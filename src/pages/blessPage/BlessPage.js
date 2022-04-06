import { Fragment, React } from "react";
import { Link } from "react-router-dom";
import Header from "../../shared/Header";
import BlessIcon from "../../shared/icons/BlessIcon";
import Image from "../../shared/icons/Image";
import Pen from "./../../shared/icons/Pen";

import "./BlessPage.css";
import "./../user/User.css";

const BlessPage = () => {
  const url = new URL(window.location);
  const param = new URLSearchParams(url.search);
  const blessId = param.get("bless");

  return (
    <Fragment>
      <Header />
      <div className="blessings">
        <div className="blessings_wrapper">
          <Link
            to={`/blesspage/bless/?bless=${blessId}`}
            className="single_bless"
          >
            <BlessIcon />
          </Link>
          <Link
            to={`/blesspage/note/?bless=${blessId}`}
            className="single_bless"
          >
            <Pen />
          </Link>
          <Link
            to={`/blesspage/images/?bless=${blessId}`}
            className="single_bless"
          >
            <Image />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default BlessPage;
