import { react, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../shared/Header";
import FeatchLoader from "../../shared/featchloader/FeatchLoader";
import "./User.css";

const User = (props) => {
  const [userId, setUserId] = useState(false);
  const [blessings, setBlessings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
