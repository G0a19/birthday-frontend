import { react, Fragment, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "../../shared/Header";
import FeatchLoader from "../../shared/featchloader/FeatchLoader";
import UseGetDateBettwen from "./UseGetDateBettwen";
import "./User.css";

const User = (props) => {
  const [userId, setUserId] = useState(false);
  const [blessings, setBlessings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(false);
  const [dateBettwen, setDareBettwen] = useState(false);
  let myBlessings = [];

  useEffect(() => {
    setIsLoading(true);
    const url = new URL(window.location);
    const param = new URLSearchParams(url.search);
    setUserId(param.get("user"));

    const getBlessings = async () => {
      const call = await fetch("https://birth-day-ap.herokuapp.com/blessing");
      const response = await call.json();
      setBlessings(response.blesses);
      const secondCall = await fetch(
        "https://birth-day-ap.herokuapp.com/users/dateofbirth/" +
          param.get("user")
      );
      const secondResponse = await secondCall.json();
      let date = new Date(secondResponse.dateOfBirth).setFullYear(
        new Date().getFullYear()
      );
      if (date < new Date().getTime()) {
        date = new Date(secondResponse.dateOfBirth).setFullYear(
          new Date().getFullYear() + 1
        );
      }
      setDateOfBirth(date);
      setInterval(() => {
        setDareBettwen(UseGetDateBettwen(new Date(date)));
      }, 1200);
      setIsLoading(false);
    };
    getBlessings();
  }, []);

  if (blessings) {
    myBlessings = blessings.map((bless) => (bless.for === userId ? bless : ""));
    myBlessings = myBlessings.filter((bless) => bless !== "");
    myBlessings = myBlessings.sort((a, b) => a.year - b.year);
  }

  return (
    <Fragment>
      {isLoading && <FeatchLoader />}
      <Header />
      <div className="blessings">
        <div className="timeOut">
          <h2 className="timeOut_title">until next birthday</h2>
          <div className="timeOut_timer">
            {dateBettwen &&
              Object.keys(dateBettwen).map((keyName, i) => (
                <div className="timeOut_single" key={i}>
                  <span className="timeOut_single-description">{keyName}</span>
                  <span className="timeOut_single-time">
                    {dateBettwen[keyName]}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="blessings_wrapper">
          {myBlessings.length !== 0 &&
            myBlessings.map((bless, key) => (
              <Link
                to={`/blesspage/?bless=${bless.id}`}
                className="single_bless"
                key={key}
              >
                <h2 className="single_bless-year">{bless.year}</h2>{" "}
              </Link>
            ))}
        </div>
      </div>
      {myBlessings.length === 0 && (
        <h2 className="not_found">This user dont have blesses</h2>
      )}
    </Fragment>
  );
};

export default User;
