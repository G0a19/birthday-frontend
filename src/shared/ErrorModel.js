import { react } from "react";
import { CSSTransition } from "react-transition-group";
import "./ErrorModel.css";

const ErrorModel = (props) => {
  return (
    <div className="errormodel">
      <div className="errormodel_wrapper">
        <div className="errormodel_wrapper-description">{props.message}</div>
        <button className="errormodel_wrapper-btn" onClick={props.setError}>
          close
        </button>
      </div>
    </div>
  );
};

export default ErrorModel;
