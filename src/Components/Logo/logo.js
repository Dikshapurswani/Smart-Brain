import React, { Component } from "react";
import Tilt from "react-tilt";
import brain from "./brain.png";
import "./logo.css";
class Logo extends Component {
  state = {};
  render() {
    return (
      <div className="ma4 ma0">
        <Tilt
          className="Tilt br2 shadow-2"
          options={{ max: 55 }}
          style={{ height: 80, width: 80 }}
        >
          <div className="Tilt-inner pa-3">
            <img style={{ paddingTop: "5px" }} alt="logo" src={brain} />
          </div>
        </Tilt>
      </div>
    );
  }
}

export default Logo;
