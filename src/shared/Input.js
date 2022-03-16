import { react, useState, useEffect } from "react";
import "./../pages/login/Login.css";

const Input = (props) => {
  const [contectLable, setContectLable] = useState("");

  useEffect(() => {
    if (props.value.length > 0) setContectLable("form_label-foucs");
    else setContectLable("");
  }, [props.value]);

  return (
    <div className="form_contianer">
      <input
        className="form_input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.handler}
        type={props.type}
      />
      <label className={"form_label " + contectLable}>{props.title}</label>
    </div>
  );
};

export default Input;
