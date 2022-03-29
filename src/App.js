import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from "react-tsparticles";
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignForm from './Components/SignForm/SignForm';
  
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

const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		}
	}

	loadUser = (data) => {
		this.setState({ user:{
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		} });
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

		try {
			const apiResponse = await fetch('https://guarded-crag-64592.herokuapp.com/imageurl', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					url: this.state.input
				})
			})
			const face = await apiResponse.json();

			if (face) {
				this.displayFaceBox(this.calculateFaceLocation(face));

				const res = await fetch('https://guarded-crag-64592.herokuapp.com/image', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						id: this.state.user.id
					})
				})
				const entries = await res.json();

				this.setState(Object.assign(this.state.user, { entries }))
			}
		} catch (e) {
			console.log('error', e);
		}
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState)
		} else if (route === 'home') {
			this.setState({ 
				isSignedIn: true,
				route
			 })
		} else {
			this.setState({ route })
		}
	}

	render() {
		const { isSignedIn, box, imageUrl, route, user: { name, entries } } = this.state;
		return (
			<div className="App">
				<Particles
					className='particles'
					id="tsparticles"
					options={particleOptions}
				/>
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
				{ route === 'home' 
					?  <div>
						<Logo />
						<Rank name={name} entries={entries} />
						<ImageLinkForm 
							onInputChange={this.onInputChange} 
							onButtonSubmit={this.onSubmit} 
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
					: <SignForm onRouteChange={this.onRouteChange} loadUser={this.loadUser} route={route} />
				}
			</div>
		);
  	}
}

export default App;
