import React, { Component } from "react";
import "./imageLinkForm.css";

class ImageLinkForm extends Component {
  state = {};
  render() {
    const { onInputChange, onButtonSubmit } = this.props;
    return (
      <div>
        <p className="f3">
          {"The Magic Brain will detect faces in your picture. Give it a try!"}
        </p>
        <div className="center">
          <div className=" form center pa4 br3 shadow-5">
            <input
              type="text"
              className="f4 pa2 w-70 center"
              onChange={onInputChange}
            />
            <button
              className="w-30 f4 grow link ph3 pv2 dib white bg-light-purple "
              onClick={onButtonSubmit}
            >
              Detect
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageLinkForm;
