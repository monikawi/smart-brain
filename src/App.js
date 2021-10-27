import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particlesOptions from './config/particlesConfig';
import { Navigation, ImageLinkForm, Entries, FaceRecognition, Login, Register } from './components';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'login',
  isLoggedIn: false,
  user: {
    id: null,
    name: '',
    email: '',
    entries: 0,
    joined: null,
  }
}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined,
			}
		})
	}

  
  calculateFaceLocation = (data) => {
    const bound = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: bound.left_col * width,
      topRow: bound.top_row * height,
      rightCol: width - (bound.right_col * width),
      bottomRow: height - (bound.bottom_row * height)
    }
  }

  displayDetectedBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onPhotoSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3030/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3030/count', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)

      }
      this.displayDetectedBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isLoggedIn: true})
    } else {
      this.setState(initialState);
      this.setState({isLoggedIn: false})
    }
    this.setState({route: route})
  }

  render () {
    const { isLoggedIn, imageUrl, route, box } = this.state;
    
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isLoggedIn={isLoggedIn}/>
        {route === 'home' ? (
          <>
            <Entries user={this.state.user} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPhotoSubmit={this.onPhotoSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </>
        ) : (
          route === 'login' ? (
            <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          ) : (
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        )}
      </div>
    );
  }
}

export default App;
