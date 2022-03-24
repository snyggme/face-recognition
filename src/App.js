import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from "react-tsparticles";
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignForm from './Components/SignForm/SignForm';
import Register from './Components/Register/Register';

let raw = {
	"user_app_id": {
		  "user_id": "6tlu7ompr2h0",
		  "app_id": "7da04a8ddae3430ea28d433edebd2583"
	  },
	"inputs": [
	  {
		"data": {
		  "image": {
			"url": ""
		  }
		}
	  }
	]
};
  
const particleOptions = {
	fpsLimit: 120,
	interactivity: {
		events: {
			onClick: {
				enable: true,
				mode: "push",
			},
			onHover: {
				enable: true,
				mode: "repulse",
			},
			// resize: true,
		},
		modes: {
			bubble: {
				distance: 400,
				// duration: 2,
				opacity: 0.8,
				size: 40,
			},
			push: {
				quantity: 4,
			},
			// repulse: {
			// 	distance: 200,
			// 	duration: 0.4,
			// },
		},
	},
	particles: {
		color: {
			value: "#ffffff",
		},
		links: {
			color: "#ffffff",
			distance: 150,
			enable: true,
			opacity: 0.5,
			width: 1,
		},
		collisions: {
			enable: true,
		},
		move: {
			direction: "none",
			enable: true,
			outMode: "bounce",
			random: false,
			// speed: 3,
			straight: false,
		},
		number: {
			density: {
				enable: true,
				area: 800,
			},
			value: 70,
		},
		opacity: {
			value: 0.5,
		},
		shape: {
			type: "circle",
		},
		size: {
			random: true,
			value: 5,
		},
	},
	detectRetina: true,
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin'
		}
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		this.setState({ box })
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value })
	}

	onSubmit = async () => {
		this.setState({imageUrl: this.state.input})
		raw.inputs[0].data.image.url = this.state.input;

		const clarifaiRequestOptions = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
			  	'Authorization': 'Key 17e2b9c5389341e596032d35f9a3944c'
			},
			body: JSON.stringify(raw),
		};

		try {
			const response = await fetch("https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/outputs", clarifaiRequestOptions);
			const result = await response.json();
			this.displayFaceBox(this.calculateFaceLocation(result.outputs[0].data));
		} catch (e) {
			console.log('error', e);
		}
	}

	onRouteChange = (route) => {
		this.setState({ route })
	}

	render() {
		return (
			<div className="App">
				<Particles
					className='particles'
					id="tsparticles"
					options={particleOptions}
				/>
				<Navigation onRouteChange={this.onRouteChange} />
				{ this.state.route === 'signin' 
					?  <SignForm onRouteChange={this.onRouteChange} />
					: this.state.route === 'signup' 
						? <Register onRouteChange={this.onRouteChange} />
						: <div>
							<Logo />
							<Rank />
							<ImageLinkForm 
								onInputChange={this.onInputChange} 
								onButtonSubmit={this.onSubmit} 
							/>
							<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
						</div>
				}
			</div>
		);
  	}
}

export default App;
