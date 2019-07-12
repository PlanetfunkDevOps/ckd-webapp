import React, { Fragment } from "react";
/* import spinner from "./spinner.gif"; */
import "./spinner.scss";

export default function Spinner() {
  return (
    <Fragment>
      <div className="spinner-container">
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
    </Fragment>
  );
}
