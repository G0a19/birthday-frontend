import { react, Fragment, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./New.css";
import "./../login/Login.css";
import Header from "../../shared/Header";
import Input from "../../shared/Input";
import TextAdditor from "../../shared/TextAdditor";
import SendLoader from "../../shared/sendicon/SendLoader";
import ErrorModel from "../../shared/ErrorModel";
import axios from "axios";

const New = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [seccuesMsg, setSeccuesMsg] = useState(false);
  const [users, setUsers] = useState(false);
  const [name, setName] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  let user = useSelector((state) => state.user);
  const history = useHistory();

  const selectHandler = (event) => {
    setName(event.target.value);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateYear = (e) => {
    setYear(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updateDescription = (value) => {
    setDescription(value);
  };

  const errorSet = () => {
    setError(false);
  };

  const seccuesMsgHandler = (msg) => {
    history.push("/");
  };

  useEffect(() => {
    const getUsers = async () => {
      const call = await fetch("https://birth-day-ap.herokuapp.com/users");
      const response = await call.json();
      setUsers(response.users);
    };
    getUsers();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("title", title);
    data.append("description", description);
    data.append("userGet", name);
    data.append("year", year);
    data.append("userId", user.id);
    try {
      const call = await axios.post(
        "https://birth-day-ap.herokuapp.com/blessing",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(call.response);
      if (call.data.error) {
        setError(call.data.error);
        setIsLoading(false);
        return;
      }
      setSeccuesMsg(call.data.message);
    } catch (error) {
      setError(error.response.data.error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      {seccuesMsg && (
        <ErrorModel message={seccuesMsg} setError={seccuesMsgHandler} />
      )}
      {error && <ErrorModel message={error} setError={errorSet} />}
      {isLoading && <SendLoader />}
      <Header></Header>
      <div className="new">
        <h2 className="new_title">new bless</h2>
        <form onSubmit={submitHandler}>
          <select onChange={selectHandler} className="new_select">
            <option hidden>For</option>
            {users &&
              users.map((user, key) => (
                <option key={key} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
          <Input
            value={title}
            handler={updateTitle}
            placeholder="TITLE"
            title="title"
            type="text"
          />
          <Input
            value={year}
            handler={updateYear}
            placeholder="YEAR"
            title="year"
            type="number"
          />
          <Input handler={updateImage} type="file" accept=".png,.jpeg,.jpg" />
          {/* <input type="file" id="file" onChange={updateImage} /> */}
          <TextAdditor updateDescription={updateDescription} />
          <div className="new_btn-contianer">
            <button className="new_btn" type="submit">
              add
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default New;
