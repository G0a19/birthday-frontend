import { react, useState, useEffect } from "react";
import "./../pages/login/Login.css";

const FileuploadInput = (props) => {
  const updateImage = (e) => {
    const file = e.target.files[0];
    props.addFile(file);
  };

  return (
    <div className="form_contianer">
      <input
        className="form_input"
        onChange={updateImage}
        type="file"
        accept=".png,.jpeg,.jpg"
      />
    </div>
  );
};

export default FileuploadInput;
