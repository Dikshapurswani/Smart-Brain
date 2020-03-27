import React, { Component } from "react";
import Navigation from "./Components/Navigation/navigation";
import ImageLinkForm from "./Components/ImageLinkForm/imageLinkForm";
import Logo from "./Components/Logo/logo";
import Rank from "./Components/Rank/rank";
import Signin from "./Components/SignIn/signIn";
import FaceRecognition from "./Components/FaceRecognition/faceRecognition";
import Register from "./Components/Register/register";
import "./App.css";
import "tachyons";
import Particles from "react-particles-js";

const particleOptions = {
  particles: {
    number: {
      value: 175,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // componentDidMount() {
  //   fetch("http://localhost:3001/")
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  // }
  loadUser = data => {
    const { id, name, email, entries, joined } = data;
    this.setState({
      user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined
      }
    });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(clarifaiFace)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    //console.log(box);
    this.setState({ box: box });
  };

  onButtonSubmit = event => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://sleepy-dusk-64980.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://sleepy-dusk-64980.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
