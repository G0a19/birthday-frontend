import "./Choisemodel..css";

const Choisemodel = (props) => {
  return (
    <div className="shadow">
      <div className="choisemodel">
        <h2 className="choisemodel_title">{props.title}</h2>
        <div className="choisemodel_btns">
          <button
            onClick={props.yes}
            className="choisemodel_btns-yes choisemodel_btn"
          >
            yes
          </button>
          <button
            onClick={props.no}
            className="choisemodel_btns-no choisemodel_btn"
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default Choisemodel;
